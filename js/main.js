const objects = [];

let selected = [];
let mouseDown = false;
let resizerMouseDown = false;
let multiSelectKeyPressedDown = false;
let resizerIndex;
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
    case "\\line":
      createLine(object);
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
  circle.focus();
}

function createLine(object) {
  const line = new Line(object.x, object.y);
  objects.push(line);
  clearArray(selected);
  object.remove();
  selected.push(line);
  line.focus();
}

function createRectangle(object) {
  const rectangle = new Rectangle(object.x, object.y);
  objects.push(rectangle);
  clearArray(selected);
  object.remove();
  selected.push(rectangle);
  rectangle.focus();
}

function createSquare(object) {
  const square = new Square(object.x, object.y);
  objects.push(square);
  clearArray(selected);
  object.remove();
  selected.push(square);
  square.focus();
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
  if (!multiSelectKeyPressedDown) {
    deselectAll();
  }
}

function handleObjectMouseDown(event) {
  const id = event.target.id;
  console.log("Mouse down on object", id);
  const object = getObject(id);

  if (!multiSelectKeyPressedDown && !selected.includes(object)) {
    deselectAll();
  }

  if (multiSelectKeyPressedDown && selected.includes(object)) {
    selected = selected.filter((o) => {
      return o != object;
    });
    object.deselect();
  } else if (!selected.includes(object)) {
    object.select();
    console.log(`Focusing on object ${object.id}`);
    object.focus();
    selected.push(object);
    if (selected.length > 1) {
      unfocusAll();
    }
  }

  selected.length == 1 ? selected[0].focus() : unfocusAll();

  [lastMouseX, lastMouseY] = [event.offsetX, event.offsetY];
  mouseDown = true;
}

function handleResizerMouseDown(event) {
  console.log("Resizing selected object");
  resizerIndex = Number(event.target.id.split("-")[2]);
  resizerMouseDown = true;
}

function handleMouseMove(event) {
  const [dx, dy] = [event.offsetX - lastMouseX, event.offsetY - lastMouseY];
  if (resizerMouseDown) {
    resizeSelectedObject(dx, dy);
  } else if (selected && mouseDown) {
    moveSelectedObjects(dx, dy);
  }
  [lastMouseX, lastMouseY] = [event.offsetX, event.offsetY];
}

function resizeSelectedObject(dx, dy) {
  if (selected) {
    selected[0].resize(resizerIndex, dx, dy);
  }
}

function moveSelectedObjects(dx, dy) {
  selected.forEach((object) => {
    object.move(dx, dy);
  });
}

function handleMouseUp() {
  console.log("Mouse up");
  mouseDown = false;
  resizerMouseDown = false;
}

function getObject(id) {
  return objects[id];
}

function deselectAll() {
  console.log("Deselecting all");
  selected.forEach((object) => {
    object.unfocus();
    object.deselect();
  });
  clearArray(selected);
}

function unfocusAll() {
  console.log("Unfocusing all");
  selected.forEach((object) => {
    object.unfocus();
  });
}

function isBackspace(key) {
  return ["Backspace", "Delete"].includes(key);
}

function isMultiSelectKey(key) {
  return ["Shift", "Control", "Meta"].includes(key);
}
