---
title: 'Docker images'
description: 'Many useful commands about docker images'
date: '2022-09-09'
author: 'André Kovac'
category: 'tool'
tags: ['docker', 'dev-ops']
draft: true
---

## Layers

- An `image` is a collection of layers. All layers of all images inherited from will be added.
- It's additive. Images can never get smaller.

### Keeping images small by avoiding unnecessary layers

**Bad**

```Dockerfile:title=Dockerfile
FROM alpine
RUN apt-get update
RUN apt-get install
RUN apt-get clean
```

**Good**

```Dockerfile:title=Dockerfile
FROM alpine
RUN apt-get update && \
  apt-get install \
  apt-get clean
```

The second `Dockerfile` 

### Layer caching

- `COPY` command will never be cached.
- If possible move `COPY` command as far to bottom as possible

### Multi-stage builds

The layers of a stage won't be added to the resulting image.

```Dockerfile:title=Dockerfile
FROM openjdk:8 AS builder
WORKDIR /app
COPY . .
RUN ./gradlew build

FROM openjdk:8-jre
WORKDIR /app
COPY --from=builder /app/myapp.jar .
EXPOSE 8080
CMD ["java", "-jar", "myapp.jar"]
```

1. Build with `docker build -t java-app:1.0.0`
2. Check with `docker image ls my_java_build` that the build size with the `openjdk:8-jre` image will be much smaller than the `openjdk:8` image used in the `builder` step.


### Analyze layers with `dive`

A tool to analyze a docker image.

Especially the size image layers is of interest

```bash
dive <name of image>
```


**Notes**:

1. Even though `builder` stage has a `COPY` command in it, the entire stage will be cached when you change something in the second stage.


## Pull a docker image

    $ docker pull <name_of_image>

e.g. pull Ubuntu version 12.04

    $ docker pull ubuntu:12.04

or e.g cde-d3.js course materials

    $ docker pull nnmm/cde-doc

## images

### Work with images

`docker images`: Show all images

`docker rmi \$(docker images | grep "^<none>" | awk '{print \$3}')`: 

| Command                                           | What?                                                                                                                                  |
| ------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------- |
| `$ docker images`                                 | Show all images                                                                                                                        |
| "`docker rmi \$(docker images                     | grep "^<none>"                                                                                                                         | awk '{print \$3}')` | [Remove all untagged images](http://jimhoskins.com/2013/07/27/remove-untagged-docker-images.html)) |
| `$ docker rmi 78d3370bd990`                       | Copy **IMAGE ID** from appearing list and remove a single image                                                                        |
| `$ docker history 78d3370bd990 `                  | Show history of images                                                                                                                 |
| `$ docker inspect <image id>`                     | Show details like defined CMD and entrypoint of an image                                                                               |
| `$ docker tag some_image:3.4.5 some_image:latest` | give additional tag `latest` to image with version `3.4.5`. Image with tag `latest` will still have the same `id` as the `3.4.5` image |
| `docker history my_image`                         | view all changes made to image over time                                                                                               |

### Create own images (containers)

See [docker-basic-example file](./docker-basic-example.md)

## Docker Workflows

#### Building a complicated image

1. Create the basic of the image which takes long to run

2. Change the `FROM` field in the `Dockerfile` to the name of the new image and further `RUN` and other commands.

3. Iterate this process until you have a final working version.

## Deployment with Docker

#### How to deploy to production

###### On your local machine

1.  Build your image

        docker build my_image

2.  Create DockerHub directory if pushing for the first time.

3.  Build image with tag - Prepare for push to DockerHub

        docker build -t my_docker_hub_user/docker_hub_project_name .

4.  Push to DockerHub

        docker push myCompany/myApp

###### On the server

5. Pull the just pushed image

```
docker pull myCompany/myApp
```

1. Create a `DockerFile` (or like here a `docker-compose.yml` file:

```yml
php-nginx:
	image: myCompany/myApp
	container_name: php-nginx
	ports:
		- "80:80"
	privileged: true
```

**NOTE**: This is part of a `docker-compose.yml` file.

1.  Stop formerly running container and restart

        $ docker stop my_container
        $ docker rm my_container
        $ docker-compose build
        $ docker-compose up

    🛑 Attention: with `docker restart` the container will **not re-mount**, i.e. don't re-run mounting of configuration.

#### How to deploy to development server

###### Easy way

1.  Pull from git repo

        $ git pull my_repo_which_includes_Dockerfile

2.  Rebuild and run container with new build

        $ docker-compose build
        $ docker-compose up


## Volumes

### Anonymous volumes

An anonymous volume will guarantee that a certain subfolders (e.g. `node_modules`) will be present in your **container** folder which is bounded outside the container but you do not have to have it in your bound folder on the host machine (e.g. your laptop) at all.

Node_modules folder will be present in the container all the time even if you do not have it on the host machine in your working folder.


