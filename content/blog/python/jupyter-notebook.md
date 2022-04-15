---
title: 'Jupyter Noteboook'
description: 'Basic information and shortcuts for Jupyter Notebook'
date: '2016-01-07T11:58:52.169Z'
author: 'André Kovac'
category: 'tool'
tags: ['python', 'data-science', 'machine-learning']
draft: true
---

## Installation

```bash
pip install --upgrade pip
pip install --upgrade ipython jupyter
```

## Open notebook in browser

```bash
jupyter notebook
```

## Keyboard shortcuts

### Modes

| Command | Usage                                                              |
| ------- | ------------------------------------------------------------------ |
| Esc     | Get into **command** mode (blue bar on the left-hand side of cell) |
| Enter   | Get into **edit** mode (green bar on the left-hand side of cell)   |

### Cell Types

| Command | Usage                              |
| ------- | ---------------------------------- |
| m       | Change cell type into **Markdown** |
| y       | Change cell type into **Code**     |

### Function definition

| Command     | Usage                    |
| ----------- | ------------------------ |
| Shift + Tab | Show function definition |

Also via **python** commands:

- **?**: View function definition of `linear1` function:


  **Example**:

  ```python
  linear1??

  print?
  ```

- `help()`

  **Example**:

  ```python
  help(type)
  ```

### Run cell (code or markdown)

| Command         | Usage                      |
| --------------- | -------------------------- |
| Control + Enter | Run row                    |
| Shift + Enter   | Run row and go to next one |

### Cell Insertion

| Command | Usage                  |
| ------- | ---------------------- |
| a       | Insert row above       |
| b       | Insert row below       |
| h       | keyboard shortcut help |


### Deletion + Copy/Paste

| Command | Usage              |
| ------- | ------------------ |
| d + d   | Delete row         |
| z       | Undo cell deletion |
| x       | Cut                |
| v       | Paste              |


See [this list](https://www.dataquest.io/blog/jupyter-notebook-tips-tricks-shortcuts/) for more shortcuts.

## Noteworthy

- Jupyter / IPython: After editing a module, changes are not effective without kernel restart. Read [this article](https://support.enthought.com/hc/en-us/articles/204469240-Jupyter-IPython-After-editing-a-module-changes-are-not-effective-without-kernel-restart) for more details.

## Jupyter Lab

Start with

```bash
jupyter lab
```