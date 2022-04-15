---
title: 'Flutter'
description: 'Flutter Mobile Framework'
date: '2020-11-07'
author: 'André Kovac'
category: 'other'
tags: ['framework']
draft: true
---


_counter.toString()

```dart
_counter.toString()
//
'$_counter'
```

Trigger suggest：
Option + Esc



## StatelessWidget vs. StatefulWidget

### Container vs. Card

### Scaffold


## packages - pubs

https://pub.dev/

e.g. `http` - add in `pubspec.yaml`


- `StreamBuilder`
- `Promise` vs. `Future`


## Console / Hot reloading issues

As in React Native, you have to sometimes restart the builder

```dart
import 'dart:convert';

import 'package:flutter/material.dart';
import 'package:http/http.dart';

void main() {
  runApp(MyApp());
}

class MyApp extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'Flutter Demo',
      theme: ThemeData(
        primarySwatch: Colors.blue,
      ),
      home: MyHomePage(),
    );
  }
}

class MyHomePage extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    final temp = getCurrentTemp();
    return Scaffold(
        body: FutureBuilder(
      future: temp,
      builder: (context, AsyncSnapshot<double> snapshot) {
        if (snapshot.hasData) {
          return Center(child: Text(snapshot.data.toString()));
        }
        return Center(child: CircularProgressIndicator());
      },
    ));
  }

  Stream<DateTime> timedCounter(Duration interval) async* {
    while (true) {
      await Future.delayed(interval);
      yield DateTime.now();
    }
  }

  Future<double> getCurrentTemp() async {
    final resp = await get(
        "https://api.openweathermap.org/data/2.5/weather?q=Bern&units=metric&appid=9fc21811fd31ebcca434c0eb729ac2c2");
    return jsonDecode(resp.body)["main"]["temp"];
  }
}
```


## Routing

Imperative

```dart
Navigator.of(context).push(MaterialPageRoute(builder: (context) => AnimatedPage()));
```

## Tooling

VSCode has some [handy shortcuts](https://medium.com/flutter-community/flutter-visual-studio-code-shortcuts-for-fast-and-efficient-development-7235bc6c3b7d).

- Shortcuts for refactoring a stateful into a stateless widget
- The shortcut to wrap a widget into a `Center` widget or so don't work in my VSCode yet.


## Learning

Watch 1-min widget of the week videos, e.g. here [inside the documentation](https://api.flutter.dev/flutter/widgets/AnimatedWidget-class.html).