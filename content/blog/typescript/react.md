---
title: 'Typescript & React'
description: 'Special Typescript situations while using it with React'
date: '2018-03-01T12:07:32.169Z'
author: 'André Kovac'
category: 'programming-language'
tags: ['javascript', 'typescript', 'react']
---

## How to type React Higher Order Components (HOC)

See this great article: [React Higher-Order Components in TypeScript made simple](https://dev.to/danhomola/react-higher-order-components-in-typescript-made-simple)

How to type it:

```js
const myHoc = <P extends Props>(
    Component: React.ComponentType<P & myHocProps>
): React.ComponentClass<P> => {
    return class extends React.Component<P> {
        ...
    }
}
```

**Note**: The type `React.Component` is an instance of the component. On the other hand `React.ComponentType` is the actual subclass of `React.Component`.