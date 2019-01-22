const helpMessage = `
usage: automouse [command]

Commands:
interactive|i - starts interactive mode
version - displays the current version.
`;

// eslint-disable-next-line no-unused-vars, no-console
module.exports = args => console.log(helpMessage);
