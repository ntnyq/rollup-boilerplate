const foobar = require('../dist/foobar.min.js');

describe('Group one', () => {
  test('case-1', () => {
    expect(foobar.foo(1)).toBe(3.1415926);
  });
});
