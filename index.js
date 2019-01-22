const minimist = require("minimist");

const main = async () => {
  const args = minimist(process.argv.slice(2));
  const cmd = args._[0];
  switch (cmd) {
    case "i":
    case "interactive":
      await require("./src/cmds/interactive")(args);
      break;
    case "f":
    case "file":
      await require("./src/cmds/file")(args);
      break;
    case "e":
    case "exec":
    case "execute":
      await require("./src/cmds/execute")(args);
      break;
    case "version":
      require("./src/cmds/version")(args);
      break;
    case "--help":
    case "-h":
    default:
      require("./src/cmds/help")(args);
  }
};

module.exports = main;

if (require.main) {
  main();
}
