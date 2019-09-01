---
title: 'Imperative vs. declarative programming'
date: '2019-08-01T17:52:03.284Z'
description: 'What do the terms imperative and declarative mean in the context of programming languages?'
category: 'theory'
tags: ['concepts']
---

## Declarative

* Building the structure and elements of computer programs—that expresses the logic of a computation without describing its control flow
* Eliminates *side-effects*

>In computer science, a function or expression is said to have a side effect if it modifies some state or has an observable interaction with calling functions or the outside world.

## Imperative

* Statements that change a program's state
* Imperative mood in natural languages, e.g. "Tidy up!"

## Comparing **declarative** and **imperative**

Many languages that apply this style attempt to minimize or eliminate side effects by describing what the program must accomplish in terms of the problem domain, rather than describe how to accomplish it as a sequence of the programming language primitives[2] (the how being left up to the language's implementation). This is in contrast with imperative programming, which implements algorithms in explicit steps.

[see this wiki article](https://en.wikipedia.org/wiki/Declarative_programming)

### Example comparison: `React` vs. `html`

#### HTML (DOM)

* Imperative
* Mutative

#### React

* Declarative
* Immutable

* 😍 Easier to maintain and extend and more fun