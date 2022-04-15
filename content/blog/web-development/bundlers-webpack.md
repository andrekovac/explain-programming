---
title: 'Conformity in the World Wide Web'
description: 'The WWW only works because certain laws of communication were set up and all participants in the internet follow - this article explains some of them'
date: '2021-01-23'
author: 'André Kovac'
category: 'theory'
tags: ['web-development', 'internet']
draft: false
ready: false
published: false
---

## Tree shaking

**tree shaking**: Use named imports instead of global imports

```js
import { namedImport } from "../utils";
```

**cherry-picking**:

```js
// This still pulls in all of lodash even if everything is configured right.
import { sortBy } from "lodash";

// This will only pull in the sortBy routine.
import sortBy from "lodash-es/sortBy";

```

Read [this great article](https://developers.google.com/web/fundamentals/performance/optimizing-javascript/tree-shaking) for more.

## Code splitting

Only load files which are necessary on each route