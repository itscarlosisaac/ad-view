import { BrowserWindow, remote, ipcRenderer } from 'electron';
import Emitter from '../emitter/emitter';

const offsetY = 60;
const offsetX = 365;
let screens = [];
let mainScreen;
let views;
let viewsCreated = false;

const createWindow = (url, width, height, x, y) => {
  ipcRenderer.send('create-screen', {url, width, height, x, y});
  screens = remote.BrowserWindow.getAllWindows();
  mainScreen = screens.filter(w => w.id === 1)[0];
  views = screens.filter(w => w.id !== 1);
  // mainScreen.getChildWindows().map(w => w.destroy() )
  viewsCreated = true;
}

Emitter.layoutEmitter.on('new-layout', (e) => {
  e.forEach(element => {
    const {x,y,w,h} = getPosition(element);

    if( viewsCreated ){
      const view = views.filter(view => view.name === `${w}x${h}` );
      console.log(view)
      view[0].setPosition( Number(x + offsetX), Number(y + offsetY), true)
    }
  });
});

const getPosition = (e) => {
  return {
    w: Number(e.style.width.replace('px', '')),
    h: Number(e.style.height.replace('px', '')),
    x: Number(e.style.left.replace('px', '')),
    y: Number(e.style.top.replace('px', '')),
  }
}

// ipcRenderer.on('resized', (e, args) => {
  // console.log(remote.BrowserWindow.getAllWindows())
  // let windows = BrowserWindow.getAllWindows();
// })

export default createWindow;