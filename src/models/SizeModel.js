
export default class SizeModel {
  constructor(id, width, height, checked) {
    this.id = id;
    this.width = width;
    this.height = height;
    this.checked = checked;
    this.createdAt = new Date();
    this.updatedAt = new Date();
  }

  // static getSize() {
  //   return {
  //     width: this.width,
  //     height: this.height
  //   }
  // }

  // static getId() {
  //   return this.id;
  // }

  // static getState() {
  //   return this.state;
  // }

  // static toggleState() {
  //   this.state = this.state == 'checked' ? 'unchecked' : 'checked';
  // }
}