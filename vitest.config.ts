import { defineConfig } from 'vitest/config'
import pkg from './package.json'

export default defineConfig({
  define: {
    __VERSION__: JSON.stringify(pkg.version),
  },

  test: {
    reporters: ['dot'],
    coverage: {
      include: ['src/**/*.ts'],
      provider: 'v8',
      reporter: ['text', 'lcov'],
    },
  },
})
