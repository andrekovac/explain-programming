---
title: 'Markdown'
description: 'Interesting and rather rare or special markdown commands'
date: '2019-12-28T23:46:37.121Z'
author: 'André Kovac'
category: 'Tool'
tags: ['markdown']
---

[Tutorial](https://bitbucket.org/tutorials/markdowndemo/src/master/)

## Images

### Use images inside repo

Refer to images with respect to the location of the markdown file in your Github repo.

In this example there is a `images/` folder right next to the markdown file which references it:

```
![](images/ios_install_step01.png)
```

### Arrange/Resize images

Use `html` to *center* and *resize* images:


```md
<div align="center">
  <img src="https://my_image.png" width="520" alt="Graphpack">
</div>

```

Result:

<div align="center">
  <img src="https://user-images.githubusercontent.com/5080854/47042315-3e426c80-d18b-11e8-941e-e193a339e3ee.png" width="520" alt="Graphpack">
</div>

[The entire README of this example link](https://raw.githubusercontent.com/glennreyes/graphpack/master/README.md).

### Code frame

[https://browserframe.com/]()

### Mock screens

* Browser window mock: [Screely](https://www.screely.com/)
* Phone mocks: [mockupphone.com](https://mockuphone.com/)

Better: Use command line tool `dframe`, e.g. `dframe cat.png --frame "iPhone 7"`


## Links to internal anchors

Just one `#` for all heading sizes, **no space** between `#` and anchor name, anchor tag names must be **lowercase**, and delimited by **dashes** if multi-word.

Example:

```md
[click on this link](#my-multi-word-header)

### My Multi Word Header
```

## How to compile markdown to html in the console:

### There are two possibilities:

1. Type the following in the console:

	`md file.md > file.html`

2. Write the document in **Vim** and then type

	`backlash ( \ ) + md`

	This will transform the entire text into hmtl, i.e. add html syntax

3. That's it!