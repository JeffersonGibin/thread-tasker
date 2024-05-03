

<div align="center">
   
![Thread (3)](https://github.com/JeffersonGibin/thread-tasker/assets/6215779/c3322b7f-f62a-41ca-8483-969087a2255a)



[![npm](https://img.shields.io/npm/v/thread-tasker.svg)](https://www.npmjs.com/package/thread-tasker 'View this project on NPM')
[![npm download count](https://img.shields.io/npm/dm/thread-tasker)](https://www.npmjs.com/package/thread-tasker)
[![MIT License](https://img.shields.io/npm/l/thread-tasker.svg)](#license)

</div>


# Thread Tasker

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
   fetchTasksInterval: 2000,

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
  console.log("taskId", taskId);

  // Define the number of iterations
  const iterations = 1000000000; // 1 billion

  let result = 0;

  // Loop to perform the heavy processing
  for (let i = 0; i < iterations; i++) {
    result += 1;
  }

  //   throw new Error("This emit failure");
  //   return Promise.reject("This emit failure");

  // Return the result of the processing
  return result;
});

threadTasker.addTask("task-2", (taskId) => {
  return { projectName: 'Thread Tasker'};
});


// Events to manage the queue
// const item = threadTasker.queue.getItemById("1");
// const queueIsEmpty = threadTasker.queue.empty();
// const queueSize = threadTasker.queue.size();
// const itemWasDeleted = threadTasker.queue.delete(item.id);

// When the task is added to the queue
threadTasker.on("pending", (data) => {
  console.log("Pending task data", data);
  // Output Event
  //   {
  //   id: '581c4bdb-baeb-4a20-bc86-e1628170c1e1',
  //   name: 'task-1',
  //   status: 'pending',
  //   emitedAt: 2024-05-02T20:08:21.314Z
  // }
});

// When a task starts being executed
threadTasker.on("inprogress", (data) => {
  console.log("In progress task data", data);

    // Output Event
    //  {
    //   id: '581c4bdb-baeb-4a20-bc86-e1628170c1e1',
    //   status: 'in_progress',
    //   emitedAt: 2024-05-02T20:08:23.323Z,
    //   workerId: '1'
    // }
});

// When a task is successfully completed
threadTasker.on("completed", (data) => {
  console.log("Completed task data", data);

  // Output Event
  //   {
  //   id: 'fab31e30-4c7e-41bb-a230-437867c4db63',
  //   status: 'completed',
  //   emitedAt: 2024-05-02T19:55:39.501Z,
  //   result: undefined,
  //   workerId: '1'
  // }

});

// When an execution failure occurs
threadTasker.on("failure", (data) => {
  console.log("Failed task data", data);

  // Output Event
  // {
  //   id: '581c4bdb-baeb-4a20-bc86-e1628170c1e1',
  //   status: 'failure',
  //   emitedAt: 2024-05-02T20:08:26.333Z,
  //   error: 'Failed to execute function after maximum attempts',
  //   workerId: '1'
  // }

});

// When any non-Worker error occurs
threadTasker.on("error", (data) => {
  console.log("Error task data", data);
  // Output Event
  // { emitedAt: 2024-05-02T19:52:38.337Z, workerId: '1' }
});

// Will be executed according to the number of retries
threadTasker.on("retryerror", (data) => {
  console.log("Retry error task data", data);

  // Output Event
  //  {
  //   id: 'b046d935-c354-4938-b085-7db273075173',
  //   status: 'retry_error',
  //   emitedAt: 2024-05-02T19:57:53.947Z,
  //   attempt: 1,
  //   maxAttempt: 3,
  //   workerId: '1'
  // }
});

/**
 * This function will call the method that searches for tasks in the queue every X seconds.
 */
threadTasker.run();
```



## Supported configurations:

Here are all the supported configurations.


| Parameter           | Description                                                                                     | Type     | Default |
|---------------------|-------------------------------------------------------------------------------------------------|----------|---------|
| `maxWorkers`        | Maximum number of workers that can be executed simultaneously.                                 | number   | 1       |
| `retry`             | Object containing settings for retrying tasks that failed during execution.                    | object   | -       |
| `retry.maxAttempt`  | Maximum number of retry attempts for a task that failed.                                        | number   | 1       |
| `retry.timeout`     | Time in milliseconds to wait between retry attempts.                                             | number   | 100   |
| `fetchTasksInterval`| Interval between attempts to fetch new tasks from the queue, in milliseconds.          fail         | number   | 1000    |



## Supported functions:

Here are all the supported functions.

| Function                       | Description                                                                                                                                                  |
|--------------------------------|--------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `threadTasker.addTask`         | Adds a new task to the execution queue. This function allows you to add a new task to be processed by the workers.                                          |
| `threadTasker.run`             | Initiates the execution of the tasker                 |
| `threadTasker.queue.delete`    | Removes a specific task from the execution queue. This function allows you to delete a task from the queue based on its ID.                                   |
| `threadTasker.queue.empty`     | Checks if the execution queue is empty. Returns `true` otherwise `false`|
| `threadTasker.queue.getItemById`| Gets a specific task pending from the execution queue based on its ID. Returns the corresponding task if found, or `undefined` if not found.                      |
| `threadTasker.queue.size`      | Returns the total number of tasks in the execution queue. |


## Supported events:

Here are all the supported events.

| Event Type  | Description                                                                                                              |
|-------------|--------------------------------------------------------------------------------------------------------------------------|
| `pending`     | Indicates that the task is pending execution.                                                                             |
| `failure`        | Indicates that the task failed during execution.                                                                          |
| `completed`   | Indicates that the task has been successfully completed.                                                                 |
| `inprogress` | Indicates that the task is currently in progress, meaning it's being executed at the moment.                              |
| `retryerror` | Indicates that an error occurred during the retry attempt of the task. Typically occurs after multiple execution failures. |
| `error`       | Indicates a general error occurred during task execution.                                                                 |

## Issues and Contributing

- *Issues:* If you encounter a bug or wish to see something added/changed, please [open an issue](https://github.com/JeffersonGibin/thread-tasker/issues/new)!

- *Discussion:* If you need assistance with anything related to the project, whether it's understanding how to use a particular feature, troubleshooting an issue, or anything [start a discussion here](https://github.com/JeffersonGibin/thread-tasker/discussions/new)!
- *Contributing*: To contributing please read [the guide](contributing.md).

## License

[MIT](https://choosealicense.com/licenses/mit/)
