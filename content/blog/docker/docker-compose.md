---
title: 'Docker Compose'
date: '2019-08-01T17:52:03.284Z'
description: 'docker-compose'
category: 'tool'
tags: ['docker', 'dev-ops']
draft: true
---

## `docker compose`

Docker Compose is a tool for defining and running multi-container Docker applications.

1. Define a `docker-compose.yml` file, e.g.

	```
	version: "2"

	services:
	  voting-app:
	    build: ./voting-app/.
	    volumes:
	     - ./voting-app:/app
	    ports:
	      - "5000:80"
	    links:
	      - redis
	    networks:
	      - front-tier
	      - back-tier

	  result-app:
	    build: ./result-app/.
	    volumes:
	      - ./result-app:/app
	    ports:
	      - "5001:80"
	    links:
	      - db
	    networks:
	      - front-tier
	      - back-tier

	  worker:
	    image: manomarks/worker
	    links:
	      - db
	      - redis
	    networks:
	      - back-tier

	  redis:
	    image: redis:alpine
	    ports: ["6379"]
	    networks:
	      - back-tier

	  db:
	    image: postgres:9.4
	    volumes:
	      - "db-data:/var/lib/postgresql/data"
	    networks:
	      - back-tier

	volumes:
	  db-data:

	networks:
	  front-tier:
	  back-tier:
	```

2. Launch your app. In the same directory as your `.yml` file:

		$ docker-compose up -d

`-d` run in deamon mode in background.
