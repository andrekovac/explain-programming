---
title: 'Docker'
description: 'Many useful commands about docker'
date: '2019-08-01'
updated: '2022-09-08'
author: 'André Kovac'
category: 'tool'
tags: ['docker', 'dev-ops']
draft: true
---

## Overview

Unlike virtual machines, containers do not have the overhead of a full operating system and hence enable more efficient usage of the underlying system and resources.

Images (the Filesystem and configuration of our application) are used to create containers (created using Docker images and run the actual application)

[experiences of using docker](http://jdlm.info/articles/2016/03/06/lessons-building-node-app-docker.html)

### Logs

```
docker logs <NAME_OF_CONTAINER>
```

## Continuous Integration with Docker

- [Continuous Integration and Delivery with Docker](https://circleci.com/docs/docker/)
- [Ruby on Rails Continuous Integration with Jenkins and Docker Compose](https://medium.com/@WoloxEngineering/ruby-on-rails-continuous-integration-with-jenkins-and-docker-compose-8dfd24c3df57#.k08xx5glt)
- [Continuous Integration and Delivery with Docker](https://blog.codeship.com/continuous-integration-and-delivery-with-docker/)
- [Node With Docker - Continuous Integration and Delivery](http://mherman.org/blog/2015/03/06/node-with-docker-continuous-integration-and-delivery/#.V1GdQhR96Rt)

## Links

- [Docker installation mac](https://docs.docker.com/v1.8/installation/mac/)
- [Docker starter tutorial](https://scotch.io/tutorials/getting-started-with-docker)
- [Docker explained](https://www.digitalocean.com/community/tutorials/docker-explained-using-dockerfiles-to-automate-building-of-images)
- [Docker via homebrew](http://penandpants.com/2014/03/09/docker-via-homebrew/)

## [Docker Tutorial](https://docs.docker.com/mac/)

I am currently at [step 3](https://docs.docker.com/mac/step_three/) in the docker tutorial.

## Docker on OSX - live updates

In your `docker-compose.yml` file, make sure to expose the source-code folder, i.e. it has to be a `volume`:

```yaml
volumes:
	- .:/app
```

Running `$ docker-osx-dev` after starting `Docker Quickstart Terminal` is not necessary in OSX. Files are synced as long as `volumes` is set in `docker-compose`.

## Debugging

#### PHP

In a `php` project show debug messages:

In `docker/settings/php/php.ini` change the line `display_errors = Off` to `display_errors = On`

A fix could be: `chmod -R 777 storage && chmod -R 777 bootstrap`

## Docker tipps from Felix (Freelancer)

- Regularly check online for new base image releases and change the tag in your `Dockerfile`s
- Rerun `docker build --no-cache -t my_image $(git rev-parse HEAD)`
- Don't use tag `latest` - it will **not** use the publicly available `latest`!
- Change user in Dockerfile to root: `USER root`
- `www-data` is the default user running `nginx` and `php`.

## Logs

Send logs to `stdout`, see [this Dockerfile](https://github.com/docker-library/php/blob/f016f5dc420e7d360f7381eb014ac6697e247e11/7.0/fpm/Dockerfile#L107) for an example:

i.e. in `php-fpm.conf`

```
error_log = /proc/self/fd/2
access.log = /proc/self/fd/2
```

## OLD

### Docker virtual machine

This is not necessary anymore. Docker Desktop will start 

### Start default docker vm

    $ docker-machine ls
    $ docker-machine start default

### Creating new VM

1.  Show running machines and create new with name `docker-default`

        $ docker-machine ls
        $ docker-machine create --driver virtualbox docker-default

2.  Connect your shell to the default machine.

    Just run application `Docker Quickstart Terminal`. This opens a browser with running docker.

    Alternative:

        $ eval "$(docker-machine env default)"

### Docker for Mac (beta)

[Solution for driver failed programming external connectivity on endpoint](https://github.com/docker/compose/issues/3277): Don't let a docker container expose to itself to a port on which a service is already running locally.

- TODO: Disable all locally running stuff, e.g. Apache, mySQL, postgres etc. so that they don't block the default port.
- Instead use docker for everything!

  - e.g. run an nginx webserver:

        $ docker run -d -p 80:80 --name webserver nginx

- Docker for Mac can run alongside the former docker