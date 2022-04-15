---
title: 'Typescript type guards'
description: 'Explanation of the concept of a type guard in Typescript'
date: '2020-06-24'
author: 'André Kovac'
category: 'programming-language'
tags: ['javascript', 'typescript']
draft: false
---

## Narrowing

- Type Guards are a form to **narrow** a type, i.e. making the type more precise.
  - in `let foo = "hello" as string`, `"hello" extends string`


- Read [this article from the typescript docs](https://www.typescriptlang.org/docs/handbook/advanced-types.html#user-defined-type-guards).

  > A type guard is some expression that performs a runtime check that guarantees the type in some scope.

## Different type guards

```ts
const bar: {
    foo?: string[];
}

// JavaScript
if (bar.foo !== undefined) {
    const myLength = foo.length;
}

// Built-in TypeScript type-guard
if (typeof bar.foo !== "undefined") {
    const myLength = foo.length
}
```

Using the `in` operator does not always work well (see [this SO question](https://stackoverflow.com/questions/43422187/typescript-type-guard-through-in-operator)):

```ts
if ('field' in Object) {
  // ...
}
```


Different kinds to set up type guards.

## [Custom (user-defined) type guards](https://2ality.com/2020/06/type-guards-assertion-functions-typescript.html#the-array-method-.every()-does-not-narrow)


### User-defined type guard

A user-defined type guard returns a **type predicate** of the form "parameterName" `is` "Type". It's a boolean value describing whether the parameter "parameterName" is indeed type "Type".

Example from [this blog article about custom type guards](https://rangle.io/blog/how-to-use-typescript-type-guards/):

```ts
const isCar = (variableToCheck: any): variableToCheck is Car =>
  (variableToCheck as Car).turnSteeringWheel !== undefined;
```

Analogous from the [TS Docs](https://www.typescriptlang.org/docs/handbook/advanced-types.html#using-type-predicates):

```ts
function isFish(pet: Fish | Bird): pet is Fish {
  return (pet as Fish).swim !== undefined;
}
```

### Type guards with generics:

Example 1 taken from [here](https://2ality.com/2020/06/type-guards-assertion-functions-typescript.html#the-array-method-.every()-does-not-narrow):

```ts
function isNotNullish<T>(value: T): value is NonNullable<T> { // (A)
  return value !== undefined && value !== null;
}
```

With a generic

```ts
export const isOfType = <T>(
  varToBeChecked: any,
  propertyToCheckFor: keyof T
): varToBeChecked is T =>
  (varToBeChecked as T)[propertyToCheckFor] !== undefined;

// use it as:
if (isOfType<Car>(vehicle, 'turnSteeringWheel')) {
  // ...
}
```