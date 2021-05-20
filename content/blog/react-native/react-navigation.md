---
title: 'React Navigation'
description: 'Difficult use cases of react-navigation v5'
date: '2020-08-14'
author: 'André Kovac'
category: 'framework'
tags: ['javascript', 'react-native', 'react-navigation', 'routing']
---

React Navigation v5 is a big paradigm change (compared to previous versions).

In v5 you declare which Navigator is shown dependent on the state of your App. In v4 you tell the Navigator where to route to given certain events.

For example "user credentials are successfully processed -> route to Home Screen" vs. user credentials are successfully processed -> change user login state -> Home Screen is shown because it was declared to be the right screen for this state.

## Issues when moving from v4 to v5

I worked with an app which had the following architecture. So four layers in total.

```
StackNavigator
    TabNavigator
        TabScreen
        StackNavigator
            Screen
            Screen
        TabScreen
        StackNavigator
            Screen
            Screen
            Screen
    StackNavigator
    Screen
    Screen
    ...more Screens
```

### `@react-navigation/compat` not working as expected

This compatibility layer made it a bit easier to gradually implement changes because not the entire app would crash. However, it would not work properly because you get confused by mixing APIs and so it's a good thing if you don't expect it to really work properly with it, but the parts of the code you want to touch later will at least compile, giving you the change to port your navigation to v5 step-by-step and see that the parts you already improved are working.

### Several nested navigators

#### Header options

To set `options` for the header you have to go deep into the `state` and `routes` objects to obtain the `route`s of nested navigators and their screens to conditionally show the right headers.

It all has to happen in your most "senior" (the parent, grandparent or grand-grandparent for that matter) navigator with the help of `getFocusedRouteNameFromRoute`.

Another way to do it would be to use React `context`. Hereby the context you create would contain a setter function which you'd call deep down in your nested stack to set the desired header properties which are then applied further up in the render tree at the most senior navigator.

See this [SO question](https://stackoverflow.com/questions/61609246/override-header-title-react-navigation-v5) for examples of both approaches.

### goBack when using navigation ref

`navigation.goBack` goes back to the navigator which dispatched the route to the screen.
So it only works as expected if you always use the navigation prop.

If you use the navigation ref, however, you have to specify the `source` and `target` properties when going back to get the behavior you expect.

I for example created a function to go back inside a nested navigator.

```js
const routeName = getFocusedRouteNameFromRoute(route) ?? RouteNames.Dashboard;

const goBackInSubStack = () =>
  navigation.dispatch({
    ...CommonActions.goBack(),
    source: route.state?.routes[route.state?.index]?.key,
    target: route.state?.key,
  });
```

One more layer lower

```js
const subRoute = route.state?.routes?.[route.state?.index];

const subRouteName = getFocusedRouteNameFromRoute(
  route.state?.routes?.[route.state?.index]
);

const goBackInSettingsStack = () =>
  navigation.dispatch({
    ...CommonActions.goBack(),
    source: subRoute.state?.routes[subRoute.state?.index]?.key,
    target: subRoute.state?.key,
  });
```
