const { dialog, app } = require('electron');
const fs = require('fs');
const path = require('path');
const { ElectronEmitters } = require('./ElectronEmitters');

const exportSettingsDialog = (mainWindow, settings) => {
  const options = {
    defaultPath: path.join(app.getPath('downloads'), 'settings.json'),
  }
  dialog.showSaveDialog(null, options, (filename) => {
    if ( filename ) {
      fs.writeFile( filename, settings, 'utf-8', (err) => {
        if ( err ) {
          dialog.showErrorBox('Save Failed', err );
        }
      })
    }
  });
}

const importSettingsDialog = (mainWindow) => {
  const options = {
    defaultPath: path.join(app.getPath('downloads')),
    filters: [
      { name: 'JSON Files', extensions: ['json'] },
    ]
  }

  const file = dialog.showOpenDialog(mainWindow, options)
  if( file ) {
    const content = fs.readFileSync(file[0]).toString();
    mainWindow.send('open-file', file[0], content);
  }
}

module.exports =  {
  exportSettingsDialog,
  importSettingsDialog
};


