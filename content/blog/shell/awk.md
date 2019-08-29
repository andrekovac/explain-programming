---
title: awk
date: '2018-01-08T17:52:03.284Z'
description: 'Examples on how to use the `awk` shell command'
category: 'shell'
tags: ['bash']
---

## Columns

Columns (made of empty space, tab etc.) with `$` syntax:

```bash
cat data.log | grep :2[0-9] | awk '{print $4 " " $8 " " $10 " " $11}'
```

Example in **docker**:

Remove all docker images which don't have a corresponding container anymore, i.e. grab all lines which begin with `<none>` and run the `docker rmi` command on its thrid column which happens to be the image's name:

```bash
docker rmi $(docker images | grep "^<none>" | awk '{print $3}')
```
