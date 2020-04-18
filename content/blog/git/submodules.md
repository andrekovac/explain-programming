---
title: 'Git Submodules'
description: 'Useful commands concerning submodules of the popular version control system git'
date: '2019-06-07T02:30:00.169Z'
author: 'André Kovac'
category: 'tool'
tags: ['git']
---

[A great summary about git submodules](https://github.blog/2016-02-01-working-with-submodules/)

## Cloning a project which uses submodules

When freshly cloning a project which contains git submodules, run this command
before doing anything else to load the file contents of all submodules inside the project:

```bash
git submodule update --init --recursive
```

## Adding a submodule

Adds submodule `foo` into a folder `foo`.

```bash
git submodule add https://github.com/<user>/foo foo
```

## Issue with `detached state`

[This SO answer covers the topic well](https://stackoverflow.com/questions/18770545/why-is-my-git-submodule-head-detached-from-master#answer-36375256)

### tldr;

After you clone a repo which contains submodules for the first time, the submodule will not track a remote branch. You got to do it. Read the article for more information.

## Committing with submodule changes

`sourcetree` will remind you when you didn't yet commit the submodule content.

1. Commit the changes in the submnodule
2. Commit the changes in the main module which depend on the changes in the submodule by also commiting the changed hash of the submodule (`sourcetree` offers it for you)

## git submodule got out of sync

In the main repo run `git diff` to see which submodule commit is expected by the current branch of the main repo.

Among other lines you'll see something like this. Just copy the commit hash after `-Subproject` and checkout your submodule to that commit.

```git
@@ -1 +1 @@
-Subproject commit d2e3affd9bfb0bb1e8c1a6c9440356d17d174fa1
+Subproject commit 35eda0228309bdd0d7f44dd1adbdb4b4565a5010
```
