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
    this.lineElement.setAttribute("stroke", "Yellow");
  }

  deselect() {
    this.lineElement.setAttribute("stroke", "White");
  }

  focus() {
    this.resizers.forEach((resizer) => resizer.reveal());
  }

  unfocus() {
    this.resizers.forEach((resizer) => resizer.hide());
  }

  move(dx, dy) {
    this.setPosition(this.x1 + dx, this.y1 + dy, this.x2 + dx, this.y2 + dy);
    this._moveResizers(dx, dy);
  }

  resize(resizerIndex, dx, dy) {
    const selectedResizer = this.resizers[resizerIndex];
    selectedResizer.move(dx, dy);
    resizerIndex == 0 ? this._movePoint1(dx, dy) : this._movePoint2(dx, dy);
  }

  setPosition(x1, y1, x2, y2) {
    this._setPoint1Position(x1, y1);
    this._setPoint2Position(x2, y2);
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
      .setAttribute("onmousedown", "handleObjectMouseDown(event)");
    this.addElement(this.lineElement);

    this._drawResizers();
  }

  _drawResizers() {
    this.resizers = [];

    const resizer0 = this._createResizer(0, this.x1, this.y1);
    this.addElement(resizer0);
    this.resizers.push(resizer0);
    const resizer1 = this._createResizer(1, this.x2, this.y2);
    this.addElement(resizer1);
    this.resizers.push(resizer1);
  }

  _createResizer(index, x, y) {
    return new Resizer(this.id, index, x, y);
  }

  _moveResizers(dx, dy) {
    this.resizers.forEach((resizer) => resizer.move(dx, dy));
  }

  _movePoint1(dx, dy) {
    this._setPoint1Position(this.x1 + dx, this.y1 + dy);
  }

  _movePoint2(dx, dy) {
    this._setPoint2Position(this.x2 + dx, this.y2 + dy);
  }

  _setPoint1Position(x, y) {
    [this.x1, this.y1] = [x, y];
    this.lineElement.setAttribute("x1", x).setAttribute("y1", y);
  }

  _setPoint2Position(x, y) {
    [this.x2, this.y2] = [x, y];
    this.lineElement.setAttribute("x2", x).setAttribute("y2", y);
  }
}
