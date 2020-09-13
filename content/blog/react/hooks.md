---
title: 'React hooks'
description: 'Hooks '
date: '2020-04-03'
author: 'André Kovac'
category: 'framework'
tags: ['javascript', 'react']
---

## Built-in hooks

### `useState`

### `useEffect`

### `useMemo` & `useCallback`

[When to useMemo and useCallback](https://kentcdodds.com/blog/usememo-and-usecallback)

## Wrong example of `useEffect` hook usage and how to fix it

### `useRef`

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

Add callback function to hook setter:

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

## Custom hook libraries

### React Native

- [React Native Community hooks](https://github.com/react-native-community/hooks#uselayout)

### React

- [react-use : List of many many hooks](https://github.com/streamich/react-use)
- [useHooks](https://github.com/gragland/usehooks)
- [react-native-community/hooks](https://github.com/react-native-community/hooks)
- [Captain Hooks](https://github.com/stevenpersia/captain-hook)
