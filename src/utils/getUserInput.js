module.exports = message =>
  new Promise((resolve, reject) => {
    process.stdin.resume();
    process.stdout.write(message);
    process.stdin.once("data", data => resolve(data.toString().trim()));
    process.stdin.once("error", reject);
  });
