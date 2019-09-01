---
title: 'Redux Middleware'
description: 'Talking about two popular redux middlewares: `redux-saga` and `redux-thunk`.'
date: '2016-03-20T12:20:00.169Z'
category: 'framework'
tags: ['javascript', 'react', 'redux']
---

## applyMiddleware()

Middleware only wraps the store’s `dispatch` function.

## Asynchronous calls with middleware `redux-saga`

[Video Intro](https://www.youtube.com/watch?v=QJVdcIlqGwc)

Saga action queue

* All async stuff happens in the saga middleware, doesn't touch action creators
* All actions are totally pure, only return simple objects, no Promises like in `redux-thunk`.

## Asynchronous calls with middleware `redux-thunk`

But what do you do when you need to start an asynchronous action, such as an API call, or a router transition?
--> Meet thunks. A thunk is a function that returns a function. This is a thunk.

An action creator returns an object (with type and data). A thunk returns a function which has the parameters `dispatch` and `getState` (which are themselves functions, e.g. `const state = getState();`).

Usually this function dispatches actions, e.g. here an asynchronous action, dispatching other actions when promises come in.

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

Thunk middleware lets me dispatch thunk async actions as if they were actions!

```js
store.dispatch(sendImage('myimage.jpg');
```

**Convention**: Let your thunks return **Promises**. i.e. the `dispatch` function automatically returns a Promise.

--> This is very useful for server side rendering, because I can wait until data is available, then synchronously render the app.

See [Redux docs section *applyMiddlewear*](file:///Users/andrekovac/dev/documentations%20docs/redux.js.org/docs/api/applyMiddleware.html) for more.
