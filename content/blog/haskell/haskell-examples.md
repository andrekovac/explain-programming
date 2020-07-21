---
title: 'Haskell code examples'
description: 'Haskell programming language examples'
date: '2019-01-01T00:58:52.169Z'
author: 'André Kovac'
category: 'programming-language'
tags: ['functional', 'basic']
draft: true
---

```haskell
allArticles <- fmap concat $ pooledForConcurrentlyN 4 keywords $ \keywords -> do
    articleList <- getArticlesByKeyword keywords
    return articleList

  allArticles <- fmap concat $ pooledForConcurrentlyN 4 keywords $ \keywords -> do
    getArticlesByKeyword keywords

  allArticles <- concat <$> pooledMapConcurrentlyN 4 getArticlesByKeyword keywords
```

## `LoadArticles`

```haskell
{-# LANGUAGE OverloadedStrings #-}  -- Allow Strings for other objects similar to strings

module LoadArticles where

import Text.Read (readMaybe)
import System.IO
import Network.HTTP.Conduit (simpleHttp)
import qualified Data.Text as T
import Text.HTML.DOM (parseLBS)
import Text.XML.Cursor (Cursor, attributeIs, content, element, fromDocument, child,
          ($.//), ($//), (&|), (&//), (>=>))

import qualified Data.ByteString.Lazy.Char8 as L

-- the URL we're going to search
url = "https://www.theguardian.com/games/2018/dec/11/the-11-best-games-on-playstation-vr"

-- Alternative:
-- (=<<)
-- output = L.putStrLn . L.take 500 =<< simpleHttp url
-- output = simpleHttp url >>= L.putStrLn . L.take 500
output = simpleHttp url >>= L.putStrLn


-- -- The data we're going to search for
-- -- type Cursor = Cursor Node
-- -- data Node
-- axis :: Cursor -> [Cursor]

-- -- (>=>) :: Monad m => (a -> m b) -> (b -> m c) -> a -> m c
-- -- (>>=) :: forall a b. m a -> (a -> m b) -> m b
-- -- (>>)  :: forall a b. m a -> m b -> m b

-- -- e.g. for IO: (>>=) :: IO a -> (a -> IO b) -> IO b
-- -- element :: Name -> Axis
-- -- attributeIs :: Name -> Text -> Axis
-- -- child :: Cursor node -> [Cursor node]
axis = element "div" >=> attributeIs "class" "content__article-body" >=> child
axis = element "div"

-- -- Extract the data from each node in turn
-- -- concat :: [Text] -> Text
-- -- content :: Cursor -> [Text]
-- -- (.) :: (b -> c) -> (a -> b) -> (a -> c)
-- extractData :: Cursor -> Text
extractData = T.concat . content

-- Process the list of data elements
-- processData =  putStrLn . T.unpack . T.concat
processData =  print . T.unpack . T.concat

cursorFor :: String -> IO Cursor
cursorFor url = do
     page <- simpleHttp url
     return $ fromDocument $ parseLBS page

-- test function
main = do
     cursor <- cursorFor url
     -- print cursor
     -- Alternative: putStrLn (show cursor)
     processData $ cursor $.// axis &| id



-- output = do
--     bytes <- simpleHttp url
--     -- L.putStrLn (L.take 500 bytes)
--     L.putStrLn (bytes)
--     handle <- openFile "playstation.html" WriteMode
--     hPutStrLn handle $ L.unpack bytes
--     hClose handle

```