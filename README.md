# <div align="center">Thread Tasker</div>

<div align="center">

[![npm](https://img.shields.io/npm/v/thread-tasker.svg)](https://www.npmjs.com/package/thread-tasker 'View this project on NPM')
[![npm download count](https://img.shields.io/npm/dm/thread-tasker)](https://www.npmjs.com/package/thread-tasker)
[![MIT License](https://img.shields.io/npm/l/thread-tasker.svg)](#license)

</div>

Simplify your asynchronous task handling with ease. Effortlessly manage multi-threaded task execution for enhanced performance and scalability.


## Install

To install `thread-tasker`, just run the following command:

```shell
npm thread-tasker
```

## Exemples

```typescript

import { ThreadTasker } from "thread-tasker";

// Initialize ThreadTasker with configurations
const threadTasker = ThreadTasker({
  // Maximum number of workers for task execution.
  maxWorkers: 2,

  // Object for configuring retry in case of error
  retry: {
    // Maximum number of retry attempts for a task
    maxAttempt: 2,

    // Represents the timeout added to the task before calling the function
    timeout: 1000,
  },
});

// Add a heavy task to the task queue
threadTasker.addTask("task-1", (taskId) => {
  console.log(taskId);

  // Define the number of iterations
  const iterations = 1000000000; // 1 billion

  // Variable to store the result of the processing
  let result = 0;

  // Loop to perform the heavy processing
  for (let i = 0; i < iterations; i++) {
    result += Math.random(); // Perform a simple operation to simulate the processing
  }

  // Return the result of the processing
  return result;
});

// Events to manage the queue
// const item = threadTasker.queue.getItemById("1");
// const queueIsEmpty = threadTasker.queue.empty();
// const queueSize = threadTasker.queue.size();
// const itemWasDeleted = threadTasker.queue.delete(item.id);

// When the task is added to the queue
threadTasker.on("pending", (data) => {
  console.log("Pending task data", data);
});

// When a task starts being executed
threadTasker.on("inprogress", (data) => {
  console.log("In progress task data", data);
});

// When a task is successfully completed
threadTasker.on("completed", (data) => {
  console.log("Completed task data", data);
});

// When an execution failure occurs
threadTasker.on("fail", (data) => {
  console.log("Failed task data", data);
});

// When any non-Worker error occurs
threadTasker.on("error", (data) => {
  console.log("Error task data", data);
});

// Will be executed according to the number of retries
threadTasker.on("retryerror", (data) => {
  console.log("Retry error task data", data);
});

/**
 * This function will call the method that searches for tasks in the queue every X seconds.
 */
threadTasker.run();
```

## Supported configurations:

| Parameter    | Description                                                                                     | Type     | Default |
|--------------|-------------------------------------------------------------------------------------------------|----------|---------|
| `maxWorkers`   | Maximum number of workers that can be executed simultaneously.                                 | number   | 1       |
| `retry`        | Object containing settings for retrying tasks that failed during execution.                    | object   | -       |
| `retry.maxAttempt` | Maximum number of retry attempts for a task that failed.                                        | number   | 3       |
| `retry.timeout`    | Time in milliseconds to wait between retry attempts.                                             | number   | 10000   |

A seguir está todas as funções suportadas

## Supported functions:


| Function                       | Description                                                                                                                                                  |
|--------------------------------|--------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `threadTasker.addTask`         | Adds a new task to the execution queue. This function allows you to add a new task to be processed by the workers.                                          |
| `threadTasker.run`             | Initiates the execution of the tasker                 |
| `threadTasker.queue.delete`    | Removes a specific task from the execution queue. This function allows you to delete a task from the queue based on its ID.                                   |
| `threadTasker.queue.empty`     | Checks if the execution queue is empty. Returns `true` if the queue is empty and `false` if there are tasks in the queue waiting for execution.           |
| `threadTasker.queue.getItemById`| Gets a specific task from the execution queue based on its ID. Returns the corresponding task if found, or `undefined` if not found.                      |
| `threadTasker.queue.size`      | Returns the total number of tasks in the execution queue. This function provides the current size of the queue, indicating how many tasks are waiting for execution. |


## Supported events:

| Event Type  | Description                                                                                                              |
|-------------|--------------------------------------------------------------------------------------------------------------------------|
| `pending`     | Indicates that the task is pending execution.                                                                             |
| `fail`        | Indicates that the task failed during execution.                                                                          |
| `completed`   | Indicates that the task has been successfully completed.                                                                 |
| `in_progress` | Indicates that the task is currently in progress, meaning it's being executed at the moment.                              |
| `retry_error` | Indicates that an error occurred during the retry attempt of the task. Typically occurs after multiple execution failures. |
| `error`       | Indicates a general error occurred during task execution.                                                                 |

## Issues and Contributing

- *Issues:* If you encounter a bug or wish to see something added/changed, please [open an issue](https://github.com/JeffersonGibin/thread-tasker/issues/new)!

- *Discussion:* If you need assistance with anything related to the project, whether it's understanding how to use a particular feature, troubleshooting an issue, or anything [start a discussion here](https://github.com/JeffersonGibin/thread-tasker/discussions/new)!
- *Contributing*: To contributing please read [the guide](contributing.md).

## License

[MIT](https://choosealicense.com/licenses/mit/)