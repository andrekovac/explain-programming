---
title: 'Fastlane'
description: 'Fastlane commands'
date: '2015-11-10T00:00:00.000Z'
author: 'André Kovac'
category: 'tool'
tags: ['mobile']
draft: true
---

## Call

#### Call lane with options

To call `fastlane <PLATFORM> <LANE> <OPTION-Key>:<OPTION-value>`:

	fastlane ios alpha flavor:bmf

or

	fastlane ios push_certs flavor:bmf environment:development

See other PROXPIPEDIA examples below.

#### Call `pem` from command-line

	pem --development --app_identifier de.artirigo.hain21.alpha --p12_password artirigo

## Basics

* When running a bash script with `sh()` the home folder is the `fastlane` folder in the project. So you have to `cd ..` to run a command in the main directory.

	e.g.

	```ruby
  	desc "Clean up after flavor testing"
	  lane :undo_flvr do
	    sh("
	      cd .. &&
	      git checkout -- ./android/app/src/main/res/*/ic_launcher.png &&
	      git checkout -- ./data/options.json
	    ")
  	end
  	```

* `lanes` in **Fastlane** are ruby blocks.

## Main structure

It's divided into **platforms** `ios` or `android` and then `lanes` which you can give names:

So to call `fastlane <PLATFORM> <LANE> <OPTION-Key>:<OPTION-value>`, e.g. `fastlane ios alpha flavor:bmf`:

```ruby
platform :ios do

  before_all do
  end

  desc "re-generate provisioning profiles"
  desc "makes sure that new devices are added"
  lane :certs do |options|
    config = load_flavor(
      flavor: options[:flavor],
      copy: false,
    )

    # certs
    match(
      app_identifier: "#{config['appIdentifier']}.debug",
      type: "development",
      force: true,
    )
    match(
      app_identifier: "#{config['appIdentifier']}",
      type: "appstore",
      force: true,
    )
  end

  ...
```

`Private lanes` are defined in the `Fastfile` and called from within `lanes`. So there's a corresponding private lane `load_flavor`:

```ruby
private_lane :load_flavor do |options|
  #
  flavor = options.key?(:flavor) ? options[:flavor] : "proxipedia"
  copy = options.key?(:copy) ? options[:copy] : true

  # load flavors
  begin
    config = apply_flavor(
      path: "flavor/",
      flavor: flavor,
      copy: copy,
    )
  rescue => ex
  end

  Actions.lane_context[PROXIPEDIA_APP_CONFIG] = config

end
```


[fastlane Tutorial: Getting Started](http://www.raywenderlich.com/116065/fastlane-tutorial-getting-started)

## Installation

See the [fastlane github repo](https://github.com/fastlane/fastlane)

	$ sudo gem install fastlane --verbose


## Other example calls of fastlane cli

Build `proxipedia` and `proxipedia viewer` for iOS and Android

```bash
fastlane ios release flavor:proxipedia-viewer publish:testflight
fastlane android release flavor:proxipedia-viewer publish:playstore-beta


fastlane ios release flavor:proxipedia publish:testflight
fastlane android release flavor:proxipedia publish:playstore-beta
```


# Proxipedia App

## Publishing for testing

	fastlane <PLATFORM> <VERSION> flavor:<FLAVOR> publish:<PUBLISH-TYPE> branch:<BRANCH>

#### Required

- `<PLATFORM>`: `ios`, `android`
- `<VERSION>`: `alpha`, `beta`, `release`
- `<FLAVOR>`: `proxipedia` for the app

#### Optional

- `<PUBLISH-TYPE>`:
	- ios: `testflight` (default) and `...`
	- android: `hockey` (default) and `playstore...` for testing
- `<BRANCH>`: `master` (default) and `develop` (only together with `testflight`)

#### Summary

| PLATFORM | VERSION  |  PUBLISH-TYPE  |  SERVER  |      BRANCH      |
| :------: | :------: | :------------: | :------: | :--------------: |
|   ios    |  alpha   |   hockeyapp    | dev-api  |     develop      |
|   ios    |  beta    |   hockeyapp    | beta-api |     develop      |
|   ios    | release  |   testflight   | beta-api | develop / master |
| android  |  alpha   |     hockey     | dev-api  |     develop      |
| android  |  beta    |     hockey     | beta-api |     develop      |
| android  | release  | playstore-beta | beta-api |      master      |
