---
title: 'ngrok'
description: 'Some information concerning the tool ngrok which you can use to create http tunnels easily'
date: '2016-08-27T12:07:32.169Z'
author: 'André Kovac'
category: 'tool'
tags: ['dev-ops']
---

## Create Tunnel

Expose `localhost:8080` to `ngrok` subdomain:

```bash
ngrok http 8080
```

Observe incoming and outgoing requests at `http://127.0.0.1:4040`

See [these ngrok npm instructions](https://www.npmjs.com/package/ngrok).

## Config

You find `ngrok` config file at `/Users/example/.ngrok2/ngrok.yml`.

## [Connect with ngrok on raspberry pi](http://www.instructables.com/id/Raspberry-Pi-online-SSH-easy-way/step3/Ngrok/)

1. Logged into the raspberry, go to [the ngrok website](https://ngrok.com/download) to download the `Linux ARM` version with `wget`, e.g.

    ```bash
	sudo wget https://dl.ngrok.com/ngrok_2.0.19_linux_arm.zip
    ```

2. Unzip it

    ```bash
	unzip ngrok_2.0.19_linux_arm.zip
    ```

3. Expose internal port 80

    ```bash
	./ngrok http 80
    ```

4. Add tcp connection for ssh

    ```bash
	./ngrok authtoken <my_auth_token>
	./ngrok tcp 22
    ```