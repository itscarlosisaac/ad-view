const {
  app,
  BrowserWindow,
  Menu,
  shell,
  dialog
} = require('electron');

const createAppMenu = () => {
  const template = [{
    label: 'File',
    submenu: [{
      label: 'Quit',
      accelerator: 'CommandOrControl+Q',
      click() {
        app.quit();
      }
    }]
  }];

  if (process.platform === 'darwin') {
    const name = 'Ad Viewer';
    template.unshift({
      label: name,
      submenu: [{
          label: `About ${name}`,
          role: 'about'
        },
        {
          type: 'separator'
        },
        {
          label: `Services`,
          role: 'services',
          submenu: []
        },
        {
          type: 'separator'
        },
        {
          label: `Hide ${name}`,
          accelerator: 'Command+H',
          role: 'hide'
        },
        {
          label: `Hide Others`,
          accelerator: 'Command+Alt+H',
          role: 'hideothers'
        },
        {
          label: `Show All`,
          accelerator: 'Command+Control+H',
          role: 'unhide'
        },
        {
          type: 'separator'
        },
        {
          label: `Quit ${name}`,
          accelerator: 'Command+Q',
          click() {
            app.quit();
          }
        },
      ]
    });
  }
  return Menu.setApplicationMenu(Menu.buildFromTemplate(template));
};

module.exports = createAppMenu;
