const {
  app,
  BrowserWindow,
  Menu,
  shell,
  dialog
} = require('electron');

const mainProcess = require('../main');
const { exportSettingsDialog, importSettingsDialog } = require('./Dialog');
const { createTestingWindow } = require('./TestingTool');

const createAppMenu = (mainWindow, indexPath) => {
  const name = 'Ad Viewer';
  const template = [
    {
      label: 'File',
      submenu: [{
        label: `Quit ${name}`,
        accelerator: 'CommandOrControl+Q',
        click() {
          app.quit();
        }
      }]
    },
    {
      label: 'Edit',
      submenu:[
        {
          label: 'Cut',
          accelerator: 'CommandOrControl+X',
          role: 'cut'
        },
        {
          label: 'Copy',
          accelerator: 'CommandOrControl+C',
          role: 'copy'
        },
        {
          label: 'Paste',
          accelerator: 'CommandOrControl+V',
          role: 'paste'
        },
        {
          label: 'Select All',
          accelerator: 'CommandOrControl+A',
          role: 'selectall'
        }
      ]
    },
    {
      label: 'Actions',
      submenu: [
        {
          label: "Make Screens",
          accelerator: 'CommandOrControl+Enter',
          click(){
            mainProcess.createViews();
          }
        },
        {
          label: "Reload Screens",
          accelerator: 'CommandOrControl+Shift+R',
          click(){
            mainProcess.reloadViews();
          }
        },
        {
          label: 'Import Settings',
          click() {
            importSettingsDialog(mainWindow)
          }
        },
        {
          label: 'Export Settings',
          click() {
            exportSettingsDialog(mainWindow)
          }
        },
      ]
    }, {
      label: "Testing",
      submenu: [
        {
          label: "Open Testing Parameter Tool",
          accelerator: "CommandOrControl+T",
          click(){
            createTestingWindow(mainWindow, indexPath);
          }
        }
      ]
    }
  ];

  if (process.platform === 'darwin') {
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
