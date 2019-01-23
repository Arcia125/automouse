<p align="center">
<img src="./logo.png">
</p>
<p align="center">
<a href="https://www.npmjs.com/package/automouse">
<img src="https://img.shields.io/npm/v/automouse.svg">
</a>
<a href="https://www.codefactor.io/repository/github/arcia125/automouse">
<img src="https://www.codefactor.io/repository/github/arcia125/automouse/badge">
</a>
<a href="https://www.npmjs.com/package/automouse">
<img src="https://img.shields.io/npm/dt/automouse.svg">
</a>
<img src="https://img.shields.io/github/repo-size/Arcia125/automouse.svg">
<img src="https://img.shields.io/github/issues/arcia125/automouse.svg">
</p>

Control your mouse via CLI.

## Installation

Must have [npm](https://www.npmjs.com/get-npm), [python2](https://www.python.org/downloads/).

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

Mouse commands are used to control the mouse. Commands are separated by spaces.

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
