import { ISettings, WorkerStatus } from "../types";
import { Worker, isMainThread } from "worker_threads";

export interface IWorkerPool {
  /** The ID of the worker. */
  id: string;

  /** The worker instance. */
  worker: Worker;

  /** The status of the worker. */
  status: WorkerStatus;
}

export class WorkerPool {
  private workers: Record<string, IWorkerPool>;

  constructor(
    readonly settings: ISettings,
    readonly workerPath: string
  ) {
    this.workers = {};
  }

  /**
   * Retrieves the workers in the pool.
   * @returns {Record<string, IWorkerPool>} - The workers in the pool.
   */
  public getWorkers(): Record<string, IWorkerPool> {
    return this.workers;
  }

  /**
   * Updates the status of a worker in the pool.
   * @param {string} workerId - The ID of the worker.
   * @param {WorkerStatus} status - The new status of the worker.
   */
  public updateState(workerId: string, status: WorkerStatus) {
    this.workers[workerId].status = status;
  }

  /**
   * Registers workers in the pool during initialization.
   */
  protected async registryWorkers() {
    if (isMainThread) {
      for (let index = 1; index <= this.settings.maxWorkers; index++) {
        const worker = new Worker(this.workerPath, { workerData: this.settings });
        const id = index.toString();
        this.workers[id] = { id, status: "idle", worker };
      }
    }
  }
}
