---
title: 'Typescript - Strict flags'
description: 'Discussion of the effect of the strict flags `--strictNullChecks` and `--noImplicitAny`'
date: '2018-03-01T12:07:32.169Z'
category: 'programming-language'
tags: ['javascript', 'typescript']
---

## Very strict flags

[Overview of flags in article by Axel Rauschmayer](http://2ality.com/2018/04/type-notation-typescript.html)

### `--strictNullChecks`

**Definition**:

* Objects can't take on the values of `null` or `undefined` if not explicitly specified.
* If this flag is not set, every JS object can take on `null` or `undefined`. So the types `null` and `undefined` are widened to `any`.
* [see also this article](https://blog.mariusschulz.com/2016/09/27/typescript-2-0-non-nullable-types)

e.g. leads to having a `[]` without contextual type to get inferred to `never[]`. This can be made explicit by casting to type `any[]`, e.g. `[] as any[]`.

**Explanation**:

>The issue is what is the element type of `[]` if there is no **contextual** type? `undefined` seems reasonable since there is not a better source of information available. This works in non strict null checks mode because `undefined` is in the domain of all types, and gets widened to `any`. In `stictNullChecks` it does not, since `undefined` is not any other type except `undefined`; and in that sense, `never` is a better name for this condition. So it is not `never` that is the issue.

[taken from here](https://github.com/Microsoft/TypeScript/issues/10479)

### `--noImplicitAny`

[Definition from Axel Rauschmayer](http://2ality.com/2018/04/type-notation-typescript.html):

> If TypeScript can’t infer a type, you must specify it. This mainly applies to parameters of functions and methods: With this settings, you must annotate them.

Throws an error when the type of something is implicitly widened to `any`, e.g. when empty array literals are widened from `never[]` to `any[]`.

`noImplicitAny` is often used together with `strictNullChecks `. [This discussion](https://github.com/Microsoft/TypeScript/pull/8944) shows how the implicit widening of `never[]` to `any[]` is disabled with `strictNullChecks` already to prevent `noImplicitAny` from throwing an error then.