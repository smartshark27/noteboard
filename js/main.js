let selected = [];
let mouseDown = false;
let nextObjectId = 0;
let lastMouseX, lastMouseY;

const objects = [];

function handleLoad() {
  console.log("Welcome to Noteboard");
}

window.addEventListener("keypress", (event) => {
  const key = event.key;
  console.log(`${key} was pressed`);
  if (selected.length == 0) {
    const textBox = new TextBox(key);
    selected.push(textBox);
    objects.push(textBox);
  } else if (selected.length == 1) {
    selected[0].updateText(key);
  }
});

window.addEventListener("keydown", (event) => {
  const key = event.key;
  console.log(`${key} was pressed down`);
  if (isBackspace(key) && selected.length == 1) {
    selected[0].backspaceText();
  }
});

function handleClick() {
  deselect();
}

function handleObjectMouseDown(event) {
  const id = event.target.id;
  console.log(`Object ${id} is being held`);
  selected = [];
  selected.push(getObject(id));
  [lastMouseX, lastMouseY] = [event.offsetX, event.offsetY];
  mouseDown = true;
}

function handleMouseMove(event) {
  if (selected && mouseDown) {
    selected.forEach(object => {
      object.move(event.offsetX - lastMouseX, event.offsetY - lastMouseY);
      [lastMouseX, lastMouseY] = [event.offsetX, event.offsetY];
    });
  }
}

function handleMouseUp() {
  console.log("Mouse up");
  mouseDown = false;
}

function moveObject() {
  console.log(mouseDown);
}

function getObject(id) {
  return objects[id];
}

function deselect() {
  console.log("Deselected");
  selected = [];
}

function isBackspace(key) {
  return key === "Backspace" || key === "Delete";
}