import filesize from 'rollup-plugin-filesize';
import { uglify } from 'rollup-plugin-uglify';

import baseConfig from './rollup.config.base';
import { name, version, author, license, repository } from '../package.json';

const now = new Date();

const banner = `/*!
 * ${name} v${version}
 * https://github.com/${repository}
 *
 * Copyright (c) 2018-${now.getFullYear()} ${author}
 * Released under the ${license} license
 *
 * Date: ${now.toISOString()}
 */
`;

export default [
  {
    ...baseConfig,
    output: [
      {
        file: `dist/${name}.js`,
        format: 'umd',
        name,
        banner,
        sourcemap: true
      },
      {
        file: `dist/${name}.cjs.js`,
        format: 'cjs',
        banner
      },
      {
        file: `dist/${name}.esm.js`,
        format: 'es',
        banner
      }
    ],
    plugins: [ ...baseConfig.plugins, filesize() ]
  },

  {
    ...baseConfig,
    output: [
      {
        file: `dist/${name}.min.js`,
        format: 'umd',
        name,
        banner
      }
    ],
    plugins: [ ...baseConfig.plugins, uglify({ compress: { drop_console: true } }), filesize() ]
  }
];
