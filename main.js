'use strict'

// Import parts of electron to use
const { app, BrowserWindow, ipcMain, dialog } = require('electron')
const path = require('path');
const fs = require('fs');
const url = require('url')
const { exportSettingsDialog } = require('./electron/Dialog');
const { createTestingWindow } = require("./electron/TestingTool");

const createAppMenu = require('./electron/Menu');
// const Emitter = require('./src/emitter/emitter');

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let mainWindow;
let indexPath;
// Keep a reference for dev mode
let dev = false

if (process.defaultApp || /[\\/]electron-prebuilt[\\/]/.test(process.execPath) || /[\\/]electron[\\/]/.test(process.execPath)) {
  dev = true
}

// Temporary fix broken high-dpi scale factor on Windows (125% scaling)
// info: https://github.com/electron/electron/issues/9691
if (process.platform === 'win32') {
  app.commandLine.appendSwitch('high-dpi-support', 'true')
  app.commandLine.appendSwitch('force-device-scale-factor', '1')
}

function createWindow() {
  // Create the browser window.
  mainWindow = new BrowserWindow({
    width: 1024,
    height: 768,
    minWidth: 1024,
    minHeight: 768,
    show: false
  });

  // and load the index.html of the app.


  if (dev && process.argv.indexOf('--noDevServer') === -1) {
    indexPath = url.format({
      protocol: 'http:',
      host: 'localhost:8080',
      pathname: 'index.html',
      slashes: true
    })
  } else {
    indexPath = url.format({
      protocol: 'file:',
      pathname: path.join(__dirname, 'dist', 'index.html'),
      slashes: true
    })
  }


  mainWindow.loadURL(indexPath)

  // Don't show until we are ready and loaded`
  mainWindow.once('ready-to-show', () => {
    mainWindow.show()

    // Emitter.ShortcutEmitter.on('open-devtools', () => {
    //   mainWindow.webContents.openDevTools({ mode: 'detach' })
    // });

    createAppMenu(mainWindow, indexPath);

    // Open the DevTools automatically if developing
    if (dev) {
      mainWindow.webContents.openDevTools()
    }
  })

  // Emitted when the window is closed.
  mainWindow.on('closed', function() {
    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    mainWindow = null
  })

  mainWindow.on('resize', function(e) {
    e.sender.send('resized', e)
  });
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', createWindow)

// Quit when all windows are closed.
app.on('window-all-closed', () => {
  // On macOS it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  // On macOS it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (mainWindow === null) {
    // createWindow()
  }
})

ipcMain.on("export-settings", (mainWindow, settings) => {
  exportSettingsDialog(mainWindow, settings)
})

ipcMain.on("import-settings", () => {
  // importSettingsDialog(mainWindow)
  const options = {
    defaultPath: path.join(app.getPath('downloads')),
    filters: [
      { name: 'JSON Files', extensions: ['json'] },
    ]
  }

  const file = dialog.showOpenDialog(mainWindow, options)
  if( file ) {
    const content = fs.readFileSync(file[0]).toString();
    mainWindow.send('open-file', file[0], content);
  }
})
