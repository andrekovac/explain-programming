---
title: React Native
description: Concepts, syntax and code snippets for React Native
date: '2019-08-21T17:58:32.169Z'
category: 'framework'
tags: ['javascript', 'react-native']
---

## Android configuration

Open **Android SKD Manager**: Open `Android Studio` and at bottom of Start screen go to `Configure/SDK Manager`

## iOS and Android Emulator

```bash
react-native init NameOfProject
```

#### iOS

1.  open project file in xcode

  On **OSX** you can use the `open` command:

  ```bash
  open NameOfProject/ios/NameOfProject.xcodeproj
  ```

2.  build project in Product/Build (will open console window)

3.  Wait until the react packager finished loading and hit run

4.  make a change in `index.ios.js` and hit `Cmd + R` to reload
5.  `Cmd + D` or `Cmd + ctrl + z` to open the React Native Dev Menu

#### Android

1. Open `Android Studio`, open any project and then in the top bar go to `Tools > AVD Manager`.
2. Run an emulator.
3. It should now appear when typing `adb devices`

###### Genymotion

Open genymotion and run an emulator and check whether the device is running by running

```bash
adb devices
```

Then load the app to the Android emulator

```bash
react-native run-android
```

###### View files in emulator with the [Android Device Monitor](http://stackoverflow.com/questions/18530114/accessing-files-from-genymotion-sd-card)

```bash
monitor
```

##### Open emulator app and create/start emulator

IMPORTANT: Make sure all other virtual machines are turned off! Including `Docker for Mac`!

```bash
android avd
```

This should do it. Then stretch the emulator windows such that the menu-item (see image) is visible. Only then the shortcut `Cmd + M` will open the React Native Dev Menu where you have to press `Reload JS` to make changes visible.

![android emulator menu item](images/android_emulator_menu.jpg)

In case something doesn't work run the following.

```bash
react-native start
```

If an error occurs, it will show you tipps on what to do, e.g.

---

Most likely another process is already using this port
Run the following command to find out which process:

```bash
lsof -n -i4TCP:8081
```

You can either shut down the other process:

```bash
kill -9 <PID>
```

or run packager on different port.

---

The app will now appear in the application list of the device, but will still not run.
For it to run, further commands are necessary. The following is taken from [this stackoverflow discussion](http://stackoverflow.com/questions/32572399/react-native-android-failed-to-load-js-bundle):

To run with local server, run the following commands under your react-native project root directory

    react-native start > /dev/null 2>&1 &
    adb reverse tcp:8081 tcp:8081

To run without a server, bundle the jsfile into the apk by running:

- create an assets folder under `android/app/src/main`

- execute the following:

  ```bash
  curl "http://localhost:8081/index.android.bundle?platform=android" -o "android/app/src/main/assets/index.android.bundle"
  ```

## Run project on device

### iOS

- Change IP address in `ios/MyApp/AppDelegate.m` from `localhost` to IP Address of notebook (on my macbook pro e.g. `192.168.50.30` (find in System Preferences/Network).
- In Xcode select your phone as build target and press "Build and run"

[Running On Device - iOS](https://facebook.github.io/react-native/docs/running-on-device-ios.html)

### Android

1. [These prerequisits](https://github.com/facebook/react-native/tree/master/ReactAndroid#prerequisites) which have to be fulfilled.
1. Run `$ react-native run-android`
1. Open the React Rage Shake Menu from within your app on your android device, go to `Dev Settings` and then to `Debug server host & port for device`. There enter your server IP (IP of your computer) and host `8081`, e.g. `192.168.50.35:8081`. On a mac you can find the IP of your computer at `System Preferences -> Network -> Advanced... -> TCP/IP -> IPv4 Address`.
1. Open the Rage Shake Menu again and click `Reload JS`.

[Running On Device - Android](http://facebook.github.io/react-native/docs/running-on-device-android.html#content)

## Animations

- see `node_modules/react-native/Libraries/Animated/src/AnimatedImplementation.js` for some nice documentation.
- The functions will show which input they demand and these input configurations all have a type, e.g. `TimingAnimationConfig` which can be also viewed in the same file.
- `View`, `Text` and `Image` are Animated components. Own components can be made animated by calling e.g. `Animated.createAnimatedComponent(MyCustomComponent)`
- Each `Animated` function like `spring`, `timing` or `decay` return an object with two functions `start` and `stop` to start or stop the animation. The `start(callback)` function can be passed a `callback` function to call when the animation starts.
- Start animation when you want it to start, i.e. at mount of component in `componentDidMount` or in a redux actionCreator when action is called:

  ```js
  componentDidMount() {
    Animated.timing(          // Uses easing functions
      this.state.fadeAnim,    // The value to drive
      { toValue: 1 }          // Configuration
    ).start();                // Don't forget start!
  }
  ```

- Interpolation:

  I set my Animated.Value as:

  ```js
  this.state = {
    fadeAnim: new Animated.Value(0), // init opacity 0
  };

  // ...other stuff

  Animated.timing(        // Uses easing functions
    this.state.fadeAnim,  // The value to drive
    { toValue: 1 }        // Configuration
  ).start();              // Don't forget start!
  ```

  This means my Animated.Value goes from `0 to 1`. If I define it as `inputRange`, my outputRange can be anything else, i.e. here pixels of translation, i.e. a translation from the position 150px to 0px. `opacity` is changed from 0 to 1.

  ```js
  <Animated.View
    style={{
      opacity: this.state.fadeAnim, // Binds directly
      transform: [{
        translateY: this.state.fadeAnim.interpolate({
          inputRange: [0, 1],
          outputRange: [150, 0]  // 0 : 150, 0.5 : 75, 1 : 0
        }),
      }],
    }}>
  </Animated.View>
  ```

  See the config in `Interpolation.js`:

  ```js
  export type InterpolationConfigType = {
    inputRange: Array<number>;
    outputRange: (Array<number> | Array<string>);
    easing?: ((input: number) => number);
    extrapolate?: ExtrapolateType;
    extrapolateLeft?: ExtrapolateType;
    extrapolateRight?: ExtrapolateType;
  };
  ```

- `this.state.foo = Animated.Value(0)`
  _ `this.state.foo.addListener(value => rememberValue(value))` so you can observe updates from animations.
  _ `this.state.foo.setOffset`: Sets an offset that is applied on top of whatever value is set, whether via setValue, an animation, or `Animated.event`. Useful for compensating things like the start of a pan gesture. \* Value can be set via `setValue`, an animation, or `Animated.event`.

## setState()

Only use `setState()` if you use that part of state in `render()` function. Otherwise it's a performance waste!

##### Links

[Layout Animations Github](https://github.com/facebook/react-native/blob/master/Libraries/LayoutAnimation/LayoutAnimation.js)

## Custom components

[Building Custom React Native Components From Scratch](http://moduscreate.com/react_native_custom_components_ios/)

## Interesting Packages

[Realm](https://realm.io/) as local storage database on mobile devices. Alternative to `socket.io` for web applications.

## React native version upgrade

#### Martin's workflow

1.  Check release notes for breaking changes

2.  Check updates with `ncu` (`npm-check-updates`). Check `react` dependency of `react-native`

        $ ncu

3.  Update dependencies in `package.json` (including the react native version)

        $ ncu -u

    or `-a`, `--upgradeAll`

        $ ncu -a

4.  Reinstall `nodes_modules\` to

        $ rm -rf node_modules/
        $ npm install

5.  Use npm `postinstall` script to copy changed files into `node_modules` (this are our fixes for external modules)

        $ npm run postinstall

    which is equivalent to

        $ cp -f -R scripts/hotfix/* ./ | true

6.  Upgrade react-native with APP-IDENTIFIER `de.artirigo.proxipedia`

    This builds all the template files again as `react-native init` does and compares the files where changes have occured.

        $ react-native upgrade --package "<APP-IDENTIFIER>"

    - `Overwrite <FILENAME>?` --- say `yes` to all

7.  Fix conflicts by checking the `git diff`

    - In `WebStorm` press `cmd + d` to see the git diff

    - Common changes:
      _ in iOS: remove the default Launchscreen
      _ in Android: variable for app identifier because of fastlane

8.  Check xcode project:

    in `general --> linked frameworks`
    in `build phases --> link binary with libraries`

    make sure it shows the `house`. If not, remove and add again.

## Bundle

    react-native bundle --verbose --entry-file ./src/whammy.js --bundle-output ./bundle/whammy-app.bundle

## Android stuff

#### Custom changes in build.gradle

- [gradle file syntax](https://docs.gradle.org/current/userguide/writing_build_scripts.html)

see proxipedia

```groovy

```

#### Explicitly remove android permission:

in `android/app/src/main/AndroidManifest.xml` add:

```xml
<uses-permission android:name="android.permission.READ_PHONE_STATE" tools:node="remove"/>
<uses-permission android:name="android.permission.READ_EXTERNAL_STORAGE" tools:node="remove"/>
<uses-permission android:name="android.permission.WRITE_EXTERNAL_STORAGE" tools:node="remove"/>
```

## Performance optimization

#### Profiling

`http://chrome/`
