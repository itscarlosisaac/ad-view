import { openDb, deleteDb } from 'idb';
import { sizeAPI } from './size.api';
import { paramAPI } from './param.api';
import { optionsAPI } from './options.api';
import { historyAPI } from './history.api';

// deleteDb('app-store');
let dbName = 'prod-store';


// Keep a reference for dev mode
let dev = false

if (process.defaultApp ||
  /[\\/]electron-prebuilt[\\/]/.test(process.execPath) ||
  /[\\/]electron[\\/]/.test(process.execPath)) {
  dev = true;
  dbName = 'app-store';
}

export const StorePromise = openDb(dbName, 1, upgradeDB => {
  upgradeDB.createObjectStore('size', { keyPath: 'id' });
  upgradeDB.createObjectStore('params', { keyPath: 'id' });
  upgradeDB.createObjectStore('history', { keyPath: 'id' });
  upgradeDB.createObjectStore('options', { keyPath: 'id' });
});

const store = Object.assign({
  store: StorePromise
}, sizeAPI, paramAPI, optionsAPI, historyAPI )

export default store;
