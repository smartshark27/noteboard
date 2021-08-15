class Component {
  constructor() {
    console.log("Creating new", this.getClassName());
    this.elements = [];
  }

  draw() {}

  addElement(element) {
    this.elements.push(element);
    return this;
  }

  remove() {
    this.elements.forEach((element) => element.remove());
    clearArray(this.elements);
  }

  select() {
    console.log("select is not implemented for class", this.getClassName());
  }

  deselect() {
    console.log("deselect is not implemented for class", this.getClassName());
  }

  move() {
    console.log("move is not implemented for class", this.getClassName());
  }

  setPosition() {
    console.log("setPosition is not implemented for class", this.getClassName());
  }

  updateBasedOnKey() {
    console.log("updateBasedOnKey is not implemented for class", this.getClassName());
  }

  backspace() {
    this.remove();
  }

  getClassName() {
    return this.constructor.name;
  }

  isTextBox() {
    return false;
  }
}
