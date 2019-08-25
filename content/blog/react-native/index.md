---
title: React Native
description: Concepts, syntax and code snippets for React Native
date: '2019-08-21T17:58:32.169Z'
category: 'framework'
tags: ['javascript', 'react-native']
---

## General

### Bundle

```bash
react-native bundle --verbose --entry-file ./src/whammy.js --bundle-output ./bundle/whammy-app.bundle
```

## Android only

### Custom changes in build.gradle

- [gradle file syntax](https://docs.gradle.org/current/userguide/writing_build_scripts.html)

see proxipedia

```groovy

```

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