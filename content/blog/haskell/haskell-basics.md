---
title: 'Haskell Basics'
description: 'Important concepts of haskell and their derivation'
date: '2019-01-01T00:58:52.169Z'
author: 'André Kovac'
category: 'programming-language'
tags: ['functional', 'basic']
draft: true
---

## Basics

```haskell
{-# LANGUAGE InstanceSigs #-}
{-# LANGUAGE DeriveFunctor #-}


import Data.List (sort)

add :: Integer -> Integer -> Integer
add x y = x + y

-- stack exec -- ghci andre.hs
-- :r / :reload
-- :l andre.hs / :load andre.hs
-- :set -Wall

-- :t expression / :type expression

add2 :: Integer -> Integer -> Integer
add2 x y = (+) x y

add3 x y = x `add` y


fib :: Integer -> Integer
fib 0 = 0
fib 1 = 1
fib n = fib (n-2) + fib (n-1)

fib2 :: Integer -> Integer
fib2 n = fibFast n 0 1
  where
    fibFast :: Integer -> Integer -> Integer -> Integer
    fibFast 1 _ r = r
    fibFast n l r = fibFast (n-1) r (l+r)
```

## Let-bindings

```haskell
fib3 :: Integer -> Integer
fib3 n =
  let
    fibFast :: Integer -> Integer -> Integer -> Integer
    fibFast 1 _ r = r
    fibFast n l r = fibFast (n-1) r (l+r)
  in
    fibFast n 0 1
```

## Type Alias

```haskell
type String = [Char]
```

```haskell
data MyBool = MyTrue | MyFalse deriving (Show, Eq)
```

```haskell
(.&&) :: MyBool -> MyBool -> MyBool
MyTrue .&& MyTrue = MyTrue
_      .&& _      = MyFalse

-- Das gleiche wie:
-- (.&&) MyTrue MyTrue = MyTrue
-- (.&&) _      _      = MyFalse

-- In der Haskell-Prelude:
--
--   data Bool = True | False deriving Show
--
--   (.&&) :: Bool -> Bool -> Bool
--   True .&& True = True
--   _      .&& _      = False
```

## Sum types and product types

```haskell
type Legs = Int

data Animal = Person String Int | Mammal Legs
  deriving Show

data A = A1 | A2 | A3 -- 3 possible members
data B = B1 | B2      -- 2 possible members

data S = Sa A | Sb B -- sum type: 3+2 = 5 possible members

data P = Pa A B -- product type: 3*2 = 6 possible members

-- Records

data User = User { userName :: String, userId :: Int }
  deriving Show

user1 = User "Niklas" 1234
user2 = User { userName = "Niklas", userId = 1234 }


data List a = Nil | Cons a (List a)

l1, l2, l3 :: List Integer
l1 = Nil
l2 = Cons 5 (Cons 3 Nil)
l3 = Cons 6 l2

renderList :: List Integer -> String
renderList Nil = ""
renderList (Cons val restList) = show val ++ "," ++ renderList restList

renderListPretty :: List Integer -> String
renderListPretty Nil = "[]"
renderListPretty l = "[" ++ renderRest l
  where
    renderRest (Cons val Nil) = show val ++ "]"
    renderRest (Cons val restList) = show val ++ "," ++ renderRest restList

renderAnimal :: Animal -> String
renderAnimal (Person name age) = "Ich bin " ++ name ++ " und " ++ show age ++ " alt"
renderAnimal (Mammal legs) = "Ich bin ein Säugetier und habe " ++ show legs ++ " Beine"
```

## Haskell's list typeL

```haskell
-- data [a] = [] | a:[a]
-- data [a] = [] | (:) a [a]
-- data [] a = [] | (:) a [a]

listLength :: [a] -> Integer
listLength [] = 0
listLength (a:restList) = listLength restList + 1

mymap :: (a -> b) -> [a] -> [b]
mymap f [] = []
mymap f (x:xs) = f x : mymap f xs

myfilter :: (a -> Bool) -> [a] -> [a]
myfilter f [] = []
myfilter f (x:xs) =
  let filteredRest = myfilter f xs
  in
    if f x then x:filteredRest else filteredRest
```

## Guards

```haskell
myfilter2 :: (a -> Bool) -> [a] -> [a]
myfilter2 f [] = []
myfilter2 f (x:xs)
  | f x       = x : myfilter2 f xs
  | otherwise =     myfilter2 f xs

-- otherwise :: Bool
-- otherwise = True

isEven :: Integer -> Bool
isEven x
  | x `mod` 2 == 0 = True
  | otherwise      = False
```

## Case expressions

```haskell
mymap2 :: (a -> b) -> [a] -> [b]
mymap2 f l = case l of
  []   -> []
  x:xs -> f x : mymap2 f xs

-- data List a = Nil | Cons a (List a)
```