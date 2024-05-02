import { TaskManager } from "./Task/task-manager";
import { WorkerManager } from "./Worker/worker-manager";
import { DEFAULT_MAX_WORKERS, FETCH_INTERVAL_MILLISECONDS } from "./Utils/constants";
import { eventEmitter, queue } from "./memory-instance";
import { EventType, IDataEvent, ISettings, ThreadTaskerOutput } from "./types";
import { isGreaterThanZero } from "./Utils/Number.utils";

export const ThreadTasker = (settings: ISettings): ThreadTaskerOutput => {
  if (settings.maxWorkers != null && !isGreaterThanZero(settings.maxWorkers)) {
    throw new Error("The field 'settings.maxWorkers' needs to be greater than zero");
  }

  if (settings.retry?.maxAttempt != null && !isGreaterThanZero(settings.retry?.maxAttempt)) {
    throw new Error("The field 'settings.retry?.maxAttempt' needs to be greater than zero");
  }

  if (settings.retry?.timeout != null && !isGreaterThanZero(settings.retry?.timeout)) {
    throw new Error("The field 'settings.retry?.timeout' needs to be greater than zero");
  }

  const currentDir = __dirname;
  const taskManager = new TaskManager();
  const workerManager = new WorkerManager(`${currentDir}/Worker/worker.js`, {
    ...settings,
    maxWorkers: settings?.maxWorkers ?? DEFAULT_MAX_WORKERS,
    fetchTasksInterval: settings?.fetchTasksInterval ?? FETCH_INTERVAL_MILLISECONDS,
  });

  return {
    on: (name: EventType, fn: (data: Omit<IDataEvent, "fn">) => void) => eventEmitter.on(name, fn),
    addTask: taskManager.add.bind(taskManager),
    run: workerManager.execute.bind(workerManager),
    queue: {
      empty: queue.isEmpty.bind(queue),
      size: queue.size.bind(queue),
      getItemById: queue.getItemById.bind(queue),
      delete: queue.delete.bind(queue),
    },
  };
};
