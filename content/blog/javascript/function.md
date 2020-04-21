---
title: 'JavaScript: Function'
description: 'Javascript functions explained'
date: '2016-05-16'
updated: '2020-04-22'
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

* Assigning an **anonymous function** to a variable.
* *NOT* hoisted, executed
* `console.log(functionOne)` prints `''`.
* Instead of an **anonymous** function a **named** function can be used. Then it's called a **named** function expression:

    ```js
    var functionOne = function functionOne() {
        // Some code
    };
    ```

    Names are useful. They can be seen in stack traces, call stacks and lists of breakpoints.

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

### Complicated example

```js
function xyz(){
  function abc(){};
  // abc is defined here...
}
// ...but not here
```

## Combination of function **expression** and **declaration**

```js
var xyz = function abc(){
  // Some code
};
```

- `xyz` and `abc` are not the same name. This is a so-called **mixed form**.
- The scope of function declarations is **browser dependent** 😩 :

  ```js
  var xyz = function abc(){
    // xyz is visible here
    // abc is visible here
  };
  // xyz is visible here
  // abc is usually undefined here, but defined in Internet Explorer)
  ```

- To alias functions in **all** browsers use a function expression:

  ```js
  function abc(){};
  var xyz = abc;
  ```

  `xyz` and `abc` are now aliases of the same object.

### Use case of mixed form

You'll not find use cases for the mixed form often, but here's an example. Here alias `shortcut` which is only available within the function definition because it comes in more handy:

```javascript {6}
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

- **Functions** are called **methods** when they appear in classes, i.e. prototypes or ES6 classes which essentially are prototypes.

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

You can even use **computed property names**. Here `"foo" + 2` becomes the function name `foo2`:

```js
var bar = {
  ["foo" + 2](){ return 2; },
};

console.log(bar.foo2()); // 2
```

## First-class functions

The following two pieces of code are equivalent:

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

**You might ask**: Where did the arguments `json` and `err` go?

**Answer**: You don't have to wrap the function `renderPost` into an anonymous function as it was done in the first piece of code. In both cases the equivalent of the function `renderPost` is passed to `httpGet` and `httpGet` will know what to do with it.

>Taken from the book `most-adequate-guide` to functional programming in which the author uses the second version in the first-class functions examples (e.g. on page 38).