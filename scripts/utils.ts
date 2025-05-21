import path from 'node:path'

/**
 * Resolves path relative to project root
 *
 * @param args - path segments
 * @returns resolved path
 */
export const resolve = (...args: string[]): string =>
  path.resolve(import.meta.dirname, '..', ...args)
