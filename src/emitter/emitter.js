import { EventEmitter } from 'events';
const newSizeEmitter = new EventEmitter();
const layoutEmitter = new EventEmitter();
const screenEmitter = new EventEmitter();
const sizeEditableEmitter = new EventEmitter();

export default {
  layoutEmitter,
  newSizeEmitter,
  screenEmitter,
  sizeEditableEmitter,
}
