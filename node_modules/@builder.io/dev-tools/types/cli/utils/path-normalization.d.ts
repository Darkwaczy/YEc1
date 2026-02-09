/**
 * Normalizes a file path by converting backslashes to forward slashes and removing leading ./
 * This ensures consistent path comparisons across Windows and Unix-like systems.
 *
 * @param filePath - The file path to normalize
 * @returns The normalized path with forward slashes and no leading ./
 *
 * @example
 * ```ts
 * normalizeFilePath('C:\\Users\\test\\file.ts') // => 'C:/Users/test/file.ts'
 * normalizeFilePath('./src/file.ts') // => 'src/file.ts'
 * normalizeFilePath('/unix/path/file.ts') // => '/unix/path/file.ts'
 * ```
 */
export declare function normalizeFilePath(filePath: string): string;
