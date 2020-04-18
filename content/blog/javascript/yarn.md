---
title: 'yarn'
description: 'yarn - the package manager for Javascript'
date: '2017-04-04T00:00:00.000Z'
author: 'André Kovac'
category: 'tool'
tags: ['javascript', 'yarn', 'dev-ops']
---

## install

* Install newest versions of dependencies but don't change `yarn.lock` file.

	```bash
	yarn install --pure-lockfile
	```

## package upgrades

* Similar to [npm-check interactive update mode](https://yarnpkg.com/lang/en/docs/cli/upgrade-interactive/)

	```bash
	yarn upgrade-interactive
	```

e.g. for react-native updates, run

1. `react-native-git-upgrade`
2. `yarn upgrade-interactive`
