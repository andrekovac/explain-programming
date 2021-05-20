---
title: 'Computer Vision'
date: '2021-03-27'
author: 'André Kovac'
description: ''
category: 'data'
tags: ['data-science', 'machine-learning']
---

## Computer Vision

## terms

- Sampling: extra sampling
- Activition function
- Loss function
- Transfer learning (e.g. already use parameters trained on Resnet)
    - Sometimes early layers are freezed
    - fastai also has a gradually increasing learning rate (as layers are closer to features)
- Global avarage pooling.
- Reduce activiation map size by
    - a) Max Polling (formerly used)
    - b) Stride (schrittweite der convolution), e.g. stride size of 2 -> Don't do convolution on every pixel, but jump and delete jumped over pixels.

- Bottleneck feature -> Last step of feature extraction before classifier (nach global average pooling)

- **Random forest** (forest of randomized decision trees) nach CNN. --> Other open cv data.

- Precision and Recall
  - False Positive, False Negative
- Confused (deutsch "Verwechslung")
  - **Confusion matrix** lists pairs of most confusion aka wrong classifications.

- the easy split --> what is easy to separate.
    -> can lead to overfitting.

- **matplotlib** vs. **plotly**

## Data Preprocessing Architecture

- dataset (incl. data augmentation) + sampler --> data loader

    - image augmentation: Add different variants of the image (e.g. different crops and zooms) or different colors.

- Data Augementation: Filters, like grayscale, RGB augementation, corner augmentation etc.

### Error in classification of arial data

1. Streets vs. Parking lots

- Get more context!
    - Field of vision (aka. influence of pixels) Sichtweite anpassen.
    - How many pixels in previous layers influenced the specific activation map (feature map)?
        - This is usally a guassian curve -> pixels in the perifery influence the pixel less than pixels close to it.

2. Pools vs. trampolines

- hard-negative mining
    - sample cases in which neural network has a hard job and let them be labeled.
    - Get new data which is useful for you.
- relabeling --> new pseudo-classes

- over-sampling: Create new image data by randomly copying different parts of the image to create new ones.

    e.g. Filter for zebra stripes.

    ```python
    [
        -1, -1, 1
        -1, -1, 1
        -1, -1, 1
    ]
    ```

- ReLu activiation function is non-linear
    - if linear, the whole Neural network would not be helpful, because I could just create another linear function f3 where f3 = f2(f1(x)) as a linear combination.