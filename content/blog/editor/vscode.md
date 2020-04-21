---
title: 'Visual Studio Code'
description: 'Useful shortcuts for Visual Studio Code (VS Code)'
date: '2018-06-20'
author: 'André Kovac'
category: 'tool'
tags: ['editor', 'shortcuts']
---

## Command line

Open file in VSCode from the command line.

```bash
code myfile.txt
```

Open entire folder in VSCode

```bash
code .
```

## Shortcuts

| Command  | Result  |
| -------- | ------- |
| `F 8` | [Move to next typescript error](https://johnpapa.net/refactoring-with-visual-studio-code/) |
| `Ctrl + -` | Jump back to last cursor position |
| `Ctrl + _` | Jump forward to next cursor position |
|||
| `Cmd + d`  | Select next occurance of the same word |
| `Option + Cmd + Down Arrow`  | Add cursor directly on line below |
| `Option + Mouse Click`  | Add another cursor at the position of the mouse click |
| `Shift + Option + Down Arrow`  | Mark something + duplicate the marked lines |
|||
| `Option + Shift + Down Arrow`  | Copy line |

## Great Packages

- [Quokka JS](https://quokkajs.com/) lets you quickly rapid prototype by showing you console.log results directly in the editor. [The package site](https://marketplace.visualstudio.com/items?itemName=WallabyJs.quokka-vscode).

    **Example**

    Just start typing. The output will be shown to the right of values.

    ```js
    const a = 8;

    a    // 8
    ```

## Other

### Open other repo in new window

1. `Cmd + Shift + n` to open a new window.
2. `File -> Open` to open the project

### Links

- [Refactoring with Visual Studio Code](https://johnpapa.net/refactoring-with-visual-studio-code/)