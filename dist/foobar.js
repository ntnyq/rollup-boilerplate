/*!
 * foobar v0.0.1
 * https://github.com/ntnyq/rollup-boilterplate
 *
 * Copyright (c) 2018-2019 ntnyq <ntnyq13@gmail.com>
 * Released under the MIT license
 *
 * Date: 2019-01-03T04:41:33.810Z
 */

(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
  typeof define === 'function' && define.amd ? define(factory) :
  (global = global || self, global.foobar = factory());
}(this, function () { 'use strict';

  var PI = 3.1415926;
  function cube(x) {
    return x * x * x * PI;
  }

  function foo(x) {
    if (x) {
      return cube(x);
    }

    return -1;
  }

  var main = {
    foo: foo
  };

  return main;

}));
//# sourceMappingURL=foobar.js.map
