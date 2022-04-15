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

### Return information about the elements of a Series

e.g. to count

```python
my_series.value_counts()
```

### Operations on Series:

| Function    | What?                                                          |
| ----------- | -------------------------------------------------------------- |
| `unique()`  | [Removes duplicate values](https://pandas.pydata.org/pandas-docs/stable/reference/api/pandas.Series.unique.html?highlight=unique#pandas.Series.unique) |
| `nunique()` | Returns the number of unique values                 |
| `apply(someFunction)` | Apply function to every element in column |


## Dataframe

| Function                           | What?                          |
| ---------------------------------- | ------------------------------ |
| `del df['new']`                    | Delete column *new*            |
| `df.drop(['new'], inplace = true)` | Delete column *new*            |
| `df.dropna()`                      | Remove lines with `nan` values |
| `df.transpose()` or just `df.T`    | Transpose                      |

### Data selection

* Column (label) selection: `df[['A', 'C']]`

  * Get column as **Series**: `df['A']`
  * Get column as **DataFrame**: `df[['A']]`

* **Row** selection: `df.loc[['A', 'C']]`

* All rows of certain columns (labels)

  Get pointers to original object (references):

  ```py
  df.loc[:, ['A', 'B']]
  ```

  Get **copy** of columns:

  ```py
  df[['A', 'C']]
  ```

* By position (index)

  ```python
  df.iloc[3]
  ```


* Conditional Selection

  > Broadcast Series of boolean values of a column across the entire DataFrame

  ```python
  df[ (df['A'] > 0) & (df['B'] == 0) ]
  ```

  > Using `isin()`

  ```python
  df2['E'] = ['one', 'one', 'two', 'three', 'four', 'three']

  df2[df2['E'].isin(['two', 'four'])]
  ```

#### Index

* `set_index(list_of_new_indices)`

* `reset_index()`

  Useful when creating a new data frame out of another data frame, e.g.

  ```python
  new_df = pd.DataFrame(pd.Series(new_df)).reset_index()
  ```

  Or when resetting the index after filtering out missing values with `dropna()`

#### Notes

* `inplace` argument in most Pandas functions: If set to `true` (`inplace=True`), it mutates the object.

* Selection by callable: `df1.loc[lambda df: df['A'] > 0, :]` [see Documentation](https://pandas.pydata.org/pandas-docs/stable/user_guide/indexing.html#selection-by-callable)


### Attributes:

* `df.columns`
* `df.index`

### Functions

* `df.info()`, `df.dtypes`, `df.describe()`,

* `groupby('ColumnName').describe().transpose()`

* Sort by `Name`: `df.sort_values(by='Name', ascending=False)`


#### Missing values:

  * `df.isnull()` (alias: `df.isna()`)
  * `df.dropna()`
  * Drop row if a certain column (label) is NaN:

    ```python
    df.dropna(subset=['label_name'])
    ```

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

## Learning materials

- [100 Pandas Puzzles](https://github.com/ajcr/100-pandas-puzzles)
- [10 Minutes to Pandas](https://pandas.pydata.org/pandas-docs/stable/getting_started/10min.html)

## Do's and dont's

### Merging several boolean conditionals

What to do if you need data based on **two** categorical variables?

Use `groupby` and `agg` to simplify merging of data based on

```py
# 1 case
df_temp1 = df[df['male'] == True]
df_temp2 = df_temp1[df_temp1['underserved'] == True]
engagement_index_of_group_mean = mean(df_temp2['engagement_index'])
# Repeat 3 more times....
# and then plot these four mean values.

# Or simpler
engagement_index_means = merged_data.groupby(['pre_covid', 'underserved']).agg({'engagement_index': 'mean'}).reset_index()

sns.barplot(x="underserved", y="engagement_index", hue="pre_covid", data=engagement_index_means)
```

### Create categorical variable for two groups instead of splitting up data set

Tools like `seaborn` can then do the heavy lifting for you and create nice summary plots.