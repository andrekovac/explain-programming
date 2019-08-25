---
title: React Native Animations
description: How to animate in React Native using the Animated library
date: '2019-08-25T17:58:32.169Z'
category: 'framework'
tags: ['javascript', 'react-native', 'animations']
---

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
