---
title: 'Imperative vs. declarative - Advanced facts'
date: '2020-10-13'
author: 'André Kovac'
description: 'What do the terms imperative and declarative mean in the context of creating interactive user interfaces in React and React Native in contrast to jQuery?'
category: 'theory'
tags: ['definition', 'react', 'jQuery', 'react-native']
draft: true
ready: false
published: false
---

#### Every computer needs **imperative** commands

The computer eventually needs a sequence of imperative commands. The programming language or framework just hides it from the developer:

> However, any declarative program is eventually transformed into a sequence of imperative steps.

That's what [React's virtual DOM](https://nebulab.it/blog/virtual-dom/) does. It creates a new copy of a virtual DOM tree (created from the JSX code) every time something changes. It compares this new virtual DOM tree with the one from before and mutates the parts of the browser's DOM which actually changed.

#### Mutability vs. Immutability

- Did you also see that with **jQuery** we mutated the DOM directly?
- **React** on the other hand

#### Issues of the imperative approach

> Many languages that apply [a **declarative** style] attempt to minimize or eliminate side effects by describing **what** the program must accomplish in terms of the problem domain, rather than describe how to accomplish it as a sequence of the programming language primitives[2] (the **how** being left up to the language's implementation). This is in contrast with imperative programming, which implements algorithms in explicit steps.

[See this Wikipedia article for more](https://en.wikipedia.org/wiki/Declarative_programming)




See this great article about [React reconciliation](https://nebulab.it/blog/virtual-dom/).

### Navigation

`react-navigation` new approach

### Example: react-navigation

Another example is the comparison of `react-navigation` v4 (**imperative**) to v5 (**declarative**):

In v5 you declare which Navigator is shown dependent on the state of your App. In v4 you tell the Navigator where to route to given certain events.

For example "user credentials are successfully processed -> route to Home Screen" vs. user credentials are successfully processed -> change user login state -> Home Screen is shown because it was declared to be the right screen for this state.

### Example comparison: `React` vs. `html`

#### HTML (DOM)

- Imperative
- Mutative

#### React

- Declarative
- Immutable

See this [article about imperative vs declarative in JS](https://codeburst.io/imperative-vs-declarative-javascript-8b5e45a602dd).

---

## Declarative programming

### Prolog

In the prolog programming language it's all about representing the knowledge domain.

Here it is described who is a `creature` and who has two legs and a `human` is defined as a `creature` who has two legs.

```prolog
creature(jessica).
creature(dog).

twoLegs(jessica).

human(X) :-
   creature(X), twoLegs(X).
```

Now one can check whether `jessica` is a human:

```pl
human(jessica)
```

The implementation detail of how the answer is derived is hidden from us.

### React and Prolog

Let's compare the declarative approaches taken in Prolog and React.

This idea of only describing the knowledge domain and letting the framework do the rest.

## Declarative code eliminates _side-effects_

- What is a **side-effect**?

  > In computer science, a function or expression is said to have a side effect if it modifies some state or has an observable interaction with calling functions or the outside world.

- Why does a declarative approach eliminate side-effects?

  > Declarative programming favors immutability whenever possible, meaning the state of an object can’t be modified. Immutable objects are easier to reason about. Once the initial state is established, it does not change—it is not subject to side effects.

  quoted from [here](https://www.capitalone.com/tech/cloud/declarative-programming-guide/).

### Declarative

- In a declarative computer program the code structure expresses which result we want but does not describe step-by-step on how to get there.

> [...] declarative programming is about describing **what** you're trying to achieve, without instructing **how** to do it.

as written [here](https://www.netguru.com/blog/imperative-vs-declarative).

- Building the structure and elements of computer programs—that expresses the logic of a computation without describing its control flow

### Imperative

- Statements that change a program's state
- Imperative mood in natural languages, e.g. "Tidy up!"

## Glossary

Rendering, the act of creating a DOM (Document Object Model) tree from html code.


