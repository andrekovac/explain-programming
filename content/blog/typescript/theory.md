---
title: 'Typescript theory'
description: 'Understand TypeScript in a deeper manner'
date: '2021-07-31'
author: 'André Kovac'
category: 'programming-language'
tags: ['typescript', 'theory']
---

## Type hierarchy

Explained in [this article about unknown and never](https://blog.logrocket.com/when-to-use-never-and-unknown-in-typescript-5e4d6c5799ad/):

- Top type `unknown`
- Bottom type `never`
- Top & Bottom type `any`

See [this SO answer for more](https://stackoverflow.com/a/68289470/3210677).

```ts
T | never ⇒ T
T & unknown ⇒ T
```

- `never` is the identity with respect to unions (`T | never ⇒ T`)
- `unknown` is the identity with respect to intersections (`T & unknown ⇒ T`)

(but `number & string` is of type `never`)

### Difference between `any` and `unknown`

> `unknown` is I don't know; `any` is I don't care

Taken from [this StackOverFlow thread about the difference between `any` and `unknown`](https://stackoverflow.com/questions/51439843/unknown-vs-any/51439876#comment116564672_51439876)

## TypeScript Type Variance

- TypeScript is covariant in shapes (example)
- TypeScript is **structurally** typed

```ts
interface Animal {
  name: string;
}

// This works also if Bird does not extend Animal,
// but just gets defined as { name: string; wingCount: number; }
interface Bird extends Animal {
  wingCount: number;
}

const myAnimal: Animal = { name: "snake" };
const myBird: Bird = { name: "pigeon", wingCount: 2 };

const getName = (obj: Animal) => obj.name;

// TypeScript is covariant in shapes
// 'Bird' allowed although 'Animal' required
getName(myBird);
```

### Function types and contravariance

function types are **covariant** in their return type but **contravariant** in their parameter types

```ts
interface Foo {
  name: string;
}

interface Bar {
  name: string;
  displayName: string;
}


function getName(obj: Foo): '1' | '2' {
  return "1";
}

const getName2: (obj: Bar) => string = getName;
```

Here the parameter of `getName2` is a subtype of the parameter of `getName` but the return type is a supertype of the return type of `getName`.

Corresponding [TS Playground](https://www.typescriptlang.org/play?ssl=10&ssc=96&pln=10&pc=1#code/JYOwLgpgTgZghgYwgAgGIHt3IN4ChnIhwC2EAXMgM5hSgDmA3LgL666iSyIoBCcUOfIRLkqNekwIATYJQAOAGzgBPAHIiK1WiEYs2Aen3IYAVxAIwwdCGRhlciJWT8UCdADd+wOOGShbABYQwAJQEGAmUDZ2DsgARiZgyG7gUHCetD5J-mBBIchy-CKctvaObKbmltbIdOHqpAAU6HEAVhQY6ACUFADkAIy9yAA+yL0ATEN4BGERUcgARP0LTKy4KdS19SLjFM1tFHxQXcgAvAB8Ytp0Z1tgDRBMQA)

### Covariance & Contravariance (again)

In **general**

- TypeScript shapes are covariant in their property types.
- Every complex type is covariant in its members and function return types.
- Functions are **covariant** in their return types (the return type has to be a subtype of the other function's return type)
- Functions are **contravariant** in their parameter and `this` types.
  - In other words: For a function to be a subtype of another function, each of its parameters and its `this` type must be a supertype of its corresponding parameter in the other function.

```ts
const test = (arg: "a" | "b"): "a" | "b" | "c" => {
    return "c";
};

const test2 = (arg: "a" | "b" | "c"): "a" | "b" | "c" | "d" => {
    return "c";
};

const useTest = (arg: typeof test) => {
    //
}
// Error: Since TS is contravariant on function parameter values but not on function return values this throws a compile error
useTest(test2);
```

See this [TS Playground](https://www.typescriptlang.org/play?#code/HYQwtgpgzgDiDGEAE8D2A3EAnAliYALgGpQDCqhWIR2ehSA3gFBKsoVQFIHQECMSALxIAFNgDmALiQAiEDKQAfWQCMZASmlyFymWqWz4CwQD5GLNpawQCAVyzBDMgNwXWAX1dukAeh+z5Az0dJyQcKCQQJChbGAgsAFoCAE84pFQAMwCQ4O80YE5uXgAmIVEJLUDdfV0jTWygmtDdABNjM2ZLKxt7RxkjV0tPJm8-JAAVAAtkDJwsQrgqSB4sJEmQCIJUJBVkKIzbYHgCHAp0rJS0gAMeTj4rpDyOLlsoCHHeMrEsKW5UiEyRTu6iEHW8lj83nco38AFEsFhUFhpABlHBHZDjFFhCL5AhUTC4fBcM4HI4nM6LcA2eJITAAG1s0B2ti4wFQJMcZOOp0c1jsDjpIEZzIIk3C3EmiIA7hEomgwDAcPTkPFEVhvK93rwRLcCMV1F4If5pUiANYRQFoexvbx6vgibSGpjuIA)

See also [this discussion I had in StackOverFlow comments about Variance and Covariance](https://stackoverflow.com/questions/69895763/typescript-type-inference-from-default-parameter-of-type/69895855?noredirect=1#comment123970832_69895855)

## Assignability and Type Annotation

**Assignability**: TypeScript's rules for whether or not you can use a type `A` where another type `B` is required.

If `type A extends type B` then type A is **assignable** to type B. You can say that

Example

```ts
type Book = { name: string; isbn: string; author?: string }

let Book: Book = { name: 'Test' }
```

**Examples**:

- `"hello" extends string`
- `string extends number | string`
- nothing extends `never`
- everything (besides `never`) extends `unknown`

## Type Assertion

If `type B extends type A` then type A is **asserted** to be type B

## Top and bottom types

- `unknown` is a **top type** - the root of the hierarchy.

  - Any value is assignable to something typed as `unknown` (e.g. `let a: unknown = 5;` is possible, but `let a: unknown = 5; let b = 6; b = a;` is not) (because everything inherits from it)

    - This e.g. works: `let Book: unknown = { name: 'Test' }`

  - But elements with type `unknown` are assignable to **nothing** else (because you inherit from nothing)

    - This doesn't work: `let Sth: unknown; const New: Book = Sth;`. You e.g. get "Type 'unknown' is not assignable to type 'Book'"

  - `unknown` is an empty type: It has no properties of its own.

- `never` is a bottom type

  - Nothing is assignable to elements with type `never`

    - This e.g. doesn't work: `const Book: never = { name: 'Test' };`. You get "Type 'string' is not assignable to type 'never'."

  - But the `never` type is assignable to everything.

### Usages of `never`

Be safe against future changes to types, e.g. change from

```ts
// former type
const stringOrNum = string | number = 'Hello world!';
// new type
const stringOrNum = string | number | boolean = 'Hello world!';
```

Exhaustive check: TypeScript would throw a compile error.

```ts
if (typeof stringOrNum === 'string') {
  // ...
} else if (typeof stringOrNum === 'number') {
  // ...
} else {
  const _exhaustiveCheck: never = stringOrNum
  throw new Error(`Unknwon type ${_exhaustiveCheck}`)
}
```

## `any`

- It's both, a **bottom** and a **top** type.

  - It's assignable to everything
  - Everything is assignable to it.

## `unkown` vs. `any`

`unknown` is *I don't know*; `any` is *I don't care*.

[taken from here](https://stackoverflow.com/a/51439876/3210677)

## Type Widening and Narrowing

In case of a **type assertion**, e.g. `const B: foo as A` it will be allowed if `A extends B` **or** if `B extends A`.

- If `A extends B` you widen `A` to `B` which is relatively safe and acts similarly to a **type annotation**.

  **Example**: `string extends number | string`

- If `B extends A` you narrow A to B which is unsafe.

  **Example**: `number | string extends string`

### Type widening

Type widening is the default behavior for many literal types. So e.g. a string `foo` becomes the `string type`.

- If you widen `A` to `B`, `A extends B` holds. e.g. when doing a type assertion `let foo = bar as A` where `bar` is of a type which "extends" B, i.e. is a superset of `A`.

[Marius Schulz writes](https://blog.mariusschulz.com/2017/02/04/typescript-2-1-literal-type-widening) why non-widening _literal_ types might be useful.

## Links

- This article is based on [this blog post](https://medium.com/@KevinBGreene/a-little-theory-with-your-typescript-top-and-bottom-types-61b380f227d).

### Control flow analysis

