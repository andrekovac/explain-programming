---
title: 'JavaScript: ES6, ES7 and ES8 syntax'
description: 'Modern Javascript syntax introduced in EcmaScript versions ES6, ES7 or ES8'
date: '2016-05-20T00:00:00.000Z'
author: 'André Kovac'
category: 'programming-language'
tags: ['javascript']
---

## Some ES6/ES7 features

### Destructuring

[Nice summarizing article about destructuring in ES6](https://ponyfoo.com/articles/es6-destructuring-in-depth)

* Nesting + defining aliases

	```js
	var foo = { bar: { deep: 'pony', dangerouslySetInnerHTML: 'lol' } }
	var {bar: { deep, dangerouslySetInnerHTML: sure }} = foo
	console.log(deep)
	// <- 'pony'
	console.log(sure)
	// <- 'lol'
	```

* Function call + alias and default value at the same time

	```js
	function greet ({ age, name:greeting='she' }) {
	  console.log(`${greeting} is ${age} years old.`)
	}
	greet({ name: 'nico', age: 27 })
	// <- 'nico is 27 years old'
	greet({ age: 24 })
	// <- 'she is 24 years old'
	```

	Also works in loops, e.g.

	```js
	for ({ foo : { smallfoo }, bar } in myArray) { ... }`
	```

* Default (optional) values nested

	```js
	function random ({ min=1, max=300 } = {}) {
	  return Math.floor(Math.random() * (max - min)) + min
	}
	console.log(random())
	// <- 133
	```

### Default values

```js
var {foo=3} = { bar: 2 }
console.log(foo)
// <- 3
```

Wonderful example: **Required values** - throws an error if value is called

```js
// utils.js
const is = {
  get required(){
    throw new Error('Required argument')
  }
}
```

```js
// main.js
import { is } from 'utils'

const foo(name = is.required) => Array.from(name)
```

This example is from a world without Typescript.

### Object [key] setting syntax

[from here](https://davidwalsh.name/es6-features?utm_source=javascriptweekly&utm_medium=email#comment-507220)

```js
let myKey = 'variableKey';
let obj = {
    key1: 'One',
    key2: 'Two',
    [myKey]: 'Three' /* yay! */
};
```

### Async await

>In fact every ***async*** function you write will **return a promise**, and every single thing you ***await*** will ordinarily **be a promise**.

[Excellent article](https://jakearchibald.com/2017/await-vs-return-vs-return-await/) about the difference between `await`, `return` and `await return`

#### Try-Catch in async/await

Create helper function ([Example from this SO answer](https://stackoverflow.com/questions/40884153/try-catch-blocks-with-async-await/49311904#49311904))

```js
// utility.js
export function catchEm(promise) {
  return promise.then(data => [null, data])
    .catch(err => [err]);
}
```

...and call it to handle errors similar to how GoLang does it:

```js
import catchEm from 'utility';

async performAsyncWork() {
  const [err, data] = await catchEm(asyncFunction(arg1, arg2));
  if (err) {
    // handle errors
  } else {
    // use data
  }
}
```

#### Async await in functional methods

- [How to use async functions with Array.reduce in Javascript](https://advancedweb.hu/how-to-use-async-functions-with-array-reduce-in-javascript/)
