const MouseController = require("../mouse-controller");

module.exports = args => {
  const mouseCommands = args._.slice(1);
  const commands = MouseController.parseCommands(mouseCommands);
  MouseController.runCommands(commands);
};
