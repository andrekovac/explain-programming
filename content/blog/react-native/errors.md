---
title: React Native Errors
description: Resolutions and help for common React Native errors
date: '2019-08-21T17:58:32.169Z'
category: 'framework'
tags: ['javascript', 'react-native', 'errors']
---

## Android build erros

```bash
cd android && ./gradlew clean && cd ..
```

like suggested in GitHub issues [here](https://github.com/airbnb/lottie-react-native/issues/64) or [here](https://github.com/react-community/react-native-maps/issues/378) or [here](https://github.com/BranchMetrics/react-native-branch-deep-linking/issues/225).

## iOS Run errors

### Quick fix

Often helps

```bash
npm start -- --reset-cache
```

### Elaborate fix

```bash
watchman watch-del-all
rm -rf ./node_modules
rm -rf $TMPDIR/react-*
// npm cache clean
yarn cache clean
yarn install

yarn start -- --reset-cache

react-native run-ios
```

as one command (may take some time):

```bash
watchman watch-del-all && rm -rf $TMPDIR/react-native-packager-cache-* && rm -rf $TMPDIR/metro-bundler-cache-* && rm -rf node_modules/ && yarn cache clean && yarn install && yarn start -- --reset-cache
```
