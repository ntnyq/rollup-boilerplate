import replace from '@rollup/plugin-replace'
import resolve from '@rollup/plugin-node-resolve'
import json from '@rollup/plugin-json'
import commonjs from '@rollup/plugin-commonjs'
import babel from '@rollup/plugin-babel'
import { terser } from 'rollup-plugin-terser'

const {
  pkg: { version },
  srcPath,
  distPath,
  banner,
} = require('./utils')

export default [
  {
    output: 'foobar.js',
    format: 'umd',
    globals: {},
  },
  {
    output: 'foobar.min.js',
    format: 'umd',
    globals: {},
  },
  {
    output: 'foobar.common.js',
    format: 'cjs',
  },
  {
    output: 'foobar.esm.js',
    format: 'es',
  },
].map(opts => {
  const minify = Boolean(/min\.js$/.test(opts.output))

  const config = {
    input: srcPath(),
    output: {
      file: distPath(opts.output),
      format: opts.format,
      name: 'FooBar',
      globals: opts.globals,
      banner,
    },
    external: Object.keys(opts.globals || {}),
    plugins: [
      replace({
        'process.env.VERSION': JSON.stringify(version),
        'process.env.NODE_ENV': JSON.stringify('production'),
      }),
      resolve({
        browser: true,
        preferBuiltins: true,
      }),
      commonjs({ include: 'mode_modules/**' }),
      json(),
      ...(opts.format !== 'es'
        ? [
          babel({
            exclude: [/\/core-js\//, /@babel\/runtime/],
            babelHelpers: 'bundled',
          }),
        ]
        : []),
      ...(minify
        ? [
          terser({
            output: {
              comments: /^!/,
            },
          }),
        ]
        : []),
    ],
  }

  return config
})
