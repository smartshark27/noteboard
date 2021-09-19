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
    this.rectElement.setAttribute("stroke", "Yellow");
  }

  deselect() {
    this.rectElement.setAttribute("stroke", "White");
  }

  focus() {
    this.resizers.forEach((resizer) => resizer.reveal());
  }

  unfocus() {
    this.resizers.forEach((resizer) => resizer.hide());
  }

  move(dx, dy) {
    this.setPosition(this.x + dx, this.y + dy);
    this.moveResizers(dx, dy);
  }

  resize(index, dx, dy) {
    switch (index) {
      case 0:
        this._topLeftResize(dx, dy);
        break;
      case 1:
        this._topRightResize(dx, dy);
        break;
      case 2:
        this._bottomLeftResize(dx, dy);
        break;
      case 3:
        this._bottomRightResize(dx, dy);
        break;
      default:
        console.log(`Resizer index ${index} should be less than 4`);
    }
  }

  setPosition(x, y) {
    [this.x, this.y] = [x, y];
    this.rectElement.setAttribute("x", x).setAttribute("y", y);
  }

  _draw() {
    this.rectElement = SVG.new("rect")
      .setAttribute("id", `${this.id}`)
      .setAttribute("x", this.x)
      .setAttribute("y", this.y)
      .setAttribute("width", this.width)
      .setAttribute("height", this.height)
      .setAttribute("fill-opacity", 0)
      .setAttribute("stroke", "Yellow")
      .setAttribute("stroke-width", LINE_THICKNESS)
      .setAttribute("pointer-events", "stroke")
      .setAttribute("onmousedown", "handleObjectMouseDown(event)");
    this.addElement(this.rectElement);

    this._drawResizers();
  }

  _drawResizers() {
    const boundary = this.rectElement.getBoundary();
    this.addResizer(new Resizer(this.id, 0, boundary.left, boundary.top));
    this.addResizer(new Resizer(this.id, 1, boundary.right, boundary.top));
    this.addResizer(new Resizer(this.id, 2, boundary.left, boundary.bottom));
    this.addResizer(new Resizer(this.id, 3, boundary.right, boundary.bottom));
  }

  _topLeftResize(dx, dy) {
    const resizer = this.resizers[0];
    resizer.move(dx, dy);
    if (resizer.x > this.resizers[1].x) {
      resizer.move(-dx, -dy);
      this._topRightResize(dx + (resizer.x - this.resizers[1].x), dy);
      resizerIndex = 1;
    } else if (resizer.y > this.resizers[2].y) {
      resizer.move(-dx, -dy);
      this._bottomLeftResize(dx, dy + (resizer.y - this.resizers[2].y));
      resizerIndex = 2;
    } else {
      this.resizers[1].move(0, dy);
      this.resizers[2].move(dx, 0);
      this.setPosition(this.x + dx, this.y + dy);
      this._setSize(this.width - dx, this.height - dy);
    }
  }

  _topRightResize(dx, dy) {
    const resizer = this.resizers[1];
    resizer.move(dx, dy);
    if (resizer.x < this.resizers[0].x) {
      resizer.move(-dx, -dy);
      this._topLeftResize(dx - (this.resizers[0].x - resizer.x), dy);
      resizerIndex = 0;
    } else if (resizer.y > this.resizers[3].y) {
      resizer.move(-dx, -dy);
      this._bottomRightResize(dx, dy + (resizer.y - this.resizers[3].y));
      resizerIndex = 3;
    } else {
      this.resizers[0].move(0, dy);
      this.resizers[3].move(dx, 0);
      this.setPosition(this.x, this.y + dy);
      this._setSize(this.width + dx, this.height - dy);
    }
  }

  _bottomLeftResize(dx, dy) {
    const resizer = this.resizers[2];
    resizer.move(dx, dy);
    if (resizer.x > this.resizers[3].x) {
      resizer.move(-dx, -dy);
      this._bottomRightResize(dx + (resizer.x - this.resizers[3].x), dy);
      resizerIndex = 3;
    } else if (resizer.y < this.resizers[0].y) {
      resizer.move(-dx, -dy);
      this._topLeftResize(dx, dy - (this.resizers[0].y - resizer.y));
      resizerIndex = 0;
    } else {
      this.resizers[0].move(dx, 0);
      this.resizers[3].move(0, dy);
      this.setPosition(this.x + dx, this.y);
      this._setSize(this.width - dx, this.height + dy);
    }
  }

  _bottomRightResize(dx, dy) {
    const resizer = this.resizers[3];
    resizer.move(dx, dy);
    if (resizer.x < this.resizers[2].x) {
      resizer.move(-dx, -dy);
      this._bottomLeftResize(dx - (this.resizers[2].x - resizer.x), dy);
      resizerIndex = 2;
    } else if (resizer.y < this.resizers[1].y) {
      resizer.move(-dx, -dy);
      this._topRightResize(dx, dy - (this.resizers[1].y - resizer.y));
      resizerIndex = 1;
    } else {
      this.resizers[1].move(dx, 0);
      this.resizers[2].move(0, dy);
      this._setSize(this.width + dx, this.height + dy);
    }
  }

  _setSize(width, height) {
    this.width = width;
    this.height = height;
    this.rectElement
      .setAttribute("width", width)
      .setAttribute("height", height);
  }
}
