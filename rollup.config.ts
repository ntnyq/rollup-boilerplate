import { resolve } from 'node:path'
import { readFileSync } from 'node:fs'
import { URL, fileURLToPath } from 'node:url'
import type { RollupOptions } from 'rollup'
import { defineConfig } from 'rollup'
import json from '@rollup/plugin-json'
import terser from '@rollup/plugin-terser'
import replace from '@rollup/plugin-replace'
import commonjs from '@rollup/plugin-commonjs'
import typescript from '@rollup/plugin-typescript'
import { nodeResolve } from '@rollup/plugin-node-resolve'

const __dirname = fileURLToPath(new URL(`.`, import.meta.url))

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
  const input = resolve(__dirname, `src/index.ts`)
  const plugins = [
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
      file: resolve(__dirname, `dist/index.cjs`),
      format: `cjs`,
      banner,
    },
    plugins,
  }
  const esmBuild: RollupOptions = {
    input,
    output: {
      file: resolve(__dirname, `dist/index.mjs`),
      format: `esm`,
      banner,
    },
    plugins,
  }
  const umdBuild: RollupOptions = {
    input,
    output: [
      {
        file: resolve(__dirname, `dist/index.js`),
        format: `umd`,
        name: `FooBar`,
        banner,
      },
      {
        file: resolve(__dirname, `dist/index.min.js`),
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
    plugins,
  }
  return defineConfig([
    cjsBuild,
    esmBuild,
    umdBuild,
  ])
}
