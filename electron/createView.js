const {
  app,
  BrowserWindow
} = require('electron');
const path = require('path');

const createView = (params) => {
  const { url, height, width } = params;
  let newWindow = new BrowserWindow({
    x:10,
    y:10,
    width,
    height,
    resizable: false,
    maximizable: false,
    // show: false
  });
  
  newWindow.loadURL(url);
  newWindow.once('ready-to-show', () => newWindow.show());
  // newWindow.webContents.on('did-finish-load', () => {
  //   newWindow.setTitle(name)
  // })
  // newWindow.on('focus', () => {
  //   // windows.forEach(w => w.show() );
  // });
  // return newWindow;
}

 module.exports = createView;