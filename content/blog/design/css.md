---
title: 'CSS'
description: 'Some CSS commands I found worth to remember'
date: '2016-01-08'
author: 'André Kovac'
category: 'tool'
tags: ['design', 'css']
---

## How does CSS get rendered in the browser?

Read about it in the [browser-performance](../browser-performance.md) article.

## CSS

### Compute a value with `calc`:

```css
height: calc(100% - 60px);
```

[Summary of some important basic CSS commands](./css_commands.pdf)

### Important difference: `width` vs. `min-width`

According the w3c spec height refers to the height of the viewable area e.g. on a 1280x1024 pixel resolution monitor 100% height = 1024 pixels.

min-height refers to the total height of the page including content so on a page where the content is bigger than 1024px min-height:100% will stretch to include all of the content.

Taken from [here](https://stackoverflow.com/a/485872/3210677).

## CSS3

### [Transition](https://css-tricks.com/almanac/properties/t/transition/)

```css
.example {
    transition: [transition-property] [transition-duration] [transition-timing-function] [transition-delay];
}
```

### [Transform](https://css-tricks.com/almanac/properties/t/transform/)

```css
transform
```

### Animation

Browsers don't allow CSS Transition on `display` property. So the following animation is a work-around:

[Example taken from here](https://stackoverflow.com/questions/3331353/transitions-on-the-display-property#answer-9334132)

```css
@-webkit-keyframes fadeIn {
    from { opacity: 0; }
      to { opacity: 1; }
}
@keyframes fadeIn {
    from { opacity: 0; }
      to { opacity: 1; }
}
```

```css
.parent:hover .child {
    display: block;
    -webkit-animation: fadeIn 1s;
    animation: fadeIn 1s;
}
```

### Transform + Animation

```css
.one {
  transform: rotateX(40deg);
  animation: one 2s infinite;
  animation-direction: alternate;
}

@keyframes one {
  0% {
    transform: rotateX(0);
  }
  100% {
    transform: rotateX(50deg);
  }
}
```

## Media queries

#### Example

Example: With `width < 500`, only two `a` fit on screen, width `width > 500`, four `a` fit on screen.

```scss
@media (min-width: 500) {
	a {
		flex: 0 24%;
	}
}
```

#### Possible media queries

![possible_media_queries](img/possible_media_queries.png)

e.g. combine `orientation` and `min-width`

```scss
@media (orientation: portrait) and (min-width: 200px) {
	#navbar {
		width: 10%;
	}
}
```

## Centering

```css
margin: 0 auto;
```

## Flexbox

### Intro

[A Complete Guide to Flexbox](https://css-tricks.com/snippets/css/a-guide-to-flexbox/)

flexible alignment of items in container

```css
.item {
	flex: 0 1 auto;
	flex-direction: row;
}
```

### `flex-shrink`

- `flex-shrink` is the opposite of `flex-grow`, determining how much a square is allowed to shrink.
- **It only comes into play if the elements must shrink to fit into their container** — i.e. when the container is just too small.
  - Its main use is to specify which items you want to shrink, and which items you don't.

- **Use case**: Long text field overflows container.
- **Solution**: Set `flex-shrink: 1;` on an item. The item will shrink so that all elements fit into the container.

> If the size of all flex items is larger than the flex container, items shrink to fit according to flex-shrink.

from [flex-shrink docs](https://developer.mozilla.org/en-US/docs/Web/CSS/flex-shrink).

### Flexbox + media queries

Example: With `width < 500`, only two `a` fit on screen, width `width > 500`, four `a` fit on screen.

```scss
.menu-items-grid {
	display: flex;
	flex-wrap: wrap;
	flex-direction: row;

	a {
		flex: 0 46%;
		position: relative;
	}

	@media (min-width: 500) {
		a {
			flex: 0 24%;
		}
	}
}
```

## `em` vs. `rem` (Root EM)

> An EM is a unit of typography, equal to the currently specified point-size

* Default browser **font size** is 16px, i.e. `html { font-size: 100% } /* This means 16px by default*/`
* So using `font-size: 62.5%` reduces default to 10px which is much easier to scale.

	```css
	html,
	body {
		font-size: 62.5%;  /* 1em = 10px */
	}

	html {
		font-size: 1.6rem; /* =16px */
	}

	body {
		font-size: 1.4rem; /* =14px */
	}
	```

* Bad idea to set font-size in the <html> to a pixel value because it overrides the user’s browser settings!
* Next to `font-size`, `margin` and `padding` can also use `em`.

- [REM vs EM – The Great Debate](https://zellwk.com/blog/rem-vs-em/)

	- `em`: An `EM` is a unit of typography, equal to the currently specified **point-size**. In the web **point-size** equals **font-size**. And the standard `font-size` is `16px`.

		`1em` is equal to its **current** `font-size`.

		```css
		h1 {
			font-size: 2em; /* 1em = 16px */
			margin-bottom: 1em; /* 1em = 32px */
		}

		p {
			font-size: 1em; /* 1em = 16px */
			margin-bottom: 1em; /* 1em = 16px */
		}
		```

		- `font-size` in <h1> gets set to `2em`. Other properties computed with `em` in <h1> see that `1em = 32px`.

	- `rem`: **root** `em`. It is a unit of typography equal to the **root font-size**. This means `1rem` is always equal to the `font-size` defined in <html>.

## CSS Box Model

### Box Sizing: Content box (web default) vs. Border box

Given this `html`:

```html
<div class="wrapper">
  <div class="element">Element 1</div>
  <div class="element">Element 2</div>
  <div class="element">Element 3</div>
</div>
```

```css
.wrapper {
  width: 100%;
}

.element {
  box-sizing: content-box;
  display: inline-block;
  height: 150px;
  width: 33%;
  background-color: red;
}
```

If adding a border, the three elements would not fit in a row anymore. But when setting `box-sizing: border-box` they do:

```css
.element {
  box-sizing: border-box;
  display: inline-block;
  height: 150px;
  width: 33%;
  background-color: red;
  border: 5px solid grey;
}
```


`box-sizing: border-box;`

## Specificity

- `*` vs. `html`: `*` breaks the cascade.

And the trick with `inherit`:

```css
* {
  box-sizing: inherit;
}

html {
  box-sizing: border-box;
}
```

This way all styles have `border-box` by default, but still have the ability to be overridden, e.g. by some elements which come from a library.

## SASS / SCSS

- CSS has difficulties to nest `&:hover` and `::after`
- Problems with `&:active`. Doesn’t seem to work —> `:active` is generally deprecated!
- Functions are so called `@mixins`

### `&` symbol advanced usages

```css
input {
	&:read-only {
		&,
		~ label {
			background-color: ${theme.colors.grey[50]};
			pointer-events: none;
		}
	}
}
```

should compile to

```css
input:read-only, input:read-only ~ label {
	background-color: ${theme.colors.grey[50]};
	pointer-events: none;
}
```

So `&,` leads to not only the `~ label` sibling, but also the `input:read-only` itself to get the style.

Similarly, the following

```css
input, textarea {
	&:disabled {
		&,
		~ label,
		~ .icon {
			opacity: 0.45;
		}
	}
}
```

compiles to

```css
input:disabled, input:disabled ~ label, input:disabled ~ .icon,
textarea:disabled, textarea:disabled ~ label, textarea:disabled ~ .icon, {
	opacity: 0.45;
}
```

because `&,` leads to the style being applied to the element itself as well.

[This article](https://css-tricks.com/the-sass-ampersand/) explains all usages.

### Media queries (responsive design)

From SASS 3.2 on it works as you'd expect! Works "inline"!

### Partials (`@import` etc.)

```css
// _mixins.scss

@mixin for-phone-only {
    @media (max-width: 599px) { @content; }
}
...
```

```css
@import '../mixins.scss';
...

.container {
	background-color: blue;
	@include for-phone-only {
		padding: 5px;
	}
}
```

## CSS Dynamic rounded corners

```css
.feed-item {
	border-radius: max(0px, min(8px, ((100vw - 4px) - 100%) * 9999)) / 8px;
}
```

See these tweets discussing it: https://twitter.com/frankyan/status/1444786549426556933

This touches on the [fab4 in CSS](https://www.freecodecamp.org/news/the-fab-four-technique-to-create-responsive-emails-without-media-queries-baf11fdfa848/).

## CSS Modules

???


## CSS Next

???


## Compass

???

## BEM

Block, Element, Modifier

### Block

`header`

### Element

`header__icon`

### Modifier

`header--disabled`
`header__icon--disabled`

## Links

- [Pro CSS and HTML Design Patterns](http://cssdesignpatterns.com/)

	- Recommended in a StackOverflow Issue

- [Create soft border shadow objects](https://neumorphism.io/#55b9f3)
