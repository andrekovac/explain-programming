---
title: 'Android'
description: 'Android sdk, adb commands'
date: '2019-10-26T23:46:37.121Z'
author: 'André Kovac'
category: 'framework'
tags: ['android', 'mobile', 'outdated']
---

[Android API Guides](http://developer.android.com/guide/index.html)

## Build errors

- [How to update Gradle dependencies to their latest version](http://stackoverflow.com/questions/28538824/how-to-update-gradle-dependencies-to-their-latest-version)
- [Error:Execution failed for task ':lib:compileReleaseAidl'. > Executor Singleton not started](http://stackoverflow.com/questions/30315693/errorexecution-failed-for-task-libcompilereleaseaidl-executor-singleton)


## Build App with Gradle

### Gradle configuration

In file `build.gradle` and `app/build.gradle`

## Product flavors

Copy settings for a flavor to the code base.

## `adb` commands

View all running devices (virtual and real)

```bash
adb devices
```

Reboot virtual device

```bash
adb reboot
```
Check out contents of phone

```bash
adb shell
```

Copy **Whatsapp** images/videos/voice notes etc. from phone to local folder (`-a`: preserve file timestamp and mode). These commands copy the entire folder (with all of its files):

```bash
adb pull -a /storage/self/primary/WhatsApp/Media/WhatsApp\ Images/ .
adb pull -a /storage/self/primary/WhatsApp/Media/WhatsApp\ Video/ .
adb pull -a /storage/self/primary/WhatsApp/Media/WhatsApp\ Voice\ Notes/ .
adb pull -a /storage/self/primary/DCIM/Camera/ .
```

To save **Whatsapp** backups:

```bash
adb pull -a /storage/self/primary/WhatsApp/Databases
```

## SDK manager

### Start sdk manager

Either

```bash
android
```

Or from `Android Studio`.

My Android SDK location is now `/usr/local/Cellar/android-sdk/` on the entire PC, including Android Studio.

In `.bash_profile` the right paths are set.

### Emulators

- **Genymotion**: A virtual machine is the emulator for Genymotion
- An **AVD** (Android virtual device) with the fast google APIs is used as an emulator in Android Studio.


## Headless mode

- [Android Headless mode](https://github.com/transistorsoft/react-native-background-geolocation-android/wiki/Android-Headless-Mode)
