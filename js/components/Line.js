class Line extends Component {
  constructor(x, y) {
    super();
    this.id = nextObjectId++;
    this.length = 200;
    [this.x1, this.y1] = [x - this.length / 2, y];
    [this.x2, this.y2] = [x + this.length / 2, y];

    this._draw();
  }

  select() {
    this.lineElement.setAttribute("stroke", "Yellow")
  }

  deselect() {
    this.lineElement.setAttribute("stroke", "White")
  }

  move(dx, dy) {
    this.setPosition(this.x1 + dx, this.y1 + dy, this.x2 + dx, this.y2 + dy);
  }

  setPosition(x1, y1, x2, y2) {
    [this.x1, this.y1] = [x1, y1];
    [this.x2, this.y2] = [x2, y2];
    this.lineElement
      .setAttribute("x1", x1)
      .setAttribute("y1", y1)
      .setAttribute("x2", x2)
      .setAttribute("y2", y2);
  }

  _draw() {
    this.lineElement = SVG.new("line")
      .setAttribute("id", `${this.id}`)
      .setAttribute("x1", this.x1)
      .setAttribute("y1", this.y1)
      .setAttribute("x2", this.x2)
      .setAttribute("y2", this.y2)
      .setAttribute("stroke", "Yellow")
      .setAttribute("stroke-width", 5)
      .setAttribute("onmousedown", "handleObjectMouseDown(event)")
    this.addElement(this.lineElement);
  }
}
