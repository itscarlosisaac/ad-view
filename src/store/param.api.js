import {StorePromise} from './store'

export const paramAPI = {
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
  async clear() {
    const db = await StorePromise;
    const tx = db.transaction('params', 'readwrite').objectStore('params').clear();
    return tx.complete;
  }
}