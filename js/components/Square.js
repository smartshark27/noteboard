class Square extends Component {
  constructor(x, y) {
    super();
    this.id = nextObjectId++;
    this.size = 150;
    [this.x, this.y] = [x - this.size / 2, y - this.size / 2];

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
      .setAttribute("width", this.size)
      .setAttribute("height", this.size)
      .setAttribute("fill-opacity", 0)
      .setAttribute("stroke", "Yellow")
      .setAttribute("stroke-width", 5)
      .setAttribute("onmousedown", "handleObjectMouseDown(event)")
    this.addElement(this.rectElement);
  }
}
