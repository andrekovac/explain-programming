---
title: 'Typescript `never` type'
description: 'Discussions about the `never` type in Typescript'
date: '2018-03-15'
author: 'André Kovac'
category: 'programming-language'
tags: ['javascript', 'typescript']
---

## Definition

> [`never`] is a special type, the opposite of `any`. Nothing can be assigned to it.

Taken from [here](https://medium.com/dailyjs/typescript-create-a-condition-based-subset-types-9d902cea5b8c).

## What is `never[]` when using `strictNullChecks`?

An empty Array (e.g. `[]`) which cannot be typed gets the type `never[]`. Read about the corresponding PRs [here](https://github.com/microsoft/TypeScript/pull/8944) and [here](https://github.com/microsoft/TypeScript/pull/8907).

In earlier TypeScript versions it used to get type `any[]` but that is not as safe as `never[]` because whereas `never` (and `any`) can be assigned to anything, anything can be assigned to `any`, but nothing can be assigned to `never`.

It indeed is a weird thing to see the `never` type here (see [this TS Playground](https://www.typescriptlang.org/play?ssl=2&ssc=19&pln=1&pc=1#code/DYUwLgBARgXBB2IBuIBOBuAsAKFJAhnAM5ioCW8A5hALzRbY5A)). `never` marks a value which never exists. But since no value can be assigned `never`, the type `never[]` prevents you from assigning a value to the array elements later - which in turn forces you to add a type assignment (or type assertion) to define the array type so one can finally assign values to it!

### Example and fix

```ts
const [myArray, setMyArray] = setState([]);
```

Fix it by setting the type of the array with `setState`:

```ts
const [myArray, setMyArray] = setState<MyArrayType>([]);
```

Read more [here](https://blog.logrocket.com/when-to-use-never-and-unknown-in-typescript-5e4d6c5799ad/) about when to use `never` and `unknown` in TypeScript.

## Functions which return the `never` type

**[Definition](https://basarat.gitbooks.io/typescript/docs/types/never.html)**: A function that doesn't explicitly return a value implicitly returns the value `undefined` in JavaScript.

A function that has a `never` return type **never** returns. It doesn't return `undefined`, either. The function doesn't have a normal completion, which means it throws an ***error*** or never finishes running at all (e.g. if the function body has `while(true){}`), for example:

```ts
function eventLoop(): never {
    while(true) {
       	//process events
    }
}
let loop = eventLoop();
loop = undefined // Error: Type 'undefined' is not assignable to type 'never'.
```

(Example taken from [a blog post of Jan Bussieck](https://www.bussieck.com/typescript-types-with-complex-properties/)).

[Another article about never](https://blog.mariusschulz.com/2016/11/18/typescript-2-0-the-never-type)

### Question concerning `never`

**The error which got me to learn more about `never`**:

Here Typescript says

```bash
Argument of type 'string[]' is not assignable to parameter of type 'never[]'. Type 'string' is not assignable to type 'never'
```

**Question**:

Typescript: Under `strictNullChecks` option, using `concat` in order to build an array leads to type `never[]` error.

Why is `[node.getData().name]` inferred to be of type `never[]`?

```bash
No overload matches this call.
  Overload 1 of 2, '(...items: ConcatArray<never>[]): never[]', gave the following error.
    Type 'string' is not assignable to type 'never'.
  Overload 2 of 2, '(...items: ConcatArray<never>[]): never[]', gave the following error.
    Type 'string' is not assignable to type 'never'.(2769)
```

In older Typescript versions (earlier than 2.8.1 - that's how long ago I first encountered this! 😬) you might have gotten this similar error:

```bash
Argument of type 'string[]' is not assignable to parameter of type 'ConcatArray<never>'.
  Types of property 'slice' are incompatible.
    Type '(start?: number | undefined, end?: number | undefined) => string[]' is not assignable to type '(start?: number | undefined, end?: number | undefined) => never[]'.
      Type 'string[]' is not assignable to type 'never[]'.
        Type 'string' is not assignable to type 'never'.
```

What they all have in common: `Type 'string' is not assignable to type 'never'.`.

```ts
const nodes = [{ name: 'a' }, { name: 'b' }];

const nodeNames = nodes.reduce(
  (acc, node) => acc.concat([node.name]),
  []
);
```

You can play around with this example [in this typescript playground](https://www.typescriptlang.org/play/?ssl=7&ssc=1&pln=1&pc=1#code/MYewdgzgLgBGIBMCmEYF4YG0DecCGAtkgFwwDkeZMAvgDQy5iEnkBGV1AugNwBQvoSLHjIAcs1QYRKAHQAnJAgCuwJAApeMGGrzBg9aQEp0APhi7gMwcDxQ1maTKZFOh2pqydehvkA).

And why does the following, i.e. `result: Array<String>` fix it?

```js
const nodeName = childNodes.reduce(
    (result: Array<String>, node) =>
        result.concat([node.getData().name!]),
    []
);
```

**Answer**:

The problem is the empty array which is passed as starting point of my `reduce` call. In the first iteration concat will be called like so: `[].concat(...)`. `[]` has the inferred type `ConcatArray<never>` because with the `strictNullChecks` option its inferred type is not automatically `any[]`. So a fix is to explicitly cast it to `any[]`, i.e.

```js
const nodes = [{ name: 'a' }, { name: 'b' }];

const nodeNames = nodes.reduce(
  (acc, node) => acc.concat([node.name]),
  [] as any[]
);
```

A better fix is of course to set it to a better type via `Array<String>` as above.

However, you might ask why `node.name` is implicitly cast to `never` (and `[node.name]` to `ConcatArray<never>`) in the first place. I found an answer for this [in this Github issue reply](https://github.com/Microsoft/TypeScript/issues/10479#issuecomment-241559296):

It has to do with **type widening**. Here (in the context of a `reduce` function) no contextual type for the empty array `[]` can be inferred.

Since we are in `strictNullChecks` mode, we cannot give `[node.name]` the value of `undefined` (which would be widened to `any[]` in **non** `strictNullChecks` mode.

More about `strictNullChecks`: When `strictNullChecks` option is **false**, an empty array `[]` could be widened to `undefined` since `undefined` is in the domain of all types (i.e. all objects can take on the value of `undefined` or `null`) and would thus be widened to `any`.)) because in `strictNullChecks` mode `undefined` is just `undefined` and can't be widened to anything else.

But typescript can't just set the type of `node.name` to `undefined` since it might not be `undefined`. So the typescript developers thought `never` would be the best choice here since it prompts you to make a better decision (by explicitly setting the type or by casting the empty array to something suitable) in case the array is going to be modified (i.e. will indeed get some values). [BTW: This PR lead to this particular behavior](https://github.com/Microsoft/TypeScript/pull/8944)

Them calling this type `never[]` really seems a bit misleading, because `never` actually means something different. There was also a [suggestion](https://github.com/Microsoft/TypeScript/pull/8944) to make it to a type like `unknown[]` which sounds more reasonable to me..

Perhaps one day typescript will be able to contextually infer that here `[]` is inside a `reduce` function and thus `[]` will really be modified and hence can give it an implicit type of whatever the output of the second argument function is.
Until then we now know why it's the way it is!

### Open questions

1. How does type widening work? I.e. why is `[]` widened to `undefined` and that then further widened to `any` as I write above and as it is stated [here](https://github.com/Microsoft/TypeScript/issues/10479#issuecomment-241559296).

  See `## Type Widening` section in [Typescript index article](./index.md)

2. How does `strictNullChecks` mode work? I.e. why can't `undefined` not be widened.

  See [my article about strict flags](./strict-flags.md).

3. Difference between `String[]` and `string[]`. See this discussion: https://stackoverflow.com/questions/14727044/typescript-difference-between-string-and-string

4. Further thoughts on this question can be found here: https://stackoverflow.com/questions/54117100/why-does-typescript-infer-the-never-type-when-reducing-an-array-with-concat/62537717#62537717

## `never` to conditionally allow properties of an object

This could also be called "use `never` to prune conditional types". See the section named like this in [this article about `never` and `unknown`](https://blog.logrocket.com/when-to-use-never-and-unknown-in-typescript-5e4d6c5799ad/).

Also see my SO question

### Notes

Generally it's better to use `[ ...items ]` instead of `[].concat(items)` because it's quite inefficient. See this [GitHub reply](https://github.com/Microsoft/TypeScript/issues/10479#issuecomment-324271498).