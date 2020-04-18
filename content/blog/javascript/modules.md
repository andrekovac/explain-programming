---
title: 'Javascript Modules'
description: 'Modules - import and export in Javascript'
date: '2019-08-20T23:46:37.121Z'
author: 'André Kovac'
category: 'programming-language'
tags: ['javascript']
draft: true
---

`Common.js` (modules)

## Nice way of exporting an import

From `react-navigation-tabs`, i.e. `node_modules/react-navigation-tabs/lib/typescript/src/index.d.ts`:

```js
export { default as createMaterialTopTabNavigator, } from './navigators/createMaterialTopTabNavigator';
```

## ES6+ syntax

There are two types of exports:

1. **Default** export

  ```js
  const foo = () => { ... }
  export default foo;
  ```

  ```js
  import foo from './foo';
  ```

2. **Named** export

  ```js
  export const foo = () => { ... }
  ```

  ```js
  import { foo } from './foo';
  ```

## ES5 and older syntax

Use `import` and `export` statements to require modules.

[Understanding module.exports and exports in Node.js](http://www.sitepoint.com/understanding-module-exports-exports-node-js/)

## Own modules

### Export module

```js
var foo = "Hello";
var bar = function() { console.log("Amazing!" };

module.exports = { foo: foo, bar: bar };
```

### Import module

```js
require('../actions/foobar.js')
```

_or_

```js
var Bar = React.createClass({ ... });
module.exports = Bar;
```

```js
require('../actions/Bar')
```

### Add third-party module (file with js functions)

`require` command

```js
var express = require('express');
```

## Import Organization

*Most reasonable patterns for writing our imports*

All imports needed in a file are grouped at the top.

We form 3 groups of imports devided by an emtpy line.

```js
// imports from external sources (npm)
import React, { PropTypes, Component } from 'react';
import { StyleSheet } from 'react-native';
import { keys, pick, compose } from 'ramda';

// imports from other parts of the application like utils or other components (use absolute imports as configured)
import CachedImage from 'components/CachedImage';
import { pickKeys } from 'util/object';

// imports from component scope: always relative
import styles from './styles';
import GridItem from './components/GridItem';
```
