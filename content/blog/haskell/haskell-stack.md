---
title: 'Haskell stack and ghci'
description: 'Basic instructions on how to run Haskell stack and the ghci console'
date: '2019-01-01'
author: 'André Kovac'
category: 'programming-language'
tags: ['functional', 'basic']
draft: true
---

## Play with haskell online

- Use the [online haskell editor repl.it](https://repl.it/languages/haskell)

## ghci console

- `let a = 1` is equivalent to `a = 1` in a script.
- Write shell commands after `:!`

* Allen deriving-generierten Code anzeigen:

	```
	:set -ddump-deriv
	```

	then `:r`

## stack

### start ghci

```bash
stack --resolver lts-13.0 exec ghci
```

Add a file `stack.yaml` to your project and write the following into it:

```yaml
resolver: lts-13.0
```

### Execute project

```bash
stack exec NAME-exe

stack exec -- ghc --make File.hs

${stack exec -- }

```

where Name is the name of your project folder

### See where executable is

```bash
stack path
```
