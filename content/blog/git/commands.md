---
title: 'Git'
description: 'Some difficult and useful commands and procedures for the version control system git'
date: '2016-01-07T02:30:00.169Z'
author: 'André Kovac'
category: 'tool'
tags: ['git']
ready: true
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

## Delete lines in git history

Use [BFG Repo-Cleaner](https://rtyley.github.io/bfg-repo-cleaner/).

### Steps

To replace a list of words/passwords with `***REMOVED***`, do the following:

1.  Download the `.jar` file (perhaps `bfg-1.13.0.jar`) from the homepage and place is somewhere, e.g. in the folder `~/bin/` and change its name to `bfg.jar` so that it is easier.
2.  Copy/backup your files/git repo (i.e. `.git/` folder)!!!
3.  Create a file `words.txt` with words/passwords you want to remove from all of history. One line for each word. You can delete this file right after you finished these steps.
4.  Inside the folder of the repository, i.e. inside the folder with the `.git/` folder run the following command:

    ```bash
    java -jar ~/bin/bfg.jar --replace-text words.txt .git
    ```

5.  What has happened?

    - The values of each line in `words.txt` will be replaced with the string `***REMOVED***` in your local repository.
    - A `.git.bfg-report` folder with information about the deletion is created.

6.  To do now

    - Run `git push -f` to force push your locally changed files to the remote.
    - It will prompt you to run the following command which prunes older `reflog` entries:

          	```bash
          	git reflog expire --expire=now --all && git gc --prune=now --aggressive
          	```

          	If this command is not run, the deleted information might still be available in the `reflog`.

## Random

[How to Use Github for Hosting Files](http://www.labnol.org/internet/free-file-hosting-github/29092/)

- Change remote repository of local git project folder

  ```bash
  git remote set-url origin https://github.com/USERNAME/OTHERREPOSITORY.git
  ```

- Visualize `git pull/fetch/push`:

![](./git_push_pull_graph.png)

Source: [https://stackoverflow.com/questions/1783405/how-do-i-check-out-a-remote-git-branch#answer-46057289]()
