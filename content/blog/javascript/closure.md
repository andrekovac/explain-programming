---
title: 'JavaScript: Closure'
description: 'The theory of closures in Javascript'
date: '2016-04-24T00:00:00.121Z'
author: 'André Kovac'
category: 'programming-language'
tags: ['javascript']
---

**Definition**: Inner function has access to outer function's variables.


`Closure` captures values of outer scope (via `lexical scope` (also referred to as `Static Scope`)

## Theory

* Closures have access to the outer function's variables even after the outer function returns.

* Closures only make sense when a inner function is declared within the outer function to call later. Otherwise attributes declared within the closure will never be accessible again.

* Inside our scope, we can **return** things so that they’re available in the **parent** scope

* A new closure is created each time the outer function is **called**.

## Examples

1. Call within a function

	* Here variable `a` is inside the closure and only accessible via the inner function which contains an alert.

		```js
		var func = (function() {
		  var a = 'val';
		  return function() { alert(a); };
		})(); // no alert fired because it's wrapped in a function.
		var myalert = func;	// does nothing, passes the return value of `func` to `myalert` which is the function containing an alert.
		var myalert = func(); // calls the closure and triggers alert `val`
		typeof myalert === 'undefined' // true, because myalert doesn't return anything, so it returns 'undefined' implicitly.
		```

		- One can say that `a` is closed inside the function `func`
		- With self-invocation this is actually called a **private scope**

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

## React and Closures

### caching default values for `useState`

[This blog article](https://dev.to/tiagof/react-re-mounting-vs-re-rendering-lnh)
gives a nice example how to cache values of components which mount/unmount without
the need of a **state management library** or **React Context**.

```jsx
const cache = {} // cache defined outside of component

const Counter = (props) => {
    const [count, setCount] = useState(cache[props.name] ?? 0)
    const increment = () => setCount(count + 1)
  ...
```

This code looks good but is problematic:

```jsx
const cache = {}

const Counter = (props) => {
  const [count, setCount] = useState(cache[props.name] ?? 0)
  const increment = () => setCount(count + 1)

  useEffect(() => {
    setCount(cache[props.name] ?? 0) // Retrieve cache with name

    return () => {
      cache[props.name] = count // Store current value in cache before unmount of component
    };
  }, [props.name])

    ...
```

> When the cleanup function is created, count is captured within a closure and it’ll save the wrong data into the cache. If we try to fix this by adding count as a dependency for the hook, then it’ll cause the page to crash due to a circular reference.

To solve this issue, we can use the useRef hook in order to use its mutative current field:

```jsx
const cache = {}

const Counter = (props) => {
	const [count, setCount] = useState(cache[props.name] ?? 0)
	const countRef = useRef(count) // ref
	const increment = () => {
		setCount(count + 1)
		countRef.current++
	}

	useEffect(() => {
		setCount(cache[props.name] ?? 0)
		countRef.current = cache[props.name] ?? 0 // Additionally set ref value with current cache value

		return () => {
			cache[props.name] = countRef.current // use `current` value
		};
	}, [props.name])

	...

```

> Now the cleanup function for the useEffect will always use the most up-to-date data for count when setting the cache's value. This is the approach used within the codesandbox link from before for the "Replicating Re-Rendering" section.

Why is that? - Because the closure does not capture a `primitive` data type (i.e. `count`), but the object `countRef`. The `current` field of `countRef` is mutable and thus the newest value of it will be used.

Example taken from [here](https://www.nikgraf.com/blog/using-reacts-key-attribute-to-remount-a-component).