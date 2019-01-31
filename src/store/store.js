import { openDb } from 'idb';

const StorePromise = openDb('layout-store', 1, upgradeDB => {
  upgradeDB.createObjectStore('layout', { keyPath: 'id' });
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
  async getAll(){
    const db = await StorePromise;
    const tx = db.transaction('layout', 'readonly');
    const store = tx.objectStore('layout')
    return store.getAll();
    return []
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
}

// const Store = {
//   store: window.localStorage,
//   addSize(w,h) {
//     this.store.setItem(`size-${w}x${h}`, JSON.stringify({w,h}))
//   },
//   getSize() {
//     const keys = Object.keys(this.store);
//     const store = this.store
//     const items = keys.map(k =>  store.getItem(k))
//     console.log(
//       items
//       // this.store,
//       // Object.keys(this.store).map(k => this.store.getItem(k))
//     )
//     // Object.keys(this.store).map( k => JSON.parse(this.store.getItem(k)))
//   }
// }
// export default Store;