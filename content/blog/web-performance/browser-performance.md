---
title: 'Browser Performance'
description: 'How to improve the performance in the browser'
date: '2016-11-30T00:00:00.000Z'
author: 'André Kovac'
category: 'theory'
tags: []
draft: false
ready: true
published: false
---

## Wix Workshop

>File with own code from workshop is in folder `repo_from_presenter/`

Workshop by [Noam](https://github.com/noamr) @WIX

## Rendering Performance

![pixel pipeline](pixel-pipeline.jpg)

See [this google article](https://developers.google.com/web/fundamentals/performance/rendering/) about browser rendering.

## CSS rendering Pipeline

The following happens in succession

0. Request animation frame

1. Calculate **Style** - `recalculate style`

	* DOM
	* CSS
	* State: e.g. media queries, hover state

	`getComputedStyle`

2. Layout

	* Content (dynamically changing)
	* Rules (CSS rules, glue dynamic content and viewport together) e.g. changing margin
	* Viewport (`vw`)

	make every element into renderable absolute components (define the geometry of the page)

3. Composite (happens in GPU)

	* Cut out part of painting into moving blocks (paper cutouts)
	* Actively plan and allocate block of memory --> to avoid OUT OF MEMORY issues - much harder to deal with later. Don't just leave everything to the garbage collector.
	* `CSS 3D Transform` as a trick to use composition

3. Paint (CPU/GPU)

	Graphic elements to pixels on screen.

	**Rasterization**: Take SVGs, Text, Images --> Transform it into pixels for [LCD drivers](https://en.wikipedia.org/wiki/Display_driver).


- Some more to read [in this article](https://www.html5rocks.com/en/tutorials/speed/high-performance-animations/).
- [An article](https://www.smashingmagazine.com/2016/12/gpu-animation-doing-it-right/) which explains composition (GPUs job)

### How does style rendering work in React Native?

#### React Native Animations

When trying to set `useNativeDriver: true` for an Animated value which is used to change a CSS layout property, React Native gives the following error:

> Style property 'width' is not supported by native animated module

- Why is that?

	**TODO**: Investigate better!

	The RN style engine probably works similar to how CSS is processed in a browser.

	Changes in the `width` property trigger layout operations which are expensive, wheres a `transform` does not. `transform` is an example of a **composite property** which is computed in the **GPU** - at least that’s how it works in the browser - I have to read more about how it’s computed in native iOS and Android.

	Well, given this, I guess React Native only allows composite CSS properties to be sent to the native (iOS and Android) drivers to be performed by the GPU. I have to read up on this.

	See  for more information on how browsers render CSS.

##### Possible improvement

- Set `width: 1` and use a **transform** (with `translateX`) to achieve the same result.

## GPU	(Graphic accelerator)

* OpenGL (WebGL) (Use GPU to your liking, but uses JS main thread). Use it for sofisticated animations
* Allows for concurrency

**Style**, **Layout rendering** of DOM is all in main thread.

- Layout changes are costly.

Alternatives to main thread:

* **Compositing**
* [Worker thread](https://developer.mozilla.org/en-US/docs/Web/API/Web_Workers_API/Using_web_workers)
* Animations run on different thread
* Scrolling on different process on Safari mobile

[IPC](https://en.wikipedia.org/wiki/Inter-process_communication) between web & UI/Compositor


>Macbook pro is your enemy	(because it's faster than the average PC)

## How to test Browser Speed?

* **Testing** speed: *High-speed camera* are only reliable thing because speed testers slow down speed themselves (used by Nokia).
* **Debugging** speed: Use Chrome Dev Tools Timeline


## Tricks

[Some tips written here](https://github.com/noamr/mwgworkshop).

0. Prominent Color

	Show color as placeholder, i.e.

	```html
	<div
		style={{
			backgroundColor: '#12e1f4',
			transform: ...send to correct location
		}}
	>
	</div>
	```

1. Layered Viewport Management

	Have several layers stacked on top of each other, they each get out of opacity whenever their content is loaded (analyze [onLoad](http://www.w3schools.com/jsref/event_onload.asp) callback on `<img />`). Use `opacity` and not `width` to show element, because that does not change display of DOM element.

2. Direct Compositing

	* Compositing with atomic elements, like colored rectangles (divs) with [will-change](https://developer.mozilla.org/en-US/docs/Web/CSS/will-change) (`image.style['will-change']: `)
	* Using `will-change` on atomic components does not cost extra memory and can be used a lot here.

3. Background image caching

	* Store data in [IndexedDB](https://developer.mozilla.org/en-US/docs/Web/API/IndexedDB_API)

4. Set the size of the page by translating the last image to bottom.

	--> So that scroll bar shows real length


## Tips

* Position relative/absolute: No side effect -> doesn't effect other DOM nodes.

* **Subpixel** text/layout (e.g. `text-font: 10.3`)

* When to use layout: If inner content of element changes. Then a transform (i.e. translation) won't help.

###### Rule of thumb:

* Change in unpredictable content/media (phone/browser-size): Use layouts (e.g. floats, flexbox etc.)
* Unpredictable motions/Change in UI: Use JS or transforms
* Wow effects: Canvas or WebGL
* Predictable animations (e.g. slide in menu bar): CSS animations

CSS Animations only do composition, don't live in the main thread.

---

**Q&A**

* So absolute positioning is best performance?

	only transforms after initial render

* How to allocate and plan memory for graphics?

	compositing, in Safari see number of layers.

* Don't read content after layout change? Example?

	some reading operations in JS e.g. reading [Element.clientTop()](https://developer.mozilla.org/en-US/docs/Web/API/Element/clientTop) and then setting `top` and doing this often is bad for performance. - Don't do it!