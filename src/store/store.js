import { openDb } from 'idb';

const StorePromise = openDb('app-store', 1, upgradeDB => {
  upgradeDB.createObjectStore('layout', { keyPath: 'id' });
  upgradeDB.createObjectStore('params', { keyPath: 'id' });
  upgradeDB.createObjectStore('history',{ keyPath: 'id' });
});

export default {
  store: StorePromise,
  async set(val){
    const db = await StorePromise;
    const tx = db.transaction('layout', 'readwrite');
    tx.objectStore('layout').add(val);
    return tx.complete
  },
  async updateSize(val){
    const db = await StorePromise;
    const tx = db.transaction('layout', 'readwrite');
    tx.objectStore('layout').put(val);
    return tx.complete;
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
    db.transaction('params', 'readwrite').objectStore('params').clear();
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
    tx.objectStore('params').add(val);
    return tx.complete
  },
  async updateParam(val){
    const db = await StorePromise;
    const tx = db.transaction('params', 'readwrite');
    tx.objectStore('params').put(val);
    return tx.complete;
  },
  async deleteParam(id){
    const db = await StorePromise;
    const tx = db.transaction('params', 'readwrite');
    const store = tx.objectStore('params')
    store.delete(id)
    return tx.complete;
  },

  // History
  async getAllHistory(){
    const db = await StorePromise;
    const tx = db.transaction('history', 'readonly');
    const store = tx.objectStore('history');
    return store.getAll();
  },
  async addHistory(val){
    const db = await StorePromise;
    console.log(val, db)
    const tx = db.transaction('history', 'readwrite');
    tx.objectStore('history').add(val);
    return tx.complete
  },
}