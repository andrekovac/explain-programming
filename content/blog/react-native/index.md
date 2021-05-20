---
title: 'React Native'
description: 'Concepts, syntax and code snippets for React Native'
date: '2019-08-21T17:58:32.169Z'
author: 'André Kovac'
category: 'framework'
tags: ['javascript', 'react-native', 'outdated']
draft: true
---

## Relation of React Native to React

- **React** is a framework to build component based apps (or just components like in a DS)
- **React DOM** is the React "renderer" for web apps
- React Native is also something like a React "renderer" for native apps
- **React Native Web** brings components build with React Native back to the Web (with using **React DOM** under the hood)

# OLD - can be removed!

**Attention**: The following stuff is not useful and can be removed!

## General

### Bundle

```bash
react-native bundle --verbose --entry-file ./src/myApp.js --bundle-output ./bundle/myApp-app.bundle
```

## Android only

### Custom changes in build.gradle

- [gradle file syntax](https://docs.gradle.org/current/userguide/writing_build_scripts.html)

### Explicitly remove android permission:

in `android/app/src/main/AndroidManifest.xml` add:

```xml
<uses-permission android:name="android.permission.READ_PHONE_STATE" tools:node="remove"/>
<uses-permission android:name="android.permission.READ_EXTERNAL_STORAGE" tools:node="remove"/>
<uses-permission android:name="android.permission.WRITE_EXTERNAL_STORAGE" tools:node="remove"/>
```

## Interesting Packages

[Realm](https://realm.io/) as local storage database on mobile devices. Alternative to `socket.io` for web applications.

## Links

* [Layout Animations Github](https://github.com/facebook/react-native/blob/master/Libraries/LayoutAnimation/LayoutAnimation.js)
* [Building Custom React Native Components From Scratch](http://moduscreate.com/react_native_custom_components_ios/)