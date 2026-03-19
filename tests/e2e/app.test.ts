import { test, expect, _electron as electron } from '@playwright/test'
import { resolve } from 'path'

const appPath = resolve(__dirname, '../../out/main/index.js')
const electronPath = require('electron') as unknown as string

// CI Linux runners execute as root, which requires --no-sandbox for Chromium
const isCI = !!process.env.CI
const args = isCI ? [appPath, '--no-sandbox'] : [appPath]

test.describe('electron app', () => {
  test('should launch and show main window', async () => {
    const electronApp = await electron.launch({
      executablePath: electronPath,
      args
    })

    const window = await electronApp.firstWindow()
    await window.waitForLoadState('domcontentloaded')

    const title = await window.title()
    expect(title).toBe('Electron App')

    await expect(window.locator('body')).toBeVisible()

    await electronApp.close()
  })

  test('should have correct security settings', async () => {
    const electronApp = await electron.launch({
      executablePath: electronPath,
      args
    })

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
