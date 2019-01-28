const { BrowserView } = require('electron');
const path = require('path');

const createView = (evt, data) => {
  const win = data.mainWindow;
  const { url, height, width, x, y } = data.params;
  let view = new BrowserView({
    webPreferences: {
      nodeIntegration: false
    }
  });

  win.setBrowserView(view)

  view.webContents.loadURL(url);
  view.once('ready-to-show', () => view.show());
  view.setBounds({ x: 365, y: 15, width, height })
  view.on('focus', () => { });
  return view;
}

 module.exports = createView;