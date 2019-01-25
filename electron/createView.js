const { BrowserView } = require('electron');
const path = require('path');

const createView = (evt, data) => {
  const win = data.mainWindow;
  const { url, height, width } = data.params;
  let view = new BrowserView({
    webPreferences: {
      nodeIntegration: false
    }
  });

  win.setBrowserView(view)
  view.webContents.loadURL(url);
  view.once('ready-to-show', () => view.show());
  view.setBounds({ x: 100, y: 100, width, height })
  view.on('focus', () => { });
  return view;
}

 module.exports = createView;