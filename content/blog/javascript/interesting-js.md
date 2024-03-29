---
title: 'Javascript - Interesting and cool stuff'
description: 'Concepts, syntax and code snippets of interesting and cool stuff you can do with Javascript'
date: '2019-08-20T23:46:37.121Z'
author: 'André Kovac'
category: 'programming-language'
tags: ['javascript']
---

## [nullish coalescing operator](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Nullish_Coalescing_Operator)

Difference between `??` and `||`:

The **OR** operator `||` uses the right value if left is `falsy`, while the **nullish coalescing operator** `??` uses the right value if left is `null` or `undefined`.

The **OR** operator `||` can be problematic if your left value might contain `""` or `0` or `false` (because these are **falsy** values).

e.g. `isHappy ?? displayConfetti()`

### [Optional Chaining](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Optional_chaining) with the nullish coalescing operator

```js
let customer = {
  name: "Carl",
  details: { age: 82 }
};
const customerCity = customer?.city ?? "Unknown city";
console.log(customerCity); // Unknown city
```

### Other nice application of the `nullish coalescing operator` ??:

The last line of the `useOrientation` function is interesting.

If `forceOrientation` is either `null` or `undefined`, check whether `orientation` is equal to the string `landscape`. Otherwise, compare the `forceOrientation` string.

```tsx
const useOrientation = (forceOrientation?: 'portrait' | 'landscape') => {
  const window = useWindowDimensions();
  const orientation = window.width > window.height ? 'landscape' : 'portrait';

  return (forceOrientation ?? orientation) === 'landscape';
}
```

## `&&` call not returning boolean

If `hasClose` is false, the Button will not be shown..

```js
{
  hasClose && (
    <ButtonIcon
      style={styles.closeButton}
      themeProps={closeThemeProps}
      icon="close"
      onPress={onClose}
    />
  )
}
```

## Use `Boolean()` to check for

Like the bang operator (`!!`), `Boolean()` (not the `Boolean()` constructor) is a function which turns `falsy` values into `boolean` values.

## `console.log` with auto-indent

`console.log` function that auto-indents based on the depth of your call stack ([Tweet from Sophie Alpert](https://twitter.com/sophiebits/status/1058448900460138497)):

```js
function log(message) {
  console.log(
    '  '.repeat(new Error().stack.match(/\n/g).length - 2) + message
  )
}
```

## switch-case

### switch-case chaining

Chain cases (i.e. let several cases have the same result):

```js
case 'BackAction':
case 'back':
case 'pop':
	return currentState.index > 0 ?
		NavigationStateUtils.pop(currentState) :
		currentState;
```

### `switch(true)`

The `switch` statement allows matching an expression (the `switch`) against different values (the `case`).

But you can match against **values** as well as **expressions**.

```js
const weekendDay = date => [0,6].includes(date.getDay());
const restDay = date => date.getDay() === 0;

const openingHours = date => {
  switch(true) {
    case weekendDay(date):
      return "8:00am-12:00pm";

    case restDay(date):
      return "Closed";

    default:
      return "8:00am-20:00pm";
  }
}
```

Read [this article](https://medium.com/trabe/using-switch-true-in-javascript-986e8ad8ae4f) for more.

## Incorrect use of function definitions inside `for` loops:

**Mistake**: Incorrect use of function definitions inside `for` loops.

**Solution**: Use an outer function + inner callback function

```js
var elements = document.getElementsByTagName('input')
var n = elements.length // assume we have 10 elements for this example
var makeHandler = function(num) {
  // outer function
  return function() {
    // inner function
    console.log('This is element #' + num)
  }
}
for (var i = 0; i < n; i++) {
  elements[i].onclick = makeHandler(i + 1)
}
```

**Explanation**: `i` would not be present in function in for loop. By creating a *closure*, it then is present in the inner function returned.

(taken from [JavaScript Not Working? Start with the 10 Most Common Mistakes JavaScript Developers Make](http://www.toptal.com/javascript/10-most-common-javascript-mistakes) - Common Mistake #6)

## Ansi color in `console.log`

```js
console.log('\x1b[41m\x1b[37m%s\x1b[0m', 'FAILED', result)
console.log('\x1b[36m%s\x1b[0m', 'I am cyan') //cyan
```

## Misc

### Logging with `console.log()`

#### `console.log()` vs. `console.dir()`

- `console.log(JSON.stringify(a));`
- `console.dir(a);`

* Current state

[console.log object at current state](http://stackoverflow.com/questions/7389069/console-log-object-at-current-state)

### DOM manipulation

Use DOM id/class/... names

```js
document.getElementById('fb-root')
```

Use CSS selectors

```js
document.querySelector('.ng-scope')
```

### File i/o

- [Reading files in JavaScript using the File APIs](http://www.html5rocks.com/en/tutorials/file/dndfiles/)


## 🤷‍ What's going on here?

I don't understand these bits - I onces wrote it down because I found it interesting but can't recall why I did anymore...

### several expressions on one line with parentheses ()

```js
function C() {
  ;(function f() {
    console.log('i am f')
  },
    (function x() {
      console.log('i am x')
    })(),
    (y = 2),
    console.log('hello'))
}
```

As for the `y === 2`, this is because you did not `var y;` inside `C`, so `y = 2` sets `window.y`, and in the global scope `this === window`.

## Links

- [Eloquent Javascript Book](https://eloquentjavascript.net/)
- Interesting JS topics mentioned, like e.g. _event delegation_:
  [Seven JavaScript Things I Wish I Knew Much Earlier In My Career](http://www.smashingmagazine.com/2010/04/seven-javascript-things-i-wish-i-knew-much-earlier-in-my-career/#event-delegation)
- [ECMAScript6 commands](http://es6-features.org/#Lexicalthis)
- [Seven JavaScript Things I Wish I Knew Much Earlier In My Career](https://www.smashingmagazine.com/2010/04/seven-javascript-things-i-wish-i-knew-much-earlier-in-my-career/#event-delegation)
