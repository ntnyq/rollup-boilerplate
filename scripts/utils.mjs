import path from 'node:path'
import { fileURLToPath, URL } from 'node:url'

export const __dirname = fileURLToPath(new URL('.', import.meta.url))

/**
 * Resolves path relative to project root
 * @param  {...string} args - path segments
 * @returns resolved path
 */
export const resolve = (...args) => path.resolve(__dirname, '..', ...args)