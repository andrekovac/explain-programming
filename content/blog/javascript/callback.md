---
title: 'JavaScript: Callback'
description: 'The theory of callbacks in Javascript'
date: '2016-04-24T00:00:00.121Z'
author: 'André Kovac'
category: 'programming-language'
tags: ['javascript']
---

## Definition

[Best 1 sentence definition](http://stackoverflow.com/questions/824234/what-is-a-callback-function#answer-11577955):

>A callback function is a function that you pass to someone and let them call it at some point of time.

More difficult definition cited from Wikipedia:

> A callback is a reference to executable code, or a piece of executable code, that is passed as an argument to other code.
> **This allows a lower-level software layer to call a subroutine (or function) defined in a higher-level layer.**

**Tipp**:
> If you just define a function and pass it to another function and called it directly in that function body, **don't call it a callback**. The definition says your passed in function is gonna be called by *"lower-level"* function.

### 2 Examples in one: How to write a function which accepts a callback

* The second parameter of the function `getJSON` is a callback function which is called when
* The second parameter of the function `getUsefulContent` accepts a function with one input parameter. This will be the callback function.

```js
// --file.js--
function getJSON(url, callback) {
  let xhr = new XMLHttpRequest();
  xhr.onload = function () {
    callback(this.responseText)
  };
  xhr.open("GET", url, true);
  xhr.send();
}

export function getUsefulContents(url, callback) {
  getJSON(url, data => callback(JSON.parse(data)));
}
```

```js
// --main.js--
import { getUsefulContents } from "file";
getUsefulContents("http://www.example.com", data => {
  doSomethingUseful(data);
});
```

---

Wrapped as function, the function `callback` is not invoked immediately, but pushed into the event loop and executed asynchronously.

```js
xhr.onload = function () {
	callback(this.responseText)
};
```

Without wrapping it would look like so:

```js
xhr.onload = callback(this.responseText);
```


### [First-order functions/objects](http://stackoverflow.com/questions/705173/what-is-meant-by-first-class-object)

Wikipedia:
>In computer science, a programming language is said to support first-class functions (or function literal) if it treats functions as first-class objects. Specifically, this means that the language supports constructing new functions during the execution of a program, storing them in data structures, passing them as arguments to other functions, and returning them as the values of other functions.


It means that function actually inherits from Object. So that you can pass it around and work with it like with any other object.

In c# however you need to refrain to delegates or reflection to play around with functions. (this got much better recently with lambda expressions)

----

Other programming languages have to resort to `delegates` to pass functions.

### Callback Hell

[How to overcome callback hell](http://callbackhell.com/)