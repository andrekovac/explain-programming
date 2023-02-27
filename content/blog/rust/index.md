---
title: 'Rust'
date: '2019-08-01T17:52:03.284Z'
author: 'André Kovac'
description: 'The most important Rust commands and principles'
category: 'programming-language'
tags: ['rust']
draft: true
---

## Learn

Read documentation

```bash
rustup doc
```

## Values

Can either be a `mutable reference`, a `sharable reference` or a `value`.

## Packages

Build front-ends with Rust: [Yew](https://github.com/yewstack/yew)

## Literals vs variables

### Error

The following throws the error `error: expected a literal` because the `println!` macro expects a **string literal** and not an `identifier`:

```rust
fn main() {
    let c = "hello";
    println!(c);
}
```

### Solution

```rust
fn main() {
    let c = "hello";
    println!("{}", c);
}
```

### Why?

> [The error message is] not ambiguous, but it does make the assumption you know what a "literal" is. `"foo"` is a **string literal**. `8` is a **numeric literal**. `let s = "foo"` is assigning the value of a **string literal** to an **identifier** (variable), and `println!(s)` is a **statement** that provides/passes an identifier to the **macro**.

Taken from [here](https://stackoverflow.com/a/27734760)

#### What is a literal?

> a **literal** is a notation for representing a fixed value **in source code**.

> Contrast this with **identifiers**, which refer to a value **in memory**.


## Building apps with Rust

- [Tauri](https://tauri.app/)
- [Neon - node modules with Rust](https://neon-bindings.com/)