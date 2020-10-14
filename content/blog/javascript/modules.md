---
title: 'Javascript Modules'
description: 'Modules - import and export in Javascript'
date: '2019-08-20T23:46:37.121Z'
author: 'André Kovac'
category: 'programming-language'
tags: ['javascript']
---

## JavaScript Modules (import/export)

## ES6+ syntax

There are two types of exports:

1. **Default** export

   ```js:title=foo.js
   const foo = () => { ... }
   export default foo;
   ```

   ```js:title=other.js
   import foo from './foo';
   ```

2. **Named** export

   ```js:title=foo.js
   export const foo = () => { ... }
   ```

   ```js:title=other.js
   import { foo } from './foo';
   ```

## Export an import

From `react-navigation-tabs`, i.e. `node_modules/react-navigation-tabs/lib/typescript/src/index.d.ts`:

```js
export { default as createMaterialTopTabNavigator } from './navigators/createMaterialTopTabNavigator';
```

## ES5 and older syntax

Use `import` and `export` statements to require modules.

[Understanding module.exports and exports in Node.js](http://www.sitepoint.com/understanding-module-exports-exports-node-js/)

## Own modules

### Export module

```js:title=foobar.js
var foo = "Hello";
var bar = function() { console.log("Amazing!" };

module.exports = { foo: foo, bar: bar };
```

### CommonJS (require/exports)

```js:title=other.js
require('../actions/foobar.js');
```

_or_

```js:title=Bar.js
var Bar = React.createClass({ ... });
module.exports = Bar;
```

```js:title=other.js
require('../actions/Bar');
```

### Add third-party module (file with js functions)

`require` command

```js
var express = require('express');
```

## Import Organization

- All imports needed in a file are grouped at the top.
- We form 3 groups (**external**, **internal** and **component scope**) of imports each separated by an empty line.

```js
// imports from external sources (npm)
import React, { PropTypes, Component } from 'react';
import { StyleSheet } from 'react-native';
import { keys, pick, compose } from 'ramda';

// imports from other parts of the application like utils or other components (use absolute imports if configured)
import CachedImage from 'components/CachedImage';
import { pickKeys } from 'util/object';

// imports from component scope: always relative
import styles from './styles';
import GridItem from './components/GridItem';
```
