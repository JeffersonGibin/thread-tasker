# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).


## [v1.0.0](https://github.com/JeffersonGibin/thread-tasker/releases/tag/v1.0.0)

### Added

- Asynchronous Task Addition: Adds asynchronous functions as tasks to a queue.
- Task Queue Removal: Removes items from the task queue.
- Queue Size Inquiry: Retrieves the current size of the task queue.
- Queue Emptiness Check: Checks if the task queue is empty.
- Event Monitoring: Listens for task-related events such as pending, in progress, completed, failure, and error.
- Retry Mechanism: Implements retry functionality for tasks that may fail.
- Sleep for Retry Tasks: Introduces a delay (sleep) between retry attempts.