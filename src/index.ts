import { cube } from './math'

const env = process.env.NODE_ENV

export function foo(x: number) {
  if (env !== 'production') {
    console.log('Not running in production mode')
  }

  if (x) {
    return cube(x)
  }

  return -1
}

export * from './math'
