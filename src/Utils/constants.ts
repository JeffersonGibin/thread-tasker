/**
 * Represent max workers that can execute
 */
export const DEFAULT_MAX_WORKERS = 2;

/**
 * Represent max attempt in case retry error
 */
export const DEFAULT_MAX_RETRY_ATTEMPTS = 1;

/**
 * retry sleep in milisseconds
 */
export const DEFAULT_TIMEOUT_RETRY_SLEEP = 100;

/**
 * Interval between attempts to fetch new tasks from the queue, in milliseconds
 */
export const FETCH_INTERVAL_MILLISECONDS = 1000;
