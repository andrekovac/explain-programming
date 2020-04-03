---
title: 'Redux'
description: 'Principles of the state management library Redux'
date: '2016-03-20T21:06:00.000Z'
author: 'André Kovac'
category: 'framework'
tags: ['javascript', 'react']
---

Manage the state of an application. Enhancement of the flux framework/concept for managing the state in react components.

## Three principles of redux

1. The state/state-tree ...

	... is a single immutable state as javascript object

2. Change state --> Dispatch an action

Application `state` is stored in one big javascript object. The state is `read-only`! Only dispatched (versendete) `actions` can change the state.

Any data which gets into the redux application, gets there by actions!

3. Reducer --> function which does state mutations

State mutations in the app have to be described by `pure functions` = previous state + dispatched action = next state of app.
Pure function but with references to properties of the former state for stuff which hasn't changed. --> makes redux fast!

## How to build a redux app

1. `reducer.js`
2. `createStore` in `index.js`

	Confusing naming: The `store` is the redux `state`

3.


## Methods on the store

	store.getState();

	store.dispatch({ type: 'INCREMENT' });


### Print to console vs. render to body

* `console.log()`

	```js
	console.log(store.getState());
	```

* update, i.e. render ui to reflect current state

	Register a callback anytime the particular action  is dispatched

	```js
	const render = () => {
		document.body.innerText = store.getState();
	};

	store.subscribe(render);
	render(); // render the initial state

	document.addEventListener('click', () => {
		store.dispatch({ type: 'INCREMENT' });
	});
	```


## Side note: Pure functions vs. impure functions

* Pure functions: No side-effects, return new objects
* Impure functions: Can contain side-effects, e.g. write to

## Links

[Great tutorial videos for Redux](https://egghead.io/series/getting-started-with-redux)

[Detailed Redux Documentation](http://redux.js.org/index.html)

[Egghead Redux Course](https://egghead.io/series/getting-started-with-redux)

## Mini Redux implementation

Load script in html or add with `npm`.

### Reduce function

```js
const counter = (state = 0, action) => {
	switch(action.type) {
		case 'INCREMENT':
			return state + 1;
		case 'DECREMENT':
			return state - 1;
		default:
			return state;
	}
}
```

### Changing state by dispatching actions

```js
const { createStore } = Redux;
const store = createStore(counter);

console.log(store.getState());

store.dispatch({ type: 'IINCREMENT' });
console.log(store.getState());
```

### Render to body with `.subscribe()`. Calls a callback everytime an action is dispatched.

```js
const render = () => {
	document.body.innerText = store.getState()
};

store.subscribe(render);
render(); // get initial count of 0

// Using naive event handler (not react or similar)
document.addEventListener('click', () => {
	store.dispatch({ type: "INCREMENT" })
});
```

## Redux blog article - Praise of Redux

I'd compare the difference of a React-Redux app to e.g. a meteor app as comparing elephants (? months of pregnancy + ? years to independence) to birds (? months of pregnancy + ? years to independent life).

If you're able to build and fully understand a [Todo App with React + Redux](https://medium.com/@rajaraodv/step-by-step-guide-to-building-react-redux-apps-using-mocks-48ca0f47f9a#.qrbuj8eqm), you're up an running to create a fully fleshed production ready web app.
If you're able to write a todo app with meteor, there's still very much to learn to pull of something more sophisticated although it's great to get small projects running fast if you need server and client.