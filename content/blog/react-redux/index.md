---
title: Redux
description: Instructions on how to use React's most popular state management library Redux.js
date: '2016-03-20T12:20:00.169Z'
category: 'framework'
tags: ['javascript', 'react', 'redux']
---

## Actions and Reducers

* Actions describe the fact that something happened
* Reducers specify how the application's state changes in response to an action.

### Step-by-step: Creating a new action

1. Create **constant** with action type name
2. Choose a name of the action creator function **in your component**, import the new action creator and **make a call to the action creator**.
	The function will be available in props, i.e. `this.props.<my_action>` in a class-component or just `props.<my_action>` in a stateless component.

3. Create **action creator** - a function which is called from the component, gets some input (e.g. user input in form) and outputs an action, i.e. dispatches an action to the store, which is later picked up by the reducer

	* Don't forget to import the new constant of the action type.
	* Just return the former state first to see whether everything works out nicely.

4. Add case of new action type to **reducer**.

### Step-by-step: Creating a new reducer

1. Define initial state
1. Create reducer.js (input: state, action, output: next state) + switch-case statement for each action type.
2. Implement reducer code for each action - this defines which new state is sent to the UI after the state has changed. The UI can then react to it accordingly. Often that will just mean to pass on the new value.

---

## How to: API Calls

- Make the `API call` in the action creator.

### Example: Call to weather API

* User input is `location` + `date`, then the action returned by the action creator includes the field `temperature_forecast`.
* When the weather data server sends a response to the app, the `reducer` is called with the response as input.
* The reducer can then form the data in a way it wants it to be send to the UI and change the corresponding field(s) in the state.

### Example: Spotify API

Dispatch three actions, so that UI can reflect details of the API request, i.e. when the request is in progress (show loading symbol) or throws an error (display error message).

```js
export function getMyInfo() {
	return dispatch => {
		dispatch({ type: SPOTIFY_ME_BEGIN});
		spotifyApi.getMe().then(data => {
			dispatch({ type: SPOTIFY_ME_SUCCESS, data: data });
		}).catch(e => {
			dispatch({ type: SPOTIFY_ME_FAILURE, error: e });
		});
	};
}
```

In the reducer the `SPOTIFY_ME_FAILURE` type does nothing, just returns the old state, `SPOTIFY_ME_SUCCESS ` however returns all fields of the former state (`...state`) and a change in the `user` data field.

```js
// when we get the data merge it in
	case SPOTIFY_ME_SUCCESS:
		return {
			...state,
			user: action.data,
		};
	// currently no failure state :(
	case SPOTIFY_ME_FAILURE:
		return state;
```

## Role of `connect`

* Lives in container --> passes stuff to component
* Container exports the component returned by the `connect` function.

1. Passes specified parts of the redux state as props to ...
2. Passes the action creators to ...
3. Passes the `dispatch` function as props to ...

	...the specified component (either the container itself or an imported component).

* `connectStateToProps` connects the global redux state to the props in the local container.

	Here you see how the state is mapped into a prop via boards.

	```js
	export default connect(
	  state => ({ boards: state.boards })
	)(Boards);
	```

* `mapDispatchToProps` connects the action creators of dispatched actions to the local container. Somehow binds `dispatch` function

	Here a custom function is used to bind `globalActions` to the container/component wrapped.

	```js
	mapDispatchToProps(globalActions)
	```

* `mergeProps`: Here you can combine results of `connectStateToProps` and `mapDispatchToProps`

    [Redux Docs about mergeProps](https://github.com/reactjs/react-redux/blob/master/docs/api.md)

**Example**:

```js
import { createTodo, updateInput, markTodo } from '../actions/ActionCreators'

props.createTodo("This is a new todo item");

export default connect(
  state => state,
  { createTodo, updateInput, markTodo }
)(App);
```

**Alternative** without mentioning action creators within `connect`:

```js
props.dispatch(createTodo("This is a new todo item"));

export default connect(
  state => state
)(App);
```

## redux functions

#### bindActionCreators(actionCreators, dispatch)

Every action creator gets wrapped into a dispatch call so they may be invoked directly.

If you use Redux with React, `react-redux` will provide you with the dispatch function so you can call it directly, too.


## Initial state (when using `Immutable.js`)

Set an initial state of a single entity with a `Record`. Then in the reducer map multiple of that entity.
