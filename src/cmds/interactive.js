const robotjs = require("robotjs");

const getUserInput = require("../utils/getUserInput");

let dir = [1, 0];

const setRight = () => {
  dir = [1, 0];
  console.log("direction set to right");
};

const setLeft = () => {
  dir = [-1, 0];
  console.log("direction set to left");
};

const setUp = () => {
  dir = [0, -1];
  console.log("direction set to up");
};

const setDown = () => {
  dir = [0, 1];
  console.log("direction set to down");
};

const createMouseCommand = value => () => {
  const mousePos = robotjs.getMousePos();
  robotjs.moveMouse(dir[0] * value + mousePos.x, dir[1] * value + mousePos.y);
};

function parseUserInput(userInput) {
  const inputs = userInput.split(" ");
  return inputs.map(input => {
    switch (input.toUpperCase()) {
      case "RIGHT":
      case "R":
        return setRight;
      case "LEFT":
      case "L":
        return setLeft;
      case "UP":
      case "U":
        return setUp;
      case "DOWN":
      case "D":
        return setDown;
      case "LEFT-CLICK":
      case "CLICK":
      case "LC":
      case "C":
        return () => robotjs.mouseClick();
      case "RIGHT-CLICK":
      case "RC":
        return () => robotjs.mouseClick("right");
      case "MOUSE-DOWN":
      case "MD":
        return () => robotjs.mouseToggle("down");
      case "MOUSE-UP":
      case "MU":
        return () => robotjs.mouseToggle("up");
      case "MOUSE-DOWN-RIGHT":
      case "MDR":
        return () => robotjs.mouseToggle("down", "right");
      case "MOUSE-UP-RIGHT":
      case "MUR":
        return () => robotjs.mouseToggle("up", "right");
      default:
        if (isNaN(input)) {
          return () => console.error(`invalid command encountered: ${input}`);
        }
        return createMouseCommand(parseInt(input, 10));
    }
  });
}

module.exports = async args => {
  while (true) {
    const userInput = await getUserInput(
      "Enter commands separated by spaces:\n"
    );
    const commands = parseUserInput(userInput);
    commands.forEach(cmd => {
      cmd();
    });
  }
};
