class Component {
  constructor() {
    console.log("Creating new", this.getClassName());
    this.elements = [];
    this.resizers = [];
  }

  draw() {}

  addElement(element) {
    this.elements.push(element);
    return this;
  }

  addResizer(resizer) {
    this.addElement(resizer);
    this.resizers.push(resizer);
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

  focus() {
    console.log("focus is not implemented for class", this.getClassName());
  }

  unfocus() {
    console.log("unfocus is not implemented for class", this.getClassName());
  }

  move() {
    console.log("move is not implemented for class", this.getClassName());
  }

  moveResizers(dx, dy) {
    this.resizers.forEach((resizer) => resizer.move(dx, dy));
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
