---
title: 'JavaScript: Function'
description: 'Javascript functions explained'
date: '2016-05-16T00:00:00.000Z'
author: 'André Kovac'
category: 'programming-language'
tags: ['javascript']
---

Two big ways to define functions: function **expression** (assignment) vs. function **declaration**

## Function **expression** (assignment):

```js
var functionOne = function() {
    // Some code
};
```

* Assigning an anonymous function to a variable.
* *NOT* hoisted, executed
* `console.log(functionOne)` prints `''`.
* can be a **named** function expression:

	```js
	var functionOne = function() {
	    // Some code
	};
	```

##### Local vs. global definition

Defined locally in current scope:

```js
var xyz = function() {}
```

Defined globally if `xyz` was not defined anywhere in the chain of scopes:

```js
xyz = function() {}
```

## Function **declaration**:

```js
function functionTwo() {
    // Some code
}
```

* Function is hoisted to top of script or function (even if `return` occurs in between).
* `console.log(functionTwo.name)` prints `functionTwo`.
* Cannot be nested within non-function statements, e.g. in conditionals (at least in `strict` mode):

	```js
	if (2 === 3) { function myFunc() { ... } }
	```

	* Here `myFunc` **will be hoisted no matter what**, i.e. not only if the condition is fulfilled.
	* In `strict` mode error will be thrown.

###### Complicated example

```js
function xyz(){
  function abc(){};
  // abc is defined here...
}
// ...but not here
```

## Combination of function **expression** and **declaration**

Scope of function declarations is browser dependent :-( :

```js
var xyz = function abc(){
  // xyz is visible here
  // abc is visible here
};
// xyz is visible here
// abc is undefined here (browser dependent, defined in Internet Explorer)
```

To alias functions in **all** browsers use a function expression:

```js
function abc(){};
var xyz = abc;
```

* `xyz` and `abc` are aliases of the same object.

##### Use case of mixed form

Use alias `shortcut` which is only available within the function definition because it comes in more handy:

```js
really.long.external.scoped.name = function shortcut(n) {
  // Let it call itself recursively:
  shortcut(n -1);
  // ...
  // Let it pass itself as a callback:
  someFunction(shortcut);
  // ...
}
```

## Methods

- Functions are called methods when they appear in classes, i.e. prototypes or ES6 classes which essentially are prototypes.

```js
var obj = {
  foo() {},
  bar() {}
};
```

...is a shortcut version for:

```js
var obj = {
  foo: function() {},
  bar: function() {}
};
```

Computed property names:

```js
var bar = {
  ["foo" + 2](){return 2;},
};
console.log(bar.foo2()); // 2
```

## First-class functions

In book `most-adequate-guide` to functional programming, the author never uses the arguments in the first-class functions examples.
E.g. he says the following two examples are equivalent (page 38):

```js
// go back to every httpGet call in the application and explicitly pass err along.
httpGet('/post/2', function(json, err) {
  return renderPost(json, err);
});
```

and

```js
// renderPost is called from within httpGet with however many arguments it wants
httpGet('/post/2', renderPost);”
```

Where did the arguments `json` and `err` go?