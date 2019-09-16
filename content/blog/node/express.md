---
title: 'Express.js'
description: 'Basic information on how to set up a server with Express.js'
date: '2016-01-07T11:58:52.169Z'
author: 'André Kovac'
category: 'framework'
tags: ['javascript', 'node', 'server']
---

Build a node.js server with **Express.js**

## How to create a basic server

*server.js*

```js
var express = require('express');

module.exports = function() {
  var app = express();

  app.get('/', function(req, res) {
    res.send('Hello, world!');
  });

  app.get('/user/:user', function(req, res) {
    res.send('Page for user ' + req.params.user + ' with option ' +
      req.query.option);
  });

  return app;
};
```

*index.js*

```js
var server = require('./server');

server().listen(3000);
console.log('Server listening on port 3000!');
```

## Request `req` and response `res`

* **req**: information about *incoming* requests
* **res**: utilities for crafting a response
* `req` object holds fields `params` and `query`.
  * `req.params.user`: route parameters, e.g. users/**:user**
  * `req.query`: key-value pairs in query string after url

## Testing with mocha

Use `superagent` package to make http requests from within package