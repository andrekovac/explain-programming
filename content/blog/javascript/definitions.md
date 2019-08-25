---
title: Javascript Definitions
description: Important definitions of the Javascript programming language
date: '2019-08-25T23:46:37.121Z'
category: 'programming-language'
tags: ['javascript', 'definitions']
---

## strict mode

- Add the following line at the **beginning** of your script!

  ```js
  'use strict'
  ```

- More information: [JavaScript Use Strict](http://www.w3schools.com/js/js_strict.asp)

## `with`

In the following example `Math` is added to the top of the scope chain and thus you don't have to write `Math.PI`.

```js
var a, x, y
var r = 10

with (Math) {
  a = PI * r * r
  x = r * cos(PI)
  y = r * sin(PI / 2)
}
```

see [with statement documentation](https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Statements/with).

## **Literal** vs. **Object**

- Array Literal

  ```js
  ['eat', 'bananas']
  ```

- Array Object

  ```js
  new Array('eat', 'bananas')
  ```
## rest vs. spread operator `...`

- `rest` operator gives you rest of input arguments as array. Should always occur at end of the list.
- `spread` operator splits array into single arguments for a function.

[... spread operator documentation](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Spread_operator)

## `bind()`

Example from [MDN](https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_objects/Function/bind):

In `bind(context, [variable1, variable2, ...])` the `context` will be bound as `this` to the newly created `bound function`.

```js
this.x = 9
var module = {
  x: 81,
  getX: function() {
    return this.x
  },
}

module.getX() // 81

var retrieveX = module.getX
retrieveX()
// returns 9. The function gets invoked at the global scope.

// Create a new function with 'this' bound to module
// New programmers might confuse the
// global var x with module's property x
var boundGetX = retrieveX.bind(module)
boundGetX() // 81
```

## `call()`, `apply()`

_UNDER_CONSTRUCTION_

[apply() docs](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function/apply)
