---
title: 'Firebase'
date: '2021-06-14'
author: 'André Kovac'
description: 'Google Firebase Cloud'
category: 'framework'
tags: ['cloud']
---

## Firebase hosting

1. In Firebase online console create **hosting**
2. In project root folder run `firebase init`
3. Choose preview channels in firebase console
4. Setup a script (e.g. `deploy_firebase.sh`):


  ```bash
  #!/bin/sh
  set -e
  flutter clean
  flutter build web --web-renderer canvaskit
  patch -p0 < patches/sw_fix_offline_download.patch
  firebase hosting:channel:deploy beta
  echo "Success!"
  ```

  and run it to publish new build to firebase

## Remote config
