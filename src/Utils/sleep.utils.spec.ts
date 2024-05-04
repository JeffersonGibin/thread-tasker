import { sleep } from "./sleep.utils";

describe("sleep", () => {
  test("should wait for the specified time before resolving", async () => {
    const startTime = Date.now();
    const milliseconds = 1000;

    await sleep(milliseconds);

    const endTime = Date.now();
    const elapsedTime = endTime - startTime;

    expect(elapsedTime).toBeGreaterThanOrEqual(milliseconds - 50);
    expect(elapsedTime).toBeLessThanOrEqual(milliseconds + 50);
  });
});
