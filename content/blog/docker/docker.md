---
title: Docker
date: '2019-08-01T17:52:03.284Z'
description: ''
category: 'tool'
tags: ['docker', 'dev-ops']
draft: true
---

## Overview

Unlike virtual machines, containers do not have the overhead of a full operating system and hence enable more efficient usage of the underlying system and resources.

Images (the Filesystem and configuration of our application) are used to create containers (created using Docker images and run the actual application)

[experiences of using docker](http://jdlm.info/articles/2016/03/06/lessons-building-node-app-docker.html)

### Start default docker vm

	$ docker-machine ls
	$ docker-machine start default

## Commands

### Creating new VM

1. Show running machines and create new with name `docker-default`

		$ docker-machine ls
		$ docker-machine create --driver virtualbox docker-default

2. Connect your shell to the default machine.

	Just run application `Docker Quickstart Terminal`. This opens a browser with running docker.

	Alternative:

		$ eval "$(docker-machine env default)"

### docker run

Creates a `new` container!

* Run command `echo "hello from alpine"` in our alpine container and then exit container.

		$ docker run alpine echo "hello from alpine"

* Run bash in alpine container without exiting (`-it` flag)

		$ docker run -it alpine /bin/sh

* Show list (history with `-a`) of running containers

		$ docker ps -a

* Run in detached mode

		$ docker run --name static-site -e AUTHOR="Andre" -d -P seqvence/static-site
		$ docker port static-site

	Get **IP of docker container default**

		$ docker-machine ip default
		$ docker port static-site  // choose port at 443/tcp

	Visit `http://192.168.99.100:32768/`

	Alternative: Specify port

		$ docker run --name static-site-2 -e AUTHOR="Your Name" -d -p 8888:80 seqvence/static-site

### Stop and remove containers

	$ docker stop static-site static-site-2
	$ docker rm static-site static-site-2

[Stop and remove all containers](https://coderwall.com/p/ewk0mq/stop-remove-all-docker-containers)

	$ docker stop $(docker ps -a -q)
	$ docker rm $(docker ps -a -q)

or

	$ docker rm -f $(docker ps -a -q)

### Pull a docker image

	$ docker pull <name_of_image>

e.g. pull Ubuntu version 12.04

	$ docker pull ubuntu:12.04

or e.g cde-d3.js course materials

	$ docker pull nnmm/cde-doc



### Troubleshooting

If `docker-compose up` throws errors, some cached files might cause trouble. Run:

	docker-compose build

This runs the `Dockerfile` for sure even if stuff is cached in the case of `docker-compose up`.

### Logs

	$ docker logs <NAME_OF_CONTAINER>

## images

### Work with images

| Command                                                             | What?                                                                                              |
| ------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------- |
| `$ docker images`                                                   | Show all images                                                                                    |
| `$ docker rmi $(docker images | grep "^<none>" | awk '{print $3}')` | [Remove all untagged images](http://jimhoskins.com/2013/07/27/remove-untagged-docker-images.html)) |
| `$ docker rmi 78d3370bd990`                                         | Copy **IMAGE ID** from appearing list and remove a single image                                    |
| `$ docker history 78d3370bd990 `                                    | Show history of images                                                                             |
| `$ docker inspect <image id>`                                       | Show details like defined CMD and entrypoint of an image                                           |

### Create own images (containers)

#### Basic process:

1. Create **Dockerfile**
2. Run

	```sh
	docker build .
	```

	which creates an image based on the `Dockerfile` in `.` with context `.`.

	With file flag:

	```sh
	docker build -f /path/to/a/Dockerfile .
	```

#### In Detail:

1. Create Dockerfile, e.g here an example `Dockerfile`:

	```docker
	# our base image
	FROM alpine:latest

	# Install python and pip
	RUN apk add --update py-pip

	# install Python modules needed by the Python app
	COPY requirements.txt /usr/src/app/
	RUN pip install --no-cache-dir -r /usr/src/app/requirements.txt

	# copy files required for the app to run
	COPY app.py /usr/src/app/
	COPY templates/index.html /usr/src/app/templates/

	# tell the port number the container should expose
	EXPOSE 5000

	# run the application
	CMD ["python", "/usr/src/app/app.py"]

	```

	`WORKDIR` sets the directory from which all following commands will be exectued by default.

2. Build

		docker build -t andrusch/myfirstapp .

3. Run

		docker run -p 8888:5000 --name myfirstapp andrusch/myfirstapp

Here in `8888:5000`, `8888` stands for the **external por**t you can use in your browser and `5000` for the **internal port** which is open in the container.

4. Visit `http://192.168.99.100:8888/`, `192.168.99.100` was found using `$ docker-machine ip docker-default`.

5. Stop and remove container when done

		$ docker stop myfirstapp
		$ docker rm myfirstapp


## Further docker commands

Open the **interactive console** of a docker container to do stuff in there, e.g.

	$ docker exec -it
	$ docker exec -it name_of_container bash

e.g. to log into mysql container and then enter the database there:

	$ docker exec -it my_mysql_container_with_db
	/app#

Other commands

	$ docker build -t andrusch/curator-server


## Continuous Integration with Docker

* [Continuous Integration and Delivery with Docker](https://circleci.com/docs/docker/)
* [Ruby on Rails Continuous Integration with Jenkins and Docker Compose](https://medium.com/@WoloxEngineering/ruby-on-rails-continuous-integration-with-jenkins-and-docker-compose-8dfd24c3df57#.k08xx5glt)
* [Continuous Integration and Delivery with Docker](https://blog.codeship.com/continuous-integration-and-delivery-with-docker/)
* [Node With Docker - Continuous Integration and Delivery](http://mherman.org/blog/2015/03/06/node-with-docker-continuous-integration-and-delivery/#.V1GdQhR96Rt)


## Links

[Docker installation mac](https://docs.docker.com/v1.8/installation/mac/)

[Docker starter tutorial](https://scotch.io/tutorials/getting-started-with-docker)

[Docker explained](https://www.digitalocean.com/community/tutorials/docker-explained-using-dockerfiles-to-automate-building-of-images)

[Docker via homebrew](http://penandpants.com/2014/03/09/docker-via-homebrew/)


## [Docker Tutorial](https://docs.docker.com/mac/)

I am currently at [step 3](https://docs.docker.com/mac/step_three/) in the docker tutorial.

## Docker on OSX - live updates

In your `docker-compose.yml` file, make sure to expose the source-code folder, i.e. it has to be a `volume`:

```docker
volumes:
      - .:/app
```

Running `$ docker-osx-dev` after starting `Docker Quickstart Terminal` is not necessary in OSX. Files are synced as long as `volumes` is set in `docker-compose`.


## Docker Workflows

#### Building a complicated image

1. Create the basic of the image which takes long to run

2. Change the `FROM` field in the `Dockerfile` to the name of the new image and further `RUN` and other commands.

3. Iterate this process until you have a final working version.


## Deployment with Docker

#### How to deploy to production

###### On your local machine

1. Build your image

		docker build my_image

2. Create DockerHub directory if pushing for the first time.

3. Build image with tag - Prepare for push to DockerHub

		docker build -t my_docker_hub_user/docker_hub_project_name .

4. Push to DockerHub

		docker push artirigo/whazat

###### On the server

5. Pull the just pushed image

		docker pull artirigo/whazat

6. Upload a `DockerFile` specifically tailored for server onto server, e.g.

	    php-nginx:
		  image: artirigo/whazat
		  container_name: php-nginx
		  ports:
		    - "80:80"
		  privileged: true

7. Stop formerly running container and restart

		$ docker stop my_container
		$ docker rm my_container
		$ docker-compose build
		$ docker-compose up

#### How to deploy to development server

###### Easy way

1. Pull from git repo

		$ git pull my_repo_which_includes_Dockerfile

2. Rebuild and run container with new build

		$ docker-compose build
		$ docker-compose up

#### Live Server vs. Development `docker-compose.yml` file

your `docker-compose` file:

**Live**

```docker
services:
  my_app:
  	image: my_dockerhub_account/my_app
  	...
```

**Dev** on `localhost`

```docker
services:
  my_app:
  	build: .
  	volumes:
     - ./my-app:/app
  	...
```


## Debugging

#### PHP

In a `php` project show debug messages:

In  `docker/settings/php/php.ini` change the line `display_errors = Off` to `display_errors = On`

A fix could be: `chmod -R 777 storage && chmod -R 777 bootstrap`


# Docker for Mac (beta)

[Solution for driver failed programming external connectivity on endpoint](https://github.com/docker/compose/issues/3277): Don't let a docker container expose to itself to a port on which a service is already running locally.

* TODO: Disable all locally running stuff, e.g. Apache, mySQL, postgres etc. so that they don't block the default port.
* Instead use docker for everything!

	* e.g. run an nginx webserver:

			$ docker run -d -p 80:80 --name webserver nginx

* Docker for Mac can run alongside the former docker

## Docker tipps from Felix (Freelancer)

* Regularly check online for new base image releases and change the tag in your `Dockerfile`s
* Rerun `docker build --no-cache -t my_image $(git rev-parse HEAD)`
* Don't use tag `latest` - it will **not** use the publicly available `latest`!
* Change user in Dockerfile to root: `USER root`
* `www-data` is the default user running `nginx` and `php`.

## Logs

Send logs to `stdout`, see [this Dockerfile](https://github.com/docker-library/php/blob/f016f5dc420e7d360f7381eb014ac6697e247e11/7.0/fpm/Dockerfile#L107) for an example:

i.e. in `php-fpm.conf`

	error_log = /proc/self/fd/2
	access.log = /proc/self/fd/2

## Other commands

in Dockerfile

* `ENTRYPOINT ["/docker-entrypoint.sh"]`:

	* Is run when starting container
	* **Can't** be overwritten --> Can be overwritten when defined in `docker-compose.yml`!!
	* Can be disabled with `ENTRYPOINT []` in Dockerfile

* `CMD ["php-fpm"]`:
	* **Can** be overwritten by `kubernetes` script + by `docker-compose` script.
	* Container runs as long as `CMD` runs --> e.g. ensure that nginx does NOT run in deamon mode.


([Control startup order in Compose](https://docs.docker.com/compose/startup-order/))


## in `docker-entrypoint.sh` script

* `exec "$@"`: Runs the `CMD` command from the container itself and not from the script, thereby you can quit it with `ctrl + c` from within the container.

```sh
#!/bin/bash
set -e

if [ "$1" = 'postgres' ]; then
    chown -R postgres "$PGDATA"

    if [ -z "$(ls -A "$PGDATA")" ]; then
        gosu postgres initdb
    fi

    exec gosu postgres "$@"
fi

exec "$@"
```

see also [the docker docs](https://docs.docker.com/engine/reference/builder/)
