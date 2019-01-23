const MouseController = require("../mouse-controller");

module.exports = async args => {
  const mouseCommands = args._.slice(1);
  const commands = MouseController.parseCommands(mouseCommands);
  await MouseController.runCommands(commands);
};
