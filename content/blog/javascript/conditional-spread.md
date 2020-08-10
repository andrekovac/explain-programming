---
title: 'Conditional spread syntax'
description: 'Understand how the spread operator works in combination with the conditional (ternary) operator'
date: '2019-10-15'
author: 'André Kovac'
category: 'programming-language'
tags: ['javascript', 'react-native', 'react-navigation']
ready: true
---

**Problem**: Depending on whether a given condition is met, I want to add different values to an object.

**Solution**: Use [spread syntax](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Spread_syntax) (new in ECMAScript 2018) together with the [conditional (ternary) operator](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Conditional_Operator).

[TLDR - skip the quiz and show me a usage example in React Native!](#use-case-react-navigation)

## Quiz

Look at this example. What is the output of line 6?

```js
const animals = {
  monkey: '🐒',
  ...('circus' === 'animal friendly' ? { panda: '🐼' } : { duck: '🐏' }),
};

console.log(animals);
```

You can play around with the [JSFiddle here](https://jsfiddle.net/Andruschenko/kwh87a6n/).

**Solution**:

In a world in which a circus were animal friendly, we'd get a different result.
Since the string `circus` is not equal to `animal friendly`, the second expression is executed and we get

```js
const animals = {
  monkey: '🐒',
  ...{ duck: '🐏' },
};
```

which leads to the following `console.log(animals)` output:

```js:title=output
{
  monkey: '🐒',
  duck: '🐏'
}
```

...of course you spotted the semantic error 😉

## Use case: `react-navigation`

My usage in **React Native** when setting default options for a **Stack Navigator** with `react-navigation`:

**Problem**: I want to conditionally add values to the `defaultNavigationOptions` object.

**Solution**:

First I want to differentiate between **iOS** and **Android**:

```js
import { Platform } from 'react-native';
import { TransitionPresets } from 'react-navigation-stack';

defaultNavigationOptions: {
  gestureEnabled: true,
  cardOverlayEnabled: true,
  ...(Platform.OS === 'ios'
    ? TransitionPresets.ModalPresentationIOS
    : TransitionPresets.RevealFromBottomAndroid),
},
```

```js
import { Platform } from 'react-native';
import { TransitionPresets } from 'react-navigation-stack';

defaultNavigationOptions: {
  gestureEnabled: true,
  cardOverlayEnabled: true,
  ...(Platform.OS === 'ios'
    ? systemVersionAsNumber < 13
      ? TransitionPresets.ModalSlideFromBottomIOS
      : TransitionPresets.ModalPresentationIOS
    : systemVersionAsNumber < 9
    ? TransitionPresets.FadeFromBottomAndroid
    : TransitionPresets.RevealFromBottomAndroid),
},
```

## Credits

Thanks for [StackOverflow answer](https://stackoverflow.com/questions/44908159/how-to-define-an-array-with-conditional-elements#47771259) which showed me how to do it and inspired me to write this article.
