---
title: 'Git'
description: 'Some difficult and useful commands and procedures for the version control system git'
date: '2016-01-07T02:30:00.169Z'
author: 'André Kovac'
category: 'tool'
tags: ['git']
ready: false
---

## Recover lost file

What happened to me: I renamed a file from `readme.md` to `README.md` and edited it, then I ran `git rm readme.md` and the file `README.md` was gone for good. I made many changes and I screamed!! [But his SO question saved me](https://stackoverflow.com/questions/11094968/in-git-how-can-i-recover-a-staged-file-that-was-reverted-prior-to-committing):

This is the magic command:

```bash
git fsck --lost-found
```

Thereafter take a sha value of a `dangling blob` entry and run `git show` to observe and save it, e.g.

```bash
git show 8f72c7d79f964b8279da93ca8c05bd685e892756 > restored_file.js
```

## Recover popped stash

With `git stash pop` the stash is gone. With `git stash apply` it remains on the stash stack.

1. Run

   Be sure `gitk` is installed. On OSX you can install it with `brew install git-gui` (not `brew install gitk`).

   ```bash
   gitk --all $( git fsck --no-reflog | awk '/dangling commit/ {print $3}' )
   ```

   1. This will open a git gui.
   2. Copy the hash of the stash.

2. Run

   ```bash
   git stash apply $stash_hash
   ```

Solution taken from [this SO answer](https://stackoverflow.com/a/91795/3210677).

## Random

[How to Use Github for Hosting Files](http://www.labnol.org/internet/free-file-hosting-github/29092/)

- Change remote repository of local git project folder

  ```bash
  git remote set-url origin https://github.com/USERNAME/OTHERREPOSITORY.git
  ```

- Visualize `git pull/fetch/push`:

![](./git_push_pull_graph.png)

Source: [https://stackoverflow.com/questions/1783405/how-do-i-check-out-a-remote-git-branch#answer-46057289]()
