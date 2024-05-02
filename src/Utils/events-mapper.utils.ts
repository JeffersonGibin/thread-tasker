import { EventType, TaskStatus } from "../types";

export const statusToEventMapper = (taskStatus: TaskStatus): EventType => {
  const events: Record<TaskStatus, EventType> = {
    pending: "pending",
    failure: "failure",
    completed: "completed",
    in_progress: "inprogress",
    retry_error: "retryerror",
    error: "error",
  };

  return events[taskStatus] || "error";
};
