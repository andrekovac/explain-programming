---
title: 'Typescript & React'
description: 'Special Typescript situations while using it with React'
date: '2018-03-01T12:07:32.169Z'
author: 'André Kovac'
category: 'programming-language'
tags: ['javascript', 'typescript', 'react']
---

## How to type React Higher Order Components (HOC)

See this great article: [React Higher-Order Components in TypeScript made simple](https://dev.to/danhomola/react-higher-order-components-in-typescript-made-simple)

How to type it:

```js
const myHoc = <P extends Props>(
    Component: React.ComponentType<P & myHocProps>
): React.ComponentClass<P> => {
    return class extends React.Component<P> {
        ...
    }
}
```

**Note**: The type `React.Component` is an instance of the component. On the other hand `React.ComponentType` is the actual subclass of `React.Component`.

## Conditional React props with TypeScript (via discriminated union)

> Using TypeScript to only allow a React prop to be set when another has a specific value

Taken from [this article](https://www.benmvp.com/blog/conditional-react-props-typescript/).

A [discriminated union](https://basarat.gitbook.io/typescript/type-system/discriminated-unions) plus the `never` type does the trick here:

```ts
interface CommonProps {
  children: React.ReactNode

  // ...other props that always exist
}

type TruncateProps =
  | { truncate?: false; showExpanded?: never }
  | { truncate: true; showExpanded?: boolean }

type Props = CommonProps & TruncateProps

const Text = ({ children, showExpanded, truncate }: Props) => {
  // Both truncate & showExpanded will be of
  // the type `boolean | undefined`
}

Text({ children: 'text', showExpanded: true, truncate: true })    // works
Text({ children: 'text', truncate: false })   // works
Text({ children: 'text', showExpanded: true, truncate: false })   // throws error
```

See this [TS playground](https://www.typescriptlang.org/play?#code/JYOwLgpgTgZghgYwgAgMIHsC2n0gApToAOAzsgN4CwAUMsggBbAA2AJlBCAFzICuIAaxDoA7iBo06AeinIAdAvRgG0ZEUKlkyuGGRxmIuAE8yEAB7ASYGgF8J1MEaIoAKlH4IdEAsTIBeSWQAHwotdxBPSAB+HnhmEggAbmQSBlEAUTMiOBBWCFYY5BAIADdVO1pg0LBwyIgeGt4klLSRTOzc-MKAI3R0Zggc5AqaR2dkH00-NCwcfA0yADJkNw8vSZJ7BFwrFfMwACZkaYAKcnomNg4QABoWjKycvNY7xoivYZ4NgEpjgD4KIEZMgAEJKBhhNaQZDLVIPDrPZAiFjMZDdFDoGBA2TKFBjFAAA16-UGICq-DyMFA+QJtnsLn2BzOFxY7E4PAA5JAzGAOXc4W1Hp1WA13BBXrUvKKmsNfnRkMCROgoAJNtQGTymedGKzrpzubyJVD6sg4glZfLFcrVTQNYdmTqruzkFz9nz7oKEflpeLIe9ILF9OabHKFTiGIQRKYoIQoEA).

**Update**: Consider using `undefined` type instead of `never` for the same behavior (as described [here](https://github.com/microsoft/TypeScript/pull/27695)):

**Related example**:

If `error` is `undefined` there's a value. If it's defined, its an `error` without a value:

```ts
type Result<T> = { error?: undefined, value: T } | { error: Error };

function test(x: Result<number>) {
    if (!x.error) {
        x.value;  // number
    }
    else {
        x.error.message;  // string
    }
}

test({ value: 10 });
test({ error: new Error("boom") });
```