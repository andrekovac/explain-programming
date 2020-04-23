---
title: 'Android'
description: 'Android sdk, adb commands'
date: '2015-12-11'
author: 'André Kovac'
category: 'framework'
tags: ['android', 'mobile', 'outdated']
---

## `adb` commands

### View all running devices (virtual and real)

```bash
adb devices
```

### Reboot virtual device

```bash
adb reboot
```
### Check out contents of phone

```bash
adb shell
```

### WhatsApp

Copy **WhatsApp** images/videos/voice notes etc. from phone to local folder (`-a`: preserve file timestamp and mode). These commands copy the entire folder (with all of its files):

```bash
adb pull -a /storage/self/primary/WhatsApp/Media/WhatsApp\ Images/ .
adb pull -a /storage/self/primary/WhatsApp/Media/WhatsApp\ Video/ .
adb pull -a /storage/self/primary/WhatsApp/Media/WhatsApp\ Voice\ Notes/ .
adb pull -a /storage/self/primary/DCIM/Camera/ .
```

### Save **Whatsapp** backups:

```bash
adb pull -a /storage/self/primary/WhatsApp/Databases
```

### Track native Android errors

```bash
adb logcat | grep „MY_ERROR_CODE“
```

In Code, e.g. in `MainActivity.java`:

```java:title=MainActivity.java
Log.i("Write debug text");
```

## Android Development

[Android API Guides](http://developer.android.com/guide/index.html)

## Build errors

- [How to update Gradle dependencies to their latest version](http://stackoverflow.com/questions/28538824/how-to-update-gradle-dependencies-to-their-latest-version)
- [Error:Execution failed for task ':lib:compileReleaseAidl'. > Executor Singleton not started](http://stackoverflow.com/questions/30315693/errorexecution-failed-for-task-libcompilereleaseaidl-executor-singleton)


## Build App with Gradle

### Gradle configuration

In file `build.gradle` and `app/build.gradle`

## Product flavors

Copy settings for a flavor to the code base.


## SDK manager

### Start sdk manager

Either open a terminal and type

```bash
android
```

or open it from `Android Studio`.

My Android SDK location is now `/usr/local/Cellar/android-sdk/` on the entire PC, including Android Studio.

In `.bash_profile` the right paths are set.

### Emulators

- **Genymotion**: A virtual machine is the emulator for Genymotion
- An **AVD** (Android virtual device) with the fast google APIs is used as an emulator in Android Studio.


## Headless mode

- [Android Headless mode](https://github.com/transistorsoft/react-native-background-geolocation-android/wiki/Android-Headless-Mode)
