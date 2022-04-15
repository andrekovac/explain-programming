---
title: 'Swift UI'
description: 'Declarative Swift framework to build UIs'
date: '2020-11-15'
author: 'André Kovac'
category: 'other'
tags: ['framework']
draft: true
---


- Click on singe elements and see where they appear in code
- State: Binding with `$text`

```swift
@State var text = "hello world"
```


- Preview for hot reloading
- Layout system is great: Vertical stacks

`VStack(alignment: .leading)`

Write

Make UIKit component to work with Swift UI: makeUIView + updateUIView

- BlurView exist on UIKit not on SwiftUI
  - no delegates - no object oriented


## Swift

**Swift**: Protocol based programming language.

### Cool Swift features

- Generics: `Grid<Item, Content>: View where Item: Identifiable, Content: View`
- Protocols: Similar to interfaces, compose + combine protocols - React hooks are different... -> But also give you a general interface.
- Content builders: Extend Swift language - Local components with access to all the parent state

NavigationView
  ScrollView
    VStack
      Title
      ...



All frameworks: Hot reloading issues for a compiled language remain.



Brother of SwiftUI: `Combine`. SwiftUI built on `Combine` Framework: publisher-subscriber framework.

```swift
import Combine

@ObservedObject


```

PropertyWrapper `@Environment` `@State` done with `Combine` framework.

Decorators from SwiftUI.


iCloud is inaccessable. Sync between devices.