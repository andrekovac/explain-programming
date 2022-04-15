---
title: 'The pain we had with JavaScript functions'
description: 'Understand the complexities developers faced when dealing with Javascript functions before ES6 fat arrow functions simplified a lot.'
date: '2016-05-16'
datePublished: '2020-10-20'
updated: '2020-04-22'
author: 'André Kovac'
category: 'programming-language'
tags: ['javascript', 'theory']
ready: true
---

[Arrow function expressions](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/Arrow_functions) (also called **fat arrow functions**) simplify JavaScript a lot.

In the past a lot of care had to be taken concerning topics like `scope` and the `this` keyword.

This got much less relevant now. In this article I look at the ways functions in JavaScript traditionally work and highlight how arrow functions simplify everything.

## Different ways of defining functions

When you work with different code bases you'll notice different ways of defining functions. You might have encountered all or a subset of these:

```js
// Function expression
var functionOne = function () {
  /* Some code */
};
// Named function expression
var functionOne = function functionOne() {
  /* Some code */
};
// Function declaration
function functionTwo() {
  /* Some code */
}
// Mixed form
var xyz = function abc() {
  /* Some code */
};
```

Usually you'll work with ES6 arrow-function syntax which simplifies dealing with the `this` keyword:

```js
// The handling of 'this' is different in arrow functions compared to regular functions.
const functionOne = () => {
  /* Some code */
};
```

But you'll still might come across such syntax and ... got very confused when starting out to learn Javascript.

There are two major ways to define functions in Javascript:

- As function **expression** (assignment)
- As function **declaration**

## Function **expression** (assignment):

```js
var functionOne = function () {
  // Some code
};
```

- Assigning an **anonymous function** to a variable.
- _NOT_ hoisted, executed
- `console.log(functionOne)` prints `''`.

### Named function expressions

Instead of an **anonymous** function a **named** function can be used. Then it's called a **named** function expression.

**Attention**: This one is very easily mistaken with function declarations!

```js
var functionOne = function functionOne() {
  // Some code
};
```

**Note**: Names are useful. They can be seen in stack traces, call stacks and lists of breakpoints.

### Local vs. global definition (`var` or no `var`)

Defined locally in current scope:

```js
var xyz = function () {};
```

Defined globally if `xyz` was not defined anywhere in the chain of scopes:

```js
xyz = function () {};
```

## Function **declaration** (aka **function statement**):

```js
function functionTwo() {
  // Some code
}
```

- Function is **hoisted** to top of script or function (even if `return` occurs in between).
- Has name: `console.log(functionTwo.name)` prints `functionTwo`.
- In `strict` mode, a function cannot be nested within non-function statements, e.g. in conditionals:

    Let's look at this cod example:

    ```js
    if (2 === 3) {
      function myFunc() { ... }
    }
    ```

    - Here `myFunc` **will be hoisted no matter what**, i.e. not only if the condition is fulfilled.
    - In `strict` mode error will be thrown.

### Nested function declarations

Scope when nesting function declarations:

```js
function xyz() {
  function abc() {}
  // abc is defined here...
}
// ...but not here
```

## Mixed Form: Combination of function **expression** and **declaration**

```js
var xyz = function abc() {
  // Some code
};
```

- `xyz` and `abc` are not the same name. This is a so-called **mixed form**.
- The scope of function declarations is **browser dependent** 😩 :

    ```js
    var xyz = function abc() {
      // xyz is visible here
      // abc is visible here
    };
    // xyz is visible here
    // abc is usually undefined here, but defined in Internet Explorer!
    ```

- To alias functions in **all** browsers use a function expression:

  ```js
  function abc() {}
  var xyz = abc;
  ```

  `xyz` and `abc` are now aliases of the same object.

### Use case of mixed form

You'll not find use cases for the mixed form often, but here's an example. Here alias `shortcut` which is only available within the function definition because it comes in more handy:

```javascript {6}
really.long.external.scoped.name = function shortcut(n) {
  // Let it call itself recursively:
  shortcut(n - 1);
  // ...
  // Let it pass itself as a callback:
  someFunction(shortcut);
  // ...
};
```

## Methods

- **Functions** are called **methods** when they appear in classes, i.e. prototypes or ES6 classes (which essentially are prototypes).

```js
var obj = {
  foo() {},
  bar() {},
};
```

...is a shortcut version for:

```js
var obj = {
  foo: function () {},
  bar: function () {},
};
```

You can even use **computed property names**. Here `"foo" + 2` becomes the function name `foo2`:

```js
var bar = {
  ['foo' + 2]() {
    return 2;
  },
};

console.log(bar.foo2()); // 2
```

## First-class functions

The following two pieces of code are equivalent:

```js
// go back to every httpGet call in the application and explicitly pass err along.
httpGet('/post/2', function (json, err) {
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

> Example taken from the book `most-adequate-guide` to functional programming in which the author uses the second version in the first-class functions examples (e.g. on page 38).

## Cases where you still have to use function declarations (instead of arrow functions)

- e.g. generator functions