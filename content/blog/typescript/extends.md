---
title: 'Typescript extends command'
description: 'A close look at the Typescript extend command with examples'
date: '2021-01-30'
updated: '2022-07-01'
author: 'André Kovac'
category: 'programming-language'
tags: ['javascript', 'typescript']
---

### Definition for object types

`extends` in e.g. `Lion extends Animal` says that `Lion` is a **sub-type** of `Animal` like with classes if `Ferrari extends Car`, `Ferrari` is a child of a `Car`.

`Lion` is more special than `Animal`.

```js
interface Animal {
  fur: 'colored';
}
interface Lion extends Animal {
  bites: true
}
```

### `extends` with `keyof`

- In `K extends keyof T` **"extends"** means a type `K` with *covariant* relationship with `keyof T`

**Exercise**: https://stackoverflow.com/questions/45546159/type-test-cannot-be-used-to-index-type-t

### `extends` for union types

Let's look at

```ts
let foo: string | number = "hello"
```

- **Question**:  Why does this type assertion work?
- **Answer**: It's because of these equivalent statements:
  - The literal type `"hello"` is *narrower* than `string | number`.
  - "hello" is a **subtype** of string | number
  - "hello" extends `string | number`

Although it's called `extends`, in `A extends B`


```ts

```

### TS Error: Type '"test"' cannot be used to index type 'T'

> For type inference to work, you'll need to pass a parameter to the function that uses one or more of the generic type parameters.

Nice example [here](https://stackoverflow.com/questions/45546159/type-test-cannot-be-used-to-index-type-t).

### Widening type assertion vs. type annotation

Excellent explanation in [this SO answer](https://stackoverflow.com/a/68289470/3210677).

> `A extends B` direction where you **widen** `A` to `B`

> Type **annotations** will generally only allow you to assign a value of some type `A` to a variable of some type `B` where `A extends B`

### Narrowing down a field

With an interface you can use `extend` to narrow down a type. Here the field `type` gets narrowed down from a `string` to `"text" | "email" | "multiline"`.

```ts
interface Field {
  id: string
  type: FieldType
}

export interface QuestionField extends Field {
  type: "text" | "email" | "multiline"
  question: Question
  initialValue: string | null
  answer: string | null
  required: boolean
  condition?: Condition
}
```

#### Mimicking `extends` with type aliases via intersection type

```tsx
interface LogoProps extends SvgProps {
  scaleFactor?: number;
}
```

```tsx
import React, { ReactElement } from 'react';
import Svg, { SvgProps, Path } from 'react-native-svg';

type LogoProps = {
  /**
   * Scale factor: Numbers larger than 1 increase the size, numbers lower than 1 decrease the size.
   */
  scaleFactor?: number;
};

const Logo = ({
  scaleFactor = 1,
  ...props
}: SvgProps & LogoProps): ReactElement => {
  return (
    <Svg
      width={100 * scaleFactor}
      height={104 * scaleFactor}
      viewBox="0 0 100 104"
      fill="none"
      {...props}
    >
      <Path
        d="M10 2.69l5 4.5V15h-2V9H7v6H5V7.19l5-4.5zM10 0L0 9h3v8h6v-6h2v6h6V9h3L10 0z"
        fill="#FD591C"
      />
    </Svg>
  );
};

export default Logo;
```

### Extending types from 3-rd party libraries

- Component library [chakra](https://chakra-ui.com/) used
- `Card` components should behave like a chakra-ui `Box`.
- That's why the `Props` type of `Card` extends `BoxProps` from the chakra.ui library
- `...boxProps` funnels all `BoxProps` added as props to `Card` to the `Box` component from chakra-ui.

```ts:title=Card.tsx
import React from "react"
import { Box, BoxProps, Heading } from "@chakra-ui/react"

interface Props extends BoxProps {
  headline?: string
  hAs?: "h1" | "h2" | "h3" | "h4"
}
const Card = ({ children, headline, hAs = "h2", ...boxProps }: Props) => (
  <Box bg="white" borderColor="gray.200" borderWidth="1px" borderRadius="lg" px={3} py={4} {...boxProps}>
    {headline && (
      <Heading as={hAs} size="md" mb={3}>
        {headline}
      </Heading>
    )}
    {children}
  </Box>
)

export default Card
```

### Example: Factory function

```ts
export type User = {
  id: number
  createdAt: Date
  updatedAt: Date
  name: string | null
  email: string
  hashedPassword: string | null
  role: string
}

export type Cost = {
  id: number
  createdAt: Date
  updatedAt: Date
  publishedAt: Date | null
  price: number
}
```

```ts
type EntryT = Cost | User

/**
 * Pick subset of values
 */
export const filterFactory = <T extends EntryT>(
  entryNames: ReadonlyArray<Partial<keyof T>>
) => (entry: T): Partial<T> => pick(entry, entryNames)
```

### Tip: **Generics** with fat arrow functions

Use `extends any` as a workaround:

```ts
const f = <T1 extends any>(arg1: T1) => <T2 extends any>(arg2: T2) => {
  return { arg1, arg2 };
};
```

Use `extends unknown` for TypeScript v3.0 and up:

```ts:title=node_modules/@types/react/index.d.ts
// TODO (TypeScript 3.0): <T extends (...args: never[]) => unknown>
function useCallback<T extends (...args: any[]) => any>(callback: T, deps: DependencyList): T;
```

## Type cast of React node

Type assertion for a React component

```tsx
export const CardStack = React.forwardRef<View, CardStackProps>(
  // ...
) as <T extends object = {}>(props: CardStackProps<T> & React.RefAttributes<View>) => JSX.Element;
```
