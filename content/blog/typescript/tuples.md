---
title: 'Typescript tuples'
description: 'A close look at the Typescript tuples with examples'
date: '2022-07-21'
author: 'André Kovac'
category: 'programming-language'
tags: ['javascript', 'typescript']
---

## Tuple

- A tuple is a fixed-size list of elements of (different) types, e.g. `[string, number]`

## Giving the TS compiler **hints**

> You need to give a hint to the compiler to expect a tuple type. Otherwise the compiler will widen an array literal like [2, 3, 4] to number[]. The hint usually takes the form of including a tuple type in the type annotation or generic constraint; preferably a union of some tuple type that doesn't get in the way of what you're doing

See [this reply of jcalz](https://stackoverflow.com/a/62207061/3210677)



### Examples

1. [require same length of two tuples](https://stackoverflow.com/a/62206961/3210677)

  Here the compiler gets the hint `readonly [] |` -> a union with an empty tuple (the `readonly` just makes it more general)

  ```ts
  function requireTwoSameLengthTuples<
      T extends (readonly [] | readonly any[]) & (
          number extends T["length"] ? readonly [] : unknown
      )>(t: T, u: { [K in keyof T]: any }): void { }
  ```

  Other Notes:

  - `number extends T["length"]` means that `number` is a subtype of `T["length"]` -> `T` has to be an array in this case. I.e. `T["length"]` is not a [numeric literal](https://www.typescriptlang.org/docs/handbook/advanced-types.html#numeric-literal-types).

2. [`| [never]` hint](https://stackoverflow.com/a/62207061/3210677)

  ```ts
  function myFunction<N extends number>(
      array1: ArrayOfFixedLength<any, N> | [never],
      array2: ArrayOfFixedLength<any, N & {}> | [never]) {
      return true;
  }
  ```

  - see [discussion "Add a way to prefer narrowing array to tuple if possible"](https://github.com/microsoft/TypeScript/issues/27179#issuecomment-422606990)
  - See `& {}` discussion in [the main TypeScript document](./index.md)

## Tuple Examples

- [Tuple to Union](https://gist.github.com/andrekovac/c1062182381554cecd80fb9602d40647)

  ```ts
  export type TupleToUnion<T extends unknown[]> = T[number];

  export type TupleToUnion2<T extends unknown[]> = T extends [
      infer U,
      ...infer Rest
  ]
      ? TupleToUnion2<Rest> | U
      : never;
  ```
