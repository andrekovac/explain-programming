---
title: 'Haskell - Functor'
description: 'Important concepts of haskell and their derivation'
date: '2019-01-01T00:58:52.169Z'
author: 'André Kovac'
category: 'programming-language'
tags: ['functional', 'basic']
draft: true
---

## Tree

```haskell
data Tree t = Node (Tree t) (Tree t) | Leaf t
  deriving (Eq, Show)

t1 :: Tree Integer
t1 = Leaf 3

t2 :: Tree Integer
t2 = Node (Leaf 1) (Leaf 3)

t3 :: Tree Integer
t3 = Node t2 (Leaf 32)

flatten :: Tree a -> [a]
flatten t = case t of
  Leaf el -> [el]
  Node l r -> flatten l ++ flatten r

mapTree :: (a -> b) -> Tree a -> Tree b
mapTree f t = case t of
  Leaf el -> Leaf (f el)
  Node l r -> Node (mapTree f l) (mapTree f r)
```

## Maybe

```haskell
data MyMaybe a = MyNothing | MyJust a
  deriving (Eq, Show)

-- In Scala and Rust this is called:
-- data Option a = None | Some a

-- data Maybe a = Nothing | Just a


data MyEither a b = MyLeft a | MyRight b
  deriving (Eq, Show)

-- data Either a b = Left a | Right b
```

```haskell
data NiklasTyp a
  = Nix
  | EinElement a
  | ZweiElemente a a
  deriving (Eq, Show)
```

## `mapMaybe` and `mapEither`

```haskell
mapMaybe :: (a -> b) -> Maybe a -> Maybe b
mapMaybe _ Nothing = Nothing
mapMaybe f (Just x) = Just (f x)

mapEither :: (a -> b) -> Either e a -> Either e b
mapEither _ (Left x) = Left x
mapEither f (Right x) = Right (f x)

userQuery = Right 3.4
userResult = mapEither (\x -> x*2) userQuery -- lambda function
```

## Derivation of functors

```haskell
--  \
--  /\

-- We wrote:
--   map       :: (a -> b) -> [a]        -> [b]
--   mapTree   :: (a -> b) -> Tree a     -> Tree     b
--   mapMaybe  :: (a -> b) -> Maybe a    -> Maybe    b
--   mapEither :: (a -> b) -> Either e a -> Either e b

-- Type classes

class Mappable m where
  genericMap :: (a -> b) -> m a -> m b

class MyFunctor f where
  myfmap :: (a -> b) -> f a -> f b

instance MyFunctor Maybe where
  -- myfmap :: (a -> b) -> f a -> f b
  -- We know: f ~ Maybe
  myfmap :: (a -> b) -> Maybe a -> Maybe b
  -- myfmap f ma = mapMaybe f ma
  myfmap = mapMaybe

-- [a]
-- ==
-- [] a

instance MyFunctor [] where
  myfmap = mymap

instance MyFunctor Tree where
  myfmap = mapTree

instance MyFunctor (Either e) where
  myfmap = mapEither

-- Haskell's real Functor

instance Functor Tree where
  fmap = mapTree


genericSquare :: (Functor f) => f Integer -> f Integer
genericSquare = fmap (\x -> x*x)
-- same as
-- genericSquare container = fmap (\x -> x*x) container

squaredTree1 = genericSquare t3
squaredList1 = genericSquare [1..10]
squaredMaybe1 = genericSquare (Just 4)

-- :info Eq
-- :info Show
-- :info Ord
-- :info Functor
```

## Simple quicksort implementation

```haskell
quicksort :: (Ord a) => [a] -> [a]
quicksort [] = []
quicksort (p:rest) =
  let smaller = filter (< p) rest
      larger  = filter (>= p) rest
  in
    quicksort smaller ++ [] ++ quicksort larger
```

## BinaryTree

```haskell
-- Übung:

data BinaryTree k v
  = Empty
  | InnerNode k v (BinaryTree k v) (BinaryTree k v)

flattenBinaryTree :: BinaryTree k v -> [(k, v)]
flattenBinaryTree = error "TODO"

mapBinaryTree :: (a -> b) -> BinaryTree k a -> BinaryTree k b
mapBinaryTree = error "TODO"

-- Write a functor instance for BinaryTree

insert :: (Ord k) => k -> v -> BinaryTree k v -> BinaryTree k v
insert key value = error "TODO"

lookupTree :: (Ord k) => k -> BinaryTree k v -> Maybe v
lookupTree = error "TODO"

sortByTree :: (Ord a) => [a] -> [a]
sortByTree = error "TODO"
```
