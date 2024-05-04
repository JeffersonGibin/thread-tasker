import { TaskManager } from "./task-manager";
import { queue, eventEmitter } from "../memory-instance";

jest.mock("uuid", () => ({
  v4: jest.fn(() => "mocked-uuid"),
}));

jest.spyOn(eventEmitter, "emit");

describe("TaskManager", () => {
  let taskManager;

  beforeEach(() => {
    taskManager = new TaskManager();
    queue.clear();
  });

  test("add should enqueue a task and emit a pending event", () => {
    const mockFn = jest.fn();
    taskManager.add("Test Task", mockFn);

    expect(queue.size()).toBe(1);
    const task = queue.dequeue();
    expect(task).toEqual({
      id: "mocked-uuid",
      emitedAt: expect.any(Date),
      fn: mockFn.toString(),
    });

    expect(eventEmitter.emit).toHaveBeenCalledWith("pending", {
      id: "mocked-uuid",
      name: "Test Task",
      status: "pending",
      emitedAt: task?.emitedAt,
    });
  });

  test("add should throw an error if no callback function is provided", () => {
    expect(() => {
      taskManager.add("Test Task", undefined);
    }).toThrow("callback required to registry task");
  });

  test("add should throw an error if the provided task is not a function", () => {
    expect(() => {
      taskManager.add("Test Task", "not-a-function");
    }).toThrow("The task is not a function!");
  });
});
