// @ts-check

/**
 * @typedef {import('rollup').RollupOptions} RollupOptions
 */

import { readFileSync } from 'node:fs'
import commonjs from '@rollup/plugin-commonjs'
import json from '@rollup/plugin-json'
import { nodeResolve } from '@rollup/plugin-node-resolve'
import replace from '@rollup/plugin-replace'
import terser from '@rollup/plugin-terser'
import typescript from '@rollup/plugin-typescript'
import { defineConfig } from 'rollup'
import { resolve } from './scripts/utils.mjs'

const pkg = JSON.parse(readFileSync('./package.json', 'utf8'))
const banner = `\
/**!
 * ${pkg.name} - ${pkg.description}
 *
 * @version v${pkg.version}
 * @license ${pkg.license}
 * @copyright 2024-${new Date().getFullYear()} ntnyq
 */
`

export default defineConfig(() => {
  const input = resolve('src/index.ts')
  /**
   * @type {import('rollup').Plugin[]}
   */
  const plugins = [
    commonjs({
      include: 'node_modules/**',
    }),
    json(),
    nodeResolve({
      browser: true,
      preferBuiltins: true,
    }),
    replace({
      __VERSION__: JSON.stringify(pkg.version),
      preventAssignment: true,
    }),
    typescript({
      tsconfig: './tsconfig.lib.json',
    }),
  ]

  /**
   * @type RollupOptions
   */
  const cjsConfig = {
    input,
    output: {
      banner,
      file: resolve('dist/index.cjs'),
      format: 'cjs',
    },
    plugins,
  }

  /**
   * @type RollupOptions
   */
  const esmConfig = {
    input,
    output: {
      banner,
      file: resolve('dist/index.mjs'),
      format: 'esm',
    },
    plugins,
  }

  /**
   * @type RollupOptions
   */
  const umdConfig = {
    input,
    output: [
      {
        banner,
        file: resolve('dist/index.js'),
        format: 'umd',
        name: 'FooBar',
      },
      {
        banner,
        file: resolve('dist/index.min.js'),
        format: 'umd',
        name: 'FooBar',
        plugins: [
          terser({
            format: {
              comments: 'some',
            },
          }),
        ],
      },
    ],
    plugins,
  }

  return [cjsConfig, esmConfig, umdConfig]
})
