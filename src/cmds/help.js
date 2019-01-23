const helpMessage = `
usage: automouse [command]

Commands:
interactive|i - starts interactive mode
file|f [path] - runs mouse commands from a file.
execute|e [mouse args] - runs arguments directly.
version - displays the current version.
`;

// eslint-disable-next-line no-unused-vars, no-console
module.exports = args => console.log(helpMessage);
