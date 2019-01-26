/* eslint-disable prefer-arrow-callback */
/* eslint-disable func-names */
/* eslint-disable no-console */
const { exec } = require("pkg");
const https = require("https");
const request = require("request");

const latestReleaseUrl =
  "https://api.github.com/repos/octalmage/robotjs/releases/latest";
let latestReleaseInfo = null;
const linuxRE = /node-v\d+-linux-x64/gi;
const macosRE = /node-v\d+-darwin-x64/gi;
const windowsRE = /node-v\d+-win32-ia32/gi;

function getUrl(url, headers = {}) {
  return new Promise(resolve => {
    request(
      {
        method: "GET",
        uri: url,
        headers: {
          "User-Agent": "automouse",
          ...headers
        },
        followAllRedirects: true
      },
      (err, response, body) => {
        resolve(body);
      }
    );
  });
}

function getLatestReleaseInfo() {
  return getUrl(latestReleaseUrl).then(jsonStr => JSON.parse(jsonStr));
}

/**
 * builds an executable package for linux.
 */
async function buildLinuxExecutable() {
  const outputPath = "dist/linux/automouse";
  await exec(["package.json", "--target", "linux", "--output", outputPath]);
}

/**
 * builds an executable package for mac.
 */
async function buildMacExecutable() {
  const outputPath = "dist/macos/automouse";
  await exec(["package.json", "--target", "macos", "--output", outputPath]);
}

/**
 * builds an executable package for windows.
 */
async function buildWindowsExecutable() {
  const outputPath = "dist/windows/automouse";
  await exec(["package.json", "--target", "win", "--output", outputPath]);
  const latestWindowsRelease = latestReleaseInfo.assets.find(asset =>
    windowsRE.test(asset.name)
  );
  const fileData = await getUrl(latestWindowsRelease.browser_download_url, {
    Accept: "application/octet-stream"
  });
  console.log(fileData);
}

async function build() {
  latestReleaseInfo = await getLatestReleaseInfo();
  return buildWindowsExecutable();
  // return Promise.all([buildLinuxExecutable(), buildMacExecutable(), buildWindowsExecutable()]);
}

function main() {
  build().then(console.log);
}

if (require.main === module) {
  main();
}
