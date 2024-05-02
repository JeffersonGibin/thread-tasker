/* eslint-disable no-unused-vars */

import { ITaskerQueue } from "../types";

/**
 * Represents a queue for managing tasks.
 */
export class TaskerQueue {
  /**
   * The array of items in the queue.
   */
  items: ITaskerQueue[];

  /**
   * The static instance of the TaskerQueue.
   */
  static instance: TaskerQueue;

  /**
   * Creates an instance of TaskerQueue.
   */
  constructor() {
    this.items = [];
  }

  /**
   * Gets the singleton instance of TaskerQueue.
   * @returns The singleton instance of TaskerQueue.
   */
  public static getInstance(): TaskerQueue {
    if (!TaskerQueue.instance) {
      TaskerQueue.instance = new TaskerQueue();
    }

    return this.instance;
  }

  /**
   * Adds an item to the end of the queue.
   * @param item - The item to be added to the queue.
   */
  public enqueue(item): void {
    this.items.push(item);
  }

  /**
   * Removes and returns the first item from the queue.
   * @returns The first item in the queue, or null if the queue is empty.
   */
  public dequeue(): ITaskerQueue | null {
    if (this.isEmpty()) {
      return null;
    }
    return this.items.shift();
  }

  /**
   * Checks if the queue is empty.
   * @returns True if the queue is empty, otherwise false.
   */
  public isEmpty(): boolean {
    return this.items.length === 0;
  }

  /**
   * Returns the number of items in the queue.
   * @returns The number of items in the queue.
   */
  public size(): number {
    return this.items.length;
  }

  /**
   * Gets an item from the queue by its ID.
   * @returns The item from the queue with the specified ID, or undefined if not found.
   */
  public getItemById(id: string): ITaskerQueue | null {
    return this.items.find((item) => item.id === id);
  }

  /**
   * Deletes an item from the queue by its ID.
   * @param id - The ID of the item to be deleted.
   * @returns True if the item was successfully deleted, otherwise false.
   */
  public delete(id: string): boolean {
    const indexItem = this.items.findIndex((item) => item.id === id);
    if (indexItem !== -1) {
      const deleteResult = this.items.splice(indexItem, 1);
      if (deleteResult.length > 0) {
        return true;
      }
    }

    return false;
  }
}
