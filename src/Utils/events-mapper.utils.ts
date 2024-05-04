import { EventType, TaskStatus } from "../types";

export const statusToEventMapper = (taskStatus: TaskStatus): EventType => {
  if (taskStatus === "retry_error") {
    return "retryerror";
  }

  if (taskStatus === "in_progress") {
    return "inprogress";
  }

  return taskStatus;
};
