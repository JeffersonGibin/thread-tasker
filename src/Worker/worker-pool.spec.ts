import { WorkerPool } from "./worker-pool";
import { Worker } from "worker_threads";

jest.mock("worker_threads", () => ({
  Worker: jest.fn(),
  isMainThread: true,
}));

describe("WorkerPool", () => {
  let workerPool;
  const settings = { maxWorkers: 3 };
  const workerPath = "worker.js";

  beforeEach(() => {
    workerPool = new WorkerPool(settings, workerPath);
  });

  test("should initialize workers during initialization", () => {
    workerPool.registryWorkers();

    expect(Worker).toHaveBeenCalledTimes(settings.maxWorkers);

    for (let i = 1; i <= settings.maxWorkers; i++) {
      const workerId = i.toString();
      expect(workerPool.getWorkers()[workerId]).toBeDefined();
      expect(workerPool.getWorkers()[workerId].status).toBe("idle");
    }
  });

  test("should update worker status to busy", () => {
    workerPool.registryWorkers();

    const workerId = "1";
    workerPool.updateState(workerId, "busy");

    expect(workerPool.getWorkers()[workerId].status).toBe("busy");
  });

  test("should return the workers in the pool", () => {
    const settings = { maxWorkers: 3 };
    const workerPath = "worker.js";
    const worker1 = new Worker(workerPath);
    const worker2 = new Worker(workerPath);
    const worker3 = new Worker(workerPath);

    const workerPool = new WorkerPool(settings, workerPath);
    workerPool["workers"] = {
      "1": { id: "1", status: "idle", worker: worker1 },
      "2": { id: "2", status: "idle", worker: worker2 },
      "3": { id: "3", status: "idle", worker: worker3 },
    };

    const result = workerPool.getWorkers();

    expect(result).toEqual({
      "1": { id: "1", status: "idle", worker: worker1 },
      "2": { id: "2", status: "idle", worker: worker2 },
      "3": { id: "3", status: "idle", worker: worker3 },
    });
  });
});
