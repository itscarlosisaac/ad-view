import {StorePromise} from './store'

export const optionsAPI = {
  async getAllOptions(){
    const db = await StorePromise;
    const tx = db.transaction('options', 'readonly');
    const store = tx.objectStore('options')
    return store.getAll();
  }
}