import { Task } from "src/modules/tasks/task.entity";

enum TimeUnit {
  MINUTES = "minutes",
  HOURS = "hours",
  DAYS = "days",
  MONTHS = "months",
  YEARS = "years",
}

export function convertToMinutes(value: number, unit: TimeUnit): number {
  switch (unit) {
    case TimeUnit.MINUTES:
      return value;
    case TimeUnit.HOURS:
      return value * 60;
    case TimeUnit.DAYS:
      return value * 60 * 24;
    case TimeUnit.MONTHS:
      return value * 60 * 24 * 30;
    case TimeUnit.YEARS:
      return value * 60 * 24 * 365;
    default:
      return value;
  }
}

export function topologicalSortWithPriority(
  tasks: (Task & { score: number })[],
): Task[] {
  const idToTask = new Map(tasks.map((t) => [t.id, t]));
  const inDegree = new Map<string, number>();
  const graph = new Map<string, string[]>();

  // 1. Ініціалізуємо граф
  for (const task of tasks) {
    inDegree.set(task.id, 0);
    graph.set(task.id, []);
  }

  for (const task of tasks) {
    for (const depId of task.dependencies || []) {
      graph.get(depId)?.push(task.id);
      inDegree.set(task.id, (inDegree.get(task.id) || 0) + 1);
    }
  }

  // 2. Пошук всіх вершин без залежностей
  const queue: (Task & { score: number })[] = tasks
    .filter((t) => (inDegree.get(t.id) || 0) === 0)
    .sort((a, b) => b.score - a.score); // найбільш пріоритетні спочатку

  const result: Task[] = [];

  while (queue.length) {
    // Вибираємо найпріоритетніший серед доступних
    const current = queue.shift()!;
    result.push(current);

    for (const neighborId of graph.get(current.id) || []) {
      inDegree.set(neighborId, (inDegree.get(neighborId) || 1) - 1);
      if (inDegree.get(neighborId) === 0) {
        queue.push(idToTask.get(neighborId)!);
        queue.sort((a, b) => b.score - a.score); // пріоритетніші — раніше
      }
    }
  }

  return result;
}
