
export default class SizeModel {
  constructor(id, width, height, checked) {
    this.id = id;
    this.width = width;
    this.height = height;
    this.checked = checked;
    this.createdAt = new Date();
    this.updatedAt = new Date();
  }
}