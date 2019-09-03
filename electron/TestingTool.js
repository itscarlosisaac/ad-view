const {  BrowserWindow } = require('electron');

let view = null;
// Keep a reference for dev mode
let dev = false

if (process.defaultApp || /[\\/]electron-prebuilt[\\/]/.test(process.execPath) || /[\\/]electron[\\/]/.test(process.execPath)) {
  dev = true
}


const createTestingWindow = (mainWindow, path) => {
  if ( view == null ){
    view = new BrowserWindow({
      width: 600,
      height: 600,
      hasShadow: true,
      show: false,
    })

    view.once('ready-to-show', () => {
      view.show();
    })
    view.on('closed', () => {
      view = null;
    })
    const url = path + '?testingTool';
    view.loadURL(url)

    if (dev) {
      view.webContents.openDevTools()
      console.log("URL: " + url)
    }
  }
}

module.exports = {
  createTestingWindow
}
