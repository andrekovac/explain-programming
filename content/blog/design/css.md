---
title: 'CSS'
description: 'Some CSS commands I found worth to remember'
date: '2016-01-08T12:26:00.000Z'
author: 'André Kovac'
category: 'tool'
tags: ['design', 'css']
draft: true
---

## CSS

Compute a value with `calc`:

```css
height: calc(100% - 60px);
```

[Summary of some important basic CSS commands](./css_commands.pdf)

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

#### Flexbox + media queries

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

#### Intro

[A Complete Guide to Flexbox](https://css-tricks.com/snippets/css/a-guide-to-flexbox/)

flexible alignment of items in container

```css
.item {
	flex: 0 1 auto;
	flex-direction: row;
}
```

## `em` vs. `rem` (Root EM)

> An EM is a unit of typography, equal to the currently specified point-size

* Default browser font size is 16px, i.e. `html { font-size: 100% } /* This means 16px by default*/`
* So using `font-size: 62.5%` reduces default to 10px which is much easier to scale.

[REM vs EM – The Great Debate](https://zellwk.com/blog/rem-vs-em/)

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
* `margin` and `padding` can also use `em`.

## SASS / SCSS

- CSS has difficulties to nest `&:hover` and `::after`
- Problems with `&:active`. Doesn’t seem to work —> `:active` is generally deprecated!
- Functions are so called `@mixins`

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

## CSS Modules

???


## CSS Next

???


## Compass

???