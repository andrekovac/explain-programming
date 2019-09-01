---
title: 'curl'
date: '2016-08-28T17:52:03.284Z'
description: 'Examples on how to use the `curl` shell command'
category: 'shell'
tags: ['bash']
---

## Examples

* Send message with authentication header:

	```bash
	curl -H "Authorization: Basic MmNiMWFjNGP4YTFkNGIwMQk0N2JiY2M4ODUxODYwNjc6NWVjNWNjNZQzYjhlNGI0YmEzMmIwZDEyZjIxYT8EYWQ=" -d grant_type=client_credentials https://accounts.spotify.com/api/token
	```



* Send a Post request:

	```bash
	curl 'http://localhost:3030/messages/' -H 'Content-Type: application/json' --data-binary '{ "text": "Hello Feathers!" }'
	```