import {StorePromise} from './store'

export const sizeAPI = {
  async getAllSizes(){
    const db = await StorePromise;
    const tx = db.transaction('size', 'readonly');
    const store = tx.objectStore('size')
    return store.getAll();
  },
  async setSize(val){
    const db = await StorePromise;
    const tx = db.transaction('size', 'readwrite');
    tx.objectStore('size').add(val);
    return tx.complete
  },
  async addSizeBunch(arr){
    const db = await StorePromise;
    const tx = db.transaction('size', 'readwrite');
    arr.map(item => tx.objectStore('size').add(item));
    return tx.complete;
  },
  async updateSizeBunch(arr){
    const db = await StorePromise;
    const tx = db.transaction('size', 'readwrite');
    arr.map(item => tx.objectStore('size').put(item));
    return tx.complete;
  },
  async updateSize(val){
    const db = await StorePromise;
    const tx = db.transaction('size', 'readwrite');
    tx.objectStore('size').put(val);
    return tx.complete;
  },
  async delete(id){
    const db = await StorePromise;
    const tx = db.transaction('size', 'readwrite');
    tx.objectStore('size').delete(id)
    return tx.complete;
  },
  async clearSizes() {
    const db = await StorePromise;
    const tx = db.transaction('size', 'readwrite').objectStore('size').clear();
    return tx.complete;
  }
}
