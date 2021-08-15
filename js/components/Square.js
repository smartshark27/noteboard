class Square extends Component {
  constructor(x, y) {
    super();
    console.log("Creating new square at (", x, ", ", y, ")");
    this.id = nextObjectId++;
    [this.x, this.y] = [x, y];
    this.size = 50;

    this._draw();
  }

  select() {
    this.rectElement.setAttribute("fill", "Yellow")
  }

  deselect() {
    this.rectElement.setAttribute("fill", "White")
  }
  
  updateBasedOnKey(key) {
    console.log("Cannot update square using keys");
  }

  backspace() {
    console.log("Deleting square");
    this.rectElement.remove();
  }

  move(dx, dy) {
    this.setPosition(this.x + dx, this.y + dy);
  }

  setPosition(x, y) {
    this.elements.forEach(element => {
      [this.x, this.y] = [x, y];
      element.setAttribute("x", x).setAttribute("y", y);
    });
  }

  _draw() {
    this.rectElement = SVG.new("rect")
      .setAttribute("id", `${this.id}`)
      .setAttribute("x", this.x - this.size / 2)
      .setAttribute("y", this.y - this.size / 2)
      .setAttribute("width", this.size)
      .setAttribute("height", this.size)
      .setAttribute("fill", "Yellow")
      .setAttribute("onmousedown", "handleObjectMouseDown(event)")
    this.addElement(this.rectElement);
  }
}
