---
title: 'bash script examples'
date: '2014-09-03T17:52:03.284Z'
description: 'Some nice examples of bash scripts to learn from'
category: 'shell'
tags: ['bash']
draft: true
---

First create a folder on the external hard drive and store the content from the folder there.

## Retrieving the **Garageband** guitar lessons from the external hard-drive

1. Type in the following in the folder */Library/Application Support/GarageBand*

    ```bash
    sudo ln -s /Volumes/Mac\ stuff/GarageBand\ Lessons/Learn\ to\ Play/ Learn\ to\ Play
    ```

    This creates a symbolic link

2. Type in the following in the folder */Library/Application Support*

    ```bash
    sudo ln -s /Volumes/Mac\ stuff/GarageBand\ Library\ Stuff/GarageBand
    ```