---
title: 'Data visualizations in python'
description: 'Tools to visualize data in python'
date: '2021-01-20'
author: 'André Kovac'
category: 'framework'
tags:
  [
    'python',
    'data-science',
    'machine-learning',
    'artificial-intelligence',
    'statistics',
    'visualization'
  ]
draft: true
---

## Visualization

### `matplotlib`

- [mplcyberpunk](https://github.com/dhaitz/mplcyberpunk) is a Python package on top of `matplotlib` to create 'cyberpunk' style plots with 3 additional lines of code.

- [Seaborn](https://seaborn.pydata.org/)

  ```python
  import seaborn as sns
  ```

- [Bokeh](https://docs.bokeh.org/en/latest/index.html)

### plotly

[Plotly](https://plotly.com/) is a matplotlib alternative.

### General exploratory data analysis

- [Pandas Profiling](https://github.com/pandas-profiling/pandas-profiling)

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

