---
title: 'Accessibility'
description: 'Assistant technology and tools like screen readers to navigate the web and mobile devices'
date: '2021-04-09'
author: 'André Kovac'
category: 'tool'
tags: ['accessibility']
---

## Accessibility: Product inclusion - building for everyone

- Building for people on the disability spectrum.

## How to make things accessible?

- Screen readers
- Keyboard only
- Screen magnification
- Voice dictation
- ....

## How to make something accessible?

Check the following

derived from [Content Accessibility Guidelines](https://www.w3.org/WAI/standards-guidelines/wcag/) (Perceivable, Operable, Understandable, Robust)

1. What **is** this thing?

  - element **role** (e.g. a `Link`)
  - accessible **name** (e.g. `Contact Us`) and current **state** (e.g. `checked`/`unchecked`)
  - accessible **name** (also called **label** or **text**)

  **Example**: Screenreader reads out role (e.g. `button`)

2. What happens when I **click** this thing?

  Give context.

  **Example**:

  - Visual hint via icon exists, but screenreader won't know.

  ```js
  accessibilityHint="Opens in a new window"
  ```

3. Did clicking *the thing* meet my **expectations**?

  Help user feel `successful` so she doesn't question the quality of the app or doubt herself.


Use [Checklist](https://www.a11yproject.com/checklist/)



Explore: Drag to find content

Swipe: swipe rot or right to find content.

Smartphone

**iOS**: VoiceOver
**Android**: TalkBack

## How to test

Open **Accessibliity Inspector** via **XCode**.

## How disabled users interact with content

### Navigation

Screenreaders have functionality to first browse the page by headings.

```js
accessibilityRole="header"
```

### Hints

```js
accessibilityHint="Opens in a new window"
```

### Focus Management

- Cause of issues: Navigation between screens.
- New modal opens -> draw context awareness via focus

**Tipps**

- Shift focus to a heading.

## How to bring accessibility to organisation

- Make a screenreader Demo.
  - Highlighting importance and market value of accessibility.
  - Record video of usage of iPhone with screenreader turned on.
- Have people experience it themselves!

- Share [great article about what Gatsby learned about accessibility](https://www.gatsbyjs.com/blog/2019-07-11-user-testing-accessible-client-routing/).


## React Native

https://reactnative.dev/docs/accessibility