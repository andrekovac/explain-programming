---
title: 'Typescript deep dive topics'
description: 'A close look at some TypeScript details'
date: '2021-11-17'
author: 'André Kovac'
category: 'programming-language'
tags: ['javascript', 'typescript']
---

## `void` vs. `never`

```ts
// !-------------------
// ! `void` and `never`
// !-------------------

type NeverOne = boolean & never;
type NeverTwo = boolean | never;

// `never` if the function never ends
const boolOrThrow = (): never => {
  if (Math.random() > 0.5) {
    throw new Error("hello");
  }
  throw new Error("bye");
}

type sth = number | never;

// `number` if it returns
const numberFunction = (): number => {
  if (Math.random() > 0.5) {
    throw new Error("hello");
  } else {
    return 1;
  }
}

// `void` if it doesn't explicitly return. `void` prevents a function to set a `return` statement.
const voidFunction = (): void => {
  if (Math.random() > 0.5) {
    throw new Error("hello");
  }
}
```

## Optional prop values

**Attention**: Optional prop values implicitly become an union with `undefined`.

```ts
// !---------------------
// ! optional prop values
// !---------------------

type EntityOptional = {
  id?: number, // (property) id?: number | undefined
}

// Optional properties may be undefined
const entityOptional: EntityOptional = { id: undefined };
```


## Indexed Access Type problematic with optional values

**Attention**: Indexed access type inherit optional state from property

```ts
type EntityOptional = {
  id?: number, // implicit type: id?: number | undefined
}

type EntityCopy = {
  id: EntityOptional['id'], // implicit type taken: number | undefined (not just number!)
}

const entity: EntityCopy = { id: undefined }; // Attention! `id` in `EntityCopy` may still be 'undefined'
const entity2: EntityCopy = {}; // error: You need an 'id' now. It's not optional.However, it may still be undefined.
```

**Attention**: Optional values remain optional with indexed access type - fixed with `Omit` and intersection!

```ts
// models.ts
type Person = {
  id?: number,
  name: string,
  hobbies: string[]
}

//
type PersonWithNonOptionalId = {
  id: Person['id'],	// Attention! This `id` is still optional!
  name: string,
  hobbies: string[]
}

// Right way! Person with non-optional number id
type PersonSyncedWithBackend = Omit<Person, 'id'> & { id: number };
```

See also [this TS playground](https://www.typescriptlang.org/play?#code/C4TwDgpgBAsiAq5oF4oG8oDMD22D8AXFAM7ABOAlgHYDmANFrgEyEnnU1QC+A3AFB9QkWAiQB1CsAAWAeQC2kqKnmSAPHESQGAchzZtAPigAydI2xFSlWt35DoG8ZKkBJKgBMIADwjuAggDGARDExJooZnpEjpAA2rq42gC6DHpMluw2vAIB2FSkUHKikOki4RLSKsBKkcxE2gBGAIZkTNqpuEQArh4QmNS+tlAA9MNQEGRk2GSMMz2e-VSDCfp8ufnVReEAzNHFEBWuvT7+QSFhSDUYafXNre3m3b2Lg7wjY9rzfQPu2lBNABsAdgAO6DBoQAJNLrEaDaPB-ChyMAAigBSQAkBQagBAFdTzEKCfZ4-bRAA) with a similar example.