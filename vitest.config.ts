import { defineConfig } from 'vitest/config'
import pkg from './package.json'

export default defineConfig({
  test: {
    coverage: {
      provider: 'v8',
      reporter: ['clover', 'json', 'text', 'lcov', 'html'],
    },
  },

  define: {
    __VERSION__: JSON.stringify(pkg.version),
  },
})
