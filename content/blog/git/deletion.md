---
title: 'How to delete lines from your git repository (local + remote)'
description: 'How to delete certain lines in your entire git history'
date: '2020-08-10'
author: 'André Kovac'
category: 'tool'
tags: ['git']
draft: false
ready: true
---

Oh no, you're using [git](https://git-scm.com/) and you accidentally committed things you shouldn't have (e.g. a password) to your public GitHub repository!

#### TL;DR

[Skip the intro and show me how I fix this!](#step-by-step)

Unfortunately just deleting it and pushing your new changes won't delete it from your **git history**.

##### Git keeps copies of changes

Every time you make a small change to a file a new copy of that file is created in your `.git` folder.

So if your password is part of a file which was changed 10 times, there are 10 copies of that password in git history which can for example be viewed on GitHub in case you pushed your code there.

##### Delete every single occurrence

This post shows you how to delete every single occurrence of a password (or any other word or sentence) which might be hidden in your git history, locally and in your remote repository (for example [GitHub](https://github.com/)).

> In general this entire deletion procedure should be avoided if possible. It can have unexpected results for your team-members since you are **changing the remote code** they are relying on.

## Step by step

To replace a list of words (or passwords) with the string `***REMOVED***` (or any other string you may pick), do the following:

1.  Go to [BFG Repo-Cleaner website](https://rtyley.github.io/bfg-repo-cleaner/) and hit the download button on the right. It should download a `.jar` file (called `bfg-1.13.0.jar` or similar) from the homepage.
2.  Place the `.jar` file somewhere in your file system, for example in the folder `~/bin/` (create the folder if you don't have one. You can store your personal command line scripts there) and change the filename to `bfg.jar` so that it is a shorter name. The path to your file should be `~/bin/bfg.jar`.
3.  Now copy/backup your files/git repo (in fact the `.git/` folder). - How? - I usually temporarily copy the `.git/` folder into the parent directory. Inside my project folder I run

    ```bash
    cp -r .git/ .git-backup/
    ```

4.  Create a file `words.txt` with words/passwords you want to remove from all of history. One line for each word. It might look like this if you want to delete all traces of the password `qwerty123` (btw, this password [may be cracked in 42 minutes](https://howsecureismypassword.net/)):

    ```java:title=words.text
    qwerty123
    ```

    **Note**:

    - You can later delete this `words.txt` file right after you finished all the steps.
    - You can also add sentences as lines, for example

    ```java:title=words.text
    qwerty123
    some top secret information
    ```

5.  Place the `words.txt` file inside your project folder (the same folder with the `.git/` folder).
6.  In the same folder run the following command:

    ```bash
    java -jar ~/bin/bfg.jar --replace-text words.txt .git
    ```

    **Note**: `~/bin/bfg.jar` may be different if you placed and renamed the file differently in step 2.

7.  What has happened?

    - The values of each line in `words.txt` (the words you want to delete) will be replaced with the string `***REMOVED***` in your local repository.
    - A `.git.bfg-report` folder with information about the deletion is created.

8.  Run `git push -f` to force push your locally changed files to the remote repository (you're now changing git history on your remote).
9.  After running the command in step 6 it will prompt you to run the following command which prunes (in fact deletes) older `reflog` entries:

    ```bash
    git reflog expire --expire=now --all && git gc --prune=now --aggressive
    ```

    **Notes**:

    - If this command is not run, the deleted information might still be available in the `reflog`.
    - If you never heard about `git reflog` you might have heard about `git log`. The `git reflog` command shows you a kind of history of git actions which you undertook. Given that it contains some last leftover information of your deleted data and `git gc` (git cleanup) removes these last traces.

In this post I used the tool [BFG Repo-Cleaner](https://rtyley.github.io/bfg-repo-cleaner/) here. It contains instructions on how to use it but here I try to explain every step without skipping anything.

Last but certainly not least I thank [Robert Tyley](https://github.com/rtyley) for creating the tool!
