---
title: 'Anaconda'
description: 'Basic information on how to set up and use anaconda'
date: '2020-01-20T00:00:00.00Z'
author: 'André Kovac'
category: 'framework'
tags: ['python', 'data-science', 'machine-learning']
draft: true
---

## Start

After downloading anaconda, you first `start` an environment and then `activate`  it.

### Create env

Use a file with dependency descriptions, like e.g. `pytorchenv.yml` to use `pytorch` and other libs. This is a description of an environment called `pytorchenv`:

```yml
name: pytorchenv
channels:
  - defaults
  - pytorch
dependencies:
  - numpy=1.16.2
  - pandas=0.24.2
  - matplotlib=3.0.3
  - pillow=5.4.1
  - pip=19.0
  - plotly=3.7.0
  - scikit-learn=0.20.3
  - seaborn=0.9.0
  - python=3.7.3
  - jupyter=1.0.0
  - pytorch=1.1.0
  - torchvision=0.2.2
```

Create it by running

```bash
conda env create -f pytorchenv.yml
```

### Activate env

1. List existing environments if you forgot the name: `conda env list`
2. Activate the environment with `conda activate <name_of_env>`

**Example**: Activate environment with name `pytorchenv` (default environment is called `base`)

```bash
conda activate pytorchenv
```

Then you can e.g. start a jupyter notebook with

```bash
jupyter notebook
// or
jupyter-notebook
```

**Note**: Can be done from any folder in the file system.

### Deactivate env

Leave the environment and its installed dependencies

```bash
conda deactivate
```

## Update libs

### Install

```bash
conda install ...
```

### Update

```bash
conda update anaconda2
```