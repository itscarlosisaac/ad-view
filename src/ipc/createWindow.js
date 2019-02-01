import { BrowserWindow, remote, ipcRenderer } from 'electron';
import Emitter from '../emitter/emitter';

const offsetY = 60;
const offsetX = 365;

const createWindow = (url, width, height, x, y) => {
  ipcRenderer.send('create-screen', {url, width, height, x, y})
}

Emitter.layoutEmitter.on('new-layout', (e) => {
  // console.log(e)
  // console.log(remote.BrowserWindow.getAllWindows())
})

// ipcRenderer.on('resized', (e, args) => {
  // console.log(remote.BrowserWindow.getAllWindows())
  // let windows = BrowserWindow.getAllWindows();
// })

export default createWindow;