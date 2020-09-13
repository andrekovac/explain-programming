---
title: 'Typescript interface vs type'
description: 'Discussions about the differences and when to use interfaces vs types.'
date: '2020-07-25'
author: 'André Kovac'
category: 'programming-language'
tags: ['javascript', 'typescript']
draft: true
ready: false
---

## Interfaces vs. type aliases

### Main differences in a nutshell

- Type alias is more flexible, for example a conditional type `type info = string | { name: string };` is not possible with an interface which can only represent object-like data structures.

- My take is to use interfaces for object definitions because they **can be extended** whereas type aliases cannot.

- If you want to type a **class** or want to use **computed properties** (like `[key in Keys]: string`) you got to use type aliases. (Error you get otherwise: `A computed property name in an interface must refer to an expression whose type is a literal type or a 'unique symbol' type.(1169)`)

  - Here an **index signature** (the `in` command) is used:

    ```ts
    type Foo = 'a' | 'b';
    type Bar = { [key in Foo]: any };
    ```

---

- [Nice short article about the differences between `interface` and `type`](https://pawelgrzybek.com/typescript-interface-vs-type/)

![interfaces vs. types](./InterfacesVsTypes.jpg)
