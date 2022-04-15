---
title: 'Functional JavaScript'
description: 'The usage of functional programming concepts in Javascript'
date: '2019-08-20T23:46:37.121Z'
author: 'André Kovac'
category: 'programming-language'
tags: ['javascript', 'functional programming']
---

- Don't mutate objects
- Don't cause side effects - Your callback can only modify the new value you're returning from that callback.

[An Introduction to Functional JavaScript](http://www.sitepoint.com/introduction-functional-javascript/)

## Functional superscripts over Javascript

- [PureScript](https://leanpub.com/purescript/read)
- [**Sanctuary** - Refuge from unsafe JavaScript](https://github.com/sanctuary-js/sanctuary)

- [Specification for interoperability of common algebraic structures in JavaScript](https://github.com/fantasyland/fantasy-land/tree/v4.0.1#applicative)

## Immutability in JS

Don't mutate an object, but create a new one with the change, i.e. create a new object in memory with a new reference

- Vanilla JS

  ```js
  // objects
  var yourCarRepainted = Object.assign({}, yourCar, { color: 'red' });
  // array
  var changedList = [].concat(list);
  ```

- Or use libraries like immutable.js

## Array Functions (collection functions)

Array operations without having to write loops explicitly. [This is a great article about map(), reduce() and filter()](http://cryto.net/~joepie91/blog/2015/05/04/functional-programming-in-javascript-map-filter-reduce/)

**Examples** for most common use cases:

- [reduce()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/Reduce) and [reduceRight()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/ReduceRight)

  The `reduce()` callback always expects the new total value to be returned, even if that value is an array, and even if it's the same one as before.

  - `reduce()`

    ```js
    [0, 1, 2, 3, 4].reduce((prev, curr) => prev + curr);
    ```

    or with initial value `{}` for `total`:

    ```js
    [0, 1, 2, 3, 4].reduce((total, curr) => total + curr, 0);
    ```

    Add stuff to an array with reduce:

    ```js
    var newNumbers = numbers.reduce(function (newArray, number) {
      newArray.push(number);

      if (number % 2 == 0) {
        /* Add it a second time. */
        newArray.push(number);
      }

      return newArray; /* This is important! */
    }, []);
    ```

    Nice code example of `reduce` usage:

    Returns an object of the form

    ```js
    {
      processId1: [assessment1, assessment2],
      processId2: [assessment3, assessment4],
      // ...
    }
    ```

    ```js
    const assessmentsByProcess = useQuery(getAssessments, {
        orderBy: { id: "asc" },
      })[0].assessments.reduce((accum, curr) => {
        // if there is already at least one assessment with a certain processId, add assessments with the same processId to it.
        if (accum[curr.processId]) {
          return {
            ...accum,
            [curr.processId]: [...accum[curr.processId], curr],
          }
        }
        // An assessment with a certain project id was found the first time -> just append it to the object
        return {
          ...accum,
          [curr.processId]: [curr],
        }
      }, {})
      ```


  - `reduceRight()`: `reduce()` but from right to left instead of left to right.

- [map()]() vs. [forEach()]() vs. [every()]()

  - `map()`: Apply function to each element in Array and return new array with altered values.

    ```js
    [0, 1, 2, 3, 4].map( (value) => value + 2 );
    ```

  - `forEach()`:

    Loop through **array**. Callback function does not return anything as `map()` does.

    Loop through **object**:

    ```js
    var numbers = {one: 1, two: 2, three: 3, four: 4};

    Object.keys(numbers).forEach(function(key){
        var value = numbers[key];
        doSomethingWith(value);
        /* For example, key == "one" and value == 1 */
    });
    ```

    - `every()`:

- [filter()]()
  Filter the array according to the provided filter function.

  ```js
  [0, 1, 2, 3, 4].filter((value) => value > 0);
  ```

- [sort()]()

  Sort the **current array** according to a sort callback function which returns a boolean

  ```js
  [0, 1, 2, 3, 4].sort((a, b) => a < b);
  ```

- [join()]()

  ```js
  myArray.join(',');
  ```

- [slice()]() vs. [splice()]()

      - `slice()`:

        - Pass by value, i.e. a new copy of the array is created instead of just a new reference.
        - Shallow copy: It copies by value if it's an array of primitive types, like Strings or Integers. If it's an array of arrays or array of objects, the elements of the array will only by copied by reference, not by value.

          ```js
          newArray = myArray.slice();
          ```

- [every()]()

- [fill()]()

## Stack, Queue

- `push()`
  Push new element to end of stack/queue

- `pop()`
  Pop last object in stack

- `shift()`
  Enqueue first object in queue

## Immutable.js

### Elements

#### [Map()](https://facebook.github.io/immutable-js/docs/#/Map)

- `mergeDeep()`Example:

  ```js
  var x = Immutable.fromJS({ a: { x: 10, y: 10 }, b: { x: 20, y: 50 } });
  var y = Immutable.fromJS({ a: { x: 2 }, b: { y: 5 }, c: { z: 3 } });
  x.mergeDeep(y); // {a: { x: 2, y: 10 }, b: { x: 20, y: 5 }, c: { z: 3 } }
  ```

- `setIn()`, `getIn()`

#### `Lazy Seq`

`Seq` is lazy — Seq does as little work as necessary to respond to any method call.

Efficient chaining:

```js
var seq = Immutable.Map({ a: 1, b: 1, c: 1 }).toSeq();

seq
  .flip()
  .map((key) => key.toUpperCase())
  .flip()
  .toObject();
// Map { A: 1, B: 1, C: 1 }
```

```js
Immutable.Range(1, Infinity)
  .skip(1000)
  .map((n) => -n)
  .filter((n) => n % 2 === 0)
  .take(2)
  .reduce((r, n) => r * n, 1);
// 1006008
```

#### Batching mutations

```js
var list1 = Immutable.List.of(1, 2, 3);
var list2 = list1.withMutations(function (list) {
  list.push(4).push(5).push(6);
});
assert(list1.size === 3);
assert(list2.size === 6);
```

### Records

Records are immutable. Records inherit all Immutable.Map functions such as `set`, `setIn`, `merge` etc, and each of these return a new instance of the record.
They combine the benefits of ImmutableJS' `Map()` with normal JS objects. They have standard accessors (`post.name` vs `post.get('name')`)

[Using Immutable.js Records](https://tonyhb.gitbooks.io/redux-without-profanity/content/using_immutablejs_records.html)

```js
import { Record, Map } from 'immutable';

export const Post = new Record({
    id: undefined,
    title: '',
    content: '',
    author: undefined
    comments: new Map()
});
```

```js
const post = new Post({ title: 'foo', content: 'misc' });
const edited = post.set('title', 'bar');
```

```js
const data = new Map({
  somePost: new Post({ title: 'some post' }),
});

console.log(data.getIn(['somePost', 'title'])); // === 'some post';
```

#### Extend an immutable **record** to e.g. create read-only properties:

```js
class StateRecord extends Record({
  names: List([]),
  isLoading: false,
}) {
  get is_empty() {
    return StateRecord.names.size === 0;
  }
}
```

### `.withMutations()` only works with **setters**, not getters.

```js
const newMap = map.withMutations(
	mutable_map => mutable_map.set('a', 1).set('b', 2);
);
```

### Redux

Have a function to to create `immutableReducers` and custom `combineImmutableReducers` util function and custom `createStore`.

## Currying and partial function application

- [Javascript- Currying VS Partial Application](https://towardsdatascience.com/javascript-currying-vs-partial-application-4db5b2442be8)

## Referential transparency

Point 1 in [this article](https://techaffinity.com/blog/functional-programming-in-javascript-part1/) explains **referential transparency**.

## Idempotence

Point 2 in [this article](https://techaffinity.com/blog/functional-programming-in-javascript-part1/) explains **idempotence**.
