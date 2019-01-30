const { BrowserWindow } = require('electron');
const path = require('path');

const createView = (evt, data) => {
  const mainWindow = data.mainWindow;
  const { url, height, width, x, y } = data.params;
  console.log(data.params)
  let view = new BrowserWindow({
    x: x + 365,
    y: y + 60,
    width,
    height,
    parent: mainWindow,
    movable: false,
    frame: false,
    show: false,
    resizable: false,
    minimizable: false,
    hasShadow: false
  });

  view.loadURL(url);
  view.once('ready-to-show', () => view.show());
  view.on('focus', () => {});
  return view;
}

 module.exports = createView;
