---
title: 'Visual Studio Code'
description: 'Useful shortcuts and tips for Visual Studio Code (VS Code)'
date: '2018-06-20'
author: 'André Kovac'
category: 'tool'
tags: ['editor', 'shortcuts']
---

## VSCode Shortcuts

### Jumping around in a file

| Command             | Result                                                                                     |
| ------------------- | ------------------------------------------------------------------------------------------ |
| `Ctrl + -`          | (dash) Jump back to last cursor position                                                   |
| `Ctrl + _`          | (underscore) Jump forward to next cursor position                                          |
| `F8` (`Fn` -> `F8`) | [Move to next typescript error](https://johnpapa.net/refactoring-with-visual-studio-code/) |

### Selection + Replace

| Command                       | Result                                                |
| ----------------------------- | ----------------------------------------------------- |
| `Cmd + d`                     | Select next occurance of the same word                |
| `Option + Cmd + Down Arrow`   | Add cursor directly on line below                     |
| `Option + Mouse Click`        | Add another cursor at the position of the mouse click |
| `Shift + Option + Down Arrow` | Mark something + duplicate the marked lines           |
| F2                            | Change variable everywhere                            |

### Code hints

| Command        | Result                                     |
| -------------- | ------------------------------------------ |
| `option + esc` | Open code-hints at current cursor position |

### Other

| Command                                  | Result                                                       |
| ---------------------------------------- | ------------------------------------------------------------ |
| `Option + Shift + Down Arrow / Up Arrow` | Copy line                                                    |
| Press `Left` key                         | Close very long `node_modules` folder inside the bar         |
| `Cmd + b`                                | Toggle left menu bar (when not in a Markdown file)           |
| `Cmd + Shift + k`                        | Delete line without copying it (i.e. no cut via `Shift + x`) |
| `Cmd + i` or `option + esc`              | Trigger auto-complete suggestion                             |
| `Cmd + Shift + y`                        | Toggle view of terminal/debug console                        |
| Click + `control`                        | Open file in split view                                      |
| `Cmd` + `j`                              | Open panel (with terminal etc.)                              |
| `Cmd` + `m`                              | Open side bar                                                |

## Notable VSCode extensions

- [Quokka JS](https://quokkajs.com/) lets you quickly rapid prototype by showing you console.log results directly in the editor. [The package site](https://marketplace.visualstudio.com/items?itemName=WallabyJs.quokka-vscode).

    **Example**

    Just start typing. The output will be shown to the right of values.

    ```js
    const a = 8;

    a    // 8
    ```

- [Polacode](https://marketplace.visualstudio.com/items?itemName=pnp.polacode)

    Create great pics of code-snippets right within VSCode

## Command line

Open file in VSCode from the command line.

```bash
code myfile.txt
```

Open entire folder in VSCode

```bash
code .
```

## Format on save

Enforce rules by checking `.svcode/settings.json` into the codebase:

**Example**:

```json
{
  "editor.codeActionsOnSave": {
    "source.organizeImports": false,
    "source.fixAll.eslint": true
  },
  "eslint.validate": ["javascript", "javascriptreact", "typescript", "typescriptreact", "mdx"],
  "files.associations": {
    ".dsmrc": "jsonc",
    ".fantasticonrc": "jsonc",
    ".stylelintrc": "jsonc",
    "*.t": "plaintext"
  },
  "svgo.removeTitle": true,
  "svgo.removeViewBox": false,
  "typescript.tsdk": "node_modules/typescript/lib",
  "editor.formatOnSave": true
}
```

## `launch.json`

Add field `console` to redefine console. Default is `"internalConsole"`.

Change to `"integratedTerminal"` so that you get syntax highlighting

```json
"console": "integratedTerminal",
```

## Other

### Open other repo in new window

1. `Cmd + Shift + n` to open a new window.
2. `File -> Open` to open a new project

### Links

- [Refactoring with Visual Studio Code](https://johnpapa.net/refactoring-with-visual-studio-code/)