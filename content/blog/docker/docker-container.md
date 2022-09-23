---
title: 'Docker'
description: 'Many useful commands about docker'
date: '2022-09-09'
author: 'André Kovac'
category: 'tool'
tags: ['docker', 'dev-ops']
draft: true
---

## containers

| Command                             | What?                                                      |
| ----------------------------------- | ---------------------------------------------------------- |
| `ctrl + p` + `ctrl + q`             | Detach from container -> continues to run in detached mode |
| `docker attach <name of container>` | Attach back to container -> run in foreground              |

## flags

| Command | What?                                          |
| ------- | ---------------------------------------------- |
| `-it`   | enable Docker terminal - without it you cannot |
| `-d`    | start in detached mode (contains `-it` flags)  |

### Creating containers with `docker run`

| Command            | What?    |
| ------------------ | -------- |
| `\$ docker inspect | jq '.[]` | Show details like defined CMD and entrypoint of an image |

**Exit code** `0` (all good. exitet without error) or `-1` (error)

**Creates** a `new` container!

- Run command `echo "hello from alpine"` in our alpine container and then exit container.

      $ docker run alpine echo "hello from alpine"

- Run bash in alpine container without exiting (`-it` flag)

      $ docker run -it alpine /bin/sh

- Show list (history with `-a`) of running containers

      $ docker ps -a

- Run in detached mode

      $ docker run --name static-site -e AUTHOR="Andre" -d -P seqvence/static-site
      $ docker port static-site

      - `-P` makes ports from image automatically available on host (with `-p` you can configure it yourself)

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

### killing containers

If you have to use it, much went wrong! Sends `SIGKILL`!

```bash
docker kill
```

Give container time to finish processes before calling `SIGKILL`.
`SIGHUB` asks process to hang up.

```bash
docker kill
```

**⚠️ Attention**: Database won't gracefully shutdown!

### Logs

    $ docker logs <NAME_OF_CONTAINER>

## Further docker commands

Open the **interactive console** of a docker container to do stuff in there, e.g.

    $ docker exec -it
    $ docker exec -it name_of_container sh

e.g. to log into `mysql` container and then enter the database there:

    $ docker exec -it my_mysql_container_with_db
    /app#


## `ENTRYPOINT` vs. `CMD`

in Dockerfile

- `ENTRYPOINT ["/docker-entrypoint.sh"]`:

  - Is run when starting container (can't change it)
  - **Can't** be overwritten --> Can be overwritten when defined in `docker-compose.yml`!!
  - Can be disabled with `ENTRYPOINT []` in Dockerfile

* `CMD ["php-fpm"]`:

  - This command will get appended to `ENTRYPOINT` (can e.g. be a flag/flags added to `ENTRYPOINT`)
  - **Can** be overwritten by ... - commands added when running container with `docker run` - `kubernetes` script - by `docker-compose` script.
    - Since it can be overwritten, it
  - Container runs as long as `CMD` runs --> e.g. ensure that nginx does NOT run in deamon mode.

  (See this docs about [controlling startup order in Compose](https://docs.docker.com/compose/startup-order/))

### Examples

#### Example 1

Given this `Dockerfile`:

```Dockerfile:title=Dockerfile
ENTRYPOINT [ "kubectl" ]
CMD [ "--help" ]
```

Results when calling `docker run`:

- `docker run bitnami/kubectl` will run `kubectl --help` on start
- `docker run bitnami/kubectl get pods` will run `kubectl get pods` on start

#### Example 2

```Dockerfile:title=Dockerfile
FROM alpine:3.16.0
ENTRYPOINT ["echo"]
CMD ["hello docker"]
```

If you then run the container via ...

```sh
docker run echo:2.0.0 "hello from me"; ls -ll
```

... it will replace `"hello docker"` with `"hello from me"` and also run the `ls -ll` command.

**Recommendation**: If you have to run several commands: Write a script file and add it as `ENTRYPOINT`.

#### Wrong example

```Dockerfile:title=Dockerfile
FROM alpine:3.16.0

RUN apk update
RUN apk add nginx

ENTRYPOINT ["nginx", "-g", "daemon off;"]
CMD ["echo done"]
```

### Details of a `docker-entrypoint.sh` script

- `exec "$@"`: Runs the `CMD` command from the container itself and not from the script, thereby you can quit it with `ctrl + c` from within the container.

```bash
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

## Docker Names

- `--name` is comparable to pseudo DNS names system in a network.
- Used for communication between containers:
  
  ```bash
  docker run -d --network dev --name webserver nginx
  docker run -it --network dev nicolaka/netshoot ping webserver
  ```

  Here the container with **name** `webserver` gets pinged by second container.

  - **Advantage**: You don't have to use ports to have the containers talk with each other externally

