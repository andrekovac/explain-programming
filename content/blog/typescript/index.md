---
title: 'Typescript'
description: 'Concepts, syntax and code snippets for Typescript'
date: '2016-08-27T12:07:32.169Z'
author: 'André Kovac'
category: 'programming-language'
tags: ['javascript', 'typescript']
---

> TypeScript is like a highly-advanced linter, able to check documentation and warn when code is not being used as intended.

([taken from this blog article](https://medium.freecodecamp.org/its-time-to-give-typescript-another-chance-2caaf7fabe61))

## How does it work?

- Typescript compiler compiles `.ts` and `.tsx` files to `.js` files + `js.map` minified files.

- Option `"declaration": true,`:
  _ If exporting an own Typescript module, you can offer typescript linting support for it by generating a declaration file. With the help of that, typescript errors are displayed to developers who use functions/methods of it.
  _ Typescript compiler compiles `.ts` and `.tsx` files to `.d.ts` files ("Header" files - contains type definitions) + `.js` files + `js.map` minified files.

- Typescript holds a recursive tree of type definitions.

## `tsc` (compiler) vs. `tslint` (form checker)

- `tsc`: Semantics (e.g. unused variables)
  _ fast
  _ guarantees to apply rules for ALL files and cases!
- `tslint`: Advanced semantics checks
  _ not as logically rigid as `tsc`
  _ can selectively turn rules on/off on file/line lev

There's an extra tool `dts-bundle` to create **one** `d.ts.` file out of all `d.ts.` files in the `dist/` folder.

## Type inference

- Each function expects a certain type.
- Given an expression, if a type is not provided by the programmer, a type can be inferred from the context it is placed in - such an expression is then called a **contextually typed expression**.

  > If the contextually typed expression contains explicit type information, the contextual type is ignored.

If you explicitly set a type, you express that you know which type that function/value should expect.

**When would you explicitly set a type?** - If the contextually inferred type is not helpful/wrong, explicitly set a type.

- A type cannot always be inferred. Example:

  ```ts
  const foo = { a: 3, b: 'string', c: {} };
  const bar = _.pick(foo, ['a', 'b']);

  bar.a; // typescript can't infer the types of `a` and `b`
  ```

  (`_.pick` is from the **lodash** library)

More information can be found in the [type inference documentation](https://www.typescriptlang.org/docs/handbook/type-inference.html).

## Optional types

```ts
interface PersonPartial {
  name?: string;
  age?: number;
}
```

## Type assertions (aka type casts)

Two different ways to cast:

```ts
myObject = <TypeA>otherObject; // using <>
myObject = otherObject as TypeA; // using `as` keyword
```

Read about [why you shouldn't cast often](https://books.google.de/books?id=5EZsDwAAQBAJ&pg=PA100&lpg=PA100&dq=typescript+avoid+cast&source=bl&ots=A4D-zyJBXY&sig=ACfU3U1juPM6qd79-QooA_MvFQQtPvVUBw&hl=en&sa=X&ved=2ahUKEwi69aL8lJjqAhURwcQBHZAvDuUQ6AEwAnoECAoQAQ#v=onepage&q=typescript%20avoid%20cast&f=false).

## Assure that type is defined

`data.name` won't be undefined and thus `myName` won't.

```ts
const myName = data!.name!;
```

Use with caution!

## Pass on responsibility to type

By explicitly setting `any` I give away the responsibility to type to the stuff calling my function:

```ts
const foo = (bar: string, baz: string): any => ({
  ...
})
```

Then I can set `Function` (i.e. make `any` more concrete):

```js
const curriedFoo: Function = _.curry(foo('hello'));
```

## Modules (Import/Export)

Typescript has an extra [export =](https://www.typescriptlang.org/docs/handbook/modules.html#export--and-import--require) syntax which is used to model the traditional **CommonJS** and **[AMD](https://github.com/amdjs/amdjs-api/wiki/AMD)** workflow.

**Notes**:

- AMD is used in `require.js` [because of these reasons](http://requirejs.org/docs/whyamd.html).
- Read more about module patterns in [Addy Osmani: JS Design Patterns](https://addyosmani.com/resources/essentialjsdesignpatterns/book/#modularjavascript).

**Example**:

This code is from a [twig](https://twig.symfony.com/) file `layout.html.twig`:

```js
<script type="text/javascript">
    require(['app/user'], function(user) {
        app.init({}, function() {
            {% if requireJsApp is defined and requireJsApp %}
            app.load('{{ requireJsApp }}');
            {% endif %}
            app.finishLoading();
        });
    });
```

[The following quote is taken from an excerpt of the Typescript docs](https://www.typescriptlang.org/docs/handbook/modules.html#export--and-import--require):

> When importing a module using `export =`, TypeScript-specific `import module = require("module")` must be used to import the module.
> I can't have a `default export` next to a `export =`!

I still don't understand:

1. Why `require.js` decided to have this weird syntax?!
2. How `require.js` automatically does some kind of async stuff? as mentioned in comments of the question [here](https://stackoverflow.com/questions/2274695/new-function-with-lower-case-f-in-javascript)?
3. Why do I have to use `export =` in order to use the above `require(['app/foo'], ...)` syntax?

## Type Widening

Type widening is the default behavior for many literal types. So e.g. a string `foo` becomes the `string type`.

[Marius Schulz writes](https://blog.mariusschulz.com/2017/02/04/typescript-2-1-literal-type-widening) why non-widening _literal_ types might be useful.

## Comparison to flow

[Comparison with Facebook Flow Type System](https://github.com/Microsoft/TypeScript/issues/1265)

### Mimic flow types - Allow other arbitrary params in object

To mimic the behavior of non-strict flow-type type definitions:

- Here next to `bar` any other param is additionally allowed in the interface:

  ```ts
  interface Foo {
    bar: string;
    [key: string]: any; // a string index signature
  }
  ```

- Unions in **index signatures**

  Use the `in` command:

  ```ts
  type Foo = 'a' | 'b';
  type Bar = { [key in Foo]: any };
  ```

  The following code causes this error `An index signature parameter type cannot be a union type. Consider using a mapped object type instead`:

  ```ts
  type K = 'foo' | 'bar';

  interface SomeType {
    [prop: K]: any;
  }
  ```

## Indexer

The first line inside the `interface` is called [the indexer](https://www.typescriptlang.org/docs/handbook/interfaces.html#indexable-types):

```ts
interface Foo {
  [key: string]: string | number; // indexer
  bar: string;
}
```

## Tips/Workarounds

### Casts with `as any`

- Cast to any with `as any`

  Example

  ```ts
  interface Props = {
    foo: number;
    bar: string;
    // no baz defined
  }

  workWithProps({
    foo: 1,
    bar: 'hello'
    baz: 3,
  } as any)
  ```

### How to deal with `undefined`

- Work around `undefined`

  In case you have a type of the sort

  ```ts
  let foo: string[] | undefined;
  ```

  or

  ```ts
  const bar: {
    foo?: string[];
  }
  ```

  TypeScript will force you to deal with the possibility that `foo` might not be defined, i.e. that it is `undefined`.

  Here are three ways of how you can deal with them:

  ```ts
  const { foo } = bar   // foo might be undefined

  // Alternative 1 - clean modern JS (Optional chaining)
  const myLength = foo?.length

  // Alternative 2 - clean way via type guard
  if (foo != undefined) {
    const myLength = foo.length;
  }

  // Alternative 3 - elaborate way via type cast (more dangerous)
  const myLength = (foo as string).length;

  // Alternative 4 - dirty way (via non-null assertion -> can't be null or undefined)
  const myLength = foo!.length;
  ```

  Discussion of all three alternatives

  1. [Optional chaining](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Optional_chaining)
  2. Type Guard
  3. Type Cast
  4. Non-null assertion


  Be aware of async wrappers like `setTimeout`:

  They open a new scope.

  ```ts
  if (foo != undefined) {
    const myLenght = foo.length; // works!
    setTimeout(() => {
      const myLength = foo.length; // foo is a let, so it could've changed in the meantime!
    }, 500);
  }
  ```

- Trick to refrain from using type definitions for a module (which e.g. has none)

  You get the error that the module has no type definitions.

  1. Try to run `yarn add --dev @types/module-without-typings`. Perhaps types for it already exist.

  2. Declare `any` module

    ```ts
    declare module 'module-without-typings' {
      var noTypeInfoYet: any;
      export = noTypeInfoYet;
    }
    ```

  3. Use `require` instead of CommonJS way.

    ```ts
    const ModuleWithoutTypings = require('module-without-typings');
    ```

    instead of

  ```ts
  import * as ModuleWithoutTypings from 'module-without-typings';
  ```

- Great for refactoring!

  1. Make a change to a variable/prop
  2. Press `F 8` in **VSCode** to jump from TS error to error to fix them

## Data Type: `Record<K, T>`

**Definition**: Construct an object type with `key`s of type `K` and `value`s of type `T`

`Record` creates the type of an object where the entries of `EntryName` are possible keys and the values are of type `number | null | undefined`

```ts
export type EntryName = typeof entryNames[number]
export const entryNames = [
  "connections"
  "views",
  "likes",
  "favorites",
] as const

type Values = Record<EntryName, number | null | undefined>
```

### More complex example from `react-navigation`

This is the type definition of [ParamListBase](https://github.com/react-navigation/react-navigation/blob/b19f76bfffe623759e67d925bfd067c753a453bf/packages/routers/src/types.tsx#L93):

```ts
export declare type ParamListBase = Record<string, object | undefined>;
```

- `object` can be typed as `{ [key: string]: any }`
- Hence, the `Record` is an **object of objects** or `undefined`, i.e. either

```ts
{ [key: string]: { [key: string]: any } }
```

or

```ts
{ [key: string]: undefined }
```

See https://stackoverflow.com/questions/51936369/what-is-the-record-type-in-typescript

## TypeScript implements **Duck Typing**

- [This blog article](https://ajay-bhosale.medium.com/typescript-and-duck-typing-7b3d7bb6f03c) talks about TypeScript and Duck Typing.

- **Duck Typing**: Check whether it is a duck by checking whether it **quacks** like a duck and **walks** like a duck. In contrast to checking its DNA.

```ts
// types
interface IItem {
  id: number;
  title: string;
}
interface IProduct {
  id: number;
  title: string;
  author: string;
}

// print function
function print(item: IItem) {
  console.log(item.id + ' > ' + item.title);
}

// book
var book: IProduct = {
  id: 1,
  title: 'C# in Depth',
  author: 'Jon Skeet',
};

print(book); // No type error since it's
```

## Constrained generics

Here type `P` gets constraint to `object` which signifies a non-primitive type, i.e. not `string`, `number`, `boolean`, `bigint`, `symbol`, `undefined` or `null`.

```ts
<P extends object>
```

**Similar** but different (see [here](https://stackoverflow.com/a/65945966/3210677) for more infos):

```ts
<P extends {}>
```

Unconstrained generics are given the implicit constraints of `unknown`, i.e.

```ts
<P extends unknown>
```

Read more about it in this nice [SO answer](https://stackoverflow.com/a/65945966/3210677).

## Interfaces as function types

[This blog post covers the topic](https://www.logicbig.com/tutorials/misc/typescript/interface-describing-function.html).

I encountered this type:

```ts
export interface CreateStyledComponent<
  P extends {},
  ComponentProps extends {} = {},
  JSXProps extends {} = {},
  StyleType extends NativeStyle = NativeStyle
> {
  <AdditionalProps extends {} = {}>(
    ...styles: Interpolation<P & ComponentProps & AdditionalProps & { theme: Theme }, StyleType>[]
  ): StyledComponent<P & AdditionalProps, ComponentProps, JSXProps>;

  <AdditionalProps extends {} = {}>(
    template: TemplateStringsArray,
    ...styles: Interpolation<P & ComponentProps & AdditionalProps & { theme: Theme }, StyleType>[]
  ): StyledComponent<P & AdditionalProps, ComponentProps, JSXProps>;
}
```

A whole lot is happening here!

- An interface which describes a generic type with **4** input parameters (types) and as return values functions.
- Function overloading
- Many constrained generics with default types
- Many type intersections


### Other example from lodash

Its `filter` function heavily uses function overloading inside an interface which defines a function:

```ts
interface LoDashStatic {
    /**
      * Iterates over elements of collection, returning an array of all elements predicate returns truthy for. The
      * predicate is invoked with three arguments: (value, index|key, collection).
      *
      * @param collection The collection to iterate over.
      * @param predicate The function invoked per iteration.
      * @return Returns the new filtered array.
      */
    filter(collection: string | null | undefined, predicate?: StringIterator<boolean>): string[];
    /**
      * @see _.filter
      */
    filter<T, S extends T>(collection: List<T> | null | undefined, predicate: ListIteratorTypeGuard<T, S>): S[];
    /**
      * @see _.filter
      */
    filter<T>(collection: List<T> | null | undefined, predicate?: ListIterateeCustom<T, boolean>): T[];
    /**
      * @see _.filter
      */
    filter<T extends object, S extends T[keyof T]>(collection: T | null | undefined, predicate: ObjectIteratorTypeGuard<T, S>): S[];
    /**
      * @see _.filter
      */
    filter<T extends object>(collection: T | null | undefined, predicate?: ObjectIterateeCustom<T, boolean>): Array<T[keyof T]>;
}
```

## Utility types

- Utility types are built-in conditional types.

**TODO**: What are conditional types?


## Lookup types

- [`keyof`](https://www.typescriptlang.org/docs/handbook/release-notes/typescript-2-1.html#keyof-and-lookup-types) to get a `key`.

- And `T[keyof T]` to get a **value** of object `T`:

```ts
T[keyof T]
```

### Examples

#### [Partial type](https://www.typescriptlang.org/docs/handbook/release-notes/typescript-2-1.html#mapped-types) implementation

```ts
type Partial<T> = {
  [P in keyof T]?: T[P];
};
type PartialPerson = Partial<Person>;
```

#### `filter` function:

```tsx
filter<T extends object, S extends T[keyof T]>(collection: T | null | undefined, predicate: ObjectIteratorTypeGuard<T, S>): S[];
```