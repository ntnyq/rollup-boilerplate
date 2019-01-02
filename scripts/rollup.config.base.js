import alias from 'rollup-plugin-alias';
import { eslint } from 'rollup-plugin-eslint';
import resolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';
import babel from 'rollup-plugin-babel';
import replace from 'rollup-plugin-replace';

export default {
  input: 'src/main.js',
  plugins: [
    alias({ resolve: [ '.js' ] }),
    replace({ 'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'development') }),
    resolve(),
    commonjs({ include: 'mode_modules/**' }),
    eslint({ include: [ 'src/**/*.js' ] }),
    babel({ runtimeHelpers: true, exclude: 'node_modules/**/*.js' })
  ]
};
