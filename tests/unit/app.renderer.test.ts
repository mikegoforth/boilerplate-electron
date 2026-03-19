import { describe, it, expect } from 'vitest'

describe('renderer process', () => {
  it('should have access to the DOM', () => {
    const div = document.createElement('div')
    div.id = 'app'
    document.body.appendChild(div)

    expect(document.getElementById('app')).not.toBeNull()
  })

  it('should set innerHTML correctly', () => {
    const div = document.createElement('div')
    div.innerHTML = '<h1>Test</h1>'
    document.body.appendChild(div)

    expect(div.querySelector('h1')?.textContent).toBe('Test')
  })
})
