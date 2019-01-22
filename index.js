const minimist = require("minimist");

module.exports = async () => {
  const args = minimist(process.argv.slice(2));
  const cmd = args._[0];
  switch (cmd) {
    case "i":
    case "interactive":
      await require("./src/cmds/interactive")(args);
      break;
    case "version":
      require("./src/cmds/version")(args);
    case "--help":
    case "-h":
    default:
      require("./src/cmds/help")(args);
  }
};
