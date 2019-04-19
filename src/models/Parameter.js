
export default class Parameter {
  constructor(id, name, value, state){
    this.id = id;
    this.name = name;
    this.value = value;
    this.state = state;
    this.createdAt = new Date();
  }

  getParameter() {
    return {
      name: this.name,
      value: this.value
    }
  }

  getId() {
    return this.id;
  }

  getState() {
    return this.state;
  }

  toggleState() {
    this.state = !this.state;
  }
}