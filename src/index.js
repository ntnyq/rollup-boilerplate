import { cube } from './math'
const env = process.env.NODE_ENV

function foo (x) {
  if (env !== 'production') {
    console.log('Not running in production mode')
  }

  if (x) {
    return cube(x)
  }

  return -1
}

export { foo }
