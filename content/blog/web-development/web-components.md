---
title: 'Web Components'
description: 'Components for the web - not tied to any framework'
date: '2021-04-20'
author: 'André Kovac'
category: 'tool'
tags: ['development']
draft: true
---

## Definition

- What are **Web Components**?

  **Web Components** use the vanilla JavaScript API of modern browsers to build components without the use of any framework by **defining custom HTML elements**, i.e.

  ```html
  <icon-button>This is an icon button</icon-button>
  ```

- What is the [shadow dom](https://developer.mozilla.org/en-US/docs/Web/Web_Components/Using_shadow_DOM)?

  - Encapsulation.

- Serialization

  - [Serialize shadow DOM for use in javascript disabled user agents](https://github.com/WICG/webcomponents/issues/788)
  -

## Libraries to build web-components

- Svelte
- Atomico
  - supports CSS-in-JS
  - can use React ESLint config
- Haunted
  - Also needs [Lit Element](https://lit-element.polymer-project.org/)
- Stenciljs
  - Decorator syntax
- Neverland
  - has it own solution called "hyperHTML", which is a slim version of Lit Element


## Links

- [Web component best practices](https://developers.google.com/web/fundamentals/web-components/best-practices)
