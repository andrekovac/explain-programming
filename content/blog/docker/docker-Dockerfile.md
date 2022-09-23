---
title: 'Dockerfile'
description: 'Many useful commands about docker'
date: '2022-09-09'
author: 'André Kovac'
category: 'tool'
tags: ['docker', 'dev-ops']
draft: true
---

## `cd` command doesn't work!

> `cd` is a special **built-in utility**, in the language of the POSIX shell specification. 

> Strictly speaking, `cd` is not a **command**. It's a **builtin**, and it can't be directly invoked. Consider using the `WORKDIR` Dockerfile directive.

[see this SO answer](https://stackoverflow.com/a/69260591/3210677)

All of the following commands won't work:

- `CMD ["cd", "my_directory"]`
- `ENTRYPOINT ["cd", "my_directory"]`
- `RUN cd app`
- `docker exec -it my_container /bin/cd`

## `ENTRYPOINT` vs. `CMD` Dockerfile directives

### Similarities

Only **one** `ENTRYPOINT` or `CMD` directive per file. The last directive will be used and overwrite the ones before

```Dockerfile:title=Dockerfile
FROM alpine:3.16.0
ENTRYPOINT ["echo"]
CMD ["hello docker ", "&&", "echo", "something else to print"]
CMD ["du sagst nix", ";", "ls -ll", "&&", "echo", "das soll geprintet werden"]
```

Here only the second `CMD` directive will be used

### Differences

- `ENTRYPOINT ["/docker-entrypoint.sh"]`:

  - Is run when starting container (can't change it)
  - **Can't** be overwritten --> Can be overwritten when defined in `docker-compose.yml`!!
  - Can be disabled with `ENTRYPOINT []` in Dockerfile

* `CMD ["php-fpm"]`:

  - `php-fpm` will get appended to the contents of the `ENTRYPOINT` directive (can e.g. be a flag/flags added to `ENTRYPOINT`)
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

```bash
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

## `HEALTHCHECK`

```Dockerfile:title=Dockerfile
HEALTHCHECK CMD curl -f http://localhost/health || exit 1
```

**Notes**:

- `curl` has to be on system
- exit with exit code `0` for *success* and exit code `1` for *unhealthy*