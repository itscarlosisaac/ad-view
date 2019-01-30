import { openDb } from 'idb';

const StorePromise = openDb('size-store', 1, upgradeDB => {
  upgradeDB.createObjectStore('sizes')
});

export default {
  store: StorePromise,
  async get(key){
    const db = await StorePromise;
    return db.transaction('sizes').objectStore('sizes').get(key)
  },
  async set(key, val){
    const db = await StorePromise;
    const tx = db.transaction('sizes', 'readwrite');
    tx.objectStore('sizes').put(val, key);
    return tx.complete
  },
  async getAll(){
    const db = await StorePromise;
    const tx = db.transaction('sizes', 'readonly');
    const store = tx.objectStore('sizes')
    return store.getAll();
  },
  delete(key){}
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