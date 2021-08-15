class TextBox extends Component {
  constructor(text) {
    super();
    this.id = nextObjectId++;
    this.x = Math.floor(window.innerWidth / 2);
    this.y = Math.floor(window.innerHeight / 2);
    this.text = text;

    this._draw();
  }

  updateText(key) {
    this.text += key;
    this.textElement.setTextContent(this.text);
  }

  backspaceText() {
    if (this.text.length > 0) {
      this.text = this.text.slice(0, -1);
      this.textElement.setTextContent(this.text);
    }
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
    this.textElement = SVG.new("text")
      .setAttribute("id", `${this.id}`)
      .setAttribute("dominant-baseline", "middle")
      .setAttribute("text-anchor", "middle")
      .setAttribute("x", this.x)
      .setAttribute("y", this.y)
      .setAttribute("font-size", 30)
      .setAttribute("fill", "White")
      .setAttribute("style", "font-family: 'Courier New', monospace")
      .setAttribute("onmousedown", "handleObjectMouseDown(event)")
      .setTextContent(this.text);
    this.addElement(this.textElement);
  }
}
