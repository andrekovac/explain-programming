<p align="center">
  <a href="https://quizzical-jang-fb6dca.netlify.com">
    <img alt="Explain Programming" src="./content/assets/explain-programming-logo.svg" width="80" />
  </a>
</p>
<h1 align="center">
  Explain programming
</h1>

[![Netlify Status](https://api.netlify.com/api/v1/badges/f8756f7a-c9f8-4676-b0b1-828e037df0b2/deploy-status)](https://app.netlify.com/sites/quizzical-jang-fb6dca/deploys)

Currently the site is available [here](https://quizzical-jang-fb6dca.netlify.com).

## Run

1. Install dependencies

   ```bash
   yarn
   ```

2. Run development server

   ```bash
   yarn start
   ```

3. Your site is now running at `http://localhost:8000`!

   _Note: You'll also see a second link: _`http://localhost:8000/___graphql`_. This is a tool you can use to experiment with querying your data. Learn more about using this tool in the [Gatsby tutorial](https://www.gatsbyjs.org/tutorial/part-five/#introducing-graphiql)._

## Syntax for code blocks in Markdown

1. Bash

   - Use `bash` or `bash-output`.
   - This will lead to a special code-block design.

2. Title

   Set a file title with `js:title=server.js`.

3. Line highlighting

   - Use `js {3}` or `js {3-5}` to highlight one or several lines
   - Use `js {3-4,6}` to highlight different areas where **empty lines** are in-between. Note that there is no space after the comma!

## Article meta data

Each article contains the following meta data at the top:

```js
---
title: <string> The blog title
date: <string> Date at which writing of this article began, e.g. '1999-01-01'
datePublished: <string> Date at which article got published
author: <string>
description: <string> Used as preview text in list
category: <string> See available categories in `src/constants/Category.js`
tags: <Array<string>> See available tags in `src/constants/Tag.js`
draft: <boolean> Whether to display in `blog` page in __DEV__ mode
ready: <boolean> Release candidate - article ready to be released
published: <boolean> Whether article got published
---
```

## Almost ready for a blog post

Collect files which could be relatively easily be edited to become a good quality blog article

- [Javascript Custom Error and Exception](./content/blog/javascript/error.md)
- As **copy-paste-notes**: [Docker Basic Example](./content/blog/docker/docker-basic-example.md)

## TODO

- [ ] Consolidate style
  - [ ] Move styles to Chakra UI theme and define all styles there!
    - [ ] `blockquote` style from `node_modules/typography-theme-fairy-gates/dist/index.js`
    - [ ] Replace all `main ...` global styles

* [ ] Copy button in code box
* [ ] Special tags: how-to, starter - in different colors

* [ ] This is similar to what I imagine for explain-programming: https://www.taniarascia.com/

  - [ ] Copy the good parts, e.g. how she uses tags (should link to filtered page!)
  - [ ] Her use of nice icons next to article
  - [ ] Her GitHub: https://github.com/taniarascia/taniarascia.com
  - [ ] Different bash layout

* [ ] Search

      	* Look at [https://github.com/greglobinski/gatsby-starter-hero-blog]() for an example
      	* See [https://www.gatsbyjs.org/docs/adding-search/]()
      	* [ ] Search for name + description
      	* [ ] Search which includes every word in every page

* [ ] Host on my programming url
* [ ] Javascript: Write out examples instead of using screenshots
* [ ] Check _ALL_ files - whether draft or not and decide whether it looks good to be published!
* [ ] Styles: Switch to styled-components
      See [https://www.gatsbyjs.org/docs/creating-global-styles/#how-to-add-global-styles-in-gatsby-with-standard-css-files]()

* [ ] Check out gatsby example site

      	* See [https://github.com/prichey/prestonrichey.com/tree/master/src]()
      	* See [https://prestonrichey.com/blog/react-in-markdown/]()

* [ ] Design

  - [ ] Make a point cloud
    - [ ] Set up relations between categories and tags
  - [x] Make code block wide to cover entire page! -> Made it a bit wider and I like it more now.
  - [ ] Create new cards [make it more square] to display each article in the overview list

* [ ] Comments

  - [ ] Add comment section (include Discord?)

* [ ] CMS

  - [ ] Think about adding [https://forestry.io/]()
  - [ ] See whether [https://tinacms.org/]() makes sense to add an edit mode (Alternative is just editing via GitHub directly)

* [x] Add google analytics
* [x] Add impressum and privacy policy pages
* [x] Add footer with page link to impressum and privacy policy pages
* [x] Trace back creation dates of original **commands** files and add in `date` field.
* [x] Restyle inline code block

      	* See [https://www.gatsbyjs.org/packages/gatsby-remark-prismjs/]()
      	* See [https://using-remark.gatsbyjs.org/code-and-syntax-highlighting/#inline-code]()

* [x] Categories
* [x] Clickable tags

  - [x] Filter by tags
  - [ ] Filter by category

* [x] Logo

  - [x] Design Logo
  - [x] Add logo in README, to title, as `static/favicon.ico`

* [x] Rewrite bash fields where necessary (to show prompt)
* [x] Javascript: Include other command files
* [x] Remove description from preview
* [x] Think of how to use mdx
      See [https://www.gatsbyjs.org/packages/gatsby-plugin-mdx/#installation]()

* [x] Draft option
      See [https://github.com/wonism/gatsby-advanced-blog]()
