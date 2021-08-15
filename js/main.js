const objects = [];

let selected = [];
let mouseDown = false;
let multiSelectKeyPressedDown = false;
let nextObjectId = 0;
let lastMouseX, lastMouseY;

function handleLoad() {
  console.log("Welcome to Noteboard");
}

window.addEventListener("keypress", (event) => {
  const key = event.key;
  console.log(`${key} was pressed`);

  if (selected.length === 0) {
    const textBox = new TextBox(key);
    selected.push(textBox);
    objects.push(textBox);
  } else if (selected.length === 1) {
    const object = selected[0];

    if (key === "Enter" && object.text === "\\square") {
      const newObject = new Square(object.x, object.y);
      objects.push(newObject);
      clearArray(selected);
      object.remove();
      selected.push(newObject);
    } else {
      object.updateBasedOnKey(key);
    }
  }
});

window.addEventListener("keydown", (event) => {
  const key = event.key;
  if (isBackspace(key) && selected.length == 1) {
    console.log(`${key} was pressed down`);
    const object = selected[0];
    object.backspace();
    if (object.constructor.name == Square.name) {
      clearArray(selected);
    }
  } else if (isMultiSelectKey(key)) {
    console.log(`${key} was pressed down`);
    multiSelectKeyPressedDown = true;
  }
});

window.addEventListener("keyup", (event) => {
  const key = event.key;
  if (isMultiSelectKey(key)) {
    console.log(`${event.key} was lifted`);
    multiSelectKeyPressedDown = false;
  }
});

function handleClick() {
  deselect();
}

function handleObjectMouseDown(event) {
  const id = event.target.id;
  console.log(`Object ${id} has been selected`);
  const object = getObject(id);

  if (!multiSelectKeyPressedDown && !selected.includes(object)) {
    deselect();
  }

  if (multiSelectKeyPressedDown && selected.includes(object)) {
    selected = selected.filter(o => {
      return o != object;
    });
    object.deselect();
  } else if (!selected.includes(object)) {
    object.select();
    selected.push(object);
  }

  [lastMouseX, lastMouseY] = [event.offsetX, event.offsetY];
  mouseDown = true;
}

function handleMouseMove(event) {
  if (selected && mouseDown) {
    selected.forEach(object => {
      object.move(event.offsetX - lastMouseX, event.offsetY - lastMouseY);
    });
    [lastMouseX, lastMouseY] = [event.offsetX, event.offsetY];
  }
}

function handleMouseUp() {
  console.log("Mouse up");
  mouseDown = false;
}

function getObject(id) {
  return objects[id];
}

function deselect() {
  console.log("Deselected");
  selected.forEach(object => {
    object.deselect();
  })
  clearArray(selected);
}

function isBackspace(key) {
  return key === "Backspace" || key === "Delete";
}

function isMultiSelectKey(key) {
  return ["Shift", "Control", "Meta"].includes(key);
}
