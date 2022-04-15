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

**Attention**: Always use `python3` (or `python3.9`) command. `python` command will point to OSX system python **2.7**!


```bash
python3 run.py
```

Run as module

```bash
python3 -m run.py
```

### files

Is only called if called as main, e.g. from command line as `python my_file.py`:

```python
if __name__ == "__main__":
```

[Source](https://stackoverflow.com/questions/419163/what-does-if-name-main-do)


## Syntax

### Arithmetic

The `//` operator gives us a result that's rounded down to the next integer:

```py
division = 5 // 2
```

### Booleans

Boolean values in python are capitalized: **True** and **False** (not **true** and **false**)

```py
(4 > 3) == False
```

### Tuples

- Can be written without round brackets: `my_tuple = a, type(a)`
- Use for swapping values:

  ```py
  a = [1, 2, 3]
  b = [3, 2, 1]

  # swap variables a and b
  a, b = b, a
  ```

### Combining types

Surprising example:

```py
a = 'Hallo'
b = 3
print (a,b)
print(a*b)
```

Will print the string `a` `b` times. 🤯😳

### Strings

- **String concatenation** does not work with string + integer, e.g. `'name' + 3` doesn't work.

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

## Dictionary

### Basic methods on dictionaries

```python
my_list.keys()
my_list.values()
my_list.items()   # since python 3
```

### Dictionary comprehension

**Example**: Swapping a list

```python
list_swapped = { value: key for key, value in list_normal.items() }
```

### Dictionary unpacking

Similar to **spread operator** in javascript.

`**` syntax

Pandas **Example**:

```py
animals.groupby("kind").agg(
    **{
        "total weight": pd.NamedAgg(column="weight", aggfunc=sum)
    }
)
```

- `**kwargs` aka **keyword arguments**: dictionary of keyword arguments
- `*args`: non-keyworded variable length argument list

Example taken from [here](https://pandas.pydata.org/pandas-docs/stable/user_guide/groupby.html#named-aggregation).

### Tuple as key in dictionary

```python
# Define dict
coins = {
  (5, 21.21): 'nickel',
  (2.268, 17.91): 'dime',
  (5.67, 0.955): 'quarter'
}

# Access value
coin = coins[wgt, dia] # wgt : weight, dia: diameter

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

## Comments

### Docstring

Convention to add code examples with interactive shell prompt `>>>` inside docstring

```py
def least_difference(a, b, c):
    """Return the smallest difference between any two numbers
    among a, b and c.

    >>> least_difference(1, 5, -5)
    4
    """
    diff1 = abs(a - b)
    diff2 = abs(b - c)
    diff3 = abs(a - c)
    return min(diff1, diff2, diff3)
```

See also this [numpy np.eye function](https://github.com/numpy/numpy/blob/v1.14.2/numpy/lib/twodim_base.py#L140-L194).

## Special words in python

- `None`: The `null` of python
- `pass`: Do nothing. Useful when you don't want to have anything in your function body (as a temporary value)

## Higher order functions

**Example**: When passing a function for the `key` parameter to the `max` function, it returns the `argmax`, i.e. the value which maximizes the call of the `key` function.

```py
# Which number is the biggest modulo 5?
max(100, 51, 14, key=mod_5)
```

## Partial function application

- `partial()` let's you partially apply arguments to a function.

## Python Keyword Arguments `kwargs`

- `args` are positional arguments and `kwargs` are keyword arguments (named arguments)
- [Python Keyword Arguments](https://www.pythontutorial.net/python-basics/python-keyword-arguments/)

- Usage of `*args` and `**kwargs` described in [this article](https://book.pythontips.com/en/latest/args_and_kwargs.html).