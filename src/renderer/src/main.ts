import './styles.css'

const app = document.getElementById('app')!

app.innerHTML = `
  <div class="container">
    <h1>Electron Boilerplate</h1>
    <p>Built with electron-vite &amp; TypeScript</p>
    <p class="versions">
      Electron v${window.electron.process.versions.electron} |
      Chromium v${window.electron.process.versions.chrome} |
      Node v${window.electron.process.versions.node}
    </p>
  </div>
`
