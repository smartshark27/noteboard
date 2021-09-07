class Circle extends Component {
  constructor(x, y) {
    super();
    this.id = nextObjectId++;
    this.radius = 75;
    [this.x, this.y] = [x, y];

    this._draw();
  }

  select() {
    this.circleElement.setAttribute("stroke", "Yellow")
  }

  deselect() {
    this.circleElement.setAttribute("stroke", "White")
  }

  move(dx, dy) {
    this.setPosition(this.x + dx, this.y + dy);
  }

  setPosition(x, y) {
    this.elements.forEach(element => {
      [this.x, this.y] = [x, y];
      element.setAttribute("cx", x).setAttribute("cy", y);
    });
  }

  _draw() {
    this.circleElement = SVG.new("circle")
      .setAttribute("id", `${this.id}`)
      .setAttribute("cx", this.x)
      .setAttribute("cy", this.y)
      .setAttribute("r", this.radius)
      .setAttribute("fill-opacity", 0)
      .setAttribute("stroke", "Yellow")
      .setAttribute("stroke-width", 5)
      .setAttribute("onmousedown", "handleObjectMouseDown(event)")
    this.addElement(this.circleElement);
  }
}
