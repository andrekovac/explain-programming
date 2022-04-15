---
title: 'Python Numpy'
description: 'Usage and command examples of the python data science framework numpy'
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

## Learning materials

- [100 Numpy Puzzles](https://github.com/rougier/numpy-100)
