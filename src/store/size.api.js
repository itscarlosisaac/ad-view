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
  async clear() {
    const db = await StorePromise;
    const tx = db.transaction('size', 'readwrite').objectStore('size').clear();
    db.transaction('params', 'readwrite').objectStore('params').clear();
    return tx.complete;
  }
}