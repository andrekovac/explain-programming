---
title: 'Styled Component'
description: 'Tricky stuff with CSS-in-JS framework styled-components'
date: '2019-08-02'
author: 'André Kovac'
category: 'framework'
tags: ['design', 'css', 'javascript', 'react-native']
---

## Attributes `attrs`

In React Native the `ScrollView` expects to style the container with a different prop. It can be provided via `attrs`:

```js
const Container = styled.ScrollView.attrs(props => ({
  contentContainerStyle: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
}))`
  padding: 15px;
`;
```
