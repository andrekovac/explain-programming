---
title: 'Final Cut Pro X - OSX editing software'
description: 'How to for the video editing software Final Cut Pro X FCPX'
date: '2020-03-15T20:41:00.000Z'
author: 'André Kovac'
category: 'other'
tags: []
draft: true
---

## Useful shortcuts

| Shortcut | What? |
|---|---|
| `e` | append clip |
| `shift + b` | split speed |
| `shift + h` | freeze frame |


## Useful settings

| Shortcut | What? |
|---|---|
| `s` | skimming |
| `n` ? **TODO**: Check this! | clip while skimming |


## Sync Audio + Video

### Synchronizing single clips - audio and video

1. Copy all the tags of the video clip
1. Mark both clips

	Easiest if ...

2. Right click + `Synchronize clips…`
3. When finished, select clip and open `inspector` ![inspector](./images/inspector.png)
4. Choose `audio` to work on audio effects
5. In `Channel configuration` deselect Storyline audio.

##### If speaker was targeting on of the two mic channels

6. Connected Channel: Change `Stereo` to `Dual Mono`
7. Choose the mono channel which was used in this case

##### Synchronizing several clips at once

* Do upper procedure several times
* Mark several clips and change sound channels and other stuff in a batch

##### Other things to do

- perhaps do with all the clips with the `synchronized` tag

8. Change `creation date` to date of original video
9. Add collections from original video

## Audio enhancement

#### Enhance human voices / a dialog

* At `音量和声相` in `声相模式` choose `对白` (Dialoge), play clip from preview and move dot to best position.
* At `音频增强`
	1. Choose `人声增强`
	2. Hit right arrow to analyze sound and choose the upper one if it is green after analysis. Don't choose the middle one.