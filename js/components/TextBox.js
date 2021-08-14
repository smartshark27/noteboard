class TextBox extends Component {
  constructor(text) {
    super();
    this.id = nextObjectId++;
    this.text = text;

    const x = Math.floor(window.innerWidth / 2);
    const y = Math.floor(window.innerHeight / 2);
    this._draw(x, y);
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

  move(x, y) {
    console.log("Moving object")
    this.elements.forEach(element => {
      element.setAttribute("x", x);
      element.setAttribute("y", y);
    });
  }

  _draw(x, y) {
    this.textElement = SVG.new("text")
      .setAttribute("id", `${this.id}`)
      .setAttribute("dominant-baseline", "middle")
      .setAttribute("text-anchor", "middle")
      .setAttribute("x", x)
      .setAttribute("y", y)
      .setAttribute("font-size", 30)
      .setAttribute("fill", "White")
      .setAttribute("style", "font-family: 'Courier New', monospace")
      .setAttribute("onmousedown", "handleObjectMouseDown(event)")
      .setTextContent(this.text);
    this.addElement(this.textElement);
  }
}
