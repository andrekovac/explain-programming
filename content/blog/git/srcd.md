---
title: 'Git: Code as data'
description: 'What you can do with the tool `srcd` (from source{d}) to transform your git repository into a database which you can query'
date: '2019-06-07T02:30:00.169Z'
category: 'tool'
tags: ['git']
---

The company [source{d}](https://sourced.tech/) offers a tool `srcd`.
I was part of a workshop by [Francesco ...](https://twitter.com/francesc) at [Galvanize]() in San Francisco in April 2019.

See [https://github.com/src-d/engine-analyses]() for some Jupyter notebooks which demo the tool.

## Facts

* Use `git` repositories as data source to analyze.
* Run SQL queries on all infos in the GIT repo.
* Implements a **Code as Data** philosophy

## Run

1. Download `srcd` from [the sourced website](https://sourced.tech/get-started/)
2. Navigate to the git repo you want to analyze
3. Run `srcd sql` for a cli tool or `srcd web sql` for a nice browser UI
4. Run SQL commands (see examples below)

## Commands

Examples of what might be interesting to query in a `git` repository.

### Total number of commits

```sql
SELECT COUNT(*) FROM commits;
```

### List up to 10 repositories in a project

```sql
SELECT *
FROM refs
WHERE ref_name="HEAD"
LIMIT 10;
```


### Most productive devs in a project

```sql
SELECT commit_author_name, COUNT(*) as n
FROM commits
GROUP BY commit_author_name
ORDER BY n DESC;
```


### Most used programming language in project

```sql
SELECT LANGUAGE(te.tree_entry_name) as lang, COUNT(*) as n
FROM refs r
NATURAL JOIN commit_trees ct
NATURAL JOIN tree_entries te
WHERE r.ref_name = 'HEAD'
	AND te.tree_entry_mode != 40000
GROUP BY lang
ORDER BY n DESC
```


### Most used words given a programming language

```sql
SELECT LANGUAGE(file_path, blob_content) AS lang,
	file_path,
    blob_content,
	UAST(blob_content,
         	LANGUAGE(file_path, blob_content),
         	'//uast:String/Value') as strings
FROM files
WHERE lang = 'JavaScript'
LIMIT 10;
```