---
title: 'Redux Middleware'
description: 'Talking about two popular redux middlewares: `redux-saga` and `redux-thunk`.'
date: '2016-03-20T12:20:00.169Z'
author: 'André Kovac'
category: 'framework'
tags: ['javascript', 'react', 'redux']
ready: true
published: false
---

## Do redux sagas run before or after reducer functions?

A collegue asked me this question today and [it was already asked in 2016](https://github.com/redux-saga/redux-saga/issues/148).

![redux saga flow](https://miro.medium.com/max/1400/1*QERgzuzphdQz4e0fNs1CFQ.gif)

A Redux middleware has access to a dispatched action before it reaches the reducer (see image) and also has control over whether its own functionality takes place before or after the action is forwarded to the reducers. Thus, the diagram is correct because the middleware is "up" before the reducers, but it is not specified that the middleware then finishes before the reducers call.

This is an implementation detail of the corresponding Redux middleware.

### Structure of redux Middlewares

#### loggin middleware

For example, a logging middleware will spit out a logging message before and after forwarding the action to the reducers (the redux dev-tools, where you can view logged Redux actions, is also a Redux middleware, for example).

```js
/**
 * Logs all actions and states after they are dispatched.
 */
const logger = store => next => action => {
  console.group(action.type)
  console.info('dispatching', action)
  let result = next(action)
  console.log('next state', store.getState())
  console.groupEnd()
  return result
}
```

see [Middleware examples in Redux docs](https://redux.js.org/understanding/history-and-design/middleware#seven-examples).


#### thunk

As an aside: redux-thunk is very simple middleware implemenation.

```js
/**
 * Lets you dispatch a function instead of an action.
 * This function will receive `dispatch` and `getState` as arguments.
 *
 * Useful for early exits (conditions over `getState()`), as well
 * as for async control flow (it can `dispatch()` something else).
 *
 * `dispatch` will return the return value of the dispatched function.
 */
const thunk = store => next => action =>
  typeof action === 'function'
    ? action(store.dispatch, store.getState)
    : next(action)
```

Read more about understanding middlewares [in the Redux docs](https://redux.js.org/understanding/history-and-design/middleware).

### redux-saga middleware order

The answer regarding redux-saga is [hidden in the docs](https://redux-saga.js.org/docs/api/index.html#selectselector-args):

>It's important to note that when an action is dispatched to the store, the middleware first
>forwards the action to the reducers and then notifies the Sagas.

The redux-saga middleware is therefore implemented in such a way that it calls the reducers first (this happens synchronously) and then the asynchronous sagas. If it were the other way around, redux store updates would have to wait indefinitely - this would lead to countless race conditions.

In the redux-saga code, you can see this [in line 27](https://github.com/redux-saga/redux-saga/blob/master/packages/core/src/internal/middleware.js#L27) in which `next` calls the reducer. Line 28 then sends the action to the saga:

```js

```

### It's pretty unusual to lead to bugs

So far I haven't looked into it too closely. So far I don't think I've fallen on my feet with it either, because the actions that usually call sagas don't change the redux store in such a way that I'm directly dependent on the changes.

For example, when the sternaSignUpStart action is dispatched, the isLoading, error and success fields in the signUp slice of the Redux store are changed. In the signUpSternaUser saga, however, I am not interested in these values. I use the select effect in some sagas to pull data from the current Redux Store.

However, I have not yet had the case that in the saga called by a certain action, I am dependent on the previous state of the data that this action is changing.

### Conclusion

It got me thinking and researching again myself. I guess it's not a great source of bugs not to know this so well, but for the overall understanding of the redux-saga middleware it is important to know this implementation detail!

## Examples of Redux Middlewares

- [Redux Toolkit](https://redux.js.org/redux-toolkit/overview)
  - Recommended by the [Redux Styleguide](https://redux.js.org/style-guide/style-guide/)
- [Redux Thunk](https://github.com/reduxjs/redux-thunk)
- [Redux Saga](https://redux-saga.js.org/)
- [Redux Loop](https://github.com/redux-loop/redux-loop)

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
