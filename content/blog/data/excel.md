---
title: 'Excel'
date: '2023-02-12'
author: 'André Kovac'
description: 'Some excel commands'
category: 'data'
tags: ['business-intelligence', 'data', 'microsoft office']
---

## Shortcuts

- Mark all data in a data sheet: `Ctrl + Shift + Down` + `Ctrl + Shift + Right`

## VLookup vs. Index + Match

English

```excel
=INDEX(Tabelle2.$B$2:$B$48; MATCH(MID($A5199;5;3);Tabelle2.$A$2:$A$48;0))
```

German

```excel
=INDEX(Tabelle2.$B$2:$B$48; VERGLEICH(TEIL($A5199;5;3);Tabelle2.$A$2:$A$48;0))
```


## Structured referencing

Structured referencing allows you to reference a cell in a table by its column name instead of its column number.

### Example

Instead of

```excel
=TEXT(A2,"00000")
```

you can write 

```

```

- In `[@[SicCodes.1]]` (equivalent: `[@[#"SicCodes.1"]]`):
  - The outer square brackets `[]` indicate that you are referring to a column in a table.
  - `@`  is a shorthand notation for the current row.