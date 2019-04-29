import {StorePromise} from './store'

export const historyAPI = {
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
  }
}