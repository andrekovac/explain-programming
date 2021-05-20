---
title: 'Typescript type guards'
description: 'Explanation of the concept of a type guard in Typescript'
date: '2020-06-24'
author: 'André Kovac'
category: 'programming-language'
tags: ['javascript', 'typescript']
draft: true
---

Read [this article from the typescript docs](https://www.typescriptlang.org/docs/handbook/advanced-types.html#user-defined-type-guards).

> A type guard is some expression that performs a runtime check that guarantees the type in some scope.

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

Different kinds to set up type guards.

## Custom Type Guards

- **Type Predicate** `is`

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