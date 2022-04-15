---
title: 'Node.js scripting'
description: 'Node.js'
date: '2016-01-07T00:00:00.169Z'
author: 'André Kovac'
category: 'framework'
tags: ['javascript', 'server']
---

## Update node

Use node version manager (`nvm`) to manage node versions:

```bash
nvm install --lts
```

Different options are discussed [here](https://stackoverflow.com/questions/34810526/how-to-properly-upgrade-node-using-nvm).

### Install stable `lts` version and set it as default

```bash
nvm install stable
nvm alias default stable
```

## Web Server

Example of a simple web server:

```js
/* Load the HTTP library */
var http = require("http");

/* Create an HTTP server to handle responses */
http.createServer(function(request, response) {
  response.writeHead(200, {"Content-Type": "text/plain"});
  response.write("Hello World");
  response.end();
}).listen(8888);
```

## [NODE_PATH](https://nodejs.org/api/modules.html#modules_loading_from_the_global_folders)


>`NODE_PATH` is like the windows path environment variable. Whenever node can't find a file, it looks through the paths in the paths stored in the NODE_PATH variable. So in this case, if you require something from the shared folder, node will know how to locate it. In windows you can't set NODE_PATH in this way, you'll have to set it before you run the node command, or use the cross-env module, which allow setting node environment variables unix style in windows:
>
>`"dev": "cross-env NODE_PATH=$NODE_PATH:./shared node --harmony .",`

>Taken from [this nice answer](https://stackoverflow.com/questions/38960108/what-does-this-mean-node-path-node-path-shared-node-harmony#answer-38960561).


## [Modules](https://nodejs.org/api/modules.html#modules_the_module_scope)

The `modules` object is local, not global.


### Examples

#### Default export

```js
// Monkey.js (export)

var React = require('react');
require('./Monkey.css');
var Color = require('./Shapes');

class Monkey extends React.Component {
	...
}

module.exports = Monkey;

// Some other file (import)
const Monkey = require('./Monkey.js');
```

#### Multiple exports: Named exports/imports

```js
// Animals.js (export)
module.exports = {
  Monkey,
  Bear
}

// Some other file (import)
const { Monkey } = require('./Animals');
const { Bear } = require('./Animals');
```

Alternative

```js
// Animals.js (export)
module.exports.Monkey = Monkey;
module.exports.Bear = Bear;

// Some other file (import)
const { Monkey } = require('./Animals');
const { Bear } = require('./Animals');
```

Examples taken from [this nice article](https://medium.com/@thejasonfile/a-simple-intro-to-javascript-imports-and-exports-389dd53c3fac) for the most part.

## Execute JS from command line

Example

```bash
node -e "console.log('My environment variables: ', process.env)"
```

## Run node.js scripts

### Call script

Use ES6 syntax with the `--harmony` flag:

```bash
node --harmony my_script.js
```

or

```bash
babel-node my_script.js
```

##### Pass arguments via npm:

In `package.json` the script is defined as such:

```json
"scripts": {
    "myScript": "node --harmony my_script.js"
},
```

When running the script, arguments can be passed with an additional ` -- `:

```bash
npm run myScript -- --name "Jonas" --hobby cycling
```

## Useful packages

* `commander`

	Creates help file and flags etc. and also parses them.

	```js
	import * as program from 'commander';

	program
	    .version('0.0.2')
	    .usage('[options] <relative-path-to-JSON-file>')
	    .description(
	        'Convert given file with sentences into a great novel.'
	    )
      .parse(process.argv);
  ...
	if (_.isEmpty(program['args'])) {
		program.help(); // this exits
   }
  ```

	Also useful: Catch errors on `process` variable `unhandledRejection`:

	```js
	process.on('unhandledRejection', function(reason: any, p: any) {
    /* tslint:disable-next-line:no-console */
    	console.error('Possibly Unhandled Rejection at: Promise ', p, ' reason: ', reason);
  });
  ```

* `minimist`

	parses arguments and flags.

  Here it parses the argument `app-name`:

	```js {3}
	const parseArgs = require('minimist');

	const argv = parseArgs(process.argv.slice(2));
	console.dir(argv);

	const appName = argv['app-name'];
	```

	Some more work with results of `parseArgs`

	```js
	if (typeof argv.flavor !== 'string') {
	  throw Error('--flavor option required');
	}

	const options = {
	  appName: argv['app-name'] || '',
	  appIdentifier: argv['app-id'] || `com.my-company.${argv.flavor}`,
	  api: {
	    token: argv['api-token'] || '',
	    host: argv['api-host'] || '',
	  },
	  codepush: {
	    ios: {},
	    android: {},
	  },
	};
	```


## Create a workplan

Example: `flavor-copy.js`

```js
const parseArgs = require('minimist');
const _ = require('lodash');
const fs = require('fs');
const fse = require('fs-extra');
const path = require('path');
const async = require('async');


// ---------------------------
// SETTINGS
// ---------------------------

const argv = parseArgs(process.argv.slice(2));
const cwd = process.cwd();

if (typeof argv.flavor !== 'string') {
  throw Error('--flavor option required');
}

const flavorDir = path.join(cwd, 'flavor', argv.flavor);
const outputDir = path.join(cwd, 'data');
const workplan = [];


// check if a flavor with that name exists
try {
  fs.statSync(flavorDir);
} catch (e) {
  throw Error(`flavor '${argv.flavor}' doesn't exists`);
}

// ---------------------------
// copy options file
// ---------------------------

workplan.push((next) => {
  fse.copy(
    path.join(flavorDir, 'options.json'),
    path.join(outputDir, 'options.json'),
    next
  );
});

// ---------------------------
// copy platform files
// ---------------------------

if (argv.platform) {
  workplan.push((next) => {
    fse.copy(
      path.join(flavorDir, argv.platform),
      path.join(cwd, argv.platform),
      next
    );
  });
}

// ---------------------------
// copy img files
// ---------------------------

workplan.push((next) => {
  fs.stat(path.join(flavorDir, 'img'), (err) => {
    if (!err) {
      fse.copy(
        path.join(flavorDir, 'img'),
        path.join(outputDir, 'img'),
        next
      );
    } else {
      next();
    }
  });
});

// ---------------------------
// merge i18n files
// ---------------------------

workplan.push((next) => {
  const i18nDir = path.join(outputDir, 'i18n');
  const flavorI18nDir = path.join(flavorDir, 'i18n');

  const mergeI18nFiles = (fileName) => {
    const src = path.join(i18nDir, fileName);
    let i18nSrc;
    let i18nFlavor;

    Promise.resolve()
      .then(() => new Promise((resolve, reject) => {
        fs.readFile(src, 'utf8', (err, data) => {
          if (err) reject(err);
          else resolve(JSON.parse(data));
        });
      }))
      .then((data) => { i18nSrc = data; })
      .then(() => new Promise((resolve, reject) => {
        fs.readFile(path.join(flavorI18nDir, fileName), 'utf8', (err, data) => {
          if (err) reject(err);
          else resolve(JSON.parse(data));
        });
      }))
      .then((data) => { i18nFlavor = data; })
      // merge contents
      .then(() => _.merge(i18nSrc, i18nFlavor))
      // save to src
      .then((data) => new Promise((resolve, reject) => {
        fs.writeFile(src, JSON.stringify(data, null, 2), 'utf-8', (err, data) => {
          if (err) reject(err);
          else resolve();
        });
      }));
  };

  fs.readdir(flavorI18nDir, (err, items) => {
    // folder exists
    if (!err) {
      //
      items.reduce(
        (sequence, fileName) => (
          sequence.then(() => mergeI18nFiles(fileName))
        ),
        Promise.resolve()
      ).then(() => next());
    } else {
      next();
    }
  });
});


// ---------------------------
// Execute the workplan
// ---------------------------
async.series(workplan, (err) => {
  if (err) {
    console.error('%s', err.stack || err.message || err.toString());
    return;
  }
  console.info('Finished copying flavor');
});
```

## Read write with (pimped) fs

Wrap inside Promise:

```js
export function promisify1<ARG1, RESULT>(
    toWrap: (a: ARG1, cb: (e: any, r: RESULT) => void) => void
): (a: ARG1) => Promise<RESULT> {
    return (a: ARG1) =>
        new Promise<RESULT>((resolve, reject) =>
            toWrap(a, (err, result) => {
                err != null ? reject(err) : resolve(result);
            })
        );
}

export function promisify2<ARG1, ARG2, RESULT>(
    toWrap: (a1: ARG1, a2: ARG2, cb: (e: any, r: RESULT) => void) => void
): (a1: ARG1, a2: ARG2) => Promise<RESULT> {
    return (a1: ARG1, a2: ARG2) =>
        new Promise<RESULT>((resolve, reject) =>
            toWrap(a1, a2, (err, result) => {
                err != null ? reject(err) : resolve(result);
            })
        );
}

export const readFile = promisify2<string, string, string>(fs.readFile);

export const writeFile = promisify2<string, string, void>(fs.writeFile as any);
```


## Commands

Print out all documents in the 'test' collection:

```js
db.collection('test').find().toArray(console.log);
```

`console.log` is callback for `find().toArray` function.