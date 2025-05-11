import { Injectable } from "@nestjs/common";

import { TopsisConfig } from "./topsis.types";

@Injectable()
export class TopsisService {
  rank<T extends Record<string, any>>(items: T[], config: TopsisConfig): T[] {
    const { criteria, weights, isBenefit } = config;

    if (
      !items.length ||
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
