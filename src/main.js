import { cube } from './maths';
const env = process.env.NODE_ENV;

function foo (x) {
  if (x) {
    return cube(x);
  }

  return -1;
}

if (env !== 'production') {
  console.log('>>>>>>>>');
}

export default {
  foo
};
