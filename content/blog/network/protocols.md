---
title: 'Web Protocols'
date: '2016-11-18'
author: 'André Kovac'
description: 'Web protocols'
category: 'tool'
tags: ['network', 'basic']
---

- **raw TCP** - send package of data and return confirmation that it arrived.

- **raw UDP** - Real-time streaming uses UDP - it does not acknowledge that data arrived.

- **HTTP**: Example for sending messages **over** TCP, not raw TCP, i.e. sending the message in small chunks with headers and then assembling the message when it arrives.



[See this discussion which concerns raw TCP sockets vs Web sockets](http://stackoverflow.com/questions/12407778/connecting-to-tcp-socket-from-browser-using-javascript)
