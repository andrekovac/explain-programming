---
title: 'Garage Band - OSX music software'
description: 'Handy commands for Garage Band - to create Podcasts and music'
date: '2020-05-03'
author: 'André Kovac'
category: 'other'
tags: []
draft: true
---

## Shortcuts

| Shortcut | What happens |
|---|---|
| `Command + t` | Split video at playhead position |
| `Control + Delete` | Delete section without leaving a gap |

## [How to Fade In and Fade Out Track](https://www.youtube.com/watch?v=xyYDWG3QBjc)

## Retrieve the garageband guitar lessons from the external hard drive

1. First create a folder on the external hard drive and store the content from the folder there.
2. Retrieving the GarageBand Guitar lessons from the external hard-drive
3. Type in the following in the folder */Library/Application Support/GarageBand*

	```
	sudo ln -s /Volumes/Mac\ stuff/GarageBand\ Lessons/Learn\ to\ Play/ Learn\ to\ Play
	```

This creates a symbolic link!

4. Type in the following in the folder */Library/Application Support*

	```
	sudo ln -s /Volumes/Mac\ stuff/GarageBand\ Library\ Stuff/GarageBand
	```

	Garage Band Library Stuff