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
    if (isCommandTriggered(key)) {
      handleCommand(object);
    } else {
      object.updateBasedOnKey(key);
    }
  }
});

function isCommandTriggered(key) {
  return key === "Enter";
}

function handleCommand(object) {
  if (!object.isTextBox()) {
    return;
  }

  const command = object.text.toLowerCase();
  console.log("Command is", command);

  switch (command) {
    case "\\circle":
      createCircle(object);
      break;
    case "\\rectangle":
      createRectangle(object);
      break;
    case "\\square":
      createSquare(object);
      break;
    default:
      console.log(command, "is not valid");
  }
}

function createCircle(object) {
  const circle = new Circle(object.x, object.y);
  objects.push(circle);
  clearArray(selected);
  object.remove();
  selected.push(circle);
}

function createRectangle(object) {
  const rect = new Rectangle(object.x, object.y);
  objects.push(rect);
  clearArray(selected);
  object.remove();
  selected.push(rect);
}

function createSquare(object) {
  const square = new Square(object.x, object.y);
  objects.push(square);
  clearArray(selected);
  object.remove();
  selected.push(square);
}

window.addEventListener("keydown", (event) => {
  const key = event.key;
  if (isBackspace(key) && selected.length === 1) {
    console.log(key, "was pressed down");
    const object = selected[0];
    object.backspace();
    if (!object.isTextBox()) {
      clearArray(selected);
    }
  } else if (isMultiSelectKey(key)) {
    console.log(key, "was pressed down");
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
  console.log("Mouse down on object", id);
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
  return ["Backspace", "Delete"].includes(key);
}

function isMultiSelectKey(key) {
  return ["Shift", "Control", "Meta"].includes(key);
}
