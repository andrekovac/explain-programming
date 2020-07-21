---
title: 'Git'
description: 'Notes from a git workshop'
date: '2015-12-07T02:30:00.169Z'
author: 'André Kovac'
category: 'tool'
tags: ['git']
draft: true
---

# Git Workshop

## Merge

Merge new feature branch into master branch.

```bash
git checkout master
git merge new-feature
git branch -d new-feature
```

## Rebase

1. You work on a new feature.
2. In the meantime the master branch has changed.

		git checkout new_feature

3. Move new_feature to state of current master.

		git rebase master

4. There's a conflict in file `foo.txt`

		git status

	`foo.txt` will contain something like that:

		"<<<<<<< File1
		This is a wonderful story
		=== File2
		This is a great story
		>>>>>>>"

	Resolve conflict, stage the file and continue rebasing

		git add foo.txt
		git rebase --continue

5. If there are no conflicts or all conflicts could be resolved, make a fast-forward merge.

		git checkout master
		git merge new_feature

6. Delete mergen feature branch

		git branch -d new_feature

Option `-d` only deletes if branch was fully merged. `-D` deletes unmerged branches.

## Pull with --rebase

Rebase local data first and then fast-forward merge

1. You're working on feature-branch-1
1. Check whether there are changes on the server

		git fetch

2. Pull changes by rebasing

		git pull —-rebase

3. Solve merge conflicts, stage files and continue rebase + merge


## Tidy up your commit-history

Remove the last four commits [link](http://gitready.com/advanced/2009/02/10/squashing-commits-with-rebase.html)

```bash
git rebase -i HEAD~4
git add
git rebase --continue
```

## Working with commits
- `git add .` or `git add -A` adds all untracked and modified files to the next commit
-  `git commit -m "<COMMIT MESSAGE>"` performs a commit with the given _COMMIT MESSAGE_
-  `git commit -m "<COMMIT MESSAGE FIRST LINE>" -m "<COMMIT MESSAGE SECOND LINE>"` performs a commit with the given _COMMIT MESSAGE FIRST LINE_ and _COMMENT MESSAGE SECOND LINE_ as a second paragraph
-  `git commit -a -m "<COMMIT MESSAGE>"` adds all __modified__ files and performs a commit with the given _COMMIT MESSAGE_
- `git checkout <COMMIT ID>` Your repository is back on the state from the given <COMMIT ID>
- `git log` shows the history of all commits
- `git log --oneline` only shows the commit ids and messages
- `git log -n <AMOUNT>` shows the last <AMOUNT> logs

When writing your commit messages, use the imperative and add the JIRA task id if available first.

Every user story has its own branch, the subtasks are added wit their id to the commit message.

### Pushing your commits to the repository
1. Make your commit.
2. `git fetch` fetches all changes in the remote repository
3. `git pull` fetches all changes and merges them into your local repository
	1. If there is a merge conflict, you have to solve the conflict manually
	2. All lines after HEAD are your local parts

## Working on different branches

- `git branch` shows all __local__ branches, current branch is highlighted
- `git branch -a` shows all local __and__ remote branches
- `git branch <BRANCHNAME>` creates a new branch with the name _BRANCHNAME_
- `git checkout <BRANCHNAME>` switch to branch _BRANCHNAME_
- `git checkout -b <BRANCHNAME>` creates a new branch with the name _BRANCHNAME_ and performs a checkout
- `git push origin <NAME OF BRANCH>` or `git push` pushes from origin (default local name) to _NAME OF BRANCH_

## Working with the interactive console

- `h` `j` `k` `l` to move inside the console
- `Esc`-key leaves the insert mode
- `:q` quit the console without saving
- `:wq` save (=write) and quit the console

## different commands

- `git status` shows the current local status
- `git remote -v` shows the URL of the linked remote repository