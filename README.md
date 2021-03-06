<p align="center">
<img src="./logo.png">
</p>
<p align="center">
<a href="https://www.npmjs.com/package/automouse">
<img src="https://img.shields.io/npm/v/automouse.svg">
</a>
<img src="https://travis-ci.com/Arcia125/automouse.svg?branch=master">
<a href="https://www.codefactor.io/repository/github/arcia125/automouse">
<img src="https://www.codefactor.io/repository/github/arcia125/automouse/badge">
</a>
<a href="https://github.com/prettier/prettier">
<img src="https://img.shields.io/badge/code_style-prettier-ff69b4.svg?style=flat-square">
</a>
<a href="https://www.npmjs.com/package/automouse">
<img src="https://img.shields.io/npm/dt/automouse.svg">
</a>
<img src="https://img.shields.io/github/repo-size/Arcia125/automouse.svg">
<img src="https://img.shields.io/github/issues/arcia125/automouse.svg">
</p>

Cross-platform automation CLI. Control your mouse and keyboard on Windows, Mac, or Linux. Great for simple GUI testing and automation.

## Installation

Must have [npm](https://www.npmjs.com/get-npm), [python2](https://www.python.org/downloads/).

### Windows prereqs:

- Python v2.
- windows-build-tools `npm install --global --production windows-build-tools`

### Linux prereqs:

- Python v2.
- make.
- A C/C++ compiler like GCC.
- libxtst-dev and libpng++-dev (`sudo apt-get install libxtst-dev libpng++-dev`).

Then run:

```
npm install -g automouse
```

If you get errors with `node-gyp` during installation, make sure you have python2 installed and run

```
npm install -g automouse --python="path/to/python2"
```

If you continue to encounter issues, see installation/build instructions for [robotjs](https://github.com/octalmage/robotjs)

## Usage

```
usage: automouse [command]

Commands:
interactive|i - starts interactive mode
version - displays the current version.
file|f [path] - runs mouse commands from a file.
execute|e [mouse args] - runs arguments directly.
```

## Mouse Commands

Mouse commands are used to control the mouse. Commands are separated by spaces. Commands are case insensitive. Command arguments are passed with colons example: `sleep:1000`

```
RIGHT|R - set direction to right.
LEFT|L - set direction to left.
UP|U - set direction to up.
DOWN|D - set direction to down.
LEFT-CLICK|CLICK|LC|C - click the left mouse button.
RIGHT-CLICK|RC - click the right mouse button.
MOUSE-DOWN|MD - toggle the mouse down.
MOUSE-UP|MU - toggle the mouse up.
MOUSE-DOWN-RIGHT|MDR - toggle the right mouse button down.
MOUSE-UP-RIGHT|MUR - toggle the right mouse button up.
[SLEEP|S]:duration - waits the given amount of milliseconds.
[MOVE|M]:x,y - moves the mouse to the given x and y coordinates.
[KEY|K]:key - presses the given key.
PRINT|P - print the current mouse location.
[PRINT-COLOR|PC]:x,y - print the color at the given x and y locations defaults to the current mouse location.
[integer] - move the mouse in the current direction by this amount. example: "right 50" == move the mouse 50 pixels to the right.
```

## Examples

```bash
automouse i
Enter commands separated by spaces:
md r 50 d 50 l 50 u 50 r 75 d 75 l 75 u 75 r 100 d 100 l 100 u 100 mu
```

![example](./example.gif)

Open a drawing app and run the following with the cursor over the canvas.

```bash
automouse f example\draw.txt
```

or

```bash
automouse e md r 50 d 50 l 50 u 50 r 75 d 75 l 75 u 75 r 100 d 100 l 100 u 100 mu
```
