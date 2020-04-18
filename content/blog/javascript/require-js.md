---
title: 'Require.js'
description: 'Require.js commands'
date: '2018-02-02T00:00:00.000Z'
author: 'André Kovac'
category: 'framework'
tags: ['javascript', 'outdated']
---

`require.js` lets you load files on demand.

## Background

* AMD compliant
	* asynchronous
	* suitable for browser
	* similarity to spec of common.js


## Commands

### require

Load and use stuff (objects, functions, values etc.)

**Example**

```js
require(['app/user'], user => {
	app.init({}, () => {
	console.log('foo');
	}
}
```


### define

Declare a module other parts of your application will depend on.

**Example**

```js
define('someName', ['foo', 'bar'], (foo, bar) {
	// do stuff with `foo` and `bar`
	return something;
});
```

Adding a name (here `someName`) and adding dependencies this definition is using is optional.