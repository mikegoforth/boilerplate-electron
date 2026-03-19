import { describe, it, expect } from 'vitest'

describe('main process', () => {
  it('should have node environment available', () => {
    expect(process.versions.node).toBeDefined()
  })

  it('should resolve paths correctly', async () => {
    const { join } = await import('path')
    const result = join('src', 'main', 'index.ts')
    expect(result).toContain('src')
    expect(result).toContain('main')
  })
})
