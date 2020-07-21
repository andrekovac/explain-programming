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

* Typescript compiler compiles `.ts` and `.tsx` files to `.js` files + `js.map` minified files.

* Option `"declaration": true,`:
	* If exporting an own Typescript module, you can offer typescript linting support for it by generating a declaration file. With the help of that, typescript errors are displayed to developers who use functions/methods of it.
	* Typescript compiler compiles `.ts` and `.tsx` files to `.d.ts` files ("Header" files - contains type definitions) + `.js` files + `js.map` minified files.

* Typescript holds a recursive tree of type definitions.

## `tsc` (compiler) vs. `tslint` (form checker)

* `tsc`: Semantics (e.g. unused variables)
	* fast
	* guarantees to apply rules for ALL files and cases!
* `tslint`: Advanced semantics checks
	* not as logically rigid as `tsc`
	* can selectively turn rules on/off on file/line lev

There's an extra tool `dts-bundle` to create **one** `d.ts.` file out of all `d.ts.` files in the `dist/` folder.


## Type inference

- Each function expects a certain type.
- Given an expression, if a type is not provided by the programmer, a type can be inferred from the context it is placed in - such an expression is then called a **contextually typed expression**.

  > If the contextually typed expression contains explicit type information, the contextual type is ignored.

If you explicitly set a type, you express that you know which type that function/value should expect.

**When would you explicitly set a type?** - If the contextually inferred type is not helpful/wrong, explicitly set a type.


* A type cannot always be inferred. Example:

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

## Casts

Two different ways to cast:

```ts
myObject = <TypeA> otherObject;     // using <>
myObject = otherObject as TypeA;    // using `as` keyword
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

* AMD is used in `require.js` [because of these reasons](http://requirejs.org/docs/whyamd.html).
* Read more about module patterns in [Addy Osmani: JS Design Patterns](https://addyosmani.com/resources/essentialjsdesignpatterns/book/#modularjavascript).

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
I can't have a `default export` next to a `export =`!

I still don't understand:

1. Why `require.js` decided to have this weird syntax?!
2. How `require.js` automatically does some kind of async stuff? as mentioned in comments of the question [here](https://stackoverflow.com/questions/2274695/new-function-with-lower-case-f-in-javascript)?
3. Why do I have to use `export =` in order to use the above `require(['app/foo'], ...)` syntax?

## Type Widening

Type widening is the default behavior for many literal types. So e.g. a string `foo` becomes the `string type`.

[Marius Schulz writes](https://blog.mariusschulz.com/2017/02/04/typescript-2-1-literal-type-widening) why non-widening *literal* types might be useful.

## Interfaces

- [Nice short article about the differences between `interface` and `type`](https://pawelgrzybek.com/typescript-interface-vs-type/)

![interfaces vs. types](./InterfacesVsTypes.jpg)

## Comparison to flow

[Comparison with Facebook Flow Type System](https://github.com/Microsoft/TypeScript/issues/1265)

### Mimic flow types - Allow other arbitrary params in object

To mimic the behavior of non-strict flow-type type definitions:

* Here next to `bar` any other param is additionally allowed in the interface:

	```ts
	interface Foo {
		bar: string;
		[key: string]: any;  // a string index signature
	}
	```

## Indexer

The first line inside the `interface` is called [the indexer](https://www.typescriptlang.org/docs/handbook/interfaces.html#indexable-types):

```ts
interface Foo {
	[key: string]: string | number;  // indexer
	bar: string;
}
```

## Tipps/Workarounds

* Generics with fat arrow functions

	Use `extends any` as a workaround:

	```ts
	const f = <T1 extends any>(arg1: T1) => <T2 extends any>(arg2: T2) => {
		return { arg1, arg2 };
	}
	```

* Cast to any with `as any`

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

* Work around `undefined`

	```ts
	let foo: string | undefined;

	// Alternative 1 - clean way
	if (foo != undefined) {
		foo.length;
	}

	// Alternative 2 - elaborate way
	(foo as string).length

	// Alternative 3 - dirty way
	foo!.length;
	```

	Be aware of async wrappers like `setTimeout`:

	```ts
	if (foo != undefined) {
		foo.length;  // works!
		setTimeout(() => {
			foo.length;  // foo is a let, so it could've changed in the meantime!
		}, 500);
	}
	```

* Trick to refrain from using type definitions for a module (which e.g. has none)


	* Alternative 1

	```ts
	declare module 'module-without-typings' {
	    var noTypeInfoYet: any;
	    export = noTypeInfoYet;
	}
	```

	* Alternative 2: Use `require` instead of CommonJS way.

	```ts
	const ModuleWithoutTypings = require('module-without-typings');
	```

	instead of

	```ts
	import * as ModuleWithoutTypings from 'module-without-typings';
	```


* Great for refactoring!

	1. Make a change to a variable/prop
	2. Press `F 8` in **vscode** to jump from error to error to fix them
