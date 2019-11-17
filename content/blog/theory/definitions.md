---
title: 'Computer Science theory definitions'
date: '2019-11-17T00:00:00.000Z'
author: 'André Kovac'
description: 'What do the terms imperative and declarative mean in the context of programming languages?'
category: 'theory'
tags: ['concepts', 'definition', 'stub']
---

* `debounce`:
	* it limits the rate at which a function can fire
	* In `redux-saga` is non-blocking.

* **idempotent**:
	* when applying a function multiple times, the state won't change after applying it the first time.

	--> A function we can retry several times until it works! Yeah!

* **idiomatic**:
	* Idiomatic in the context of programming can usually be defined as "the most natural way to express something in a language"

* **imperative** vs. **declarative**

    See also [the post which compares imperative vs. declerative in more depth](./imperative-declerative.md)

	* imperative:

		```js
		try {
		  showButton();
		} catch (error) {
		  // ...
		}
		```

		Here `showButton` is an imperative command to do something! I ***tell*** React to "Go, show that button!"

	* declerative:

		```js
		<Button />
		```

		I'm declaring that the `Button` is there. It's just there. I don't have to ***tell*** anyone (compiler/code) to do so.
