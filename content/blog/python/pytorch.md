---
title: 'Python Pytorch'
description: 'Most important usage and commands of the python data science framework Pytorch'
date: '2020-01-21T00:00:00.000Z'
author: 'André Kovac'
category: 'framework'
tags: ['python', 'data-science', 'machine-learning', 'artificial-intelligence', 'statistics']
draft: true
---

## Tensor

A generalized matrix with more than two dimensions.

Useful for image data.

## Converting

Direct link

```python
torch.from_numpy(arr)
# or
torch.as_tensor(arr)
```

Tensor is independent copy of numpy array

```python
torch.tensor(arr)
```

* `torch.tensor` will retain the original data type
* `torch.Tensor` is equivalent to `torch.FloatTensor` and will convert integers to floats

## Create tensors

Placeholder

```python
torch.empty(4,2)
```

`torch.tensor([1,2,3])`, `torch.zeros(4,3,dtype=torch.int64)`, `torch.ones(2,2)`, `torch.arange(0, 18, 2).reshape(3,3)`, `torch.linspace(0,18,12).reshape(4,3)`

Change type of tensor values

`my_tensor = my_tensor.type(torch.int32)`

Random numbers

`rand`, `randn`, `randn_like(some_tensor)`

`torch.manual_seed(42)`

## Selection

Given the following 2-D tensor

```python
x = torch.from_numpy(np.random.randint(0, 5, 6)).reshape(3,2)
```

Row vs. Column:

1. `x[:, 1]` will return `tensor([4, 4, 1])`
2. `x[:, 1:]` (adding slice with `:`) will return
    ```python
    tensor([[4],
            [4],
            [1]])
    ```


## Tensor operations

### `view`

* `view` creates a shallow copy, i.e. after `z = x.view(2,5)`changes to `x` (e.g. `x[0] = 1`) will also change `z`. `reshape` on the other hand creates a deep copy.
* `view(.., -1)` will infer the right dimension if you use a `-1` for one of them (like `几` in Chinese).

```python
x = torch.arange(10)
x.view(2, -1)
```

### Matrix product `mm`

```python
a @ b       # but @ is usually used for python decorators
# is equivalent to
torch.mm(a, b)
```

### Several other tensor operations

```python
x.dot()     # Dot product
x.mm()      # Matrix product
x * y       # Element-wise product
x.norm()
x.numel()
len(x)      # Attention: Number of rows in 2-dimensional array
```

### Derivatives and gradients

```python
x = torch.tensor(2.0, requires_grad=True)
y = 2*x**4 + x**3 + 2*x**2 + 5*x + 1

y.backward()    # dy/dx
x.grad          # Get result of dy/dx(x)
```
