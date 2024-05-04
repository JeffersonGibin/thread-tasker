import { TaskerQueue } from "./tasker-queue";

describe("TaskerQueue unit test", () => {
  let queue;

  beforeEach(() => {
    queue = new TaskerQueue();
  });

  test("enqueue should add an item to the queue", () => {
    queue.enqueue({ id: "1", name: "Task 1" });
    expect(queue.size()).toBe(1);
  });

  test("dequeue should remove and return the first item from the queue", () => {
    const item = { id: "1", name: "Task 1" };
    queue.enqueue(item);
    const dequeuedItem = queue.dequeue();
    expect(dequeuedItem).toEqual(item);
    expect(queue.size()).toBe(0);
  });

  test("isEmpty should return true when the queue is empty", () => {
    expect(queue.isEmpty()).toBe(true);
  });

  test("isEmpty should return false when the queue is not empty", () => {
    queue.enqueue({ id: "1", name: "Task 1" });
    expect(queue.isEmpty()).toBe(false);
  });

  test("size should return the number of items in the queue", () => {
    queue.enqueue({ id: "1", name: "Task 1" });
    queue.enqueue({ id: "2", name: "Task 2" });
    expect(queue.size()).toBe(2);
  });

  test("getItemById should return the item from the queue with the specified ID", () => {
    const item = { id: "1", name: "Task 1" };
    queue.enqueue(item);
    expect(queue.getItemById("1")).toEqual(item);
  });

  test("getItemById should return null if item with specified ID is not found", () => {
    expect(queue.getItemById("1")).toBe(null);
  });

  test("delete should remove an item from the queue by its ID", () => {
    const item = { id: "1", name: "Task 1" };
    queue.enqueue(item);
    expect(queue.delete("1")).toBe(true);
    expect(queue.size()).toBe(0);
  });

  test("delete should return false if item with specified ID is not found", () => {
    expect(queue.delete("1")).toBe(false);
  });
});
