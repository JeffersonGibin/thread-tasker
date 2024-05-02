/* eslint-disable @typescript-eslint/no-explicit-any */
import { IDataEvent, ISettings } from "../types";
import { parentPort, workerData } from "worker_threads";
import { DEFAULT_MAX_RETRY_ATTEMPTS, DEFAULT_TIMEOUT_RETRY_SLEEP } from "../Utils/constants";

const settings = workerData as ISettings;

const sleep = (milliseconds: number): Promise<void> => {
  return new Promise((resolve) => {
    setTimeout(resolve, milliseconds);
  });
};

const retryFunction = async (fn: (args: any) => Promise<any>, taskId: string): Promise<any> => {
  let attempt = 0;
  let error: Error | any;
  let taskResult: any;

  const timeout = settings?.retry?.timeout ?? DEFAULT_TIMEOUT_RETRY_SLEEP;
  const maxAttempt = settings?.retry.maxAttempt ?? DEFAULT_MAX_RETRY_ATTEMPTS;

  while (attempt < maxAttempt) {
    if (settings?.retry) {
      await sleep(timeout);
    }

    try {
      taskResult = await fn({ id: taskId });
      break;
    } catch (err) {
      error = err.message;
      attempt++;

      parentPort.postMessage({
        id: taskId,
        status: "retry_error",
        emitedAt: new Date(),
        attempt,
        maxAttempt,
      });
    }
  }

  if (attempt >= maxAttempt) {
    error = "Failed to execute function after maximum attempts";
  }

  return { taskResult, error };
};

const worker = {
  run: async () => {
    parentPort.on("message", async (data: IDataEvent) => {
      const { fn, id } = data;

      parentPort.postMessage({
        id,
        status: "in_progress",
        emitedAt: new Date(),
      } as IDataEvent);

      let taskResult, error;

      if (settings?.retry) {
        const result = await retryFunction(eval(`(${fn})`), id);
        taskResult = result.taskResult;
        error = result.error;
      } else {
        try {
          taskResult = await eval(`(${fn})`)({ id });
        } catch (err) {
          error = err.message;
        }
      }

      if (error) {
        parentPort.postMessage({
          id,
          status: "failure",
          emitedAt: new Date(),
          error,
        });
      } else {
        parentPort.postMessage({
          id,
          status: "completed",
          emitedAt: new Date(),
          result: taskResult,
        });
      }

      parentPort.unref();
    });
  },
};

worker.run();
