import { StorePromise } from './store'

export const optionsAPI = {
  async getAllOptions(){
    const db = await StorePromise;
    const tx = db.transaction('options', 'readonly');
    const store = tx.objectStore('options')
    return store.getAll();
  },
  async setOptions(option){
    const db = await StorePromise;
    const tx = db.transaction('options', 'readwrite');
    tx.objectStore('options').add(option);
    return tx.complete;
  },
  async updateOption(option){
    const db = await StorePromise;
    const tx = db.transaction('options', 'readwrite');
    tx.objectStore('options').put(option);
    return tx.complete;
  }
}