---
title: 'Microsoft Power BI'
date: '2023-01-25'
updated: '2023-03-15'
author: 'André Kovac'
description: 'Some information and usage examples of power bi'
category: 'data'
tags: ['data-science', 'statistics', 'power-bi', 'microsoft']
---

## Power BI (Business Intelligence) Desktop

- Power BI Desktop is a tool for creating reports and dashboards. It is similar to Excel, but with more features.
- An ETL (Extract, Transform, Load) tool for creating reports and dashboards.

## Fact tables vs. Lookup/Filtering tables



## Measure vs. Columns (aka Dimensions)

### Measures

- Measures are calculated values. They are computed from the data in the table when the report is loaded.
- Example: `Cases per Death = sum(covid[total_cases_per_million]) / sum(covid[total_deaths_per_million]`
- Other example:

```dax
Poverty Death Index = IF(
    OR(
        ISBLANK(AVERAGE(covid[extreme_poverty])),
        ISBLANK(AVERAGE(covid[total_deaths_per_million]))
    ),
    "Cannot compute", 
    AVERAGE(
        covid[extreme_poverty]) * AVERAGE(covid[total_deaths_per_million]
    )
)
```


### Columns

- Columns are the data that is used to create the report. They are not calculated and can be used to filter the data.
- Example: `Total deaths category = IF(covid[total_deaths]>average(covid[total_deaths]), "High", "Low")`

## DAX

### Correlation Coefficient

```dax
Correlation Coefficient = DIVIDE(
    SUMX(
        'cars',
        ('cars'[price] - AVERAGE('cars'[price])) * ('cars'[mileage] - AVERAGE('cars'[mileage]))
    ),
    (COUNTROWS('cars') - 1) * STDEV.P('cars'[price]) * STDEV.P('cars'[mileage])
)
```
