---
title: 'Javascript Promises and async-await'
description: 'Javascript Promises and async-await'
date: '2020-04-02T18:42:37.121Z'
author: 'André Kovac'
category: 'programming-language'
tags: ['javascript']
ready: true
published: false
---

## Javascript Promises

> The Promise **object** is used for asynchronous computations. A Promise represents a value which may be available now, or in the future, or never.

The argument of a promise is an **executor function** with two arguments `resolve` and `reject`. The executor function is executed immediately by the Promise implementation, passing resolve and reject functions.

The resolve and reject functions, when called, resolve or reject the promise respectively. That means, they return a Promise with its status having changed from `.pending` to either `.fulfilled` or `.rejected`.


### Chaining Promises

```js
Promise.resolve()
	.then(() => return Promise.resolve())
	.then(...)
	.catch(...);
```

### Insights

`Promise.resolve() ....` vs. `new Promise((resolve, reject) => { ... })`

1. `Promise.resolve().then(...).then(...).catch(...)`

	A chain of other functions, which each have to be implemented Promises. E.g. [`.then()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise/then) is defined as such that it sends a `resolve(data)` with the data the function inside `.then(...)` returns.

	As info: `myPromise.then(a,b)` can also have two arguments. `b` is the callback-function which is called when the Promise `myPromise`

2. `() => { new Promise((resolve, reject) => { if (...) resolve(data); else (...) reject(error)) } }`

	Create a own function which returns a Promise like then, but here you can define exactly in which case it resolves and in which case it rejects.


### Example

`submitHandler.js` is sending promise (i.e. `response.json()`) which resolves to the array `images`.

```js
import CONFIG from './config';

export default function (image) {
  return fetch(`${CONFIG.url}/submit`, {
    method: 'POST',
    body: JSON.stringify({
      image,
    }),
  })
    .then(response => response.json())
    .then(images => images)
    .catch(err => err);
}
```

`global.js` (Action creator) calling submitHandler.js.
Here

```js
// async action does not have constant action name and does not have reducer
export const sendImage = (image) => {
  return (dispatch, getState) => {
    dispatch(toggleLoading());
    submitHandler(image)
      .then(pieces => {
        console.log(pieces);
        dispatch(updatePieces(pieces));
        dispatch(toggleLoading());
        dispatch(changeTab(2));
      }
    ).catch(err => console.log('error in sendImage: ', err));
  }
};
```


### Async-await

When an `async` function returns, it **ALWAYS** returns a Promise.

The following line will resolve the Promise and `data` can be directly used.

```js
const data = await response.json();
console.log({ data });
```

However, when **returning** `data` from the `async` function, it is immediately a **Promise** again!
Hence, the following two functions are the same.

```js
const fetchData = async (): Promise<ReadonlyArray<any>> => {
  const response = await fetch(
    "https://picsum.photos/v2/list?page=1&limit=100"
  );
  // RETURN DATA
  return response.json();
};
```

```js
const fetchData = async (): Promise<ReadonlyArray<any>> => {
  const response = await fetch(
    "https://picsum.photos/v2/list?page=1&limit=100"
  );
  const data = await response.json();
  // RETURN DATA
  return data;
};
```

The return value of an `async` function is therefore generated as such:
1. If the data is already a Promise, return the Promise.
2. If the data is not a Promise, wrap it into a Promise.

So if you want to use the `data` directly you **can't return** and have to use it directly.
Alternatively you can resolve the promise and use it then, i.e.

```js
fetchData().then(data => console.log(data));
```


Example from a React component:

```js
const fetchData = async () => {
  const response = await fetch(
      "https://picsum.photos/v2/list?page=1&limit=100"
  );
  const data = await response.json();
  // Directly do something with `data` - DON'T RETURN
  setData(data);
};

  useEffect(() => {
    fetchData();
  }, []);
```

### Promise `then` and `resolve` interplay

Inside a `then()` chain, `resolve()` function call let's it directly jump to next `then()`.


### Working with Promise `resolve` function

#### Example 1

Save the `resolve` function as variables. Execute them whenever a process you want to wait for ends.

Example in [react-native-modalview](https://github.com/Artirigo/react-native-modalview/blob/6913a8cc091e2293207dcc7501b6f0a08ad0f49c/src/components/ModalBase/index.js):

1. Store `resolve` functions as local variables

  ```js
  this._layoutPromise = Promise.all([
    new Promise((resolve: () => void) => {
      this._contentLayoutComplete = resolve;
    }),

    new Promise((resolve: () => void) => {
      this._containerLayoutComplete = resolve;
    }),
  ]);
  ```

2. Call `resolve` functions in event handlers

  ```js
  // other places in the code

  _handleContainerLayout = event => {
    // ...
    if (this._containerLayoutComplete) this._containerLayoutComplete();
  };

  _handleContentLayout = event => {
    // ...
    if (this._contentLayoutComplete) this._contentLayoutComplete();
  };
  ```

3. Wait for both promises to `resolve` and continue code execution then.

  ```js
  open = () => {
    // ...

    // wait for layout-size calculation and start animation afterwards
    this._layoutPromise.then(() => this._animateOpenStart());
  };
  ```

#### Example 2

Implementation of a `race` condition.
Here the promise will resolve (i.e. the `resolve` function executed) whichever process ends first.

```js
import { InteractionManager } from 'react-native';

/**
 * wrap InteractionManager.runAfterInteractions in a promise
 * and provide a timeout prop (mainly needed as InteractionManager in RN0.39 is buggy
 * especially on android and won't trigger sometimes)
 */
export const runAfterInteractions = (timeOut = 500) =>
  new Promise(resolve => {
    setTimeout(resolve, timeOut);
    InteractionManager.runAfterInteractions(resolve);
  });
```

**Question**: Would the second line in the promise (i.e. `InteractionManager.runAfterInteractions(resolve);` even be executed when the Promise already resolves in the line before?
**Answer**: Yes, because `setTimeout` is asynchronously called.