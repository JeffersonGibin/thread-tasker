/* eslint-disable @typescript-eslint/no-unused-vars */
import { Worker } from "worker_threads";
import { IWorkerPool, WorkerPool } from "./worker-pool";
import { eventEmitter, queue } from "../memory-instance";
import { IDataEvent, ISettings, ITaskerQueue } from "../types";
import { statusToEventMapper } from "../Utils/events-mapper.utils";

export class WorkerManager extends WorkerPool {
  constructor(
    readonly workerPath: string,
    readonly settings: ISettings
  ) {
    super(settings, workerPath);
  }

  public async execute() {
    this.registryWorkers();
    setInterval(() => this.executeWorker(), this.settings?.fetchTasksInterval);
  }

  /**
   *
   * Tratative for don't return duplicate events
   */
  private clearAllListenersWorkers(worker: Worker) {
    worker.removeAllListeners("message");
    worker.removeAllListeners("messageerror");
    worker.removeAllListeners("error");
    worker.removeAllListeners("exit");
  }

  public async sendMessageToWorker(availableWorker: IWorkerPool, task: ITaskerQueue) {
    const workerId = availableWorker.id;
    this.updateState(workerId, "busy");
    availableWorker.worker.postMessage({ ...task });
  }

  private eventWhenError(message: IDataEvent, workerId: string) {
    eventEmitter.emit(message.status, {
      emitedAt: new Date(),
      workerId,
    });

    this.updateState(workerId, "idle");
  }

  private emitEvent(message: IDataEvent, workerId: string, task: ITaskerQueue) {
    if (["completed", "failure", "retry_error"].includes(message.status) && message.id === task.id) {
      this.updateState(workerId, "idle");
    }

    const eventType = statusToEventMapper(message.status);

    eventEmitter.emit(eventType, {
      ...message,
      workerId,
    });
  }

  private workerEvents(availableWorker: IWorkerPool, task: ITaskerQueue) {
    const workerId = availableWorker.id;

    this.clearAllListenersWorkers(availableWorker.worker);

    availableWorker.worker.on("message", (message: IDataEvent) => {
      this.emitEvent(message, workerId, task);
    });

    /**
     * When worker is execution end messageerror is returned
     *  then the event error is emitted
     */
    availableWorker.worker.on("messageerror", (error) => {
      this.eventWhenError(
        {
          status: "error",
          emitedAt: new Date(),
        },
        workerId
      );
    });

    /**
     * When worker is execution end messageerror is returned
     *  then the event error is emitted
     */
    availableWorker.worker.on("error", (error) => {
      this.eventWhenError(
        {
          status: "error",
          emitedAt: new Date(),
        },
        workerId
      );
    });

    /**
     * When worker is execution end messageerror is returned
     *  then the event error is emitted
     */
    availableWorker.worker.on("exit", () => {
      this.updateState(workerId, "idle");
    });
  }

  private async executeWorker(): Promise<void> {
    if (queue.isEmpty()) {
      return;
    }

    for (const item of Object.values(this.getWorkers())) {
      const task = queue.dequeue();
      await this.sendMessageToWorker(item, task);

      if (item.status === "busy" && task !== null) {
        this.workerEvents(item, task);
      }
    }
  }
}
