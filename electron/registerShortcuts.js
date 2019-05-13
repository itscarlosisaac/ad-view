
const { remote } = require('electron');
const globalShortcut = remote.globalShortcut;
const ShortcutEmitter = require('../src/emitter/emitter');

globalShortcut.register('CommandOrControl+Enter',  () => {
  ShortcutEmitter.default.ShortcutEmitter.emit('create-views')
});

globalShortcut.register('CommandOrControl+Shift+R',  () => {
  ShortcutEmitter.default.ShortcutEmitter.emit('reload-views')
});

globalShortcut.register('CommandOrControl+1',  () => {
  ShortcutEmitter.default.ShortcutEmitter.emit('show-sizes')
});

globalShortcut.register('CommandOrControl+2',  () => {
  ShortcutEmitter.default.ShortcutEmitter.emit('show-params')
});

globalShortcut.register('CommandOrControl+3',  () => {
  ShortcutEmitter.default.ShortcutEmitter.emit('show-settings')
});

globalShortcut.register('CommandOrControl+D',  (e) => {
  remote.getCurrentWindow().toggleDevTools();
});

