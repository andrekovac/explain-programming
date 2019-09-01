---
title: 'React Native version upgrade'
date: '2019-08-21T17:58:32.169Z'
description: 'Flow of upgrading react native to a new version.'
category: 'framework'
tags: ['javascript', 'react-native', 'outdated']
---

**Note (from August 2019)**: This document is pretty outdated (first written in January 2016) and helped me a lot when React Native was still much more immature than it is now. Consider using **expo** these days which provides a much easier React Native workflow.

## React native version upgrade

1.  Check release notes for breaking changes

2.  Check updates with `ncu` (`npm-check-updates`). Check `react` dependency of `react-native`

        $ ncu

3.  Update dependencies in `package.json` (including the react native version)

        $ ncu -u

    or `-a`, `--upgradeAll`

        $ ncu -a

4.  Reinstall `nodes_modules\` to

        $ rm -rf node_modules/
        $ npm install

5.  Use npm `postinstall` script to copy and overwrite changed files into `node_modules` (this is a fix for adapting external modules)

        $ npm run postinstall

    which is equivalent to

        $ cp -f -R scripts/hotfix/* ./ | true

6.  Upgrade react-native with APP-IDENTIFIER `de.myCompanyName.myAppName`

    This builds all the template files again as `react-native init` does and compares the files where changes have occured.

        $ react-native upgrade --package "<APP-IDENTIFIER>"

    - `Overwrite <FILENAME>?` --- say `yes` to all

7.  Fix conflicts by checking the `git diff`

    - In `WebStorm` press `cmd + d` to see the `git diff`

    - Common changes:
      _ in *iOS*: remove the default Launchscreen
      _ in *Android*: variable for app identifier because of fastlane

8.  Check xcode project:

    in `general --> linked frameworks`
    in `build phases --> link binary with libraries`

    make sure it shows the `house` 🏠. If not, remove and add again.
