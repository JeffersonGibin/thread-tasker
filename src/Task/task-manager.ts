/* eslint-disable @typescript-eslint/no-explicit-any */
import { v4 as uuidv4 } from "uuid";
import { queue, eventEmitter } from "../memory-instance";

export class TaskManager {
  public add(name: string, fn: (id: string) => Promise<any>) {
    if (typeof fn === "undefined") {
      throw new Error("callback required to registry task");
    }

    if (typeof fn !== "function") {
      throw new Error("The task is not a function!");
    }

    const params = {
      id: uuidv4(),
      name,
      status: "pending",
      emitedAt: new Date(),
    };

    queue.enqueue({
      emitedAt: params.emitedAt,
      id: params.id,
      fn: fn.toString(),
    });

    eventEmitter.emit("pending", params);
  }
}
