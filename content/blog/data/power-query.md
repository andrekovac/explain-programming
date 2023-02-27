---
title: 'Microsoft Power Query'
date: '2023-02-14'
author: 'André Kovac'
description: 'Some information and usage examples of power query syntax'
category: 'data'
tags: ['data-science', 'statistics', 'excel', 'power-bi', 'microsoft']
---

## Power Query + DAX (Data Analysis Expressions)

- Power Query is a tool for importing data into Power BI. It is similar to Excel's Get & Transform feature.
- DAX is a language for creating calculations in Power BI. It is similar to Excel formulas, but with more features.

## Examples

### Format Text

```dax
Text.PadStart(Text.From([SicCodes.1]), 5, "0")
```

### `DIVIDE` vs. `/`

`DIVIDE` is a **DAX** function, while `/` is an arithmetic operator.

The `DIVIDE` function is used to divide two numbers and returns a null value if the denominator is zero, while the / operator is used to divide two numbers and will return an error if the denominator is zero.

```dax
sex_ratio = ROUND(IFERROR(covid[female_smokers]/covid[male_smokers], -1), 3) * 100
```

*Cleaner* solution:

```dax
sex_ratio = ROUND(DIVIDE(covid[female_smokers], covid[male_smokers]), 3) * 100
```

Example for the [public covid 19 data set](https://github.com/owid/covid-19-data).
