class Resizer extends Component {
  constructor(parentId, childId, x, y) {
    super();
    this.id = `${parentId}-resizer-${childId}`;
    this.radius = 5;
    [this.x, this.y] = [x, y];

    this._draw();
  }

  hide() {
    this.circleElement.hide();
  }

  reveal() {
    this.circleElement.reveal();
  }

  move(dx, dy) {
    this.setPosition(this.x + dx, this.y + dy);
  }

  setPosition(x, y) {
    [this.x, this.y] = [x, y];
    this.circleElement.setAttribute("cx", x).setAttribute("cy", y);
  }

  _draw() {
    this.circleElement = SVG.new("circle")
      .setAttribute("id", this.id)
      .setAttribute("cx", this.x)
      .setAttribute("cy", this.y)
      .setAttribute("r", this.radius)
      .setAttribute("fill", "blue")
      .setAttribute("onmousedown", "handleResizerMouseDown(event)")
      .hide();
    this.addElement(this.circleElement);
  }
}
