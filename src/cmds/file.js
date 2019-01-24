const MouseController = require("../mouse-controller");

module.exports = async args => {
  const filePath = args._[1];
  await MouseController.runFile(filePath);
};
