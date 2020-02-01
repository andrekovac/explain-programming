---
title: 'Machine Learning'
date: '2020-01-25T00:00:00.000Z'
author: 'André Kovac'
description: 'General concepts and useful links concerning machine learning'
category: 'data'
tags: ['data-science', 'machine-learning']
---

## General concepts

### Activation function

* The rectifier is a popular activation function - the positive part of its argument.
> A unit employing the rectifier is also called a rectified linear unit (ReLU)

### Accuracy / recall tradeoff

**Accuracy/Precision**: Correct vs. total amount of test cases (only works reliably for data sets where classes are well balanced).

    True Positives / (True Positives + False Positives)

    Own words: They really positive ones among the ones you believe are positive.

**Recall**: Ability of a model to find all the relevant cases within a dataset:

    True Positives / (True Positives + False Negatives)

    Own words: They ones successfully found to be positive ones among all the really positive ones (i.e. the ones who should have been found as positive).

    **Note**: False negative: You think it's positive although it's not, i.e. falsly say its negative, e.g. telling someone they don't have cancer although they actually do.

    Can easily be achieved by just labeling all as positive. --> Also need precision.

**F_1 score**: Harmonic mean of recall and precision

    **Formula**: 2 * (precision * recall) / (precision + recall)

    **Note**: Harmonic mean punishes extreme differences between precision and recall

Compare everything in a confusion matrix.

### Classification

**Exclusive** vs. **non-exclusive** classes.

Use *one-hot-encoding* to encode output layer.

#### Activation functions

1. Non-exclusive classes

Use `Sigmoid` activation function

2. Exclusive classes

Use `Softmax` activation function to ensure that sum of all classes equals 1.
Now you can choose the value with highest probability.

## Useful links

* [Millions of accessible data sets](https://blog.google/products/search/discovering-millions-datasets-web/)

