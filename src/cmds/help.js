const helpMessage = `
usage: automouse [command]

Commands:
interactive|i - starts interactive mode
version - displays the current version.
`;

module.exports = args => console.log(helpMessage);
