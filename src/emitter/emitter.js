import { EventEmitter } from 'events';
const newSizeEmitter = new EventEmitter();
const layoutEmitter = new EventEmitter();

export default {
  layoutEmitter,
  newSizeEmitter
}
