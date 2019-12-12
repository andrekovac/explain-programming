---
title: 'React Profiler'
description: 'What to see in the React profiler and tips on how to fix performance issues.'
date: '2019-12-12T12:00:00.000Z'
author: 'André Kovac'
category: 'framework'
tags: ['javascript', 'react', 'performance']
draft: true
---

# React profiler

[Good video](https://www.youtube.com/watch?v=00RoZflFE34)

### Profiler

Gives you per component

* duration of load
* amount of renders

### Solutions

* Wrap component in `React.memo`
* Use `useMemo` hook for values which don't have to be recomputed in every render
* Use **lazy loading** if a lot of things are rendered on a page and not everything is needed at once.