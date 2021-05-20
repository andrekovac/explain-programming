---
title: 'Haskell'
description: 'Basics of the Haskell programming language'
date: '2019-01-01T00:58:52.169Z'
author: 'André Kovac'
category: 'programming-language'
tags: ['functional', 'basic']
---

## Cool things

* *Sum-types* (i.e. `|`)

* `>>=` Forcieren Reihenfolge => Imperativer code (ein wenig wie der pipe `|` operator.

* `=>`: Linke Seite legt contraints auf einzelne rechts auftauchende Dinge fest, z.B. `insert :: (Ord k) => k -> v -> BinaryTree k v -> BinaryTree k v` ist hier `k` vom typ `Ord`.

### Trick

```haskell
let result :: _
```

Compile and let haskell tell you the type of the wildcard `_`

## Conventions

### Functions

* Function name starts with lower caps
* We usually use `'` to denote either a strict version of a function (i.e., one that isn’t lazy), or a slightly modified version of a function or variable with a similar name, e.g. `myFunction'`.

* `minBound`, `maxBound`

## Definition/name vs. Function

No parameters

## Operators

* Unequal: `/=`

## Functions

Equivalent prefix and infix function **calls**:

```haskell
div 92 10
```
and

```haskell
92 `div` 10
```

* If a function is composed of only special characters, it’s considered an infix function by default.
* `$`: Calling a function, e.g. `Foo $ a b`

	Apply Function application `$` to List:

	```haskell
	ghci> map ($ 3) [(4+), (10*), (^2), sqrt]
	[7.0,30.0,9.0,1.7320508075688772]
	```

* `.`: Function composition

	```
	(.) :: (b -> c) -> (a -> b) -> a -> c
	```

### Function definitions

```haskell
doubleMe x = x + x
```

## Conditionals

Else is mandatory!

```haskell
doubleSmallNumber x = if x > 100
                        then x
                        else x*2
```

Haskell’s `if` is an *expression* that must return a value, and not a *statement*.

## Lists

* Homogeneous data structure
* Concatenation: `++`
* `['h','e','l','l','o']` is equivalent to the string `hello`
* Cons: `:` (Prepend a single item to list, e.g. `5 : [4,3,2,1]`)
* Empty list: `[]`
* Retrieve value by index: `"Some sentence" !! 4`
* `head`, `tail`, `last`, `reverse`, `take`, `drop` (from beginning), `maximum`, `minimum`, `sum`, `product`, `elem` (usually called as infix function)
* `null`: Check whether list is empty
* `zip [1,2,3,4,5] [5,5,5,5,5]` creates pairs

### List comprehension

Examples:

* `[x*2 | x <- [1..10]]`
* ```[ x | x <- [50..100], x `mod` 7 == 3]```
* Output all combinations of two lists: ```[adjective ++ " " ++ noun | adjective <- adjectives, noun <- nouns]```
* `length' xs = sum [1 | _ <- xs]` (`_` because we don't use it)
* `removeNonUppercase st = [ c | c <- st, c `elem` ['A'..'Z']]`

## Ranges

* `[1..20]`, `['A'..'Z']`, `[3,6..20]`
* Infinite ranges: `take 24 [13, 26..]`
* `cycle`, `repeat`: `take 10 repeat 8`
* `replicate 10 1`


## Tuples

* Heterogeneous data structure
* E.g. (1,3)
* For pairs: `fst`, `snd`

### Currying

functions to tuples

## Types

Since Haskell is a **statically typed language**, it needs to know all the types before the code is compiled (or in the case of GHCi, evaluated)

Functions which use type are called polymorphic functions.

* ```"Abrakadabra" `compare` "Zebra"``` --> `LT`
* `Show` type. `show` prints value as string
* `Enum`: Succ

Type classes: `(MyTypeClass a) => a -> a -> Bool`

* `Num` vs. `Integral`

* Type synonyms: `type Foo = String`

* `($) :: (a -> b) -> a -> b`

## Functors

Functor is data type.

```haskell
class Functor f where
    fmap ::   (a -> b) -> f a -> f b
    <$>  ::   (a -> b) -> f a -> f b
    -- Compare:
    ($)  :: (a -> b) -> a -> b
    <*>  :: m (a -> b) -> m a -> m b

```

* `f` is a type constructor
* e.g.

	```haskell
	instance Functor [] where
   		fmap = map
	```

	here `[]` is a type constructor which can be used as `[Int]`

`Maybe Int` is a concrete type, but `Maybe` is a type constructor that takes one type as the parameter.

# Monad

## Media about Monads

- [A nice video intro to Monads](https://youtu.be/t1e8gqXLbsU)
- [A Javascript intro to Monads](https://blog.kabir.sh/inventing-monads)

## Course notes

Famous monads: `Maybe`, `Either`, `IO`

Because of **monads** error handling can be deferred to the monads and code is nicely **imperative** with the do-notation.

`m b` I can bind with `<-`

C komma operator ~ `>>` operator

* Imperative if-else:

	```haskell
	when :: (Monad m) => Bool => m () -> m ()
	when condition action = if condition then action else ()
	```

	`()` is no action like `void`.

* `pure` = `return` (syntactic sugar)

`IO` is **monad**, so you can create monad versions of `map`, `replicate` etc. so that user input can be used with it.

Work with monadic actions ...

* `Monad` is `applicative` and `functor`

* for loop:

	```haskell
	for :: [a] -> (a -> m b) -> m [b] == forM

	mapM :: (a -> m b) -> [a] -> m [b]
	map  :: (a ->   b) -> [a] ->   [b]
	```

* Replace a chain of monad with bindings

	```haskell
	(>=>) :: (a -> m b) -> (b -> m c) -> (a -> m c)
	f >=> g = \x -> f x >>= g
	f >=> g = \x -> ((>>= g) . f) x
	f >=> g = (>>= g) . f

	(>>=) :: (a -> m b) -> m a -> m b
	f >>= x = ...
	```


	```haskell
	>=> ...
	>=> ...
	```

	```haskell
	>>= \x -> (...) x
	>>= \y -> (...) y
	```
* The following three are identical:

	```haskell
	allArticles <- fmap concat $ pooledForConcurrentlyN 4 keywords $ \keywords -> do
    articleList <- getArticlesByKeyword keywords
    return articleList

  allArticles <- fmap concat $ pooledForConcurrentlyN 4 keywords $ \keywords -> do
    getArticlesByKeyword keywords

  allArticles <- concat <$> pooledMapConcurrentlyN 4 getArticlesByKeyword keywords
	```

# Applicative

--> Auswerte Reihenfolge

`join` -> (better name: `flatten`)

`>>=` ~ `flatMap` , wird oft `bind` genannt (kommt im Haskell logo vor).

"apply" (TODO: Compare with Javascript)

Types:

```haskell
pure :: a -> f a
(<*>) :: f (a -> b) -> f a -> f b

(*>) :: f a -> f b -> f b
(<*) :: f a -> f b -> f a
```

## Monad

* `<-`

	```haskell
	-- If `foo` is of type IO, `bar` is unpacked `foo`, thus not of type IO
	bar <- foo
	```

## Comments

`--` or `{- ... -}`

## Modules

```haskell
module Module1 (x, square) where

...
```

```haskell
module ProjectX.Module2 where

...
```

```haskell
import Module1 (square, x)
import ProejctX.Module2 (SomeType

```

* `import Foo hiding (myMap)` : Import all but `myMap`
* In many packages `.internal`

## Records & Accessors

## IO

"IO Unit" `IO ()`

* `print = puStrLn . show` is equivalent to `print x = putStrLn (show x)`

## Useful to know

* `flip`: flips arguments of function

* inside `do ...` you have to define new variables with let
* `<>` is generalization of `++` concatenation
* `T.pack someString` wird zu type Text.

* `.`: Apply functions in row:

	```haskell
	foo = doFirst . doSecond
	-- Equivalent:
	foo a = doFirst (doSecond a)
	```

* `_ -> ...` handle all other cases which are not pattern matched.


## Similarity to javascript/python

> Be aware that reduce is actually a foldl, in Haskell terms. There is no special syntax to perform folds, there's no builtin foldr, and actually using reduce with non-associative operators is considered bad style.
> [Source](https://stackoverflow.com/questions/10366374/what-is-the-pythonic-equivalent-to-the-fold-function-from-functional-program#10366417)