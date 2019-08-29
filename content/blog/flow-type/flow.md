---
title: 'Flow Typechecker'
description: 'Flow is a typechecker for Javascript. This page includes some interesting aspects of it'
date: '2017-06-07T17:58:32.169Z'
category: 'framework'
tags: ['javascript', 'types']
---

## Concepts

* Typing string literals

	Does type as `string`:

	```js
	const Foo = 'Foo';
	type FooT = typeof Foo; // doesn't do what you'd expect
	```

	Does type as the actual value `'Foo'`:

	```js
	const Foo: 'Foo' = 'Foo';
	type FooT = typeof Foo; // but this does, which is a crazy amount of boilerplate for a string literal IMO
	```

	See [this GitHub discussion for more](https://github.com/facebook/flow/issues/2639).

* [Generic constraints](https://alligator.io/flow/generic-constraints/)

	```js
	const getAWithoutB = <T: IBeaconMinimum>(
      arrayA: Array<T>,
      arrayB: Array<T>,
      comparator: <T: IBeaconMinimum>(a: T, b: T) => boolean
   ): Array<T> => differenceWith(arrayA, arrayB, comparator);
	```

	**Note**: In `<T: IBeaconMinimum>` `IBeaconMinimum` sets a constraint on the generic `T`. Prob. due to a bug in FlowType in fat-arrow functions, generics without such a constraint don't work (2019/01/18)

* [Exact object types](https://flow.org/en/docs/types/objects/#toc-exact-object-types)

	```js
	// @flow
	var foo: {| foo: string |} = { foo: "Hello", bar: "World!" }; // Error!
	```

* [Immutable Map Type Definition](https://github.com/facebook/immutable-js/blob/master/type-definitions/immutable.js.flow#L685)

	A Map with a key of type string and another Map as value, where the Map as value has again a string as key and the value can have any type. Now when you are asking, I am not sure where I saw the `*` to use for any...

	```js
	const selectLibraryContainerDomain = () => (
		state: Map<string, Map<string, *>>,
		=> state.get('library');
	```

* Suppress flow error on specific line

	```js
	// $FlowFixMe
	const hello = "This will not throw a flow error!";
	```

	in *JSX* e.g.:

	```js
	{/* $FlowFixMe */}
	<LoginContent {...props} />
	```

* Basic saga exists test

	```js
	describe('PreviewPage/sagas', () => {
	  it('should have sagas', () => {
	    sagas.map(saga => expect(saga.constructor.name).toBe('GeneratorFunction'));
       });
     });
     ...
	```

## React

### React Elements

```js
type Props = React.ElementProps<typeof SectionList>;`
```

### Thunk

`redux-thunk` actions can be types as follows:

```js
declare type ThunkAction = (
  dispatch: Dispatch<any>,
  getState: ReduxState
) => any;

declare type Thunk = (action: ThunkAction) => any;
```

An action which accepts a simple action or a Thunk might be typed like that:

```js
export const myAction = () => (
  dispatch: Dispatch<SimpleAction | SomeOtherActionType> & Thunk,
  getState: () => *
) => {
  // ...
}
```

where `SimpleAction` is typed as

```js
declare type SimpleAction = $Exact<StandardAction>;
```

## Issues

* Buggy intersection type `&`

	Will throw errors:

	```js
	type AllProps = StateProps & DispatchProps;
	```

	Will work as expected:

	```js
	type AllProps = {| ...StateProps, ...DispatchProps |};
	```

	(when used in the `connect` call of `react-redux`)

## Declaration files

* Types, Interfaces, Classes
* Use `declare` each time
* Add `export` right after `declare` if it should be available for import.

**Example**:

```js
declare module 'react-native-background-geolocation-android' {

	declare type LogLevel = 0 | 1 | 2 | 3 | 4 | 5;

	declare export type LogLevel = 0 | 1 | 2 | 3 | 4 | 5;

	declare interface DeviceSettings {
		isIgnoringBatteryOptimizations(): Promise<boolean>;
		extras?: Object;
	}

	declare export interface Device {
		layout?: string;
	}

	declare export default class BackgroundGeolocation {
		static LOG_LEVEL_OFF: LogLevel;
		static addListener(
      		event: string,
      		success: Function,
      		failure?: Function
    	): void;
	}
}
```

## Contribute

[https://github.com/flow-typed/flow-typed/blob/master/CONTRIBUTING.md]()
