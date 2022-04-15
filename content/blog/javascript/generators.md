---
title: 'Javascript Generators'
description: 'Iterables, Iterator functions and Generator Functions - ES6 Generators in Javascript explained'
date: '2019-08-20T23:46:37.121Z'
author: 'André Kovac'
category: 'programming-language'
tags: ['javascript']
draft: true
---

## Destructuring of Generator functions

Here not a generator function is used after `yield*`, but another iterable.

```js
function* bla() {
  yield 'sequence'
  yield* ['of', 'yielded']
  yield 'values'
}

let arr = [...bla()]
// ['sequence', 'of', 'yielded', 'values']
```

(from [ES6 generators explained](http://2ality.com/2015/03/es6-generators.html))

## Return statement in a generator

It's possible to [return prematurely inside of a generator function](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/function*#return_statement_in_a_generator).

**Example**: This will still execute a `put` effect and then go to the next iteration of the generator function, yielding the value returned by `put(revokeTokenStart())` which probably is `undefined`:

```ts
if (isOnline && isSignOutNeeded(error))
  return yield put(revokeTokenStart());
```
