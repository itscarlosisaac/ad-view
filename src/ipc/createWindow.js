import { BrowserWindow, remote, ipcRenderer } from 'electron';

const createWindow = (url, width, height) => {
  ipcRenderer.send('create-screen', {url, width, height})
}

export default createWindow;