import { EventEmitter } from "events";
import { TaskerQueue } from "./Task/tasker-queue";

const eventEmitter = new EventEmitter();
const queue = new TaskerQueue();

export { eventEmitter, queue };
