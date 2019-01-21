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

const createMouseCommand = ({ value, direction }) => () => {
  const mousePos = robotjs.getMousePos();
  robotjs.moveMouse(
    direction[0] * value + mousePos.x,
    direction[1] * value + mousePos.y
  );
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
      default:
        if (isNaN(input)) {
          return () => console.error(`invalid command encountered: ${input}`);
        }
        return createMouseCommand({
          value: parseInt(input, 10),
          direction: dir
        });
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
