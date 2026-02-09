/**
 * Memory pressure measurement for dev-tools
 * Returns a 0-1 ratio where 0 is healthy and 1 is near OOM
 */
/**
 * Calculate current memory pressure as a 0-1 ratio
 * Uses container memory limit if available, falls back to V8 heap stats
 */
export declare function getMemoryPressure(): number;
