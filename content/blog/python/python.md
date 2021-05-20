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

#### `def`

```python
def my_function(shepherd):
  print("Shepherd {} is on duty.".format(shepherd))

my_function()
```

#### Lambda functions

```python
x = lambda a, b : a * b
print(x(5, 6))
```

### list comprehension

```python
[scalar * num for num in vector]

# Other example
[(wgt, dia) for (wgt, dia) in coins.keys()]
```

## Printing

### Print formatted

```python
name = "Tom"
print(f"> {name}")
```

Here no name `:`

```python
display = "{:.2f}".format(value)
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

## Tuples

### Tuple unpacking

Dynamically build tuple

```python
def running_total(*coins):
    pass
```

### Tuple as key in dictionary

```python
# Define dict
coins = {
  (5, 21.21): 'nickel',
  (2.268, 17.91): 'dime',
  (5.67, 0.955): 'quarter'
}

# Access value
coin = coins[wgt, dia]

# Access in for loop
for wgt,dia in coins.keys():
```

```python
# Collections
from collections import namedtuple
namedtuple("Coin", ["size", "weight"])

# Access tuple
Coin.size
```

## for-else loop

If `for` case of `for-else` loop doesn't **break**, the `else` case is invoked:

```python
def accept_coin(weight, diameter):
  for wgt,dia in coins.keys():
    if ((1 - tolerance) * wgt <= weight <= (1 + tolerance) * wgt) and ((1 - tolerance) * dia <= diameter <= (1 + tolerance) * dia):
      coin = coins[wgt, dia]
      value = coin_values[coin]
      break
  else:
    value = 0.00

  display = "{:.2f}".format(value)
  return display
```

## try-except

```python
try:
    # do calculations...
except KeyError:
    value = 0.00
```

## Testing

```python
import pytest

def test_sum():
  assert running_total("nickel", "nickel", "dime") == 0.20
```
