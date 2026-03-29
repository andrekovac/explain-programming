---
title: 'Gitlab'
description: 'All about Gitlab'
date: '2023-08-14'
author: 'André Kovac'
category: 'tool'
tags: ['git', 'gitlab']
draft: true
---

## Access Gitlab via SSH

### Set up multiple Gitlab accounts

Follow this article: https://medium.com/uncaught-exception/setting-up-multiple-gitlab-accounts-82b70e88c437

### Issue: `fatal: Could not read from remote repository.`

```sh
remote: ========================================================================
remote:
remote: ERROR: The project you were looking for could not be found or you don't have permission to view it.

remote:
remote: ========================================================================
remote:
fatal: Could not read from remote repository.

Please make sure you have the correct access rights
and the repository exists.
```

**Solution**: Make sure **only one SSH identity** is loaded into your ssh-agent.

[This guide](https://stackoverflow.com/a/73572251/3210677) 

1. Start `ssh-agent`:

    ```sh
    eval `ssh-agent -s`
    ```
2. Remove all identities 

    ```sh
    ssh-add -D
    ```

    Alternatively remove a specific identity

    ```sh
    ssh-add -d ~/.ssh/sshkeynamewithout.pub
    ```

3. List all available identities:

    ssh-add -l
