const robotjs = require("robotjs");

class MouseController {
  constructor() {
    this.dir = [1, 0];
    this.setRight = this.setRight.bind(this);
    this.setLeft = this.setLeft.bind(this);
    this.setUp = this.setUp.bind(this);
    this.setDown = this.setDown.bind(this);
    this.createMouseCommand = this.createMouseCommand.bind(this);
    this.parseUserInput = this.parseUserInput.bind(this);
  }

  setRight() {
    this.dir = [1, 0];
    console.log("direction set to right");
  }

  setLeft() {
    this.dir = [-1, 0];
    console.log("direction set to left");
  }

  setUp() {
    this.dir = [0, -1];
    console.log("direction set to up");
  }

  setDown() {
    this.dir = [0, 1];
    console.log("direction set to down");
  }

  createMouseCommand(value) {
    return () => {
      const mousePos = robotjs.getMousePos();
      robotjs.moveMouse(
        this.dir[0] * value + mousePos.x,
        this.dir[1] * value + mousePos.y
      );
    };
  }

  parseUserInput(userInput) {
    const inputs = userInput.split(" ");
    return inputs.map(input => {
      switch (input.toUpperCase()) {
        case "RIGHT":
        case "R":
          return this.setRight;
        case "LEFT":
        case "L":
          return this.setLeft;
        case "UP":
        case "U":
          return this.setUp;
        case "DOWN":
        case "D":
          return this.setDown;
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
          return this.createMouseCommand(parseInt(input, 10));
      }
    });
  }
}

module.exports = {
  MouseController
};
