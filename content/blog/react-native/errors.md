---
title: 'React Native Errors'
description: 'Resolutions and help for common React Native errors'
date: '2019-08-21T17:58:32.169Z'
author: 'André Kovac'
category: 'framework'
tags: ['javascript', 'react-native', 'errors']
---

How to deal with build issues when working with React Native

## Android build erros

Cleaning the Android build folder often helps:

```bash
cd android && ./gradlew clean && cd ..
```

This was suggested in many GitHub issues like [here](https://github.com/airbnb/lottie-react-native/issues/64), [here](https://github.com/react-community/react-native-maps/issues/378) or [here](https://github.com/BranchMetrics/react-native-branch-deep-linking/issues/225).

## iOS Run errors

### Quick fix

Restarting the packager cache sometimes helps

```bash
npm start -- --reset-cache
```

or if you are using `yarn`:

```bash
yarn start --reset-cache
```

### Proper fix

Doing all of the following will often help when faced with weird errors. Run the commands of each line one after the other (here `yarn` is used):

```bash {outputLines: 6,8}
watchman watch-del-all
rm -rf ./node_modules
rm -rf $TMPDIR/react-*
yarn cache clean
yarn install

yarn start --reset-cache

react-native run-ios
```

Or just run the following command which combines all the upper commands in one (execution of the command may take a while):

```bash
watchman watch-del-all && rm -rf $TMPDIR/react-native-packager-cache-* && rm -rf $TMPDIR/metro-bundler-cache-* && rm -rf node_modules/ && yarn cache clean && yarn install && yarn start -- --reset-cache
```
