import { defineConfig } from 'vitest/config'

export default defineConfig({
  test: {
    coverage: {
      provider: 'v8',
      reporter: ['text', 'json-summary'],
      reportsDirectory: './coverage'
    },
    projects: [
      {
        test: {
          name: 'main',
          environment: 'node',
          include: ['tests/unit/**/*.main.test.ts']
        }
      },
      {
        test: {
          name: 'renderer',
          environment: 'jsdom',
          include: ['tests/unit/**/*.renderer.test.ts']
        }
      }
    ]
  }
})
