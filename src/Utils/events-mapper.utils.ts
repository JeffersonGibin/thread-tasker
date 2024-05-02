import { EventType, TaskStatus } from "../types";

export const statusToEventMapper = (taskStatus: TaskStatus): EventType => {
  const events: Record<TaskStatus, EventType> = {
    pending: "pending",
    fail: "fail",
    completed: "completed",
    in_progress: "inprogress",
    retry_error: "retryerror",
  };

  return events[taskStatus] || "error";
};
