---
title: 'Conditional types'
description: 'Typescript conditional types'
date: '2022-01-16'
author: 'André Kovac'
category: 'programming-language'
tags: ['javascript', 'typescript']
---

## About conditional types

- Conditional types involve `extends` and the ternary operator.
- They contain **type variables**. Type variables may be defined:

  - after `infer` within the `extends` clause of a conditional type → `R` in `T extends (...args: any[]) => infer R`
  - on the left-hand side of the type declaration → `T` in `ReturnType<T> = ...`
  - as part of a [mapped type](https://www.typescriptlang.org/docs/handbook/advanced-types.html#mapped-types) → `K` in `type Mapped<T> = {
    [K in keyof T]: ... }`

  (taken from this [SO answer](https://stackoverflow.com/a/60067851/3210677))

  - These are all **declared** type variables.
  - If you want to introduce new type variables in the scope of a conditional type, you have to use `infer` to **declare** them.

### Example: Remove certain member from union type

```ts
type Animal = Lion | Zebra | Tiger | Shark

type ExtractCat<A> = A extends { meow(): void } ? A : never

type Cat = ExtractCat<Animal>
// => Lion | Tiger
```

```ts
type ExcludeTypeKey<K> = K extends "type" ? never : K

type Test = ExcludeTypeKey<"emailAddress" | "type" | "foo">
// => "emailAddress" | "foo"
```

Wonderful article about conditional types: https://artsy.github.io/blog/2018/11/21/conditional-types-in-typescript/

### Example where conditional types are more complicated

```ts
type ExtractId<Action, T> = Action extends 'delete' | 'put' ? T : never;

const generateUrl = <Action extends CrudAction>(
  crudAction: Action,
  entity: Entity,
  id?: ExtractId<Action, number | string>
): string => {
  switch (crudAction) {
    case 'delete':
    case 'put':
      return `${baseUrl}/${entity}/${id}`;
    default:
    case 'post':
    case 'get':
      return `${baseUrl}/${entity}`;
  }
};

generateUrl('post', 'inhaler'); // ✅ Good!
generateUrl('post', 'inhaler', 6); // ✅ Good!
generateUrl('put', 'inhaler'); // ❌ This shouldn't be allowed! Third argument `id` is required!
```

**Solution** with function overloading:

```ts
interface GenerateUrl {
  (crudAction: 'delete' | 'put', entity: Entity, id: number | string): string;
  (crudAction: 'get' | 'post', entity: Entity, id?: never): string;
}

const generateUrl: GenerateUrl = (
  crudAction: CrudAction,
  entity: Entity,
  id?: number | string
): string => {
  switch (crudAction) {
    case 'delete':
    case 'put':
      return `${baseUrl}/${entity}/${id}`;
    default:
    case 'post':
    case 'get~':
      return `${baseUrl}/${entity}`;
  }
};

generateUrl('put', 'inhaler'); // ✅ Error as desired!
```

Now I get **error**: `Argument of type '"put"' is not assignable to parameter of type '"get" | "post"'`

Issue remains when calling it with general CrudAction:

```ts
const url = generateUrl(crudAction, entity, data.id);
```

### Conditional type with many conditions


`AnimateStyle` taken from `node_modules/react-native-reanimated/react-native-reanimated.d.ts`:

```ts
export type AnimateStyle<S> = {
  [K in keyof S]: K extends 'transform'
    ? AnimatedTransform
    : S[K] extends ReadonlyArray<any>
    ? ReadonlyArray<AnimateStyle<S[K][0]>>
    : S[K] extends object
    ? AnimateStyle<S[K]>
    : S[K] extends ColorValue | undefined
    ? S[K] | number
    :
        | S[K]
        | AnimatedNode<
            // allow `number` where `string` normally is to support colors
            S[K] extends ColorValue | undefined ? S[K] | number : S[K]
          >;
};
```

### Conditional type which checks for a valid value given an object's key

```ts
type ObjT = {
    foo: 1;
    bar: 2;
}

// Conditional type which checks for a valid value given an object's key
type ObjectValue<Obj extends object, Key extends string> = Key extends keyof Obj ? Obj[Key] : never;

// Works:
const myString1: ObjectValue<ObjT, 'foo' | 'bar'> = 1;
// Type error because `3` is not a value in `ObjT`:
const myString2: ObjectValue<ObjT, 'foo' | 'bar'> = 3;
```

See [this TS playground](https://www.typescriptlang.org/play?#code/C4TwDgpgBA8gRgKwCpQLxQN4Cgq6gMwHtCAuKARgG4c84BDAJzICZqBfLLAei6gGFCAOwAmAS2CihdADZRQkKAHcAFqIDGyqBohqA1gGcChBlDpQAbjNHCLMgK7QA5qPMRBp94UQ7gAckO6ECBY8tDwCD4AavYQADzhUBAAHsBuwoZeEWrAADRQANJBiSlphvrADKKCjgB8aAVFyakiAUGE+LCIUAD8nQgA2oUgALpQZIIQrgzU3LwA6sYGJFhqQuVQALYgAMoVVY7kZOFRMfGISHm+RIS+UAA+UL70DL516FSzUEjg0BAMDMYoHAdHQ7PpoAADADMEKgokMgkIwFMtmkDjh7gh4SQEOWq0E6y2u0q1WYR282WiaLi2Mu11uDyejFe9ShMx4UAAtNzOZ8AILSVIMQR0CSuLRCMQSKSyULLUJ9E7U5hnBDFZrpKCZHx5Ibq0pQcok2r1cKDRolFpQQIgdp9HoNEBjKATKbDdnzRb6PFrZFEvbVKHkrLAKkOFW0x70+6PZ4s97UDlIZTQBV-AEmFMMaDwl1I0wI9TQOiGOhwQiuH0Ev07AOOAAswaV4dVFyjxAZseZbygbKwQA)

## Example with parameter spread: `Tail` of an array

```ts
/**
 * [H, ...T] -> T
 */
export type Tail<L extends any[]> = ((...l: L) => any) extends ((h: any, ...t: infer T) => any) ? T : never
```

Found in `node_modules/@redux-saga/core/types/ts3.6/effects.d.ts`


Not a conditional type but also nice:

```ts
/**
 * [...A, B] -> A
 */
export type AllButLast<L extends any[]> = Reverse<Tail<Reverse<L>>>
```