---
title: 'Github'
description: 'Useful commands for GitHub projects'
date: '2020-03-23T12:03:00.169Z'
author: 'André Kovac'
category: 'tool'
tags: ['git']
draft: true
---

## git and GitHub

![](./git-and-github-white-bg.png)

## GitHub pages

Publish files to a `gh-pages` branch on GitHub via this tool: [gh-pages](https://github.com/tschaub/gh-pages)

-> In repository `settings` -> `Pages` just choose the branch you want to deploy.

## Continuous integration

Run CI server when a person opens a pull request.

1. Add a `.github/workflows/` folder to the root folder of your repository
2. Add yml files there, e.g. `check.yml` with the following content

	```yml
	name: Check

	on: [push]

	jobs:
	build:

		runs-on: ubuntu-18.04

		steps:
		- uses: actions/checkout@v1

		- name: install
		run: yarn install

		- name: check style
		run: yarn run check:style

		- name: check typescript
		run: yarn run check:ts
	```