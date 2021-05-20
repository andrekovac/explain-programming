---
title: 'Conditional spread syntax'
description: 'Understand how the spread operator works in combination with the conditional (ternary) operator'
date: '2019-10-15'
datePublished: '2020-10-06'
author: 'André Kovac'
category: 'programming-language'
tags: ['javascript', 'react-native', 'react-navigation']
ready: true
published: false
---

Recently I faced this issue while manipulating a [JavaScript object](https://www.w3schools.com/js/js_objects.asp):

- **Problem**: Depending on whether a given condition is met, I want to add different values to an object.
- **Solution** with `if else`:

    ```js
    // animals object initially only contains a monkey
    let animals = { monkey: '🐒' };

    // check condition
    if ('circus' === 'animal friendly') {
      animals.panda = '🐼';
    } else {
      animals.duck = '🐏';
    }

    console.log(animals); // prints: { monkey: "🐒", duck: "🐏" };
    ```

This solution is somehow to verbose. I wanted a more elegant solution.

- **Solution** which uses the [spread syntax](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Spread_syntax) (the three dots `...`) together with the [conditional (ternary) operator](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Conditional_Operator) (The `? :` syntax):

    ```js
    const animals = {
      monkey: '🐒',
      ...('circus' === 'animal friendly' ? { panda: '🐼' } : { duck: '🐏' }),
    };

    console.log(animals); // prints: { monkey: "🐒", duck: "🐏" };
    ```

  - Note the **round brackets in front of the spread operator `...`**.
  - This code is equivalent to the above code.

You can play around with this code in [this JSFiddle](https://jsfiddle.net/Andruschenko/kwh87a6n/).

### How does this work?

Let's transform this object by first resolving the ternary expression.

```js
const animals = {
  monkey: '🐒',
  ...('circus' === 'animal friendly' ? { panda: '🐼' } : { duck: '🐏' }),
};
```

Since the string `circus` is not equal to `animal friendly`, resolving the ternary expression results in:

```js
const animals = {
  monkey: '🐒',
  ...{ duck: '🐏' },
};
```

Executing the spread operator `...` finally leads to:

```js:title=output
const animals = {
  monkey: '🐒',
  duck: '🐏',
};
```

...did you spot the semantic error in this object 😉

## Use case: `react-navigation`

I actually came across this problem while working on a **React Native** app.
When setting the ScreenOptions for modals in a **Stack Navigator** with `react-navigation`:

**Problem**: I want to conditionally add values to the `screenOptions` object.

**Solution**:

First I want to differentiate between **iOS** and **Android**:

```tsx {13-15}
import { Platform } from 'react-native';
import { TransitionPresets } from 'react-navigation-stack';

// ...

<RootStack.Navigator
  mode="modal"
  headerMode="none"
  initialRouteName="Main"
  screenOptions={{
    gestureEnabled: true,
    cardOverlayEnabled: true,
    ...(Platform.OS === 'ios'
      ? TransitionPresets.ModalPresentationIOS
      : TransitionPresets.RevealFromBottomAndroid),
  }}
/>;
```

Then I wanted to additionally distinguish between the system version numbers for which I added ternary operators inside of the existing ternary operator:

```tsx {4,16,19}
import { Platform } from 'react-native';
import { TransitionPresets } from 'react-navigation-stack';

import { systemVersionAsNumber } from '../util/system';

// ...

<RootStack.Navigator
  mode="modal"
  headerMode="none"
  initialRouteName="Main"
  screenOptions={{
    gestureEnabled: true,
    cardOverlayEnabled: true,
    ...(Platform.OS === 'ios'
      ? systemVersionAsNumber < 13
        ? TransitionPresets.ModalSlideFromBottomIOS
        : TransitionPresets.ModalPresentationIOS
      : systemVersionAsNumber < 9
      ? TransitionPresets.FadeFromBottomAndroid
      : TransitionPresets.RevealFromBottomAndroid),
  }}
/>;
```

Hereby `systemVersionAsNumber` is this helper function:

```ts:title=util/system.ts
import DeviceInfo from 'react-native-device-info';
import { split } from 'ramda';

export const systemVersion = DeviceInfo.getSystemVersion();

export const getSystemVersionAsNumber = (systemVersion: string) =>
  parseInt(split('.')(systemVersion)[0], 10);

export const systemVersionAsNumber = getSystemVersionAsNumber(systemVersion);
```

## Credits

Thanks for [StackOverflow answer](https://stackoverflow.com/questions/44908159/how-to-define-an-array-with-conditional-elements#47771259) which showed me that I forgot the rounded brackets when I first tried to combine the spread operator with the ternary operator.


## Another example

The syntax makes it a bit hard to grasp what's happening without round brackets:

```js
const color = initialColor === 'primary' ? theme.colors.primary[500] : (
  initialColor === 'secondary' ? theme.colors.secondary[500] : (
    initialColor === 'tertiary' ? theme.colors.tertiary[500] : (
      initialColor === 'black' ? theme.colors.grey[900] : (
        initialColor === 'white' ? theme.colors.white: initialColor
      )
    )
  )
);
```

Formatted:

```js
const color =
  initialColor === "primary"
    ? theme.colors.primary[500]
    : initialColor === "secondary"
    ? theme.colors.secondary[500]
    : initialColor === "tertiary"
    ? theme.colors.tertiary[500]
    : initialColor === "black"
    ? theme.colors.grey[900]
    : initialColor === "white"
    ? theme.colors.white
    : initialColor;
```