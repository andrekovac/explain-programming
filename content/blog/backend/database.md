---
title: 'Database'
description: 'How to design and set up a database'
date: '2020-11-15'
author: 'André Kovac'
category: 'other'
tags: ['server', 'dev-ops']
draft: true
---

## Postgres

### Setup

#### Windows default

1. **OSX**: Install postgres via `brew install postgres`
2. On **windows** default user is `postgres` with DB named `postgres`
3. Open **TablePlus** and connect to user named `postgres`.

#### Create Postgres DB

Follow great instructions [in this tutorial](https://developer.okta.com/blog/2018/12/13/build-basic-app-spring-boot-jpa).

### Start DB

- Windows: `pg_ctl start`
- Mac: `brew services start postgres`

### Kill processes

Kill process running on port `8080`:

```bash
kill $(lsof -t -i:8080)
```

## Design Database schema

[DBDocs.io](https://dbdocs.io/) is an online tool which uses the [DBML modeling language](https://www.dbml.org/docs/#index-definition) to create nice database diagrams.


## OSX Database Software

- [TablePlus](https://www.tableplus.io/) is nice!
