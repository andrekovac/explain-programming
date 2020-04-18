---
title: 'JavaScript: Closure'
description: 'The theory of closures in Javascript'
date: '2016-04-24T00:00:00.121Z'
author: 'André Kovac'
category: 'programming-language'
tags: ['javascript']
---

`Closure` is also called `Lexical Scope` (also referred to as `Static Scope`)

**Definition**: Inner function has access to outer function's variables.

## Theory

* Closures have access to the outer function's variables even after the outer function returns.

* Closures only make sense when a inner function is declared within the outer function to call later. Otherwise attributes declared within the closure will never be accessible again.

* Inside our scope, we can **return** things so that they’re available in the **parent** scope

* A new closure is created each time the outer function is **called**.

## Examples

1. Call within a function

	* Here variable `a` is inside the closure and only accessible via the inner function which contains an alert

		```js
		var func = (function() {
		  var a = 'val';
		  return function() { alert(a); };
		})(); // no alert fired because it's wrapped in a function.
		var myalert = func;	// does nothing, passes the return value of `func` to `myalert` which is the function containing an alert.
		var myalert = func(); // calls the closure and triggers alert `val`
		typeof myalert === 'undefined' // true, because myalert
		```

		With self-invocation this is actually called a **private scope**

	* Here the first line triggers the alert but the return value of `alert(a)` is `undefined`, so

		```js
		var func2 = (function() {
		  var a = 'val';
		  return alert(a);
		})(); // alerts 'val'
		var myalert2 = func2; // does nothing because `func2` and henceforth `myalert2` are `undefined`.
		typeof func2 === 'undefined' 	// true
		```

	* Without self-invocation the first line is just a function assignment. The second line here invokes the function, which returns yet another function which contains the alert. The third then finally triggers the alert.

		```js
		var func = function(value) {
		  var a = value;
		  return function() { alert(a); };
		};
		var myalert = func('Andre'); // assignment possible
		myalert(); // alert with 'Andre' triggered
		```

		can be also called in one line:

		```js
		func('Andre')();
		```

		That's how e.g. `connect()()` in redux works.

2. Same as above:

	```js
	var sayHello = function (name) {
	  var text = 'Hello, ' + name;
	  return function () {
	    console.log(text);
	  };
	};
	```
