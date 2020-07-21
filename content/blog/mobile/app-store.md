---
title: 'Publishing in the mobile app stores'
description: 'What to do when publishing in the app store and helpful tools for it'
date: '2020-01-25T00:00:00.000Z'
author: 'André Kovac'
category: 'framework'
tags: ['mobile', 'ios', 'android', 'react-native']
draft: true
---

## Cross-platform

### Tools for App icons and splash screens

#### App icon

- [This tool](https://makeappicon.com/) requires an email address to send the logos to, but it also creates the necessary folders for iOS so you just have to copy paste the result in.
- [App icon resizing tool](https://appiconmaker.co/)

### Tools for App Store Presentation

- [Create App screenshots online](https://www.appstorescreenshot.com/)
  - 😓requires 16:9 ratio of images - so it only works for screen sizes up to e.g. iPhone 7 Plus, but doesn't work for the new required iPhone 11 Max.

- [Create iPhone usage mockups very simply!](https://mockdrop.io/)

### Not tested yet

* [Real life images of your product](https://placeit.net/)
* [Mock ups of your tool on a mac somewhere on a table](https://magicmockups.com/)

- [ASO - App Store Optimization](https://thetool.io/aso-app-store-optimization)

## IOS

1. Create Apple Developer Account (costs 99 Dollars a year)

### Expo bare workflow / "Normal" React Native Project

2. [Follow this article](https://medium.com/@arnaudambroselli/start-and-deploy-a-react-native-app-for-ios-with-expo-bare-workflow-70e59608eccd)

## Android

2. Create Google Developer Account (costs 25 dollars)
3. Opt in to **App Signing** by Google Play

### Expo managed workflow

2. Set Android Permissions you need [as described here for Expo projects](https://docs.expo.io/versions/v37.0.0/distribution/app-stores/#android-permissions)
3. Create a Google Service Account [see here for an instruction from Expo](https://docs.expo.io/versions/v37.0.0/distribution/uploading-apps/#creating-a-google-service-account)
4. In a new terminal window run `expo build:android -t app-bundle` to create a stand-alone build of your app.

### Expo bare workflow / "Normal" React Native Project

1. Permissions: WHERE TO ADD?
2. To create a singing key [follow these instructions](https://reactnative.dev/docs/signed-apk-android).
    1. Run `keytool -genkeypair -v -keystore my-upload-key.keystore -alias my-key-alias -keyalg RSA -keysize 2048 -validity 10000` here changing `my-upload-key` and `my-key-alias` to whatever you want.
    2. Choose passwords
    3. Fill in details
3. Create the file `~/.gradle/gradle.properties` if it doesn't exist yet and add the following:

    ```
    // Make sure the gradle wrapper has access to enough memory
    org.gradle.jvmargs=-Xms512M -Xmx4g -XX:MaxPermSize=1024m -XX:MaxMetaspaceSize=1g -Dkotlin.daemon.jvm.options="-Xmx1g"

    //
    MYAPP_UPLOAD_STORE_FILE=my-upload-key.keystore
    MYAPP_UPLOAD_KEY_ALIAS=my-key-alias
    MYAPP_UPLOAD_STORE_PASSWORD=*****
    MYAPP_UPLOAD_KEY_PASSWORD=*****
    ```

4. Create a signed app bundle
    - Add `"android:bundle": "cd android && ./gradlew bundleRelease",` to your `package.json` scripts section.
    - Run `yarn android:bundle`

5. The generated **AAB** can be found under `android/app/build/outputs/bundle/release/app.aab`
6. Uninstall any previous version of the app you already have installed (prevents you from strange bugs).
7. Install the new bundle on the device:
    - Add `"android:bundle:test": "react-native run-android --variant=release",` to your `package.json` scripts section.
    - Run `yarn android:bundle:test`
8.


### Publish your App to the Google Play Store

1. and simply upload an APK signed with an upload certificate
2. Upload your App for the first time. Don't do this in the internal testing section. That won't work!



### Common Errors

#### Splashscreen

#### Out of memory error (with Gradle `5.6.3` - might be fixed in later versions)

##### Error

```bash
> Task :app:mergeDexRelease FAILED
w: Detected multiple Kotlin daemon sessions at build/kotlin/sessions

FAILURE: Build failed with an exception.

* What went wrong:
Execution failed for task ':app:mergeDexRelease'.
> A failure occurred while executing com.android.build.gradle.internal.tasks.Workers$ActionFacade
    > java.lang.OutOfMemoryError (no error message)
```

##### Fix

- [This helps](https://github.com/gradle/gradle/issues/8139#issuecomment-543050424), i.e. add line `org.gradle.jvmargs=-Xms512M -Xmx4g -XX:MaxPermSize=1024m -XX:MaxMetaspaceSize=1g -Dkotlin.daemon.jvm.options="-Xmx1g"` to `~/.gradle/gradle.properties`.