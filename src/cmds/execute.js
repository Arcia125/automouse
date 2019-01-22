const MouseController = require("../mouse-controller");

module.exports = args => {
  const mouseCommands = args._.slice(1);
  const commands = MouseController.parseCommands(mouseCommands);
  commands.forEach(cmd => cmd());
};
