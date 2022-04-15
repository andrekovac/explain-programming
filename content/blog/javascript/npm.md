---
title: 'npm'
description: 'npm modules - the big repository of javascript development tools'
date: '2019-08-20T23:46:37.121Z'
author: 'André Kovac'
category: 'tool'
tags: ['javascript', 'npm', 'dev-ops']
---

## Manually adding to npm file

### Semantic versioning

* `"jQuery": "~2.0.3",` Most recent up to patch release
* `"jQuery": "^2.0.3",` Most recent up to minor release
* `"jQuery": "2.0.3",` That particular version

## npm-check-updates (`ncu`)

Show any new dependencies:

```bash
ncu
```

Update packages (Update target version + install new versions):

```bash
ncu -u
npm install
```

## Install packages as local dependencies in your project

1. `cd` to your project folder

2. Add a `package.json` configuration file for `npm` with:

	The following opens an utility that will walk you through creating a `package.json` file.

    ```bash
	npm init
    ```

	**Alternative** which fills out stuff itself 🤯:

    ```bash
	npm init -f
    ```

## Distribute npm package

See [npm-publish article](./npm-publish.md)

## Add a local folder as npm dependency

### Built dependency

**Example**: A local version of `material-ui`. Pay attention to the three `///` right after `file:`:

```json
"material-ui": "file:///Users/myName/path/to/package/location/material-ui/build",
```

### Own package

Use a relative path

```json
"my-new-package": "../my_stuff/my-new-package",
```

This is useful for testing self-developed npm packages which live in another local directory.

## Pre and Post hooks

Prepend script name with `pre` or `post`, e.g. `npm run foo` will execute `npm run prefoo` before and `npm run postfoo` right after the script.

See [this nice npm guide](https://www.keithcirkel.co.uk/how-to-use-npm-as-a-build-tool/)

Example excerpt of a `package.json` file in a blitz.js app:

```json:title=package.json
"prestart:prod": "yarn migrate",
"start:prod": "blitz start --production --hostname 0.0.0.0 --port 8080",
"migrate": "blitz db migrate deploy",
```

- `start:prod` is configured on the Digital Ocean server.
- `prestart:prod` makes sure the the migrations are executed before starting the server.

## Difference between npm and bower

[See this stackoverflow discussion](http://stackoverflow.com/questions/18641899/what-is-the-difference-between-bower-and-npm)

The biggest difference is that `npm` has a **nested dependency tree** (size heavy) while Bower requires a flat dependency tree (puts the burden of dependency resolution on the user).

> A **nested dependency tree** means that your dependencies can have its own dependencies which can have their own, and so on. This is really great on the server where you don't have to care much about space and latency. It lets you not have to care about dependency conflicts as all your dependencies use e.g. their own version of Underscore. This obviously doesn't work that well on the front-end. Imagine a site having to download three copies of jQuery.

## `npm ci`

This command deletes the `node_modules` folder every single time!

## lock-file

As of npm version `5.7.0` you can use

```bash
npm install --package-lock-only
```

It will automatically fix merge conflicts in `package-lock.json` files, however, not in `package.json` files.

## Noteworthy npm commands

| Command                                                             | Result                                                   |
| ------------------------------------------------------------------- | -------------------------------------------------------- |
| `$ npm <COMMAND> -h`                                                | show help of `<COMMAND>`                                 |
| `$ npm install <pkg> --save`<br>`$ npm i <pkg> --save`              | install and save as dependency in `package.json`         |
| `$ npm install mocha --save-dev`                                    | install development dependency                           |
| `$ NODE_ENV=production npm install`<br>`$ npm install --production` | will not install dev dependencies                        |
| `$ npm outdated`                                                    | Show outdated packages                                   |
| `$ npm outdated -g`                                                 | Show outdated global packages                            |
| `$ npm update`                                                      | Update dependencies in `package.json` to newest versions |
| `$ npm update http-server -g`                                       | update a global package                                  |
| `$ npm uninstall colors --save`                                     | uninstall and remove from `package.json`                 |
| `$ npm uninstall colors --save-dev`                                 | uninstall development dependency                         |

| Command                                            | Result                                         |
| -------------------------------------------------- | ---------------------------------------------- |
| `$ npm list -g --depth=0`<br>`npm ls -g --depth=0` | show all globally installed top level packages |

## Deleting all `node-modules` folders in directory

List all `node_modules` folders found in a directory (here current directory `.`) (it's like dry run before deletion):

```bash
find . -name "node_modules" -type d -prune -print | xargs du -chs
```

Delete all node_modules found in a Directory

```bash
find . -name 'node_modules' -type d -prune -print -exec rm -rf '{}' \;
```

See [this post](https://dev.to/trilon/how-to-delete-all-nodemodules-folders-on-your-machine-43dh) about it.