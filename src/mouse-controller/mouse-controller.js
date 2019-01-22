const robotjs = require("robotjs");

const call = require("../utils/call");

class MouseController {
  constructor() {
    this.dir = [1, 0];
    this.setRight = this.setRight.bind(this);
    this.setLeft = this.setLeft.bind(this);
    this.setUp = this.setUp.bind(this);
    this.setDown = this.setDown.bind(this);
    this.createMouseMoveCommand = this.createMouseMoveCommand.bind(this);
    this.parseUserInput = this.parseUserInput.bind(this);
    this.parseMouseCommand = this.parseMouseCommand.bind(this);
    this.leftClick = this.leftClick.bind(this);
    this.rightClick = this.rightClick.bind(this);
    this.mouseUp = this.mouseUp.bind(this);
    this.mouseDown = this.mouseDown.bind(this);
    this.mouseDownRight = this.mouseDownRight.bind(this);
    this.mouseUpRight = this.mouseUpRight.bind(this);
    this.parseCommands = this.parseCommands.bind(this);
  }

  setRight() {
    this.dir = [1, 0];
    // eslint-disable-next-line no-console
    console.log("direction set to right");
  }

  setLeft() {
    this.dir = [-1, 0];
    // eslint-disable-next-line no-console
    console.log("direction set to left");
  }

  setUp() {
    this.dir = [0, -1];
    // eslint-disable-next-line no-console
    console.log("direction set to up");
  }

  setDown() {
    this.dir = [0, 1];
    // eslint-disable-next-line no-console
    console.log("direction set to down");
  }

  /**
   * Creates a function that moves the mouse by an amount using the current direction.
   * @param {number} value amount to move the cursor (will be multiplied by the current direction)
   * @returns {Function}
   */
  createMouseMoveCommand(value) {
    return () => {
      const mousePos = robotjs.getMousePos();
      robotjs.moveMouse(
        this.dir[0] * value + mousePos.x,
        this.dir[1] * value + mousePos.y
      );
    };
  }

  parseMouseCommand(mouseCommand) {
    const isNumber = !isNaN(mouseCommand);
    const cmd = isNumber ? mouseCommand : mouseCommand.toUpperCase();
    switch (cmd) {
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
        return this.leftClick;
      case "RIGHT-CLICK":
      case "RC":
        return this.rightClick;
      case "MOUSE-DOWN":
      case "MD":
        return this.mouseDown;
      case "MOUSE-UP":
      case "MU":
        return this.mouseUp;
      case "MOUSE-DOWN-RIGHT":
      case "MDR":
        return this.mouseDownRight;
      case "MOUSE-UP-RIGHT":
      case "MUR":
        return this.mouseUpRight;
      default:
        if (!isNumber) {
          return () =>
            // eslint-disable-next-line no-console
            console.error(`invalid command encountered: ${cmd}`);
        }
        return this.createMouseMoveCommand(parseInt(cmd, 10));
    }
  }

  mouseUpRight() {
    robotjs.mouseToggle("up", "right");
  }

  mouseDownRight() {
    robotjs.mouseToggle("down", "right");
  }

  mouseUp() {
    robotjs.mouseToggle("up");
  }

  mouseDown() {
    robotjs.mouseToggle("down");
  }

  rightClick() {
    robotjs.mouseClick("right");
  }

  leftClick() {
    robotjs.mouseClick();
  }

  /**
   *
   * @param {string} userInput space delimited mouse commands.
   * @returns {Function[]} mouse command functions.
   */
  parseUserInput(userInput) {
    const inputs = userInput.split(" ");
    return this.parseCommands(inputs);
  }

  /**
   *
   * @param {string[]} commands mouse commands.
   * @returns {Function[]} mouse command functions.
   */
  parseCommands(commands) {
    return commands.map(this.parseMouseCommand);
  }

  /**
   * @param {Function[]} commandFns mouse command functions
   */
  runCommands(commandFns) {
    return commandFns.forEach(call);
  }
}

module.exports = {
  MouseController
};
