---
title: 'React hooks'
description: 'Hooks - Overview and examples'
date: '2020-04-03'
author: 'André Kovac'
category: 'framework'
tags: ['javascript', 'react']
draft: false
ready: true
---

## Built-in hooks

### `useState`

### `useReducer`

Example from `react-navigation` docs about authentication flow:

```tsx
const [state, dispatch] = React.useReducer(
  (prevState, action) => {
    switch (action.type) {
      case 'RESTORE_TOKEN':
        return {
          ...prevState,
          userToken: action.token,
          isLoading: false,
        };
      case 'SIGN_IN':
        return {
          ...prevState,
          isSignout: false,
          userToken: action.token,
        };
      case 'SIGN_OUT':
        return {
          ...prevState,
          isSignout: true,
          userToken: null,
        };
    }
  },
  {
    isLoading: true,
    isSignout: false,
    userToken: null,
  }
);
```

Later you can use the following to dispatch an action:

```ts
dispatch({ type: 'RESTORE_TOKEN', token: userToken });
```

### `useEffect`

#### Question

Could you explain the reasoning behind adding all these references to the dependency list? As I understood, the dependency list defines the objects that this useEffect depends on, i.e that trigger the useEffect. As we only want this to execute whenever the step number changes, using any other references than currentStepNumber in the dependency list seems unintuitive.

Asked by Albrecht.

#### Answer

tl;dr: This ESLint rule is a precaution so that you don’t accidentally forget to add dynamic values needed inside useEffect. And the React Native Animated values (as well as ref values created with useRef) are built as objects so that they don’t cause unwanted executions of useEffect if added to the dependency array.

---

As you stated correctly the `useEffect` hook will only run if the values of the dependency array change. So it of course suffices if you only add the one value you are interested in.

That being said, what is the idea behind the best practice (and **ESLint** rule) to add all dynamic values which are used inside the `useEffect` hook?

Answer: It’s to ensure the UI gets always updated if new values are available. It was established with the idea in mind to prevent that the user sees some value on a screen although parts which are necessary to compute it, changed in the meantime. In such a scenario, there are no downsides to add values to the dependency array which are used inside `useEffect` because

if you know that the other value doesn’t change anyways, it will not hurt to put it into the dependency array.

if the other value does change, you want to make sure you use the most current version of it and rerender.

This scenario here, however, is a different use-case of `useEffect`:

Here the change in the dependency array triggers useEffect which runs an animation. Until the animation finished to run, the `useEffect` hook **should not be triggered again**. Crucially some of the values used inside this `useEffect` hook continuously change (i.e. the animation values) and should not trigger more executions of `useEffect`.

But if I add these animated values to the dependency array, it will not increase the number of `useEffect` calls. Why?- Because the animated value is not a primitive data type, but an object which wraps a `_value` field which holds the changing value (the `Animated.View` component uses this value).A change of a field in an object does not trigger a new `useEffect` execution because the dependency array only shallowly compares (i.e. checks reference equality) the values of the dependency array, it doesn’t do a deep comparison of the entire object. Hence, the animation values which wrap the actually changing values look the same to the `useEffect` hook and adding them won’t hurt. (If you do want the dependency array to be deeply compared, there is a [corresponding hook](https://github.com/kentcdodds/use-deep-compare-effect) available.

Lastly, if you add [the actually changing value](https://stackoverflow.com/questions/41932345/get-current-value-of-animated-value-react-native) to the dependency array, e.g. activeSegmentWidth.`_value` instead of activeSegmentWidth (only works with `useNativeDriver: false` option - with native driver the value .`_value` never changes), then it will hurt. In this case `useEffect` would indeed be called more often (which you don’t want).

### `useLayoutEffect`

Timing of effects

Unlike componentDidMount and componentDidUpdate, the function passed to useEffect fires after layout and paint, during a deferred event. This makes it suitable for the many common side effects, like setting up subscriptions and event handlers, because most types of work shouldn’t block the browser from updating the screen.

However, not all effects can be deferred. For example, a DOM mutation that is visible to the user must fire synchronously before the next paint so that the user does not perceive a visual inconsistency. (The distinction is conceptually similar to passive versus active event listeners.)
For these types of effects, React provides one additional Hook called `useLayoutEffect`. It has the same signature as `useEffect`, and only differs in when it is fired.



### `useMemo` & `useCallback`

[When to useMemo and useCallback](https://kentcdodds.com/blog/usememo-and-usecallback)

## Wrong example of `useEffect` hook usage and how to fix it

### `useRef`

- like instance variables

- [CodeSandBox with example](https://codesandbox.io/s/q-57444154-react-refs-closures-forked-also-q-60554573-xcx0x?file=/src/App.react.js)
- [Why need useRef to contain mutable variable but not define variable outside the component function?](https://stackoverflow.com/questions/57444154/why-need-useref-to-contain-mutable-variable-but-not-define-variable-outside-the)
- [What are the advantages of useRef() instead of just declaring a variable](https://stackoverflow.com/questions/60554573/what-are-the-advantages-of-useref-instead-of-just-declaring-a-variable)

- To put it simple: variables forget their value between renders. useRef() allows you to remember the value, just like class property would be stored in a class.

### Error

The following code leads to a `max update depth exceeded` error because the dependency `editOrganisation` will always be reset again:

```js {14,16}
const MyComponent = () => {
  const [editOrganisation, setEditOrganisation] = useState({
    name: '',
    admins: [],
  });
  // Fetch organisation
  const { data: organisation } = useSWR('/organisations');
  useEffect(() => {
    if (organisation) {
      const mergedPropertiesOrganisation = {
        ...editOrganisation,
        ...organisation,
      };
      setEditOrganisation(mergedPropertiesOrganisation);
    }
  }, [organisation, editOrganisation]);
};
```

### Fix

Add callback function to hook setter. Hereby `editOrganisation` can be removed from the dependency array and its update doesn't retrigger the `useEffect` hook.

```js {10,12}
const MyComponent = () => {
  const [editOrganisation, setEditOrganisation] = useState({
    name: '',
    admins: [],
  });
  // Fetch organisation
  const { data: organisation } = useSWR('/organisations');
  useEffect(() => {
    if (organisation) {
      setEditOrganisation((prevState) => ({ ...prevState, ...organization }));
    }
  }, [organisation]);
};
```

## hooks + API calls

In comparison to the clasical way of writing stateful components in React, with hooks we can abstract away the API request into the custom hook `useRequestHandler`:

```js
import { useState } from 'react';

const useRequestHandler = () => {
  const [isLoading, setLoading] = useState(false);
  const [hasError, setError] = useState(false);
  const [data, setData] = useState(null);

  const handleRequest = (request) => {
    setLoading(true);
    setError(false);

    return api
      .get(request)
      .then(setData)
      .catch(() => setError(true))
      .finally(() => setLoading(false));
  };

  return { isLoading, hasError, data, handleRequest };
};

const UserList = () => {
  const { data, isLoading, hasError, handleRequest } = useRequestHandler();

  const searchUsers = (value) => handleRequest(`/users?searchKey=${value}`);

  return (
    <React.Fragment>
      {data.map((u) => (
        <p>{u.name}</p>
      ))}
    </React.Fragment>
  );
};
```

[Example taken from here](https://medium.com/better-programming/react-state-management-in-2020-719d10c816bf)

> **Bonus**: We could also make a `useUserSearch` if multiple components wanted to offer the functionality to search through the list of users.

## hooks + redux

### `useDispatch` & `useSelector`

- `useDispatch`: Provide the `dispatch` function to a component
- `useSelector`: Allow to select a slice of the Redux store

### Javascript React (Web) example

```js
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toggleAction } from './store/toggleActions';

const Toggle = () => {
  const on = useSelector((state) => state.toggle.on);
  const dispatch = useDispatch();
  return (
    <button onClick={() => dispatch(toggleAction())}>
      {on ? 'on' : 'off'}
    </button>
  );
};
```

### Typescript React Native (mobile) complete example

`components/Counter.tsx`:

```js
import React, { Dispatch } from "react";
import { Text } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { CounterActionT, increase as increaseAction } from "../store/actionCreators/counter";

const Counter = () => {
  const dispatch = useDispatch<Dispatch<CounterActionT>>();

  const increase = () => dispatch(increaseAction());

  const count = useSelector<StoreT, number>(state => state.count);

  return (
    <Container>
      <ClickedText>Clicked {count} times</ClickedText>
      <Button onPress={increase}>
        <Text>Increment</Text>
      </Button>
    </Container>
  );
};
```

`store/index.ts`:

```js
import { applyMiddleware, createStore, compose } from "redux";
import thunk, { ThunkMiddleware } from "redux-thunk";

import { rootReducer, StoreT } from "./reducer";
import { ActionT } from "./actionCreators";

const devtools =
  (__DEV__ && global.reduxNativeDevTools) || (() => noop => noop);

const store = createStore(
  rootReducer,
  compose(
  applyMiddleware(
    thunk as ThunkMiddleware<StoreT, ActionT>
  ),
  devtools()),
);

export default store;
```

`store/reducer/index.ts`

```js
import { combineReducers } from "redux";

import counterReducer from "./counter";

export const rootReducer = combineReducers({
  count: counterReducer,
  // add other reducers here
});

export type StoreT = NonNullable<Parameters<typeof rootReducer>[0]>;
```

`store/actionTypes/counter.ts`

```js
export const INCREASE = 'INCREASE';
```

`store/actionCreators/counter.ts`

```js
import { INCREASE } from '../actionTypes/counter';

export type CounterActionT = {
  type: typeof INCREASE,
};

export const increase = (): CounterActionT => {
  return {
    type: INCREASE,
  };
};
```

## Limitations of hooks (vs. state management libraries)

> However, hooks are no silver bullet. Keeping state in a hook does not mean it becomes a singleton, the state is only bound to one component. There are certain uses where we might only want to keep one instance of state (for example, fetching user info only once). This is where a state management framework proves its value.

[Quoted from here](https://medium.com/better-programming/react-state-management-in-2020-719d10c816bf)

## Custom hooks

### Custom hooks example: redux

A **React Native** example (`store/hooks.ts`):

```js
import { useDispatch, useSelector } from "react-redux";

import { ItemT } from "../components/Pictorio/Item";

import { StoreT } from "./reducer";
import { toggleFavorite } from "./actionCreators/photos";

export const useFavorites = () => {
  const dispatch = useDispatch();

  const favorites = useSelector<StoreT, ReadonlyArray<ItemT>>(state =>
    state.photos.filter(photo => photo.isFavorite)
  );
  const setToggleFavorite = (id: string) => dispatch(toggleFavorite(id));

  return [favorites, setToggleFavorite];
};
```

## Motivating hooks to manage state

- Great video about [state management with React hooks](https://youtu.be/-yj23RtyT-E).
- [The State of React’s State in 2019](https://youtu.be/dPY8y4CB3mI)

## Testing

- [How to test custom hooks](https://kentcdodds.com/blog/how-to-test-custom-react-hooks)

##

## Custom hook libraries

### React Native

- [React Native Community hooks](https://github.com/react-native-community/hooks#uselayout)

### React

- [swr - React Hooks for remote data fetching](https://github.com/vercel/swr)
- [react-use : List of many many hooks](https://github.com/streamich/react-use)
- [useHooks](https://github.com/gragland/usehooks)
- [react-native-community/hooks](https://github.com/react-native-community/hooks)
- [Captain Hooks](https://github.com/stevenpersia/captain-hook)
