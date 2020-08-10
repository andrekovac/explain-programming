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

- My take is to use interfaces for object definitions because they **can be extended**.
- If you want to type a **class** or want to use **computed properties** (like `[key in Keys]: string`) you got to use type aliases.

---

- [Nice short article about the differences between `interface` and `type`](https://pawelgrzybek.com/typescript-interface-vs-type/)

![interfaces vs. types](./InterfacesVsTypes.jpg)
