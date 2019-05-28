const { dialog, app, ipcMain } = require('electron');
const fs = require('fs');
const path = require('path');

const exportSettingsDialog = (mainWindow, settings) => {
  console.log("ASSAS")
  const options = {
    defaultPath: path.join(app.getPath('downloads'), 'settings.json'),
  }
  dialog.showSaveDialog(null, options, (filename) => {
    if ( filename ) {
      const memInfo = settings;
      fs.writeFile( filename, memInfo, 'utf-8', (err) => {
        if ( err ) {
          dialog.showErrorBox('Save Failed', err );
        }
      })
    }
  });
}

const importSettingsDialog = (mainWindow, addSizeBunch) => {
  const options = {
    defaultPath: path.join(app.getPath('downloads')),
    filters: [
      { name: 'JSON Files', extensions: ['json'] },
    ]
  }

  dialog.showOpenDialog(null, options, (filepaths) => {
    if( filepaths ) {
      // console.log(filepaths, fs.readFileSync(filepaths[0], 'utf8'))
      return fs.readFileSync(filepaths[0], 'utf8');
    }
  })
}

module.exports =  {
  exportSettingsDialog,
  importSettingsDialog
};


