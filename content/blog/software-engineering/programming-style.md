---
title: 'Programming Styles and best practices'
description: 'Notes on different coding styles, guidelines and best practices one may define'
date: '2020-12-19'
author: 'André Kovac'
category: 'other'
tags: ['programming-language']
draft: false
ready: true
---

My personal coding guidelines and principles.

## React

### Ordering of imports

- Separate between external, internal and local imports

### Naming of types

## Cases

Variable naming conventions:

- kebab-case (Barbecue skewer - Schaschlick Spieß)
- CamelCase (two humps)
- dromedaryCase (one hump)
- snake_case

## Naming things

> Nothing is more intention-revealing than well-named functions.

Taken from [here](https://medium.com/trabe/using-switch-true-in-javascript-986e8ad8ae4f).


## Example Coding Style-Guide

# React Components

_Mostly reasonable patterns for writing our React Components_

## Table of Contents

+ [React Components](#react-components)
  + [Table of Contents](#table-of-contents)
  + [Scope](#scope)
  + [Folder Structure](#folder-structure)
  + [Component Organization](#component-organization)
  + [Formatting Props](#formatting-props)
  + [Prefer Ternary to Sub-render](#prefer-ternary-to-sub-render)
  + [Naming Handler Methods](#naming-handler-methods)
  + [Naming Events](#naming-events)
  + [Using PropTypes](#using-proptypes)
    + [General](#general)
    + [Default Props](#default-props)
  + [Naming style props](#naming-style-props)
  + [Reduce Re-renders](#reduce-re-renders)

---

## Scope

This is how we ideally write our React components.

**[⬆ back to top](#table-of-contents)**

---

## Folder Structure

```
ComponentName/
|
|- index.js ________________________ # Component Class
|- styles.js _______________________ # styles for the Component
|
|- components/______________________ # Sub-Components only used by this Component
|  |- SubComponentName _____________ # App Structure
|  |- ...
|- ...
```

## Component Organization

Put a comment above every component class to document what it is used for.

```javascript
import React, { PropTypes, Component } from 'react';

/**
 * Component renders the avatar and the name of a user
 */
export default class Person extends Component {
  static propTypes = {};

  static defaultProps = {};

  // omit if not initialzation steps need to be done
  constructor(props, context) {
    super(props, context);
  }

  // if there's an initial state, put it here and not in the constructor
  state = {
    anything: false,
  };

  componentWillMount() {}

  componentDidMount() {}

  componentWillReceiveProps() {}

  shouldComponentUpdate() {}

  componentWillUpdate() {}

  componentDidUpdate() {}

  componentWillUnmount() {}

  render() {}
}
```

**[⬆ back to top](#table-of-contents)**

## Formatting Props

Wrap props on newlines for exactly 2 or more.

```html
// bad
<Person firstName="Michael" />

// good
<Person firstName="Michael" />
```

```html
// bad
<Person
  firstName="Michael"
  lastName="Chan"
  occupation="Designer"
  favoriteFood="Drunken Noodles"
/>

// good
<Person
  firstName="Michael"
  lastName="Chan"
  occupation="Designer"
  favoriteFood="Drunken Noodles"
/>
```

**[⬆ back to top](#table-of-contents)**

---

## Prefer Ternary to Sub-render

Keep logic inside the `render` function.

```javascript
// bad
renderSmilingStatement () {
  return <strong>{(this.state.isSmiling) ? " is smiling." : ""}</strong>;
},

render () {
  return <div>{this.props.name}{this.renderSmilingStatement()}</div>;
}
```

```javascript
// good
render () {
  return (
    <div>
      {this.props.name}
      {(this.state.smiling)
        ? <span>is smiling</span>
        : null
      }
    </div>
  );
}
```

**[⬆ back to top](#table-of-contents)**

---

## Naming Handler Methods

Name the handler methods after their triggering event.

```javascript
// bad
punchABadger () { /*...*/ },

render () {
  return <div onClick={this.punchABadger} />;
}
```

```javascript
// good
handleClick () { /*...*/ },

render () {
  return <div onClick={this.handleClick} />;
}
```

Handler names should:

- begin with `handle`
- end with the name of the event they handle (eg, `Click`, `Change`)
- be present-tense

If you need to disambiguate handlers, add additional information between
`handle` and the event name. For example, you can distinguish between `onChange`
handlers: `handleNameChange` and `handleAgeChange`. When you do this, ask
yourself if you should be creating a new component.

**[⬆ back to top](#table-of-contents)**

## Naming Events

Use custom event names for ownee events. Custom events always start with `on`

Event names should:

- begin with `on`
- end with the name of the event (eg, `Change`)

```javascript
class Owner extends Component {
  handleDelete() {
    // handle Ownee's onDelete event
  }

  render() {
    return <Ownee onDelete={this.handleDelete} />;
  }
}

class Ownee extends Component {
  static propTypes = {
    onDelete: PropTypes.func.isRequired,
  };
  render() {
    return <div onChange={this.props.onDelete} />;
  }
}
```

**[⬆ back to top](#table-of-contents)**

## Using PropTypes

### General

Always use PropTypes to communicate expectations and log meaningful warnings.
Put a comment above every prop to document what it is used for

```javascript
static propTypes = {
  /**
  * override the styles of the root component, mainly used for positioning/sizing
  */
  style: View.propTypes.style,
  /**
  * persons name
  */
  name: PropTypes.string.isRequired,
};
```

Also provide a corresponding defaultProp declaration for each optional prop,
even if the default is `undefined`

```js
static defaultProps = {
  style: undefined,
};
```

### Default Props

Use undefined for non-required functions if there is no alternative to `() => {}`
you'd want to set as default and check whether it exists before using it.

```javascript
// bad
static defaultProps = {
  onClick: () => {},
};
...
_handleOnClick = () => doSomething();

// good
static defaultProps = {
  onClick: undefined,
};
...
_handleOnClick = () => {
  if (onClick) doSomething();
}
```

**[⬆ back to top](#table-of-contents)**

## Naming style props

The prop of a style which overwrites/merges with the style of the root element of the component should be named `className` (React) or `style` (React Native).

```javascript
// bad
<MyComponent wrapperClassName={styles.wrapper} />

// good
<MyComponent className={styles.wrapper} />
```

## Reduce Re-renders

Move props of non-primitive types (like arrays or objects) into constants outside of the render function whenever possible to avoid unnecessary re-renders.

Example:

```js
// bad
...
<MyComponent a={{ foo: 1, bar: 2 }} b=['one', 'two'] />
...
```

```js
// good
const myComponentProps = {
  a: { foo: 1, bar: 2 },
  b: ['one', 'two'],
}
...
<MyComponent {...myComponentProps} />
...
```

Note: Primitive types don't have to be moved into separate variables:

```js
// good
<MyComponent a={1} b={'two'} c={true} />
```
