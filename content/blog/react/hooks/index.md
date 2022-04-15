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

## Hooks

- Form of dependency injection which is not super clean.

## Built-in hooks

### `useState`

- functional update form of `setState`: It lets us specify **how** the state needs to change without referencing the **current** state:

### `useState`, closures and stale closure values

- Here the callback in the `useEffect` hook captures the `count` value from outside, which has value `0`.
- The closure containing the `count = 0` value is only created once (because of `[]`) and not updated.
- With a dependency array of `[count]` the `useEffect` would be reinstantiated with the current `count` value.

```js
function Counter() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    const id = setInterval(() => {
      setCount(count + 1); // This effect depends on the `count` state
    }, 1000);
    return () => clearInterval(id);
  }, []); // 🔴 Bug: `count` is not specified as a dependency
  return <h1>{count}</h1>;
}
```

- **Question**: Why can't we add `count` to the dependency array to fix this issue?
- **Solution**: Infinite loop because of React life cycle: `useState` triggers rerender ...

Next only the inner scope of `setCount`, i.e. `c => c + 1` is used.

```js
function Counter() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    const id = setInterval(() => {
      setCount(c => c + 1); // ✅ This doesn't depend on `count` variable outside    }, 1000);
    return () => clearInterval(id);
  }, []); // ✅ Our effect doesn't use any variables in the component scope
  return <h1>{count}</h1>;
}
```

--> For more complex state: `useReducer` hook!

Examples in this section taken from the [React Hooks docs](https://reactjs.org/docs/hooks-faq.html#what-can-i-do-if-my-effect-dependencies-change-too-often).

#### Problem: `useState` won't reset to its default value on rerender

Here a changed `contact` prop will not update the shown `name` after a rerender. Only a remount will trigger a change from the outside. The `name` value is protected by the `useState` hook and cannot be changed.

- **Problem**: `props.contact` is not used inside the component (return value) or an effect, but only inside the initial value of `useState`.

```jsx
const Detail = (props) => {
  const [name, setName] = useState(props.contact.name);
  return (
    <form>
      <input
        value={name}
        onChange={(evt) => setName(evt.target.value)}
      />
    </form>
  );
};
```

Example taken from [here](https://www.nikgraf.com/blog/using-reacts-key-attribute-to-remount-a-component).

### `useReducer`

Example from `react-navigation` docs about authentication flow:

```tsx
const [state, dispatch] = React.useReducer(
  // stateReducer function
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
  // initial state
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

#### World without `useEffect` hook

For example fetching data just inside the function body doesn't let you control **when** the fetch should happen - i.e. after the initial DOM got mounted.

#### Definition

Queues behavior to run asynchronously **after** a render (execution) of the component (function), i.e. starting React reconciliation, updating of the virtual DOM, updating the actual DOM AND painting the DOM to the screen.

Written along the lines of [a complete guide to useEffect](https://overreacted.io/a-complete-guide-to-useeffect/):

- `useEffect(fn, [])` will *capture* props and state (unlike `componentDidMount`).
- `capture` in the sense of a **closure** capturing an other value.
- `fn` will use the captured initial props and state.
- If you want to see "latest" something, you can write it to a ref.
#### Difference to class-based React life-cycle methods

Don't think of `useEffect` in terms of life-cycles.

- Life-cycle methods for class components: **responding to lifecycle events**
- `useEffect`: **Thinking in effects** and their mental model is closer to **implementing synchronization**


> A major point of React is that updates render just like the initial states (you can't usually tell which is which). Whether you render prop value B, or whether you go from prop value A to B — it should look and behave the same.

-> read in one of Dan Abramovs answer [in the exhaustive deps ESLint rule issue](https://github.com/facebook/react/issues/14920).

#### [dependency array](https://reactjs.org/docs/hooks-faq.html#is-it-safe-to-omit-functions-from-the-list-of-dependencies)

> The **list of dependencies** as the last argument to `useEffect`, `useLayoutEffect`, `useMemo`, `useCallback`, or `useImperativeHandle` must include all values that are used inside the callback and **participate in the React data flow**. That includes props, state, and anything derived from them.
##### empty dependency array `[]`

- `[]` means the effect doesn’t use any value that participates in React data flow, and is for that reason safe to apply once.

#### Infinite loop

```jsx
const MyComponent = props => {
    const innerFunction = () => {
        // do something!
    };

    useEffect(() => {
        innerFunction();
        // The effect calls innerFunction, hence it should declare it as a dependency
        // Otherwise, if something about innerFunction changes (e.g. the data it uses), the effect would run the outdated version of innerFunction
    }, [innerFunction]);
};
```

If `innerFunction` causes a rerender (i.e. changes props or state), it would cause an infinite loop!

Example taken [from this blog article](https://medium.com/@infinitypaul/reactjs-useeffect-usecallback-simplified-91e69fb0e7a3).

**Background**:

- Why is this an issue?
  - Because `innerFunction` is a `function` and thereby a reference type. Its reference will **change** on every render - not its function signature (name + parameters + return value).
  - You can use `useCallback` to assure that the function signature won't change.

**Fixes**:

1. `useCallback` around `innerFunction` to prevent it to be re-instantiated on every render
   - Hereby `innerFunction` is prevented from changing and thereby triggering a new `useEffect` call etc.
   - `useCallback` assures that the function signature of this

2. remove `innerFunction` from the dependency array.

#### Question

Could you explain the reasoning behind adding all these references to the dependency list? As I understood, the dependency list defines the objects that this `useEffect` depends on, i.e that trigger the `useEffect`. As we only want this to execute whenever the step number changes, using any other references than currentStepNumber in the dependency list seems unintuitive.

Asked by Albrecht.

#### Answer

tl;dr: This ESLint rule is a precaution so that you don’t accidentally forget to add dynamic values needed inside `useEffect`. And the React Native Animated values (as well as ref values created with useRef) are built as objects so that they don’t cause unwanted executions of useEffect if added to the dependency array.

They are ref types and therefor safe to add (or to exclude) - the `exhaustive deps` rule is being monitored.

---

As you stated correctly the `useEffect` hook will only run if the values of the dependency array change. So it of course suffices if you only add the one value you are interested in.

That being said, what is the idea behind the best practice (and **ESLint** rule) to add all dynamic values which are used inside the `useEffect` hook?

Answer: It’s to ensure the UI gets always updated if new values are available. It was established with the idea in mind to prevent that the user sees some value on a screen although parts which are necessary to compute it, changed in the meantime. In such a scenario, there are no downsides to add values to the dependency array which are used inside `useEffect` because

if you know that the other value doesn’t change anyways, it will not hurt to put it into the dependency array.

if the other value does change, you want to make sure you use the most current version of it and rerender.

This scenario here, however, is a different use-case of `useEffect`:

Here the change in the dependency array triggers `useEffect` which runs an animation. Until the animation finished to run, the `useEffect` hook **should not be triggered again**. Crucially some of the values used inside this `useEffect` hook continuously change (i.e. the animation values) and should not trigger more executions of `useEffect`.

But if I add these animated values to the dependency array, it will not increase the number of `useEffect` calls. Why?- Because the animated value is not a primitive data type, but an object which wraps a `_value` field which holds the changing value (the `Animated.View` component uses this value).A change of a field in an object does not trigger a new `useEffect` execution because the dependency array only shallowly compares (i.e. checks reference equality) the values of the dependency array, it doesn’t do a deep comparison of the entire object. Hence, the animation values which wrap the actually changing values look the same to the `useEffect` hook and adding them won’t hurt. (If you do want the dependency array to be deeply compared, there is a [corresponding hook](https://github.com/kentcdodds/use-deep-compare-effect) available.

Lastly, if you add [the actually changing value](https://stackoverflow.com/questions/41932345/get-current-value-of-animated-value-react-native) to the dependency array, e.g. activeSegmentWidth.`_value` instead of activeSegmentWidth (only works with `useNativeDriver: false` option - with native driver the value .`_value` never changes), then it will hurt. In this case `useEffect` would indeed be called more often (which you don’t want).

### `useLayoutEffect`

#### General guideline

Use it in case you discover visual glitches

See these gifs taken from [this blog post](https://blog.logrocket.com/useeffect-vs-uselayouteffect/):

With `useEffect` there's a visual glitch. The UI update code will run too late if put into async `useEffect`:

![](./images/visual-changes-useeffect.gif)

With `useLayoutEffect` the UI update happens faster:

![](./images/visual-changes-uselayouteffect.gif)

#### Definition

- `useEffect`: (Component Function runs > State Changes > Component Renders > Rendered Component is Printed on Screen > useEffect runs)
- `useLayoutEffect`: (Component Function runs > State Changes > Component Renders > useLayoutEffect runs > Rendered Component is Printed on Screen)

#### Timing of effects

Unlike `componentDidMount` and `componentDidUpdate`, the function passed to `useEffect` fires **after layout and paint**, during a **deferred** event. This makes it suitable for the many common side effects, like setting up subscriptions and event handlers, because most types of work shouldn’t block the browser from updating the screen.

However, not all effects can be deferred. For example, a DOM mutation that is visible to the user must fire synchronously before the next paint so that the user does not perceive a visual inconsistency. (The distinction is conceptually similar to passive versus active event listeners.)
For these types of effects, React provides one additional Hook called `useLayoutEffect`. It has the same signature as `useEffect`, and only differs in when it is fired.

#### Measurements and `useLayoutEffect`

Read more about the `useLayoutEffect` in [this article of Kent C. Dodds](https://kentcdodds.com/blog/useeffect-vs-uselayouteffect#uselayouteffect).

### `useMemo` & `useCallback`

[When to useMemo and useCallback](https://kentcdodds.com/blog/usememo-and-usecallback)

### `useRef`

**Exercise**: Given `useState({ current: initialValue })[0]`, does a change of the `current` property cause a rerender?

e.g. `useRef(null)` is `useState({current: null })[0]`

**Dan Abramov** said [in this tweet](https://twitter.com/dan_abramov/status/1099842565631819776?lang=en):

>useRef() is basically useState({current: initialValue })[0]

Given this it makes sense that `useRef` was designed with a `current` field because `useState` checks for shallow equality, i.e. referential equality in case of non-primitive data types.

- Like an instance variables in a class...

  - the `current` value is bound to a specific instance of a functional component.
  - Btw: [Dan Abramov also tweeted it](https://twitter.com/dan_abramov/status/1125223181701263360?lang=en).

- To put it simple: variables forget their value between renders. useRef() allows you to remember the value, just like class property would be stored in a class.

#### Why is `useRef` better than variables defined inside or outside of function?

- [CodeSandBox with example](https://codesandbox.io/s/q-57444154-react-refs-closures-forked-also-q-60554573-xcx0x?file=/src/App.react.js)

To get a mutuable value bound to a component instance, we can't use

- a variable scoped inside a functional component because the value will be re-instantiated on every render. `const value = 0` will always be reset to `0`. I can't **keep** the mutated value.
- a variable outside of the functional component because it is not bound to an instance a component. We get into trouble when we have more than one instance of a component inside a file (see the CodeSandBox example).

See also:

- [Why need useRef to contain mutable variable but not define variable outside the component function?](https://stackoverflow.com/questions/57444154/why-need-useref-to-contain-mutable-variable-but-not-define-variable-outside-the)
- [What are the advantages of useRef() instead of just declaring a variable](https://stackoverflow.com/questions/60554573/what-are-the-advantages-of-useref-instead-of-just-declaring-a-variable)

#### `useRef` vs. `createRef`

> React.createRef() is a factory returning a ref { current: null }

- Taken from [here](https://stackoverflow.com/a/61638527/3210677).
- [`createRef` code](https://github.com/facebook/react/blob/b87aabd/packages/react/src/ReactCreateRef.js#L12)

> Ref is just a { current: initialValue } object. It's nothing special. Both useRef(initivalValue) and createRef() give you that.

[Another tweet from Dan Abramov](https://twitter.com/dan_abramov/status/1099840977601261568)

## Wrong usage of `useEffect` hook and how to fix it

### Error

The following code leads to a `max update depth exceeded` error because the dependency `editOrganisation` will always be reset again (and thereby causing the effect to be called for ever):

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

## `async` functions in `useEffect` hooks

### Solve for `race` conditions

- In case of async functions which set local state, you have to prevent a component to set state when it might have already unmounted.
- This can be done via an auxiliary variable `isCancelled` which becomes `true` when the component of the hook unmounts.

```js
useEffect(() => {
  let isCancelled = false;

  const checkUserSession = async () => {
    try {
      const session = await retrieveUserSession();

      if (!isCancelled) {
        // call useState setter functions
      }

    } catch (error) {
      // Error handling
    }
  };
  checkUserSession();

  return () => { isCancelled = true };
});
```

See [this related SO thread](https://stackoverflow.com/questions/53332321/react-hook-warnings-for-async-function-in-useeffect-useeffect-function-must-ret).

### hooks + API calls

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

...or React Context.

## Custom hooks

- [`useHooks` has a great example of hooks](https://usehooks.com/)

### Custom hooks example: Redux

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

## Improving hooks example

### Own implementation of the `useAppState` hook

Get the current app state in a React Native application

#### Complicated approach

```ts
import { useState, useEffect, useRef } from 'react';
import { AppState, AppStateStatus } from 'react-native';

const useAppState = (): AppStateStatus => {
  const appStateRef = useRef(AppState.currentState);
  const [appState, setAppState] = useState(appStateRef.current);

  useEffect(() => {
    AppState.addEventListener('change', handleAppStateChange);

    return () => {
      AppState.removeEventListener('change', handleAppStateChange);
    };
  });

  const handleAppStateChange = (nextAppState: AppStateStatus) => {
    appStateRef.current = nextAppState;
    setAppState(appStateRef.current);
  };

  return appState;
};

export default useAppState;
```

**Issues**:

- Why are you using both here? A `ref` and a `state` variable to store the appState value? I believe you use the `useState` hook because you want that a change in the `appState` variable triggers a rerender, right? But why are you also using the `useRef` hook?
- Why has this `useEffect` hook no dependency array? The listener is removed and recreated on every single render. I think we just need to create the event listener once. Then it will listen for changes which you handle with the `handleAppStateChange` callback, right?


#### Refactored and simplified

```ts
import { useState, useEffect } from 'react';
import { AppState, AppStateStatus } from 'react-native';

const useAppState = (): AppStateStatus => {
  const [appState, setAppState] = useState(AppState.currentState);

  useEffect(() => {
    AppState.addEventListener('change', handleAppStateChange);

    return () => {
      AppState.removeEventListener('change', handleAppStateChange);
    };
  }, []);

  const handleAppStateChange = (nextAppState: AppStateStatus) => {
    setAppState(nextAppState);
  };

  return appState;
};

export default useAppState;
```

Same solution can be found in the [react-native-community/hooks](https://github.com/react-native-community/hooks/blob/ffd6f2d7b27ef046f75c8818c92db72711018cc9/src/useAppState.ts) package.

## Motivating hooks to manage state

- Great video about [state management with React hooks](https://youtu.be/-yj23RtyT-E).
- [The State of React’s State in 2019](https://youtu.be/dPY8y4CB3mI)

## Testing

- [How to test custom hooks](https://kentcdodds.com/blog/how-to-test-custom-react-hooks)

## Custom hook libraries

### React Native

- [React Native Community hooks](https://github.com/react-native-community/hooks)

### React

- [swr - React Hooks for remote data fetching](https://github.com/vercel/swr)
- [react-use : List of many many hooks](https://github.com/streamich/react-use)
- [useHooks](https://github.com/gragland/usehooks)
- [react-native-community/hooks](https://github.com/react-native-community/hooks)
- [Captain Hooks](https://github.com/stevenpersia/captain-hook)
