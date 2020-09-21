---
title: 'Vue vs React (+ TypeScript) vs React Native vs Vue Native'
description: 'Compare the same tiny app in five different forms'
date: '2020-09-07'
datePublished: '2020-09-21'
author: 'André Kovac'
category: 'framework'
tags: ['react', 'vue', 'react-native', 'javascript', 'typescript']
draft: false
ready: true
published: true
---

Let's compare [Vue](https://vuejs.org/), [React](https://reactjs.org/), React with [TypeScript](https://www.typescriptlang.org/), [React Native](https://reactnative.dev/) and [Vue Native](https://vue-native.io/) by taking a look at a tiny app.

This is the tiny app: An ordered list of three grocery items (as used in the [Vue.js beginners guide](https://vuejs.org/v2/guide/)):

<p align="center">
    <img alt="Example Web App Result" src="./vue-vs-react-01.png" width="100" />
</p>

All (but the Vue Native) examples include links to playground environments where you can play around with the code.

- Jump straight to one of the five code examples:

  - [Vue.js (Web)](#vuejs-web)
  - [React (Web)](#react-web)
  - [React with TypeScript (Web)](#react-with-typescript-web)
  - [React Native (Mobile)](#react-native-mobile)
  - [Vue Native (Mobile)](#vue-native-mobile)

## Why should I read this? 👋

The code samples are meant to give you a feeling of **Vue**, **React**, **React Native** and **Vue Native** - writing the article definitely helped me in this regard since I didn't really work with Vue.js before.

## Why did you write this? 👀

In a workshop I taught React Native to people with experience in Vue.js and some skepticism towards React. I was asked to contrast Vue.js to React which led to this article.

There are a lot of articles on the web which compare Vue and React. But they either [have click-bait titles](https://medium.com/swlh/is-vue-js-going-to-take-over-react-in-2020-929c19806ac) and usually [compare metrics (like number of GitHub stars) whose significance is questionable](https://www.monterail.com/blog/vue-vs-react-2020). If an [article does compare code](https://sunilsandhu.com/posts/i-created-the-exact-same-app-in-react-and-vue-2020-edition), it doesn't include the mobile frameworks **React Native** and **Vue Native**.

That's why I decided to implement a tiny example in five different forms myself which resulted in this article.

## A pure-code comparison 💻

### The App

Every implementation will try to display this array of three elements in an ordered list:

```js
const groceryList = [
  { id: 0, text: 'Vegetables' },
  { id: 1, text: 'Cheese' },
  { id: 2, text: 'Whatever else humans are supposed to eat' },
];
```

Let's start with **Vue**. It's basically **App7** of the [Vue.js beginners guide](https://vuejs.org/v2/guide/)) (adjusted a bit so it directly runs [in this CodeSandBox](https://codesandbox.io/s/grocery-list-vue-jh6r6)):

### Vue.js (Web)

```html:title=App.vue {5-7,22-25,29-31}
<template>
  <div id="app">
    <ol>
      <Item
        v-for="item in groceryList"
        v-bind:item="item"
        v-bind:key="item.id"
      />
    </ol>
  </div>
</template>

<script>
  import Vue from 'vue';

  const groceryList = [
    { id: 0, text: 'Vegetables' },
    { id: 1, text: 'Cheese' },
    { id: 2, text: 'Whatever else humans are supposed to eat' },
  ];

  Vue.component('Item', {
    props: ['item'],
    template: '<li>{{ item.text }}</li>',
  });

  export default {
    name: 'App7',
    data: () => ({
      groceryList,
    }),
  };
</script>
```

```js:title=main.js
import Vue from 'vue';
import App from './App.vue';

Vue.config.productionTip = false;

new Vue({
  render: (h) => h(App),
}).$mount('#app');
```

> The `v-` prefixed words are called **directives** in Vue.js which apply special reactive behavior to the rendered DOM.

Play around with it [in this CodeSandBox](https://codesandbox.io/s/grocery-list-vue-jh6r6).

### React (Web)

The same implementation using `React`:

```jsx:title=App.js {9,11,15-17}
import React from 'react';

const groceryList = [
  { id: 0, text: 'Vegetables' },
  { id: 1, text: 'Cheese' },
  { id: 2, text: 'Whatever else humans are supposed to eat' },
];

const Item = ({ item: { id, text } }) => <li key={id}>{text}</li>;

const App7 = () => {
  return (
    <div>
      <ol>
        {groceryList.map((item) => (
          <Item item={item} />
        ))}
      </ol>
    </div>
  );
};

export default App7;
```

```js:title=index.js
import React from 'react';
import ReactDOM from 'react-dom';

import App from './App';

const rootElement = document.getElementById('root');
ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  rootElement
);
```

The `map` function renders all items.

Play around with this code in this [CodeSandBox](https://codesandbox.io/s/grocery-list-react-o1n6h?file=/src/App.js).

### React with TypeScript (Web)

The same in `TypeScript`:

```tsx:title=App.tsx
import React, { FunctionComponent } from 'react';

type GroceryListItem = {
  id: number;
  text: string;
};
type GroceryList = ReadonlyArray<GroceryListItem>;

const groceryList: GroceryList = [
  { id: 0, text: 'Vegetables' },
  { id: 1, text: 'Cheese' },
  { id: 2, text: 'Whatever else humans are supposed to eat' },
];

const Item: FunctionComponent<{ item: GroceryListItem }> = ({
  item: { id, text },
}) => <li key={id}>{text}</li>;

const App7: FunctionComponent = () => {
  return (
    <div>
      <ol>
        {groceryList.map((item) => (
          <Item item={item} />
        ))}
      </ol>
    </div>
  );
};

export default App7;
```

```tsx:title=index.tsx
import * as React from 'react';
import { render } from 'react-dom';

import App from './App';

const rootElement = document.getElementById('root');
render(<App />, rootElement);
```

Play around with this code in this [CodeSandBox](https://codesandbox.io/s/grocery-list-react-typescript-16qrq?file=/src/App.tsx).

### React Native (Mobile)

How this looks like in `React Native`:

<p align="center">
    <img alt="Example Mobile App Result" src="./vue-vs-react-02.png" width="60" />
</p>

Since no styles are applied the list starts at the top (being partly covered by the phone's status-bar).

```jsx:title=App.js {2,16-20}
import React from 'react';
import { FlatList, Text } from 'react-native';

const groceryList = [
  { id: 0, text: 'Vegetables' },
  { id: 1, text: 'Cheese' },
  { id: 2, text: 'Whatever else humans are supposed to eat' },
];

const Item = ({ index, text }) => <Text>{`${index}. ${text}`}</Text>;

const renderItem = ({ item, index }) => <Item index={index} text={item.text} />;

const App7 = () => (
  <>
    <FlatList
      data={groceryList}
      renderItem={renderItem}
      keyExtractor={({ id }) => id}
    />
  </>
);

export default App7;
```

Play around with the code in this [expo snack](https://snack.expo.io/@andrusch/grocery-list-react-native).

### Vue Native (Mobile)

> Vue Native is a mobile framework to build truly native mobile app using Vue.js. Its is designed to connect React Native and Vue.js.
> Vue Native is a wrapper around React Native APIs, which allows you to use Vue.js and compose rich mobile User Interface.

from [Vue Native docs](https://vue-native.io/docs/index.html#What-is-Vue-Native).

Implementation in `Vue Native`:

```html:title=App.vue {3,21-29}
<template>
  <view class="container">
    <flat-list :data="groceryList" :render-item="(item) => renderList(item)" />
  </view>
</template>

<script>
  import React from 'react';
  import { Text } from 'react-native';

  const groceryList = [
    { id: 0, text: 'Vegetables' },
    { id: 1, text: 'Cheese' },
    { id: 2, text: 'Whatever else humans are supposed to eat' },
  ];

  const Item = ({ index, text }) => <Text>{`${index}. ${text}`}</Text>;

  export default {
    name: 'App7',
    data: () => ({
      groceryList,
    }),
    components: { Item },
    methods: {
      renderList: ({ item, index }) => {
        return <Item index={index} text={item.text} />;
      },
    },
  };
</script>
```

### Alternative

An **alternative** with Vue component `item.vue` but without React Native's `FlatList`:

```html:title=App.vue {5-7,25-28}
<template>
  <view class="container">
    <item
      class="text-container"
      v-for="item in groceryList"
      :key="item.id"
      :item="item"
    />
  </view>
</template>

<script>
  import React from 'react';
  import { Text } from 'react-native';
  import Item from './components/item';

  const groceryList = [
    { id: 0, text: 'Vegetables' },
    { id: 1, text: 'Cheese' },
    { id: 2, text: 'Whatever else humans are supposed to eat' },
  ];

  export default {
    name: 'App7',
    data: () => ({
      groceryList,
    }),
    components: { Item },
  };
</script>
```

```html:title=components/item.vue {2,8-10}
<template>
  <text> {{item.id}}. {{item.text}} </text>
</template>

<script>
  export default {
    props: {
      item: {
        Type: Object,
      },
    },
  };
</script>
```

In case of a large list (filled with photos for example) this would not be feasible because we miss out on lazy loading which React Native's `FlatList` provides.

---

## That's it

Most Frontend developers I meet usually have a clear preference for either **Vue** or **React**. Perhaps this article helps you to explore your own preference more. 🌱
