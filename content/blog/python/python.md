---
title: 'Python'
description: 'Basic python commands'
date: '2016-01-07T11:58:52.169Z'
author: 'André Kovac'
category: 'tool'
tags: ['python', 'data-science', 'machine-learning']
draft: true
---

## How to run python scripts

```bash
python3 run.py
```

Run as module

```bash
python -m run.py
```

### files

Is only called if called as main, e.g. from command line as `python my_file.py`:

```python
if __name__ == "__main__":
```

[Source](https://stackoverflow.com/questions/419163/what-does-if-name-main-do)


## Syntax

### with ... as ...

Example `file` Object:

```python
with open("x.txt") as f:
    data = f.read()
    do something with data
```

see [http://effbot.org/zone/python-with-statement.htm](http://effbot.org/zone/python-with-statement.htm). `websockets` also implements `___enter___` and `___exit___`: [https://websockets.readthedocs.io/en/stable/intro.html](https://websockets.readthedocs.io/en/stable/intro.html).


### Functions

#### Lamda functions

```python
x = lambda a, b : a * b
print(x(5, 6))
```

### list comprehension

```python
[scalar * num for num in vector]
```

## Printing

### Print formatted

```python
name = "Tom"
print(f"> {name}")
```

### Print range

Python 3

```python
print (*range(10), sep=", ")
```

Python 2

```python
print("".join(str(a) for a in range(10)))
```

## Packages

### asyncio

A `coroutine` function: an `async def` function.



## Typing

Type annotations added in python 3.5

```python
def greeting(name: str) -> str:
    return 'Hello ' + name
```