let selected;
let mouseDown = false;
const objects = [];
let nextObjectId = 0;

function handleLoad() {
  console.log("Welcome to Noteboard");
}

window.addEventListener("keypress", (event) => {
  const key = event.key;
  console.log(`${key} was pressed`);
  if (selected) {
    selected.updateText(key);
  } else {
    selected = new TextBox(key);
    objects.push(selected);
  }
});

window.addEventListener("keydown", (event) => {
  const key = event.key;
  console.log(`${key} was pressed down`);
  if (isBackspace(key) && selected) {
    selected.backspaceText();
  }
});

function handleClick() {
  deselect();
}

function handleObjectMouseDown(event) {
  const id = event.target.id;
  console.log(`Object ${id} is being held`);
  selected = getObject(id);
  mouseDown = true;
}

function handleMouseMove(event) {
  if (selected && mouseDown) {
    selected.move(event.offsetX, event.offsetY);
  }
}

function handleMouseUp() {
  console.log("Mouse up");
  mouseDown = false;
}

function moveObject() {
  console.log(mouseDown);
  console.log("Moving object");
}

function getObject(id) {
  return objects[id];
}

function deselect() {
  console.log("Deselected");
  selected = null;
}

function isBackspace(key) {
  return key === "Backspace" || key === "Delete";
}