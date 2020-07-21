---
title: 'CodePush AppCenter'
description: 'CodePush commands'
date: '2015-11-10T00:00:00.000Z'
author: 'André Kovac'
category: 'tool'
tags: ['mobile']
draft: true
---

[code-push docs](https://microsoft.github.io/code-push/docs/cli.html#releasing-updates-react-native)

## Recipes

1. Test some brief changes in the Proxipedia iOS `feature` build

	* Make update(s)

			code-push release-react proxipedia-ios ios --deploymentName feature --targetBinaryVersion 1.5.4 --mandatory

		 This is not necessarily needed: `--targetBinaryVersion 1.5.4`

	* Clear all updates so it doesn't persist

			code-push deployment clear proxipedia-ios feature

	* Check that releases are removed

			code-push deployment history proxipedia-ios feature

## Useful Commands

* List deployments

		code-push deployment ls bmf-ios

		code-push deployment history proxipedia-ios alpha

* Release code-push update

		code-push release-react bmf-ios ios --deploymentName release --targetBinaryVersion 1.5.1 --mandatory

* Roll back a code-push update

		code-push rollback <appName> <deploymentName>

	or roll back to specific release

		code-push rollback MyApp Production --targetRelease v3
	or clear **all** releases made for a deployment (i.e. clearing release history)

		code-push deployment clear proxipedia-ios alpha

* Clear deployments of a release

		code-push deployment clear bmf-ios release

* View all apps

		code-push app ls

* View keys of all deployments of an app

		code-push deployment ls <appName> [--displayKeys|-k]

* Login into code-push cli

		code-push login --accessKey <accessKey>

