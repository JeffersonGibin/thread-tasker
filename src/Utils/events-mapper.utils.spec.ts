import { statusToEventMapper } from "./events-mapper.utils";
import { TaskStatus } from "../types";

describe("statusToEventMapper", () => {
  test("should return EventType.RETRY_ERROR when taskStatus is retry_error", () => {
    const taskStatus: TaskStatus = "retry_error";
    expect(statusToEventMapper(taskStatus)).toBe("retryerror");
  });

  test("should return EventType.IN_PROGRESS when taskStatus is in_progress", () => {
    const taskStatus: TaskStatus = "in_progress";
    expect(statusToEventMapper(taskStatus)).toBe("inprogress");
  });

  test("should return the same value as taskStatus for other statuses", () => {
    const taskStatuses: TaskStatus[] = ["pending", "failure", "completed", "error"];
    taskStatuses.forEach((status) => {
      expect(statusToEventMapper(status)).toBe(status);
    });
  });
});
