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
  async addParamBunch(arr){
    const db = await StorePromise;
    const tx = db.transaction('params', 'readwrite');
    arr.map(item => tx.objectStore('params').add(item));
    return tx.complete;
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
  async clearParams() {
    const db = await StorePromise;
    const tx = db.transaction('params', 'readwrite').objectStore('params').clear();
    return tx.complete;
  }
}
