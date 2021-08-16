class Rectangle extends Component {
  constructor(x, y) {
    super();
    this.id = nextObjectId++;
    this.width = 200;
    this.height = 100;
    [this.x, this.y] = [x - this.width / 2, y - this.height / 2];

    this._draw();
  }

  select() {
    this.rectElement.setAttribute("stroke", "Yellow")
  }

  deselect() {
    this.rectElement.setAttribute("stroke", "White")
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
      .setAttribute("x", this.x)
      .setAttribute("y", this.y)
      .setAttribute("width", this.width)
      .setAttribute("height", this.height)
      .setAttribute("stroke", "Yellow")
      .setAttribute("stroke-width", 5)
      .setAttribute("onmousedown", "handleObjectMouseDown(event)")
    this.addElement(this.rectElement);
  }
}
