---
title: 'HockeyApp'
description: 'HockeyApp commands'
date: '2015-11-26T00:00:00.000Z'
author: 'André Kovac'
category: 'tool'
tags: ['mobile', 'outdated']
draft: true
---

# How to create a HockeyApp App iOS

## Apple Developer Member Center

In the Certificates section

* New APP ID
	* Add an ID Description `My App`
	* As bundle identifier choose `de.my_url.my_app`

* Create Distribution `Provisioning Profile` - Ad Hoc
	* Choose `Ad Hoc` for sharing a beta verison with some users or `In-House` for an Enterprise release
	* Choose just created app id
	* Choose certificate.
		* If it doesn't exist create one. But ask team-members for the certificate signing request `CertificateSigningRequest.certSigningRequest`. It's easiest if the entire account uses the same one.
		* There should be two certificates in total. One for development and one for production.
	* Choose devices


## XCode

### Download the provisioning profile

* Go to XCode -> Preferences -> Accounts in the top menu bar
* Choose your Apple ID -> Choose your Team
* Click on `View Details...` and download the newly created Provisioning Profile.

### Create Archive

* Choose the right target in the top left
* Click on **Product -> Archive** in the top menu bar to create the archive file.
* Go to **Window -> Organizer** (should open automatically
	* Choose **Export** -> Save for AdHocDev or Enterprise -> Creates `.ipa` file and saves in a folder on Desktop.

## (Simple) HockeyApp For Mac

If you deploy a new version of an existing app:

* Create Archive (see above)
* Open HockeyApp
* Select Archive
* Add description and upload
* DONE!

## Device

Go to `rink.hockeyapp.net` and use the app.


# New device

* Register the device
* Create a new/Update provisioning profile
* Build again