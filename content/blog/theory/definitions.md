---
title: 'Computer Science theory definitions'
date: '2019-11-17T00:00:00.000Z'
author: 'André Kovac'
description: 'What do the terms imperative and declarative mean in the context of programming languages?'
category: 'theory'
tags: ['concepts', 'definition', 'stub']
ready: true
---

- **Singleton**

  - Restrict the instantiation of a class to one "single" instance ([see the wiki article](https://en.wikipedia.org/wiki/Singleton_pattern))

  - This is useful when exactly one object is needed to coordinate actions across the system.

- `debounce`:

  - it limits the rate at which a function can fire
  - In `redux-saga` is non-blocking.

- **idempotent**: When applying a function multiple times, the state won't change after applying it the first time.

  - A function we can retry several times until it works! Yeah!

- **idiomatic**: Idiomatic in the context of programming can usually be defined as "the most natural way to express something in a language"

- **imperative** vs. **declarative**

  See also [the post which compares imperative vs. declerative in more depth](./imperative-declerative.md)

  - imperative:

  ```js
  try {
    showButton();
  } catch (error) {
    // ...
  }
  ```

  Here `showButton` is an **imperative** command to do something! I **_tell_** React to "Go, show that button!"

  - declarative:

  ```js
  {
    !isLoading && <Button />;
  }
  ```

  I'm declaring that the `Button` is there. It's just there. I don't have to **_tell_** anyone (compiler/code) to do so.

  - Another example is the comparison of `react-navigation` v4 (**imperative**) to v5 (**declarative**):
    In v5 you declare which Navigator is shown dependent on the state of your App. In v4 you tell the Navigator where to route to given certain events.
    For example "user credentials are successfully processed -> route to Home Screen" vs. user credentials are successfully processed -> change user login state -> Home Screen is shown because it was declared to be the right screen for this state.
