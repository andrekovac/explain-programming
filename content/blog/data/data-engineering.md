---
title: 'Data Engineering'
date: '2023-02-08'
author: 'André Kovac'
description: 'About the data engineering process and pipeline'
category: 'data'
tags: ['business-intelligence', 'data-engineering', 'data']
---

## schema-on-read vs. schema-on-write

* schema-on-read: the data is stored in a raw format and the schema is defined at the time of the query
* schema-on-write: the data is stored in a structured format and the schema is defined at the time of the ingestion

## Data pipelines

### ETL (Extract, Transform, Load)

* Extract: data from various sources (e.g. databases, APIs, files, ...)
* Transform: data (e.g. cleaning, aggregating, ...)
* Load: data into a data warehouse (e.g. database, file, ...)

## data warehouse vs. data lake

### data warehouse (schama-on-write)

Data warehouse is a data storage system that is designed to store data for analysis. The data is organized in a way that makes it **easy to query and analyze**. 
Data warehouses are often **optimized for read operations**, and they are usually used for business intelligence and analytics. Data warehouses are different from data lakes in that data lakes are optimized for storing large volumes of raw data, while data warehouses are optimized for storing data that has been cleaned and transformed for analysis.

### data lake (schama-on-read)

Data lake is a data storage system that is designed to store large volumes of raw data. Data lakes are usually optimized for storing large volumes of raw data, and they are often used for data science and machine learning. Data lakes are different from data warehouses in that data warehouses are optimized for storing data that has been cleaned and transformed for analysis, while data lakes are optimized for storing large volumes of raw data.