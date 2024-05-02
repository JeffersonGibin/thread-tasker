export type EventType = "pending" | "fail" | "completed" | "inprogress" | "retryerror" | "error";

export type TaskStatus = "pending" | "fail" | "completed" | "in_progress" | "retry_error" | "error";
export type WorkerStatus = "busy" | "idle" | "error";

export interface IDataEvent {
  /**
   * Unique identifier for the event task.
   */
  id?: string;

  /**
   * Status of the task/event.
   */
  status: TaskStatus;

  /**
   * Optional error information associated with the event.
   */
  error?: Error | any;

  /**
   * Date and time when the event was emitted.
   */
  emitedAt: Date;

  /**
   * Identifier of the worker associated with the event.
   */
  workerId?: string;

  /**
   * Function to be executed when the event occurs.
   */
  fn?: (args?: { id: string }) => unknown;
}

export interface ITaskerQueue {
  /**
   * Unique identifier for the task.
   */
  id: string;

  /**
   * Date and time when the task was emitted/created.
   */
  emitedAt: string;

  /**
   * Function representing the task to be executed.
   */
  fn: (id: string) => Promise<void>;
}

export interface ThreadTaskerOutput {
  /**
   * Method to listen for events.
   * @param name The name of the event to listen for.
   * @param fn The function to be executed when the event occurs.
   */
  on: (name: EventType | string, fn: (data: Omit<IDataEvent, "fn">) => void) => void;

  /**
   * Method to add a task to the execution queue.
   * @param name The name of the task to be added.
   * @param fn The function representing the task to be executed.
   */
  addTask: (name: string, fn: (data) => void) => void;

  /**
   * Method to start executing tasks by the workers.
   */
  run: () => void;

  queue: {
    /**
     * Method to check if the task queue is empty.
     * @returns A boolean indicating if the queue is empty.
     */
    empty: () => boolean;

    /**
     * Method to get the size of the task queue.
     * @returns The number of tasks in the queue.
     */
    size: () => number;

    /**
     * Method to delete a task from the queue.
     * @returns A boolean indicating if the task was successfully deleted.
     */
    delete: () => boolean;

    /**
     * Method to get a task from the queue.
     * @returns A boolean indicating if the task was successfully deleted.
     */
    getItemById: (id: string) => ITaskerQueue;
  };
}

export interface IRetry {
  /**
   * The maximum number of retry attempts for a task.
   * @default 1
   */
  maxAttempt: number;

  /**
   * (Optional) The time in milliseconds to wait between retry attempts.
   * @default 100
   */
  timeout?: number;
}

export interface ISettings {
  /**
   * The maximum number of workers that can be executed simultaneously.
   * @default 2
   */
  maxWorkers?: number;

  /**
   * The retry configuration for tasks.
 
   */
  retry?: IRetry;
}
