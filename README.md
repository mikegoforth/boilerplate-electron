# Boilerplate Electron

[![CI](https://github.com/ironlantern-io/boilerplate-electron/actions/workflows/ci.yml/badge.svg)](https://github.com/ironlantern-io/boilerplate-electron/actions/workflows/ci.yml)
[![Security](https://img.shields.io/badge/security-view%20alerts-blue?logo=github)](https://github.com/ironlantern-io/boilerplate-electron/security)

A reusable Electron starter template with [electron-vite](https://electron-vite.org/) and [electron-builder](https://www.electron.build/).

## Stack

- **Electron 41** — Chromium 146, Node.js 24
- **electron-vite** — Fast dev server with HMR
- **electron-builder** — Cross-platform binary packaging
- **TypeScript** — Full type safety across all processes
- **Vitest** — Unit testing (Node + jsdom environments)
- **Playwright** — End-to-end testing with Electron support

## Project Structure

```
src/
├── main/           Main process (app lifecycle, window management)
├── preload/        Preload scripts (secure IPC bridge via contextBridge)
└── renderer/       Renderer process (web UI)
    └── src/
tests/
├── unit/           Vitest unit tests (.main.test.ts / .renderer.test.ts)
└── e2e/            Playwright end-to-end tests
```

## Getting Started

```bash
npm install
npm run dev
```

## Scripts

| Command | Description |
|---|---|
| `npm run dev` | Start dev server with hot reload |
| `npm run build` | Build for production |
| `npm run package` | Build + package for current platform |
| `npm run package:mac` | Package for macOS (dmg + zip) |
| `npm run package:win` | Package for Windows (nsis) |
| `npm run package:linux` | Package for Linux (AppImage + deb) |
| `npm run test` | Run unit tests |
| `npm run test:coverage` | Run unit tests with coverage report |
| `npm run test:watch` | Run unit tests in watch mode |
| `npm run test:e2e` | Build + run end-to-end tests |

Packaged binaries are output to the `dist/` directory.

## Testing

Unit tests use [Vitest](https://vitest.dev/) with two project environments:
- `*.main.test.ts` — Node environment for main/preload process logic
- `*.renderer.test.ts` — jsdom environment for renderer/DOM logic

E2E tests use [Playwright](https://playwright.dev/docs/api/class-electron) to launch the full Electron app and test real user interactions, window management, and security settings.

## CI

GitHub Actions runs on every push and PR to `main` across **Ubuntu, macOS, and Windows**:

- Build verification
- Unit tests (all platforms)
- Coverage report (Ubuntu, uploaded as artifact)
- E2E tests (all platforms)

## Adding IPC Communication

1. Register a handler in `src/main/index.ts`:
   ```ts
   ipcMain.handle('my-channel', async (_event, arg) => {
     return `Hello from main: ${arg}`
   })
   ```

2. Expose it in `src/preload/index.ts`:
   ```ts
   const api = {
     myChannel: (arg: string) => ipcRenderer.invoke('my-channel', arg)
   }
   ```

3. Call from the renderer:
   ```ts
   const result = await window.api.myChannel('world')
   ```

## Security

Enabled by default:

- **Context isolation** — renderer cannot access Node.js APIs
- **Sandbox** — OS-level process sandboxing
- **Node integration disabled** — no `require()` in renderer
- **Content Security Policy** — restricts script/style sources
- **External links** — opened in system browser, not in-app
