# Boilerplate Electron

A reusable Electron starter template with [electron-vite](https://electron-vite.org/) and [electron-builder](https://www.electron.build/).

## Stack

- **Electron 41** — Chromium 146, Node.js 24
- **electron-vite** — Fast dev server with HMR
- **electron-builder** — Cross-platform binary packaging
- **TypeScript** — Full type safety across all processes

## Project Structure

```
src/
├── main/           Main process (app lifecycle, window management)
├── preload/        Preload scripts (secure IPC bridge via contextBridge)
└── renderer/       Renderer process (web UI)
    └── src/
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

Packaged binaries are output to the `dist/` directory.

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
