# Thread Tasker

Simplify your asynchronous task handling with ease. Effortlessly manage multi-threaded task execution for enhanced performance and scalability.


| Parameter    | Description                                                                                     | Type     | Default |
|--------------|-------------------------------------------------------------------------------------------------|----------|---------|
| `maxWorkers`   | Maximum number of workers that can be executed simultaneously.                                 | number   | 1       |
| `retry`        | Object containing settings for retrying tasks that failed during execution.                    | object   | -       |
| `retry.maxAttempt` | Maximum number of retry attempts for a task that failed.                                        | number   | 3       |
| `retry.timeout`    | Time in milliseconds to wait between retry attempts.                                             | number   | 10000   |

| Function                       | Description                                                                                                                                                  |
|--------------------------------|--------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `threadTasker.addTask`         | Adds a new task to the execution queue. This function allows you to add a new task to be processed by the workers.                                          |
| `threadTasker.run`             | Initiates the execution of the task queue. This function starts processing the tasks added to the queue, using the available workers.                      |
| `threadTasker.queue.delete`    | Removes a specific task from the execution queue. This function allows you to delete a task from the queue based on its ID.                                   |
| `threadTasker.queue.empty`     | Checks if the execution queue is empty. Returns `true` if the queue is empty and `false` if there are tasks in the queue waiting for execution.           |
| `threadTasker.queue.getItemById`| Gets a specific task from the execution queue based on its ID. Returns the corresponding task if found, or `undefined` if not found.                      |
| `threadTasker.queue.size`      | Returns the total number of tasks in the execution queue. This function provides the current size of the queue, indicating how many tasks are waiting for execution. |


| Event Type  | Description                                                                                                              |
|-------------|--------------------------------------------------------------------------------------------------------------------------|
| `pending`     | Indicates that the task is pending execution.                                                                             |
| `fail`        | Indicates that the task failed during execution.                                                                          |
| `completed`   | Indicates that the task has been successfully completed.                                                                 |
| `in_progress` | Indicates that the task is currently in progress, meaning it's being executed at the moment.                              |
| `retry_error` | Indicates that an error occurred during the retry attempt of the task. Typically occurs after multiple execution failures. |
| `error`       | Indicates a general error occurred during task execution.                                                                 |
