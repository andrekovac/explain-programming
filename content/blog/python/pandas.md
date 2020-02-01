---
title: 'Python Pandas'
description: 'Most important usage and commands of the python data science framework Pandas'
date: '2020-01-21T00:00:00.000Z'
author: 'André Kovac'
category: 'framework'
tags: ['python', 'data-science', 'machine-learning', 'artificial-intelligence', 'statistics']
draft: true
---

## Series

`(pd.Series(df.columns.values).str.contains("Fahrer") == True).tolist()`


* Return information about the elements of a Series

e.g. to count

```python
my_series.value_counts()
```

Operations on Series:

| Function | What? |
| --- | --- |
| `unique()` | |
| `nunique()` | |
| `apply(someFunction)` | Apply function to every element in column |
| `del df['new']` | Delete column *new* |
| `df.drop(['new'], inplace = true)` | Delete column *new* |
| `df.dropna()` | Remove lines with `nan` values |
| `df.transpose()` or just `df.T` | Transpose |


## Dataframe

* Column selection: `df[['A', 'C']]`
* Row selection: `df.loc[['A', 'C']]`

* Conditional selection

  > Broadcast Series of boolean values of a column accross the entire dataframe

  ```python
  df[ (df['A'] > 0) & (df['B'] == 0) ]
  ```

* `set_index(list_of_new_indices)`, `reset_index()`

* `inplace` argument in most Pandas functions

  Mutate object

* Functions: `df.info()`, `df.dtypes`, `df.describe()`,
* Attributes: `df.columns`, `df.index`

* `groupby('ColumnName').describe().transpose()`

* Sort by `Name`: `df.sort_values(by='Name', ascending=False)`

* Missing values:

    * `df.dropna()`
    * `df.dropna(axis=1)`
    * `df.dropna(thresh=2)`
    * `df.fillna(value='FILL VALUE')`
    * `df['A'].fillna(value=df['A'].mean())`

## Read data

```python
read_csv('path/to/file.csv')

read_excel('path/to/excel_file.xlsx', sheet_name = 'Sheet1')
#
df.to_csv('myname.csv', index=True)
```

Excel files sometimes adds an `Unnamed: 0` column. Delete it:

```python
df.drop('Unnamed: 0', axis=1)
```

## Categorical variables

Here `pd.get_dummies` and `pd.CategoricalDtype` are introduced:

[Interesting problem with nice solution](https://stackoverflow.com/questions/59907858/how-do-you-calculate-the-sum-based-on-certain-numbers-in-the-dataframe)

Get sum of elements in `b` depending on indices of `a`:

```python
a = pd.DataFrame(np.array([[1, 1, 2, 3, 2], [2, 2, 3, 3, 2], [1, 2, 3, 2, 3]]))
b = np.array([0.1, 0.3, 0.5, 0.6, 0.2])

# Get categorical values
a_cat = a.T.astype(pd.CategoricalDtype(categories=[1, 2, 3]))
# Create 5x9 matrix with dummy values
dummies = pd.get_dummies(a_cat)
# Computing dot product of this dummmy matrix with b is exactly sum of necessary parts
result = b.dot(dummies).reshape(3, 3)
```

**Note**: Dummy variables are related to one-hot-encoding (1 is on, 0 is off)