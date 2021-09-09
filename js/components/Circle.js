class Circle extends Component {
  constructor(x, y) {
    super();
    this.id = nextObjectId++;
    this.radius = 75;
    [this.x, this.y] = [x, y];

    this._draw();
  }

  select() {
    this.circleElement.setAttribute("stroke", "Yellow");
  }

  deselect() {
    this.circleElement.setAttribute("stroke", "White");
  }

  focus() {
    this.resizers[0].reveal();
  }

  unfocus() {
    this.resizers[0].hide();
  }

  move(dx, dy) {
    this.setPosition(this.x + dx, this.y + dy);
    this.moveResizers(dx, dy);
  }

  resize(resizerIndex, dx, dy) {
    const selectedResizer = this.resizers[resizerIndex];
    selectedResizer.move(dx, dy);
    this.setRadius(
      getDistanceBetween(this.x, this.y, selectedResizer.x, selectedResizer.y)
    );
  }

  setPosition(x, y) {
    [this.x, this.y] = [x, y];
    this.circleElement.setAttribute("cx", x).setAttribute("cy", y);
  }

  setRadius(radius) {
    this.radius = radius;
    this.circleElement.setAttribute("r", radius);
  }

  _draw() {
    this.circleElement = SVG.new("circle")
      .setAttribute("id", `${this.id}`)
      .setAttribute("cx", this.x)
      .setAttribute("cy", this.y)
      .setAttribute("r", this.radius)
      .setAttribute("fill-opacity", 0)
      .setAttribute("stroke", "Yellow")
      .setAttribute("stroke-width", LINE_THICKNESS)
      .setAttribute("pointer-events", "stroke")
      .setAttribute("onmousedown", "handleObjectMouseDown(event)");
    this.addElement(this.circleElement);

    this._drawResizer();
  }

  _drawResizer() {
    this.addResizer(new Resizer(this.id, 0, this.x, this.y - this.radius));
  }
}
