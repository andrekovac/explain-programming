---
title: 'Haskell - Applicative'
description: 'Important concepts of haskell and their derivation'
date: '2019-01-01T00:58:52.169Z'
author: 'André Kovac'
category: 'programming-language'
tags: ['functional', 'basic']
draft: true
---

## `fmap` and Applicative

```haskell
-- fmap :: (a -> b) -> f a -> f b
-- fmap :: (a -> b) -> (f a -> f b)

plus1 :: Int -> Int
plus1 = (+ 1)

-- fmap plus1 :: f Int -> f Int

-- What happens if we give `fmap` a function that takes
-- more than 1 argument?

plus :: Int -> Int -> Int
plus = (+)

-- fmap plus :: f Int -> f (Int -> Int)

-- fmap plus (Just 3) :: Maybe (Int -> Int)

-- We'd like to apply this to another `Maybe Int` like:
--   fmap plus (Just 3) (Just 4)
-- which is equal to
--   (fmap plus (Just 3)) (Just 4)
-- but this doesn't typecheck because `Maybe (Int -> Int)`
-- is not a function that accepts an argument.
-- Instead it's a `Maybe` that *may contain* a function,
-- and we first have to case-analyse that Maybe to
-- check if the function inside exists.
--
-- So we build ourselves a new function that
-- combines the `Maybe (Int -> Int)` we have
-- with the `Just 4 :: Maybe Int` that we have.
--
-- We call the function `apply`, its type is:
--
--   apply :: Maybe (Int -> Int) -> Maybe Int -> Maybe Int
--
-- or for more general types, we'd like to have
--
--   apply :: Maybe (a -> b) -> Maybe a -> Maybe b-- or for more general types, we'd like to have
--
-- or for even more general types, we'd like to have
--
--   apply :: (Functor f) => f (a -> b) -> f a -> f b
--
-- We package this function into a "CanApply"
-- type class to encapsulate that concept.

class Functor f => CanApply f where
  apply :: f (a -> b) -> f a -> f b

instance CanApply Maybe where
  apply :: Maybe (a -> b) -> Maybe a -> Maybe b
  apply fab fa = case fa of
    Nothing -> Nothing
    Just a -> case fab of
      Nothing -> Nothing
      Just f -> Just (f a)

-- For convenience we rename the function to <*>
--
--   (<*>) :: (Functor f) => f (a -> b) -> f a -> f b
--
-- And the type class already exists as the
-- "Applicative" type class in Haskell:
--
--   class Functor f => Applicative f where
--     (<*>) :: f (a -> b) -> f a -> f b


data NodeTree a
  = End
  | NodeT a (NodeTree a) (NodeTree a)
  deriving (Eq, Show)

instance Functor NodeTree where
  fmap :: (a -> b) -> NodeTree a -> NodeTree b
  fmap f aTree = case aTree of
    End -> End
    NodeT t left right -> NodeT (f t) (fmap f left) (fmap f right)

instance Applicative NodeTree where
  (<*>) :: NodeTree (a -> b) -> NodeTree a -> NodeTree b

  funTree <*> aTree = case aTree of
    End -> End
    NodeT elem aLeft aRight -> case funTree of
      End -> End
      NodeT fun funTreeLeft funTreeRight ->
        NodeT (fun elem) (funTreeLeft <*> aLeft) (funTreeRight <*> aRight)

  pure :: a -> NodeTree a
  pure x = NodeT x End End

baumF :: NodeTree (Int -> Int -> Int)
baumF =
  NodeT
    (+)
    (NodeT (-) End End)
    (NodeT div (NodeT (+) End End) End)
baumA :: NodeTree Int
baumA =
  NodeT
    3
    (NodeT 1 End End)
    (NodeT
      5
      (NodeT 4 End End)
      (NodeT 14 End End)
    )
baumB :: NodeTree Int
baumB =
  NodeT
    7
    (NodeT 6 End End)
    (NodeT 13 (NodeT 11 End End) End)

ergebnisBaum :: NodeTree Int

ergebnisBaum =  baumF <*> baumA <*> baumB
--  (<*>) :: NodeTree (a -> b) -> NodeTree a -> NodeTree b
--  baumF ::  NodeTree (Int ->  Int -> Int)
--        :: (NodeTree (Int -> (Int -> Int)))
--  baumA :: NodeTree Int
--
-- What's the type of
--         baumF <*> baumA
--   (<*>) baumF baumA
-- ?
--
-- a ~ Int
-- b ~ Int -> Int
--
-- (<*>) baumF baumA :: NodeTree (Int -> Int)
-- baumB :: NodeTree Int
-- (<*>) ((<*>) (baumF baumA)) baumB
--    ::        NodeTree (Int -> Int)       NodeTree Int
--

-- ($) :: (a -> b) -> a -> b
-- f $ x = f x

ergebnisBaum2 :: NodeTree Int
ergebnisBaum2 = baumF <*> baumA <*> (baumF <*> baumB <*> baumA)

quicksortIsLikeSort :: [Int] -> Bool
quicksortIsLikeSort l = quicksort l == sort l

applicativeResult1 = Just (+) <*> Just 3 <*> Just 4
applicativeResult2 = pure (+) <*> Just 3 <*> Just 4
applicativeResult3 =      (+) <$> Just 3 <*> Just 4
applicativeResult4 =      (+) `fmap` Just 3 <*> Just 4

-- Monads

-- (<*>) :: (Applicative f) => f (a -> b) -> f a -> f b

-- bind :: (Applicative f) => (a -> f b) -> f a -> f b

-- bindList :: (a -> [b]) -> [a] -> [b]

-- newtype Type Transformer = Type Constructor
-- newtype MaybeList a = MaybeList [Maybe a] deriving (Show, Functor)
newtype MaybeList a = MaybeList [Maybe a] deriving (Show, Functor)

maybeList1 = MaybeList [Just 1, Just 4, Nothing, Just 33]

{-
  Derivation of the first solution
-}

-- xs :: [Maybe a] -> [Maybe b]

-- instance Functor MaybeList where
--   fmap :: (a -> b) -> MaybeList a -> MaybeList b
--   fmap _ (MaybeList [])              = MaybeList []
--   fmap f (MaybeList (x:xs)) = case x of
--     -- x  :: Maybe a
--     -- xs :: [Maybe a]
--     -- want: ?? :: [Maybe b]

--     -- Nothing         -> MaybeList (Nothing : map (fmap f) xs)
--     Nothing        -> MaybeList (fmap f x : map (fmap f) xs)

--     -- Just something -> MaybeList (Just (f something) : map (fmap f) xs)
--     -- Just something -> MaybeList (fmap f (Just something) : map (fmap f) xs)
--     Just something -> MaybeList (fmap f x : map (fmap f) xs)

--     -- something :: a
--   -- fmap f (MaybeList (x:xs)) = case x of
--   --     Nothing   -> MaybeList (Nothing  : fmap f (MaybeList xs))
--   --     Just x    -> MaybeList (Just (f x) : fmap f (MaybeList xs))


-- {-
--   Better solution
-- -}
-- instance Functor MaybeList where
--   -- fmap :: (a -> b) -> MaybeList a -> MaybeList b
--   -- fmap _ (MaybeList [])              = MaybeList []
--   fmap f (MaybeList (x:xs)) = MaybeList (fmap f x : map (fmap f) xs)


{-
  Best solution

  Intuition: f 1 : map f [2,3,4]
  map f [1,2,3,4]
-}
-- instance Functor MaybeList where
--   fmap f (MaybeList l) = MaybeList (map (fmap f) l)

{-
  Cheating:
-}

-- instance Functor MaybeList where
--   fmap f (MaybeList l) = MaybeList (map (fmap f) l)
```

Code from above

```haskell
instance Functor MaybeList where
  fmap :: (a -> b) -> MaybeList a -> MaybeList b
  fmap _ (MaybeList [])              = MaybeList []
  fmap f (MaybeList (x:xs)) = case x of
    -- x  :: Maybe a
    -- xs :: [Maybe a]
    -- want: ?? :: [Maybe b]

    -- Nothing         -> MaybeList (Nothing : map (fmap f) xs)
    Nothing        -> MaybeList (fmap f x : map (fmap f) xs)

    -- Just something -> MaybeList (Just (f something) : map (fmap f) xs)
    -- Just something -> MaybeList (fmap f (Just something) : map (fmap f) xs)
    Just something -> MaybeList (fmap f x : map (fmap f) xs)

    -- something :: a
  -- fmap f (MaybeList (x:xs)) = case x of
  --     Nothing   -> MaybeList (Nothing  : fmap f (MaybeList xs))
  --     Just x    -> MaybeList (Just (f x) : fmap f (MaybeList xs))
```