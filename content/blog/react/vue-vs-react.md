---
title: 'Vue vs React (+ TypeScript) vs React Native vs Vue Native'
description: 'The same tiny app in five different forms'
date: '2020-09-07'
datePublished: '2020-09-15'
author: 'André Kovac'
category: 'framework'
tags: ['react', 'vue', 'react-native', 'javascript', 'typescript']
draft: false
ready: true
published: true
---

> A pure-code comparison of [Vue](https://vuejs.org/), [React](https://reactjs.org/), [React Native](https://reactnative.dev/) and [Vue Native](https://vue-native.io/).

I also add an example of React with Typescript.

- [Vue.js (Web)](#vuejs-web)
- [React (Web)](#react-web)
- [React with TypeScript (Web)](#react-with-typescript-web)
- [React Native (Mobile)](#react-native-mobile)
- [Vue Native (Mobile)](#vue-native-mobile)

There are a lot of comparisons online which compare Vue and React.

- They usually have click-bait titles like [Is Vue.js going to take over React in 2020?](https://medium.com/swlh/is-vue-js-going-to-take-over-react-in-2020-929c19806ac) or [Vue vs React in 2020: Which Framework to Choose and When](https://www.monterail.com/blog/vue-vs-react-2020)
- Almost all of the articles compare metrics not code, in fact comparisons of GitHub starts, StackOverflow survey results and other stuff you can put into charts.
- [This article](https://sunilsandhu.com/posts/i-created-the-exact-same-app-in-react-and-vue-2020-edition) compares the code of a React and a Vue.js ToDo List App but doesn't include their mobile frameworks **React Native** and **Vue Native**

Mobile frameworks are super relevant because [as of 2019 the majority of internet traffic comes from mobile devices](https://www.broadbandsearch.net/blog/mobile-desktop-internet-usage-statistics).

As an example I picked a simple List component used in the [Vue.js beginners guide](https://vuejs.org/v2/guide/):

### Vue.js (Web)

```html:title=App.vue
<template>
  <div id="app">
    <ol>
      <Item
        v-for="item in groceryList"
        v-bind:item="item"
        v-bind:key="item.id"
      ></Item>
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

```jsx:title=App.js
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

How this could look like in `React Native`:

```jsx:title=App.js
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

```html:title=App.vue
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

An **alternative** with Vue component but without FlatList:

```html:title=App.vue
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

```html:title=components/item.vue
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

In this article we implemented a simple list of items (including an API call) in the following languages:

- [Vue.js (Web)](#vuejs-web)
- [React (Web)](#react-web)
- [React with TypeScript (Web)](#react-with-typescript-web)
- [React Native (Mobile)](#react-native-mobile)
- [Vue Native (Mobile)](#vue-native-mobile)
