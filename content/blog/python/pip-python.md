---
title: 'Pip'
description: 'Basic information on how to set up and use pip, python environments and ipython'
date: '2016-01-07T11:58:52.169Z'
author: 'André Kovac'
category: 'tool'
tags: ['python', 'data-science', 'machine-learning']
---

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

1. In the project directory type `python3 -m venv ./env`
2. Activate the virtual environment using `source env/bin/activate`
3. Install dependencies as usual with `pip install`. Use `pip list` to see the dependencies installed in the current folder.
4. Type `deactivate` to deactivate the current virtual environment.

### virtualenv

Convention: Call virtualenv folder `env`.

1. Setup: `virtualenv env`

2. Activate **virtualenv**: `source env/bin/activate`

3. Install packages (e.g. `requests` package) with pip of virtualenv: `env/bin/pip install requests` (running `pip install` should automatically call `env/bin/pip install` )
4. Find the installed packages of the environment at `env/lib/python3.7/`.

5. To exit virtual env: `deactivate`

### pip

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