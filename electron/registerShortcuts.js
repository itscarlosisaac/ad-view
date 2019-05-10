
const { remote } = require('electron');
const globalShortcut = remote.globalShortcut;
const ShortcutEmitter = require('../src/emitter/emitter');

globalShortcut.register('CommandOrControl+Enter',  () => {
  console.log("HELLO CH");
  ShortcutEmitter.default.ShortcutEmitter.emit('create-views')
});


globalShortcut.register('CommandOrControl+Shift+R',  () => {
  ShortcutEmitter.default.ShortcutEmitter.emit('reload-views')
});
