---
title: 'Homebrew'
description: 'Homebrew is a popular package manager for OSX. This page includes some commands I used rather frequently'
date: '2016-01-07T02:30:00.169Z'
category: 'tool'
tags: []
---

## brew (command line tools)

See which packages you have:

```bash
brew list
```

See which packages are available:

```bash
brew search
```

Get more info about the node package:

```bash
brew info node
```

See which packages have updates available:

```bash
brew outdated
```

### `brew cleanup`

Dry-run of what would be deleted (really delete without `-n`):

```bash
brew cleanup -n
```

### Update

[Great overview of commands](https://www.safaribooksonline.com/blog/2014/03/18/keeping-homebrew-date/)

### Pin (prevent from upgrading)

Don't include a certain application when running `brew upgrade`:

```bash
brew pin mysql
```

Include it again:

```bash
brew unpin mysql
```

## `brew services`

`brew services start postgresql` is a wrapper for
`launchctl load ~/Library/LaunchAgents/homebrew.mxcl.postgresql.plist`

* List services which run at startup:

	```bash
	brew services list
	```

* To get instructions on how to use `brew services`:

	```bash
	brew services help
	```

## brew casks (UI applications)

Update all Homebrew Casks

```bash
brew update
brew cask list | xargs brew cask install --force
```

To install a specific app called `<MY_APP>`:

```bash
brew update
brew cask uninstall <MY_APP> && brew cask install <MY_APP>
```

## Issues

### php version

When facing this issue

```
Failed loading /usr/local/opt/php@7.0/lib/php/20151012/opcache.so: dlopen(/usr/local/opt/php@7.0/lib/php/20151012/opcache.so, 9): image not found
```

the following helped:

```bash
rm -rf /usr/local/etc/php/7.0/
brew uninstall php@7.0 && brew install php@7.0
```