---
title: 'Docker Basic'
date: '2019-08-01T17:52:03.284Z'
description: 'A basic example of how to create a DockerFile'
category: 'tool'
tags: ['docker', 'dev-ops', 'basic']
---

## Example: Run apache container

To run a basic php app with apache:

1. Create a simple Dockerfile which pulls the [tutum/apache-php image](https://hub.docker.com/r/tutum/apache-php/)

	```Dockerfile
	FROM tutum/apache-php
	RUN rm -fr /app
	ADD . /app
	```

2. Build

	```bash
	docker build -t my-name/my-app .
	```

3. Run

	```bash
	docker run -p 4545:80 my-name/my-app
	```
