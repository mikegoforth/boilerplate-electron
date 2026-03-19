import { test, expect, _electron as electron } from '@playwright/test'
import { resolve } from 'path'

const appPath = resolve(__dirname, '../../out/main/index.js')

test.describe('electron app', () => {
  test('should launch and show main window', async () => {
    const electronApp = await electron.launch({ args: [appPath] })

    const window = await electronApp.firstWindow()
    await window.waitForLoadState('domcontentloaded')

    const title = await window.title()
    expect(title).toBe('Electron App')

    const isVisible = await window.isVisible('body')
    expect(isVisible).toBe(true)

    await electronApp.close()
  })

  test('should have correct security settings', async () => {
    const electronApp = await electron.launch({ args: [appPath] })

    const window = await electronApp.firstWindow()
    await window.waitForLoadState('domcontentloaded')

    // Verify node integration is disabled in renderer
    const hasRequire = await window.evaluate(() => {
      return typeof (globalThis as Record<string, unknown>).require === 'function'
    })
    expect(hasRequire).toBe(false)

    // Verify context isolation — process is not directly available
    const hasProcess = await window.evaluate(() => {
      return typeof (globalThis as Record<string, unknown>).process === 'undefined'
    })
    expect(hasProcess).toBe(true)

    await electronApp.close()
  })
})
