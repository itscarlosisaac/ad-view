import { BrowserWindow, remote, ipcRenderer } from 'electron';

const createWindow = (url, width, height, x, y) => {
  ipcRenderer.send('create-screen', {url, width, height, x, y})
}

ipcRenderer.on('resized', (e, args) => {
  // let windows = BrowserWindow.getAllWindows();
  console.log(windows);
})

export default createWindow;