const fs = require("fs");
const robotjs = require("robotjs");

const sleep = require("../utils/sleep");

class MouseController {
  constructor() {
    this.dir = [1, 0];
    this.error = this.error.bind(this);
    this.log = this.log.bind(this);
    this.setRight = this.setRight.bind(this);
    this.setLeft = this.setLeft.bind(this);
    this.setUp = this.setUp.bind(this);
    this.setDown = this.setDown.bind(this);
    this.moveMouse = this.moveMouse.bind(this);
    this.createMouseMoveCommand = this.createMouseMoveCommand.bind(this);
    this.createRelativeMouseMoveCommand = this.createRelativeMouseMoveCommand.bind(
      this
    );
    this.parseMouseCommand = this.parseMouseCommand.bind(this);
    this.sleep = this.sleep.bind(this);
    this.mouseUpRight = this.mouseUpRight.bind(this);
    this.mouseDownRight = this.mouseDownRight.bind(this);
    this.mouseUp = this.mouseUp.bind(this);
    this.mouseDown = this.mouseDown.bind(this);
    this.rightClick = this.rightClick.bind(this);
    this.leftClick = this.leftClick.bind(this);
    this.parseUserInput = this.parseUserInput.bind(this);
    this.parseCommands = this.parseCommands.bind(this);
    this.runCommands = this.runCommands.bind(this);
    this.runFile = this.runFile.bind(this);
    this.pressKey = this.pressKey.bind(this);
    this.createKeyCommand = this.createKeyCommand.bind(this);
    this.createPrintCommand = this.createPrintCommand.bind(this);
    this.getMousePosition = this.getMousePosition.bind(this);
  }

  /**
   * @param {string} cmd
   * @param {string} msg
   */
  error(cmd, msg) {
    // eslint-disable-next-line no-console
    console.error(msg ? msg : `invalid command encountered: ${cmd}`);
  }

  /**
   * @param {string} msg
   */
  log(msg) {
    // eslint-disable-next-line no-console
    console.log(msg);
  }

  setRight() {
    this.dir = [1, 0];
    this.log("direction set to right");
  }

  setLeft() {
    this.dir = [-1, 0];
    this.log("direction set to left");
  }

  setUp() {
    this.dir = [0, -1];
    this.log("direction set to up");
  }

  setDown() {
    this.dir = [0, 1];
    this.log("direction set to down");
  }

  moveMouse(x, y) {
    robotjs.moveMouse(x, y);
  }

  pressKey(key) {
    robotjs.keyTap(key);
  }

  /**
   * @returns {{ x: number, y: number }} current position of the mouse
   */
  getMousePosition() {
    return robotjs.getMousePos();
  }

  /**
   * @param {int} x
   * @param {int} y
   */
  createMouseMoveCommand(x, y) {
    return () => {
      this.moveMouse(x, y);
    };
  }

  /**
   * Creates a function that moves the mouse by an amount using the current direction.
   * @param {number} value amount to move the cursor (will be multiplied by the current direction)
   * @returns {Function}
   */
  createRelativeMouseMoveCommand(value) {
    return () => {
      const mousePos = this.getMousePosition();
      this.createMouseMoveCommand(
        this.dir[0] * value + mousePos.x,
        this.dir[1] * value + mousePos.y
      )();
    };
  }

  createKeyCommand(key) {
    return () => {
      this.pressKey(key);
    };
  }

  createPrintCommand(valueFn) {
    return () => {
      this.log(valueFn());
    };
  }

  parseMouseCommand(mouseCommand) {
    const isNumber = !isNaN(mouseCommand);
    const fullCommand = isNumber ? mouseCommand : mouseCommand.toUpperCase();
    const [cmd, cmdArgs] = isNumber
      ? [fullCommand, null]
      : fullCommand.split(":");
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
      case "S":
      case "SLEEP":
        return this.sleep(parseInt(cmdArgs, 10));
      case "M":
      case "MOVE": {
        const [x, y] = cmdArgs.split(",").map(arg => parseInt(arg, 10));
        const validArgs = !isNaN(x) && !isNaN(y);
        if (!validArgs)
          return () =>
            this.error(
              cmd,
              `invalid x, y arguments provided to ${cmd}: expected <number>,<number> got: ${x},${y}`
            );
        return this.createMouseMoveCommand(x, y);
      }
      case "K":
      case "KEY":
        return this.createKeyCommand(cmdArgs);
      case "P":
      case "PRINT":
        return this.createPrintCommand(this.getMousePosition);
      default:
        if (!isNumber) {
          return () => this.error(cmd);
        }
        return this.createRelativeMouseMoveCommand(parseInt(cmd, 10));
    }
  }

  sleep(duration) {
    return () => sleep(duration);
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
  async runCommands(commandFns) {
    for (let i = 0, len = commandFns.length, fn = null; i < len; i++) {
      fn = commandFns[i];
      const result = fn();
      if (result && result.then) {
        await result;
      }
    }
  }

  /**
   * @param {string} filePath
   */
  async runFile(filePath) {
    const fileData = await new Promise((resolve, reject) => {
      fs.readFile(filePath, "utf8", (err, data) => {
        if (err) {
          return reject(err);
        }
        return resolve(data);
      });
    });
    const commands = this.parseUserInput(fileData);
    await this.runCommands(commands);
  }
}

module.exports = {
  MouseController
};
