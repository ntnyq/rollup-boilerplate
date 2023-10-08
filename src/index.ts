import { cube } from './math'

export function foo(x: number) {
  if (x) {
    return cube(x)
  }

  return -1
}

export * from './math'

declare const __VERSION__: string

export const version = __VERSION__
