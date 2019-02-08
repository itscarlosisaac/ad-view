import { openDb } from 'idb';

const StorePromise = openDb('layout-store', 1, upgradeDB => {
  upgradeDB.createObjectStore('layout', { keyPath: 'id' });
  upgradeDB.createObjectStore('params', { keyPath: 'id' });
});

export default {
  store: StorePromise,
  async get(key){
    const db = await StorePromise;
    return db.transaction('layout').objectStore('layout').get(key)
  },
  async set(val){
    const db = await StorePromise;
    const tx = db.transaction('layout', 'readwrite');
    tx.objectStore('layout').put(val);
    return tx.complete
  },
  async getAllSizes(){
    const db = await StorePromise;
    const tx = db.transaction('layout', 'readonly');
    const store = tx.objectStore('layout')
    return store.getAll();
  },
  async delete(id){
    const db = await StorePromise;
    const tx = db.transaction('layout', 'readwrite');
    const store = tx.objectStore('layout')
    store.delete(id)
    return tx.complete;
  },
  async clear() {
    const db = await StorePromise;
    const tx = db.transaction('layout', 'readwrite');
    tx.objectStore('layout').clear();
    return tx.complete;
  },
  // Params
  async getAllParams(){
    const db = await StorePromise;
    const tx = db.transaction('params', 'readonly');
    const store = tx.objectStore('params')
    return store.getAll();
  },
  async setParam(val){
    const db = await StorePromise;
    const tx = db.transaction('params', 'readwrite');
    tx.objectStore('params').put(val);
    return tx.complete
  },
  async deleteParam(id){
    const db = await StorePromise;
    const tx = db.transaction('params', 'readwrite');
    const store = tx.objectStore('params')
    store.delete(id)
    return tx.complete;
  },
}