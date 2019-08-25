---
title: 'Typescript `never` type'
description: 'Discussions about the `never` type in Typescript'
date: '2018-03-15T12:07:32.169Z'
category: 'programming-language'
tags: ['javascript', 'typescript']
---

## `never` type

**[Definition](https://basarat.gitbooks.io/typescript/docs/types/never.html)**: A function that doesn't explicitly return a value implicitly returns the value `undefined` in JavaScript.

A function that has a `never` return type **never** returns. It doesn't return `undefined`, either. The function doesn't have a normal completion, which means it throws an ***error*** or never finishes running at all (e.g. if the function body has `while(true){}`).

[Another article about never](https://blog.mariusschulz.com/2016/11/18/typescript-2-0-the-never-type)

## Question concerning `never`

**The error which got me to learn more about `never`**:

Here Typescript says `Argument of type 'string[]' is not assignable to parameter of type 'never[]'. Type 'string' is not assignable to type 'never'`.

**Question**:

Typescript: Under `strictNullChecks` option, using `concat` in order to build an array leads to type `never[]` error.

Why is `[node.getData().name]` inferred to be of type `never[]`?

```js
const nodeNames = childNodes.reduce(
    (result, node) =>
        result.concat([node.getData().name!]),
    []
);
```

And why does the following, i.e. `result: Array<String>` fix it?

```js
const nodeName = childNodes.reduce(
    (result: Array<String>, node) =>
        result.concat([node.getData().name!]),
    []
);
```

**Answer**:

The problem is the empty array which is passed as starting point of my `reduce` call. In the first iteration concat will be called like so: `[].concat(...)`. `[]` has the inferred type `never[]` because with the `strictNullChecks` option its inferred type is not automatically `any[]`. So a fix is to explicitly cast is to `any[]`, i.e.

```js
const nodeName = childNodes.reduce(
    (result, node) =>
        result.concat([node.getData().name!]),
    [] as any[]
);
```

A better fix is of course to set it to a better type via `Array<String>` as above.

However, you might ask why it is implicitly casted to `never[]` in the first place. I found an answer for this [in this Github issue](https://github.com/Microsoft/TypeScript/issues/10479):

It has to do with **type widening**. Here no contextual type for the empty array `[]` can be inferred.

Since we are in `strictNullChecks` mode, we cannot give it the value of `undefined` (which would be widened to `any[]` in **non** `strictNullChecks` mode (more explanation: An empty array `[]` could be widened to `undefined` since `undefined` it is in the domain of all types (i.e. all objects can take on the value of `undefined` or `null`) and would thus be widened to `any`.)) because in `strictNullChecks` mode `undefined` is just `undefined` and can't be widened.

But typescript can't just set the type to `undefined` since it might not be. So the typescript developers thought `never[]` would be the best choice here since it prompts you to make a better decision (by explicitly setting the type or by casting the empty array to something suitable) in case the array is going to be modified (i.e. will indeed get some values). [BTW: This PR lead to this particular behavior](https://github.com/Microsoft/TypeScript/pull/8944)

Called it `never[]` really seems a bit misleading to me, because `never` actually means something different. There was also a [suggestion](https://github.com/Microsoft/TypeScript/pull/8944) to make it to a type like `unknown[]` which might make more sense..

Perhaps one day typescript will be able to contextually infer that here `[]` is inside a reduce function and thus `[]` will really be modified and hence can give it an implicit type of whatever the output of the second argument function is.
Until then we now know why it's the way it is!