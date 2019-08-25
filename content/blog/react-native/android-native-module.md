---
title: React Native Android Native Module
description: How to create a native Android module for React Native
date: '2016-07-13T17:58:32.169Z'
category: 'framework'
tags: ['javascript', 'react-native']
---

You might wonder how all of these open-source extensions to RN are created. Here is my workflow for creating a native-module for android

## How to create an Android Native Module

### Create it

1. Create a project

  ```bash
	react-native init myModuleInsideTestApp
  ```

2. Open the Android project in `myModuleWithApp/android` in **AndroidStudio**.

3. Create a new Java package and follow the official instructions to create the skeleton of the app.

4. Link the package to the JS part of your React Native App as you would any other external React Native Package.

5. Call the package inside your `index.android.js` file or even create a larger app depending on your module.

### Bundle your new native module to an npm package

1. Create a new folder `myModule` and create an android folder within it.

2. Move your code from inside the `android/app` folder into `myModule/android/`

  ```bash
	cp -R my-test-app/android/app/ my-npm-module/android/
  ```

3. Create a `package.json` with `$ npm init` and following the prompts. If you don't know the answer to a question, just hit enter. You can then edit the `package.json` later.

3. Add `.npmignore` for folders you want to ignore in the final dependency. For example `android/build/` should go in here.

### Test your bundled npm package

1. Create a `myModuleTestApp` folder project

  ```bash
	react-native init myModuleTestApp
  ```

2. Include the npm package

  ```bash
	npm install --save ../path/to/folder/myModule
  ```

3. Link the app as with any other external module and include all the other required things there might be..

4. Test-run the app

### Publish your npm package

1. If it's an open-source project, host it on Github and add the repository url to your `package.json` file.

2. Publish your module to npm

## How to update a native module

Idea:

1. Make changes in the app with the local version of your module. Test it there.
2. Copy/paste the changed Java files into the separate npm module folder.
3. In the Test-App, do the following:

  ```bash
  npm uninstall --save my_module
  npm prune my_module	# Removes it from node_modules folder
  npm install ./path/to/module/my_module
  ```

	Then test the app.

4. Increase the version number, push to Github and publish the updated npm module