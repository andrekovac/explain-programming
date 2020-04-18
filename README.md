<p align="center">
  <a href="https://quizzical-jang-fb6dca.netlify.com">
    <img alt="Explain Programming" src="./content/assets/explain-programming-logo.svg" width="80" />
  </a>
</p>
<h1 align="center">
  Explain programming
</h1>

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

3. Access the site at `http://localhost:8000/`


## TODO

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
  * [ ] Make a point cloud
    * [ ] Set up relations between categories and tags
  * [x] Make code block wide to cover entire page! -> Made it a bit wider and I like it more now.
  * [ ] Create new cards [make it more square] to display each article in the overview list

* [ ] CMS
  * [ ] Think about adding [https://forestry.io/]()
  * [ ] See whether [https://tinacms.org/]() makes sense to add an edit mode (Alternative is just editing via GitHub directly)

* [x] Add google analytics
* [x] Add impressum and privacy policy pages
* [x] Add footer with page link to impressum and privacy policy pages
* [x] Trace back creation dates of original **commands** files and add in `date` field.
* [x] Restyle inline code block

	* See [https://www.gatsbyjs.org/packages/gatsby-remark-prismjs/]()
	* See [https://using-remark.gatsbyjs.org/code-and-syntax-highlighting/#inline-code]()

* [x] Categories
* [x] Clickable tags

  * [x] Filter by tags
  * [ ] Filter by category

* [x] Logo

  * [x] Design Logo
  * [x] Add logo in README, to title, as `static/favicon.ico`

* [x] Rewrite bash fields where necessary (to show prompt)
* [x] Javascript: Include other command files
* [x] Remove description from preview
* [x] Think of how to use mdx
	See [https://www.gatsbyjs.org/packages/gatsby-plugin-mdx/#installation]()

* [x] Draft option
	See [https://github.com/wonism/gatsby-advanced-blog]()

---
<!-- AUTO-GENERATED-CONTENT:START (STARTER) -->

## Gatsby blog starter README

Kick off your project with this blog boilerplate. This starter ships with the main Gatsby configuration files you might need to get up and running blazing fast with the blazing fast app generator for React.

_Have another more specific idea? You may want to check out our vibrant collection of [official and community-created starters](https://www.gatsbyjs.org/docs/gatsby-starters/)._

## 🚀 Quick start

1.  **Create a Gatsby site.**

    Use the Gatsby CLI to create a new site, specifying the blog starter.

    ```bash
    # create a new Gatsby site using the blog starter
    gatsby new my-blog-starter https://github.com/gatsbyjs/gatsby-starter-blog
    ```

2.  **Start developing.**

    Navigate into your new site’s directory and start it up.

    ```bash
    cd my-blog-starter/
    gatsby develop
    ```

3.  **Open the source code and start editing!**

    Your site is now running at `http://localhost:8000`!

    _Note: You'll also see a second link: _`http://localhost:8000/___graphql`_. This is a tool you can use to experiment with querying your data. Learn more about using this tool in the [Gatsby tutorial](https://www.gatsbyjs.org/tutorial/part-five/#introducing-graphiql)._

    Open the `my-blog-starter` directory in your code editor of choice and edit `src/pages/index.js`. Save your changes and the browser will update in real time!

## 🧐 What's inside?

A quick look at the top-level files and directories you'll see in a Gatsby project.

    .
    ├── node_modules
    ├── src
    ├── .gitignore
    ├── .prettierrc
    ├── gatsby-browser.js
    ├── gatsby-config.js
    ├── gatsby-node.js
    ├── gatsby-ssr.js
    ├── LICENSE
    ├── package-lock.json
    ├── package.json
    └── README.md

1.  **`/node_modules`**: This directory contains all of the modules of code that your project depends on (npm packages) are automatically installed.

2.  **`/src`**: This directory will contain all of the code related to what you will see on the front-end of your site (what you see in the browser) such as your site header or a page template. `src` is a convention for “source code”.

3.  **`.gitignore`**: This file tells git which files it should not track / not maintain a version history for.

4.  **`.prettierrc`**: This is a configuration file for [Prettier](https://prettier.io/). Prettier is a tool to help keep the formatting of your code consistent.

5.  **`gatsby-browser.js`**: This file is where Gatsby expects to find any usage of the [Gatsby browser APIs](https://www.gatsbyjs.org/docs/browser-apis/) (if any). These allow customization/extension of default Gatsby settings affecting the browser.

6.  **`gatsby-config.js`**: This is the main configuration file for a Gatsby site. This is where you can specify information about your site (metadata) like the site title and description, which Gatsby plugins you’d like to include, etc. (Check out the [config docs](https://www.gatsbyjs.org/docs/gatsby-config/) for more detail).

7.  **`gatsby-node.js`**: This file is where Gatsby expects to find any usage of the [Gatsby Node APIs](https://www.gatsbyjs.org/docs/node-apis/) (if any). These allow customization/extension of default Gatsby settings affecting pieces of the site build process.

8.  **`gatsby-ssr.js`**: This file is where Gatsby expects to find any usage of the [Gatsby server-side rendering APIs](https://www.gatsbyjs.org/docs/ssr-apis/) (if any). These allow customization of default Gatsby settings affecting server-side rendering.

9.  **`LICENSE`**: Gatsby is licensed under the MIT license.

10. **`package-lock.json`** (See `package.json` below, first). This is an automatically generated file based on the exact versions of your npm dependencies that were installed for your project. **(You won’t change this file directly).**

11. **`package.json`**: A manifest file for Node.js projects, which includes things like metadata (the project’s name, author, etc). This manifest is how npm knows which packages to install for your project.

12. **`README.md`**: A text file containing useful reference information about your project.

## 🎓 Learning Gatsby

Looking for more guidance? Full documentation for Gatsby lives [on the website](https://www.gatsbyjs.org/). Here are some places to start:

- **For most developers, we recommend starting with our [in-depth tutorial for creating a site with Gatsby](https://www.gatsbyjs.org/tutorial/).** It starts with zero assumptions about your level of ability and walks through every step of the process.

- **To dive straight into code samples, head [to our documentation](https://www.gatsbyjs.org/docs/).** In particular, check out the _Guides_, _API Reference_, and _Advanced Tutorials_ sections in the sidebar.

## 💫 Deploy

[![Deploy to Netlify](https://www.netlify.com/img/deploy/button.svg)](https://app.netlify.com/start/deploy?repository=https://github.com/gatsbyjs/gatsby-starter-blog)

<!-- AUTO-GENERATED-CONTENT:END -->
