---
title: 'Charles'
description: 'Proxy server tool Charles - What it can be used for and how to use it.'
date: '2016-08-23T17:58:32.169Z'
category: 'tool'
tags: ['dev-ops']
---

Use the tool [Charles](https://www.charlesproxy.com/) as a proxy for internet connections.

* Charles default port: `8888`

## Stuff to do with Charles

* Fix issues on a server without changing server files

	by editing files locally and using local version of that file temporarily

* Send concurrent requests

	Right click --> `Repeat Advanced...`

* Use it as a proxy for mobile device

	On your mobile: Set intermediate proxy to `<Your PC url>:8888`. Then all traffic will be routed through the proxy

* Intercept/Change requests and send them

## How to's

* Intercept and change a request/response

	1. Enable breakpoints (via `Proxy/Enable Breakpoints`)
	2. [Add a breakpoint](https://www.charlesproxy.com/documentation/proxying/breakpoints/) in the `Proxy/Breakpoint Settings...` menu.

* AWS S3 buckets

	* Go to `Proxy/SSL Proxy Settings`.
	* Make sure `Enable SSL Proxying` is ticked
	* Add `s3.dualstack.eu-central-1.amazonaws.com` as Location

* iOS Simulator

	go to `Help/SSL Proxying/Install Charles Root Certificate in iOS Simulator`

* Android Simulator

	* Genymotion - [see this Stackoverflow article](http://stackoverflow.com/questions/19280987/ssl-proxy-with-genymotion-and-charles)