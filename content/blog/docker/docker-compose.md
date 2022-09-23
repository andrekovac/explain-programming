---
title: 'Docker Compose'
date: '2019-08-01'
updated: '2022-09-09'
author: 'André Kovac'
description: 'docker-compose example file and explanations'
category: 'tool'
tags: ['docker', 'dev-ops', 'stub']
---

## Definition

**Docker Compose** is a tool that was developed to help define and share multi-container **applications**.

- **Docker Desktop** will group running containers in tabs of different **applications** (same as folder name in which `docker-compose.yml` is located).

## resources

- [awesome-compose](https://github.com/docker/awesome-compose/tree/master/spring-postgres) collects great `docker-compose` files for common App setups.

## `docker compose` file

Docker Compose is a tool for defining and running **multi-container** Docker **applications**.

1.  Define a `docker-compose.yml` file, e.g.

    ```yml
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

1.  Launch your app. In the same directory as your `.yml` file:

	```bash
  docker-compose up -d
	```

  **New**: `compose` is now a built-in docker command

  ```bash
  docker compose up -d
  ```


## `links`

With

```yaml
links:
  - db
```

the container will wait for the db container to finish building

## `profiles`

1. Add certain containers in your `docker-compose.yml` file to a `profile`.
2. When running `docker-compose` that container will only be launched if `--profile {profile_name}` is added.


e.g. `docker-compose --profile my_profile up` will only run the container which has the following attribute:

```yml
 profiles:
      - my_profile
```


### Troubleshooting

If `docker-compose up` throws errors, some cached files might cause trouble. Run:

    docker-compose build

This runs the `Dockerfile` for sure even if stuff is cached in the case of `docker-compose up`.


#### Live Server vs. Development `docker-compose.yml` file

your `docker-compose` file:

**Live**

```yaml
services:
  my_app:
  	image: my_dockerhub_account/my_app
  	...
```

**Dev** on `localhost`

```yaml
services:
  my_app:
  	build: .
  	volumes:
     - ./my-app:/app
  	...
```