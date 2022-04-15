---
title: 'Pip'
description: 'Basic information on how to set up and use pip, python environments and ipython'
date: '2016-01-07T11:58:52.169Z'
author: 'André Kovac'
category: 'tool'
tags: ['python', 'data-science', 'machine-learning']
---

## Python install

Follow [this guide](https://mnzel.medium.com/how-to-activate-python-venv-on-a-mac-a8fa1c3cb511).

**Attention**: Always use `python3` (or `python3.9`) command. `python` command will point to OSX system python **2.7**!

## VSCode workflow

So far graphics do not show when running virtual env versions

### IPython interactive console

* Add `#%%` to add cells which can be run individually.
* Press `Shift + Enter` to run line or selection in iPython console.

## Jupyter output pane

* Select code and press `Option + Enter` to run selection in Jupyter Output pane

### Commands

* `Strg + Enter`: Execute cell


## Tooling/packages

### ipython

Run `ipython` to open the interactive shell.

* `!ls` runs `ls` in the standard shell
* `?name` or `name?` shows infos about that piece of code.


### venv

**NOTE**: Use `venv` (NOT `virtualenv`) on **OSX** - the later has issues on OSX!

1. In the project directory type `python3 -m venv ./env` (or `python3 -m venv venv`)
2. Activate the virtual environment using `source env/bin/activate` (or `source venv/bin/activate`)
3. Install dependencies as usual with `pip install` (or `pip install -r requirements.txt`). Use `pip list` to see the dependencies installed in the current folder.
4. Type `deactivate` to deactivate the current virtual environment.

### virtualenv

Convention: Call virtualenv folder `env`.

1. Setup: `virtualenv env`

2. Activate **virtualenv**: `source env/bin/activate`

3. Install packages (e.g. `requests` package) with pip of virtualenv: `env/bin/pip install requests` (running `pip install` should automatically call `env/bin/pip install` )
4. Find the installed packages of the environment at `env/lib/python3.7/`.

5. To exit virtual env: `deactivate`

### pip

#### Install from existing `requirements.txt`

Install all files listed in a `requirements.txt` file:

```bash
pip install -r requirements.txt
```

Example of `requirements.txt`:

```
requests
APScheduler
flask
flask-cors
flask-restplus
numpy
pandas
python-dotenv
Shapely
ipython
scikit-learn
SQLAlchemy
psycopg2
pyproj
boto3
requests-aws4auth
tables
tensorflow
keras
```

#### Create own `requirements.txt`

Run

```bash
pip freeze > requirements.txt
```

to create a `requirements.txt` file from the currently installed packages.

#### upgrade pip packages

Use the tool [https://github.com/achillesrasquinha/pipupgrade]()

```bash
pipupgrade --interactive
```

### pip3 (like `npm install --save-dev`)

```bash
pip3 install package && pip3 freeze > requirements.txt
```

### HOW TO install new python packages on my OSX system

I've got homebrew and pip. The latter is a program to manage python packages

The commands are basically:

```bash
pip install <package_name>
```

---

[Pip syntax](https://pypi.python.org/pypi/pip)

[List of all packages available with pip](https://pypi.python.org/pypi/)

### Work on prod. environment

[Python Developers Survey 2018 Results](https://www.jetbrains.com/research/python-developers-survey-2018/)

Options:

* miniconda + pip
* pip freeze
* pip + virtualenv
* docker + pip (with auto-generated requirements file from *pycharm*)

## Pycharm

Use `evaluate` window to quickly run things (like **matlab**)

## Poetry

- [poetry](https://python-poetry.org/) is an alternative package manager for python

### Create project

1. `poetry new`

    ```bash
    poetry new my-project
    ```

2. `poetry init`

    1. Create folder and navigate to it
    2. Run `poetry init` <-- Running the `init` command will take you into an interactive session to define the parameters of your new project. Just hit **enter** on each question - this will use the defaults (in the `[]`).

    See [this tutorial](https://davebaker.me/2020/07/19/setting-up-django-project-with-poetry/) to start poetry with `django`.

### Add dependencies

```bash
poetry add name-of-dependency
```

### Environment

- Run `poetry shell` to start a virtual environment. Type `exit` to exit.
