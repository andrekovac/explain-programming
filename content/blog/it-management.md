---
title: 'IT Management'
description: 'How to manage an IT team'
date: '2020-03-05T21:22:00.169Z'
author: 'André Kovac'
category: 'other'
tags: ['management']
draft: true
---

# How to report bugs (Issue Style Guide)

## Bugs

Please use the following format to report bugs as a JIRA issue:

1. **Summary**

   Try to use approximately 10 words. Can be the title of the issue.

1. **Location**

   Where can I find the bug? Add a link.

1. **Steps to reproduce**

   Exact steps with all necessary details to reproduce the bug. Preferably use a numbered list.

1. **Expected Results**

   Expected correct behavior: State what should be happending.

1. **Actual Results**

   Observed issue: State the problem which has to be solved.

See the [MDN bug writing guidelines](https://developer.mozilla.org/en-US/docs/Mozilla/QA/Bug_writing_guidelines) for more infos.

### Examples (taken from Museum Curator)

The following examples may not be perfect but serve as a quick demonstration.

#### Example 1:

##### Summary:

Tour should at least contain one waypoint

##### Location:

Editing tours, e.g.: [http://staging.myApp.de/#/tours/25]()

##### Steps to reproduce:

1. Create a new tour with all attributes, but without waypoints
2. Save the tour

##### Expected Results:

Show error message "A tour has to include at least one waypoint" and remain in "edit" mode

##### Actual Results:

Tour is saved without a single wayoint

---

#### Example 2 (in German):

##### Summary:

Wegbeschreibung Audio verschwindet manchmal aus UI / kann nicht mehr abgespielt werden
<span style=„color:blue“>hi</span>

##### Location:

z.B. [http://staging.myApp.de/#/tours/25]()

##### Steps to reproduce:

1. Erstelle Tour mit 2 Objekten
2. Füge je Objekt für beide Sprachen eine Audio-Wegbeschreibung hinzu (insgesamt also 4)
3. Gleich darauf: Speichere Tour
4. Lade andere Seite (z.B. Objekte)
5. Gehe zurück zur Tour
6. Versuche alle Audio-Wegbeschreibungen abzuspielen

##### Expected Results:

Lade vormals geaddete Audios und erlaube Abspielen

##### Actual Results:

Manche Audios nicht mehr vorhanden

# Workflow

_Best practices for improving our general workflow._

---

<!-- add more best practices regarding the overall workflow -->

## Change Log

For every Frontend-project we keep a change log (`CHANGELOG.md` on highest project level). The change log follows the structure of [Keep a CHANGELOG](http://keepachangelog.com/en/0.3.0), with the difference that breaking changes lead to a version bump of the minor instead of the major part. For every change or feature we implement there must be an entry in the change log as described below, this entry should be part of our code review process.

The change log file has an empty "blueprint" section at the top, which can be used to add new features until the next release:

```markdown
# <PROJECT_NAME>

<!-- blueprint for adding changes and new features -->

## [#.#.#] - next release

### Breaking Change

### Changed

### Added

<!-- old entries, sorted by version & date -->

## [X.X.X] - yyyy-mm-dd

### Breaking Change

- ...

### Changed

- ...

### Added

- ...
```

On every release, the current blueprint will be completed with the version and the date of the release and a new blueprint will be added.

Use the three section like the following:

- **Breaking Change**: A change or new feature (might also be introduced in the backend) which changes the code or the setup in a way, that an older version will not work anymore.
- **Changed**: An existing feature was improved, removed or a bug was fixed.
- **Added**: Something new was introduced to the project.

To improve the change log entries and to get a fast overview on what happended, the following annotation can be used:

- **Bug-Fix**: Prepends every bug-fix.
- **Internals**: Changes to the setup or to internal features (scripts, tools, etc.).
- **Android / iOS**: Platform specific changes.

Example:

> `- Bug-Fix: Map-related components are refactored; correct latitudes and longitudes are stored.`

New annotations should be introduced wisely.

# Example Style-Guide

# React Components

_Mostly reasonable patterns for writing our React Components_

## Table of Contents

1. [Scope](#scope)
1. Organization
   1. [Folder Structure](#folder-structure)
   1. [Component Organization](#component-organization)
   1. [Formatting Props](#formatting-props)
1. Patterns
   1. [prefer-ternary-to-sub-render](#prefer-ternary-to-sub-render)
1. Practices
   1. [Naming Handle Methods](#naming-handler-methods)
   1. [Naming Events](#naming-events)
   1. [Using PropTypes](#using-proptypes)
   1. [Naming style props](#naming-style-props)
1. Performance
   1. [Reduce Re-renders](#reduce-re-renders)

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
