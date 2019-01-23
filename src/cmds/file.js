const fs = require("fs");
const MouseController = require("../mouse-controller");

module.exports = async args => {
  const fileName = args._[1];
  const fileData = await new Promise((resolve, reject) => {
    fs.readFile(fileName, "utf8", (err, data) => {
      if (err) {
        return reject(err);
      }
      return resolve(data);
    });
  });
  const commands = MouseController.parseUserInput(fileData);
  await MouseController.runCommands(commands);
};
