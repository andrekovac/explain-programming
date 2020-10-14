---
title: 'JavaScript: Scope'
description: 'The theory of scope in Javascript'
date: '2016-04-24T00:00:00.121Z'
author: 'André Kovac'
category: 'programming-language'
tags: ['javascript']
---

[Difference between **variable scope** and `this`](https://stackoverflow.com/questions/34696686/what-is-lexical-this#answer-41727513):

* If a variable is called it's definition is searched for in current scope, then parent scope, then grandparent scope and so on until it is found (a.k.a lexical scope)
* In function definitions which are *not* arrow functions `this` value is defined for me `implicitly` (as `execution context`, see more below in the `this` section!).
* In arrow functions, this retains the value  of the enclosing lexical context's this.

- [Everything you wanted to know about JavaScript scope](https://toddmotto.com/everything-you-wanted-to-know-about-javascript-scope/)

## Important facts

#### Local scopes are only

New functions = new scope - that’s the rule.

#### `setTimeout`

Variables called within a `setTimeout` function call address the values in the global scope, even if the variable values are set differently locally.

#### function hoisting

function declaration overrides variable declaration when hoisted *only if variable is not assigned yet*.

#### function expressions (anonymous functions)

Function expressions are **not** hoisted.

```js
var myName = function() {
	console.log('Andre");
}
```

### this

`deep_thought` is the execution context and thus `this` is the `deep_thought` object, so it's variables are available with `this` in `ask_question` method! ([taken from this perfect explanation](http://web.archive.org/web/20110725013125/http://www.digital-web.com/articles/scope_in_javascript/) by using execution context and object oriented design in the article!))

```js
var the_answer = 0;

var deep_thought = {
  the_answer: 42,
  ask_question: function () {
    return this.the_answer;
  }
};

var the_meaning = deep_thought.ask_question();
```

Here another example (in which `this` is actually not needed): `this` is bound in the

```js
var Word = function(t) {
	var text = t;
	var translate = function(lang) {
		switch (lang) {
			case 'foo':
				t = this.text.substring(1, this.text.length) + "aaaaa";
				break;
			default:
				t = "I don't speak " + lang
		}
		return t;
	}
	return {
		text: text,
		translate: translate,
	}
}
```

[An article](http://stackoverflow.com/questions/346015/javascript-closures-and-this) or [another article](https://toddmotto.com/everything-you-wanted-to-know-about-javascript-scope/) and [an article about the execution context](http://davidshariff.com/blog/what-is-the-execution-context-in-javascript/) and [here a quiz inside a stackoverflow answer](https://stackoverflow.com/questions/3127429/how-does-the-this-keyword-work?utm_medium=organic&utm_source=google_rich_qa&utm_campaign=google_rich_qa#answer-3127440)

`this` always refers to the inner function, if you have nested functions, you have to create another variable and point that to `this`.

```js
var myObject = {
    AddChildRowEvents: function(row, p2) {
        var that = this;
        if(document.attachEvent) {
            row.attachEvent('onclick', function(){that.DoSomething();});
        } else {
            row.addEventListener('click', function(){that.DoSomething();}, false);
        }
    }
}
```

##### Solve `this` issue

Before

```js
var nav = document.querySelector('.nav'); // <nav class="nav">
var toggleNav = function () {
  console.log(this); // <nav> element
  setTimeout(function () {
    console.log(this); // [object Window]
  }, 1000);
};
nav.addEventListener('click', toggleNav, false);
```

After

```js
var nav = document.querySelector('.nav'); // <nav class="nav">
var toggleNav = function () {
  var that = this;
  console.log(that); // <nav> element
  setTimeout(function () {
    console.log(that); // <nav> element
  }, 1000);
};
nav.addEventListener('click', toggleNav, false);
```


### Changing scope with `call`, `apply` and `bind`

[source](https://toddmotto.com/everything-you-wanted-to-know-about-javascript-scope/)

With `.call` and `.apply` you can call your function with a desired `scope` (i.e. a desired `this` value) plus optional arguments.

`.call` and `.bind` are the same, only `.bind` does not call the function. With `.bind` the function isn’t invoked, and the scope can be changed if needed, but arguments are sat waiting to be passed in.

* `call`: `.call(scope, arg1, arg2, arg3)`
* `apply`: `.apply(scope, [arg1, arg2])`
* `bind`: `.bind(scope, arg1, arg2, arg3)`


Usage of `.bind`:

```js
nav.addEventListener('click', toggleNav.bind(scope, arg1, arg2), false);
```

### Public and Private Scope

[source](https://toddmotto.com/everything-you-wanted-to-know-about-javascript-scope/)

```js
var Module = (function () {
  var myModule = {};
  var _privateMethod = function () {

  };
  myModule.publicMethod = function () {

  };
  myModule.anotherPublicMethod = function () {

  };
  return myModule; // returns the Object with public methods
})();

// usage
Module.publicMethod();
```

or

```js
var Module = (function () {
  var _privateMethod = function () {

  };
  var publicMethod = function () {

  };
})();
```
