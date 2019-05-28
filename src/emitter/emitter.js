import { EventEmitter } from 'events';
const layoutEmitter = new EventEmitter();
const screenEmitter = new EventEmitter();
const ShortcutEmitter = new EventEmitter();
const MainEmitter = new EventEmitter();

export default {
  layoutEmitter,
  screenEmitter,
  ShortcutEmitter,
  MainEmitter
}
