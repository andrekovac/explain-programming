---
title: 'Functional JavaScript'
description: 'The usage of functional programming concepts in Javascript'
date: '2019-08-20T23:46:37.121Z'
author: 'André Kovac'
category: 'programming-language'
tags: ['javascript', 'functional']
draft: true
---

- [An Introduction to Functional JavaScript](http://www.sitepoint.com/introduction-functional-javascript/)

--> see separate file `Functional Javascript.md`

## Immutability in JS

Don't mutate an object, but create a new one with the change, i.e. create a new object in memory with a new reference

- Vanilla JS

      	```js
      	// objects
      	var yourCarRepainted = Object.assign({}, yourCar, { color: 'red' });
      	// array
      	var changedList = [].concat(list);
      	```

- immutable.js