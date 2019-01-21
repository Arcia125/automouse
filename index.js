const minimist = require("minimist");

module.exports = () => {
  const args = minimist(process.argv.slice(2));
  const cmd = args._[0];
  switch (cmd) {
    case "i":
    case "interactive":
      require("./src/cmds/interactive")(args);
      break;
    case "--help":
    case "-h":
    default:
      require("./src/cmds/help")(args);
  }
};
