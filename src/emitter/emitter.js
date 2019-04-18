import { EventEmitter } from 'events';
const appEmitter = new EventEmitter();
const newSizeEmitter = new EventEmitter();
const layoutEmitter = new EventEmitter();
const screenEmitter = new EventEmitter();
const sizeEditableEmitter = new EventEmitter();


export default {
  appEmitter,
  layoutEmitter,
  newSizeEmitter,
  screenEmitter,
  sizeEditableEmitter,
}
