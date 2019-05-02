
export default class Parameter {
  constructor(id, name, value, checked){
    this.id = id;
    this.name = name;
    this.value = value;
    this.checked = checked;
    this.createdAt = new Date();
  }
}