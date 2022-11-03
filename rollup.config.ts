import path from 'node:path'
import { readFileSync } from 'node:fs'
import { URL, fileURLToPath } from 'node:url'
import type { RollupOptions } from 'rollup'
import { defineConfig } from 'rollup'
import commonjs from '@rollup/plugin-commonjs'
import { nodeResolve } from '@rollup/plugin-node-resolve'
import replace from '@rollup/plugin-replace'
import json from '@rollup/plugin-json'
import { terser } from 'rollup-plugin-terser'
import typescript from '@rollup/plugin-typescript'

const __dirname = fileURLToPath(new URL(`.`, import.meta.url))
const resolve = (...args: string[]) => path.resolve(__dirname, ...args)

const pkg = JSON.parse(readFileSync(`./package.json`, 'utf8'))
const banner = `\
/*!
 * ${pkg.name} - ${pkg.description}
 *
 * @version v${pkg.version}
 * @license ${pkg.license}
 * @copyright 2022-${new Date().getFullYear()} ntnyq
 */
`

export default () => {
  const input = resolve(`src/index.ts`)
  const sharablePlugins = [
    commonjs({
      include: `node_modules/**`,
    }),
    json(),
    nodeResolve({
      browser: true,
      preferBuiltins: true,
    }),
    replace({
      'process.env.NODE_ENV': JSON.stringify(`production`),
      'process.env.VERSION': JSON.stringify(pkg.version),
      preventAssignment: true,
    }),
    typescript({
      tsconfig: `./tsconfig.build.json`,
    }),
  ]
  const cjsBuild: RollupOptions = {
    input,
    output: {
      file: resolve(`dist/index.cjs`),
      format: `cjs`,
      banner,
    },
    plugins: [
      ...sharablePlugins,
    ],
  }
  const esmBuild: RollupOptions = {
    input,
    output: {
      file: resolve(`dist/index.mjs`),
      format: `esm`,
      banner,
    },
    plugins: [
      ...sharablePlugins,
    ],
  }
  const umdBuild: RollupOptions = {
    input,
    output: [
      {
        file: resolve(`dist/index.js`),
        format: `umd`,
        name: `FooBar`,
        banner,
      }, {
        file: resolve(`dist/index.min.js`),
        format: `umd`,
        name: `FooBar`,
        banner,
        plugins: [
          terser({
            format: {
              comments: `some`,
            },
          }),
        ],
      },
    ],
    plugins: [
      ...sharablePlugins,
    ],
  }
  return defineConfig([
    cjsBuild,
    esmBuild,
    umdBuild,
  ])
}
