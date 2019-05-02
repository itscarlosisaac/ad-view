import { openDb, deleteDb } from 'idb';
import { sizeAPI } from './size.api';
import { paramAPI } from './param.api';
import { historyAPI } from './history.api';
import { optionsAPI } from './options.api';

deleteDb('app-store');

export const StorePromise = openDb('app-store', 1, upgradeDB => {
  upgradeDB.createObjectStore('size', { keyPath: 'id' });
  upgradeDB.createObjectStore('params', { keyPath: 'id' });
  upgradeDB.createObjectStore('history', { keyPath: 'id' });
  upgradeDB.createObjectStore('options', { keyPath: 'id' });
});

export default {
  store: StorePromise,
  ...sizeAPI,
  ...paramAPI,
  ...historyAPI,
  ...optionsAPI
}