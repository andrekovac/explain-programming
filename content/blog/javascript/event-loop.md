---
title: 'Javascript Event Loop'
description: 'Javascript event loop, synchronous and asynchronous code explained'
date: '2019-08-24T23:46:37.121Z'
category: 'programming-language'
tags: ['javascript', 'theory']
---

**Participants**: Event stack, web APIs, task queue, event loop

Javascript runs an [event loop (greatly explained in this YouTube video)](http://2014.jsconf.eu/speakers/philip-roberts-what-the-heck-is-the-event-loop-anyway.html) in which functions can be registered to run in the next iteration of the never ending single-threaded loop.

- `setTimeout(..., 0)` deferes code in the callback function to be executed when the event stack is empty, e.g.:

  ```js
  setTimeout(function() {
    console.log('hello')
  }, 0)
  ```

### Synchronous code

- Is called in the current iteration is blocking the event loop.
- Code which is **not** called as a call-back from another function (i.e. registered to be executed in the next iteration)

### Asynchronous code

- Registers an `event handler` (a **callback** routine) and doesn't block the event loop.
- With callbacks Javascript is *concurrent* out of the box.
