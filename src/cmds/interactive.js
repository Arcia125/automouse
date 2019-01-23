const getUserInput = require("../utils/getUserInput");
const MouseController = require("../mouse-controller");

module.exports = async () => {
  while (true) {
    const userInput = await getUserInput(
      "Enter commands separated by spaces:\n"
    );
    const commands = MouseController.parseUserInput(userInput);
    await MouseController.runCommands(commands);
  }
};
