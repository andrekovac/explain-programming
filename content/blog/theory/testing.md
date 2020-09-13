---
title: 'Unit tests, integrations tests, e2e tests and advanced testing concepts'
date: '2016-02-15'
author: 'André Kovac'
description: 'Discussing the different types of testing and some concepts around testing'
category: 'theory'
tags: ['test', 'javascript']
draft: false
ready: true
---

What is out there in the world of testing. This article categorizes them briefly and introduces you to some advanced testing concepts you might not have yet heard about.

## Different types of testing

### Unit Testing

Check that a single function does what it should do.

e.g. `mocha`/`chai` or `jest`

### Integration Testing

Render a certain part (e.g. component) of an app without many mocks to check that it does what it should do.

### End-to-end (a.k.a `e2e`) testing - also called **functional testing**

Simulates a real app user and runs that virtual user through the entire app experience.

I sometimes heard people to call integration test and end-to-end tests the same thing.

### Links

- [Categorization of different tests](https://kentcdodds.com/blog/unit-vs-integration-vs-e2e-tests)
- [What are Unit Testing, Integration Testing and Functional Testing?](http://codeutopia.net/blog/2015/04/11/what-are-unit-testing-integration-testing-and-functional-testing/)

## Advanced testing topics

### Test coverage

Most often via code-coverage, e.g. via Jest

### JSON schema validation

Use [JSON Schema](http://json-schema.org/)

For JS create a JSON schema yourself or use [one of these tools](https://stackoverflow.com/questions/7341537/tool-to-generate-json-schema-from-json-data#answer-30294535).

For typescript generate a schema with the following tool: [typescript-json-schema](https://github.com/YousefED/typescript-json-schema)

```js
import { validate, ValidationError } from 'jsonschema';

const generatedJSONSchema = {
  type: 'object',
  properties: {
    id: { type: ['null', 'number'] },
    name: { type: ['null', 'string'] },
    description: { type: ['null', 'string'] },
    pictureFileName: { type: ['null', 'string'] },
    instituteName: { type: ['null', 'string'] },
    instituteLogoFileName: { type: ['null', 'string'] },
  },
  required: [
    'description',
    'id',
    'instituteLogoFileName',
    'instituteName',
    'name',
    'pictureFileName',
  ],
  $schema: 'http://json-schema.org/draft-04/schema#',
};

export const validateFeaturedAuthor = (obj: {}): ValidationError[] => {
  const { errors } = validate(obj, generatedJSONSchema);
  return errors;
};
```

```js
// Usage
...
const errors = validateFeaturedAuthor(parsedJSONFile);
```

### Property Based Testing

[What is Property Based Testing?](https://hypothesis.works/articles/what-is-property-based-testing/)

> Randomly generated test cases based on defined properties (like [QuickCheck](https://begriffs.com/posts/2017-01-14-design-use-quickcheck.html) does for Haskell).

- [fast-check](https://github.com/dubzzz/fast-check) is a property based testing framework for JavaScript/TypeScript.
- [Hypothesis](https://github.com/HypothesisWorks/hypothesis) is also a big framework in the space of property based testing which has a bit of a different philosophy as compared to QuickCheck.

### Snapshot testing

Test and update snapshots of components. [See the docs](https://facebook.github.io/jest/docs/en/snapshot-testing.html)
