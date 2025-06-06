import { Injectable, Logger } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

import { TopsisSettings } from "src/modules/users/topsis-settings.entity";

@Injectable()
export class TopsisService {
  constructor(
    @InjectRepository(TopsisSettings)
    private readonly settingsRepo: Repository<TopsisSettings>,
  ) {}

  public async loadUserSettings(userId: string) {
    const s = await this.settingsRepo.findOne({
      relations: ["user"],
      where: { user: { id: userId } },
    });
    if (s) {
      return {
        criteria: s.criteria,
        isBenefit: (s.isBenefit as (string | boolean)[]).map(
          (v) => v === true || v === "true",
        ),
        weights: s.weights.map(Number),
      };
    }
    return {
      criteria: [
        "importance",
        "urgency",
        "difficulty",
        "successProbability",
        "normalizedEstimatedTime",
      ],
      isBenefit: [true, true, false, true, false],
      weights: [0.3, 0.25, 0.15, 0.2, 0.1],
    };
  }

  public async rank<T extends Record<string, any>>(
    items: T[],
    userId: string,
  ): Promise<T[]> {
    const { criteria, isBenefit, weights } =
      await this.loadUserSettings(userId);

    if (
      criteria.length !== weights.length ||
      criteria.length !== isBenefit.length
    ) {
      throw new Error("Invalid TOPSIS configuration.");
    }

    const matrix = items.map((item) => criteria.map((key) => item[key] ?? 0));
    const normMatrix = this.normalizeMatrix(matrix);
    const weighted = normMatrix.map((row) =>
      row.map((value, i) => value * weights[i]),
    );

    const idealPositive = this.getIdeal(weighted, isBenefit, true);
    const idealNegative = this.getIdeal(weighted, isBenefit, false);

    const scores = weighted.map((row) => {
      const dPlus = this.euclideanDistance(row, idealPositive);
      const dMinus = this.euclideanDistance(row, idealNegative);
      return dMinus / (dPlus + dMinus);
    });

    return items
      .map((item, i) => ({ item, score: scores[i] }))
      .sort((a, b) => b.score - a.score)
      .map(({ item }) => item);
  }

  public async rankRespectingDependencies<
    T extends { id: string; dependencies?: { id: string }[] },
  >(items: T[], userId: string): Promise<T[]> {
    if (!items.length) {
      return items;
    }

    const topsisSorted = await this.rank(items, userId);

    const priorityMap = new Map<string, number>(
      topsisSorted.map((task, index) => [task.id, index]),
    );

    const graph = new Map<string, string[]>();
    const inDegree = new Map<string, number>();

    topsisSorted.forEach((task) => {
      graph.set(task.id, []);
      inDegree.set(task.id, 0);
    });

    topsisSorted.forEach((task) => {
      for (const dep of task.dependencies ?? []) {
        graph.get(dep.id)?.push(task.id);
        inDegree.set(task.id, (inDegree.get(task.id) ?? 0) + 1);
      }
    });

    const result: T[] = [];
    const queue: T[] = topsisSorted.filter(
      (task) => (inDegree.get(task.id) ?? 0) === 0,
    );

    queue.sort((a, b) => priorityMap.get(a.id)! - priorityMap.get(b.id)!);

    while (queue.length > 0) {
      const current = queue.shift()!;
      result.push(current);

      for (const neighborId of graph.get(current.id) ?? []) {
        inDegree.set(neighborId, inDegree.get(neighborId)! - 1);
        if (inDegree.get(neighborId) === 0) {
          const neighbor = topsisSorted.find((t) => t.id === neighborId)!;
          queue.push(neighbor);
        }
      }

      queue.sort((a, b) => priorityMap.get(a.id)! - priorityMap.get(b.id)!);
    }

    return result;
  }

  private euclideanDistance(a: number[], b: number[]): number {
    return Math.sqrt(a.reduce((sum, val, i) => sum + (val - b[i]) ** 2, 0));
  }

  private getIdeal(
    matrix: number[][],
    isBenefit: boolean[],
    isPositive: boolean,
  ): number[] {
    return matrix[0].map((_, i) => {
      const col = matrix.map((row) => row[i]);
      return isBenefit[i] === isPositive ? Math.max(...col) : Math.min(...col);
    });
  }

  private normalizeMatrix(matrix: number[][]): number[][] {
    const columns = matrix[0].map((_, i) => matrix.map((row) => row[i]));
    const norms = columns.map(
      (col) => Math.sqrt(col.reduce((sum, val) => sum + val ** 2, 0)) || 1,
    );

    return matrix.map((row) => row.map((val, i) => val / norms[i]));
  }
}
