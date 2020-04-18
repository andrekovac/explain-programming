---
title: 'Python Numpy'
description: 'Most important usage and commands of the python data science framework numpy - also includes matplotlib and seaborn'
date: '2020-01-21'
author: 'André Kovac'
category: 'framework'
tags:
  [
    'python',
    'data-science',
    'machine-learning',
    'artificial-intelligence',
    'statistics',
  ]
draft: true
---

1. Basic **numpy** methods (prepended with `np`):
   - `array(<some list>)`
   - `zeros(<int or tuple of ints>)`, `ones`, `eye`
   - `linspace`
   - `arange`
   - `random.rand(<int>)`, `random.randn(<int>)`
   - `random.normal(<main>, <std>)`, `random.randint(<min>, <max>, <amount>)`
   - `nan`

```python
random.seed(<any int>)
random.rand(<int>)
```

1. Basic `array` methods:
   - `shape`, `reshape(<rows>, <columns>)`
   - `max()`, `min()`
   - `argmax()`, `argmin()`
   - `dtype`

## Simple `numpy` and `matplotlib` example

```python
from numpy.random import randint
import matplotlib.pyplot as plt

# Sample 1000 random values to create a scatterplot
x = randint(low=1, high=1000, size=100)
y = randint(low=1, high=1000, size=100)

# This will show nothing in a Jupyter Notebook
plt.scatter(x, y)
plt.show()
```

## Plotting

```python
import seaborn as sns
```

## Learning materials

- [100 Numpy Puzzles](https://github.com/rougier/numpy-100)
