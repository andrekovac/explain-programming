---
title: 'Dataiku'
date: '2023-01-26'
author: 'André Kovac'
description: 'Some information and usage examples of dataiku'
category: 'data'
tags: ['data-science', 'statistics', 'dataiku']
draft: true
---

### Types of dummy variables in Dataiku

**Dummy encoding (vectorization)** (aka One-hot encoding): This method creates a new binary variable for each unique category in a categorical variable. Each observation is then represented by a vector of binary values indicating the presence or absence of each category. One-hot encoding is useful when the categorical variable has a large number of categories or when the categories are not ordinal.

**Replacing by 0/1 flag indicating presence** (aka Binary encoding): This method creates a new binary variable for each category, but instead of indicating the presence or absence of each category, it encodes the category as a binary number. This encoding can be useful when the categorical variable has a moderate number of categories and the categories have an ordinal relationship.

**Target encoding**: This method replaces the categorical variable with the mean target value for each category. This encoding can be useful when the categorical variable has a moderate number of categories and the categories have a strong relationship with the target variable.

**Ordinal encoding**: It assigns a unique integer value to each category in a categorical variable. This is done according to the order of the categories, such that the first category is assigned the value 0, the second category is assigned the value 1, and so on. This encoding method can be useful when the categorical variable represents an ordinal variable, i.e. a variable that has a natural order or ranking. For example, if the categorical variable represents a person's education level (e.g. "high school", "college", "graduate"), it would be appropriate to use ordinal encoding as the levels of education can be ordered.

**Frequency encoding**: It assigns a value to each category in a categorical variable based on the frequency of that category in the data. Specifically, the value assigned to a category is the number of times it appears in the data divided by the total number of occurrences of all categories in the variable. This encoding method can be useful when the categorical variable represents a variable that has a lot of categories and the categories with more observations have more importance. It can also be useful if the categorical variable has a high cardinality, meaning it has many unique categories.

**Feature hashing (for high cardinality)** - high cardinality meaning the categorical variable has many unique categories: The feature hashing method (also known as the "hashing trick" or "vector hashing") applies a hash function to the categorical variable, which maps each category to a fixed-length vector or feature. This allows for a reduction in dimensionality and can be useful for handling categorical variables with a large number of categories, as it can be impractical to one-hot encode all of them. The result of the hash function is a fixed-length vector, usually of a smaller dimension than the number of unique categories, and this vector is used as a feature in the machine learning model.
It's worth noting that one downside of feature hashing is that it can lead to hash collisions, which means that different categories may be mapped to the same feature. This can result in a loss of information and potentially negatively impact the performance of the model.
