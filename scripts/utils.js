const path = require('path')
const pkg = require('../package.json')

const banner = `\
/*!
 * ${pkg.name} - ${pkg.description}
 *
 * @version v${pkg.version}
 * @link ${pkg.homepage}
 * @license ${pkg.license}
 * @copyright 2019-${new Date().getFullYear()} ntnyq
 */
`

/**
 * Resolve path from project root /
 * @param  {string} args
 */
function rootPath (...args) {
  return path.resolve(__dirname, '..', ...args)
}

/**
 * Resolve path from /dev
 * @param  {string} args
 */
function devPath (...args) {
  return rootPath('dev', ...args)
}

/**
 * Resolve path from /src
 * @param  {string} args
 */
function srcPath (...args) {
  return rootPath('src', ...args)
}

/**
 * Resolve path from /dist
 * @param  {string} args
 */
function distPath (...args) {
  return rootPath('dist', ...args)
}

module.exports = {
  pkg,
  banner,
  rootPath,
  devPath,
  srcPath,
  distPath,
}
