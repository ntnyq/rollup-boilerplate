import { defineConfig } from 'vitest/config'
import pkg from './package.json'

export default defineConfig({
  test: {
    reporters: ['dot'],
    coverage: {
      provider: 'v8',
      reporter: ['text', 'lcov', 'json'],
    },
  },

  define: {
    __VERSION__: JSON.stringify(pkg.version),
  },
})
