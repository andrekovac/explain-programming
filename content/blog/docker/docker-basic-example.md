---
title: 'Docker Basic Example'
date: '2019-08-01T17:52:03.284Z'
author: 'André Kovac'
description: 'A basic example of how to create a DockerFile'
category: 'tool'
tags: ['docker', 'dev-ops', 'basic', 'copy-paste-notes']
---

## Example: Run python app

Alternative: Dockerizing a Jupyter Notebook (with [repo2docker](https://github.com/jupyterhub/repo2docker))

### Basic process:

1. Create **Dockerfile**
2. Run

	```bash
	docker build .
	```

	which creates an image based on the `Dockerfile` in `.` with context `.`.

	Alternative: With **Docker file** (`-f`) flag:

	```bash
	docker build -f /path/to/a/Dockerfile .
	```

### In Detail:

1. Create Dockerfile, e.g here an example `Dockerfile`:

	```Dockerfile:title=Dockerfile
	# our base image (a linux distribution)
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

2. Build (with **tag flag** (`-t`) to create a name for your image with a tag of the form `name:tag`)

		docker build -t andrusch/myfirstapp .

3. Run

		docker run -p 8888:5000 --name myfirstapp andrusch/myfirstapp

Here in `8888:5000`, `8888` stands for the **external port** you can use outside of the docker container (e.g. in your browser or via Insomnia/Postman) and `5000` for the **internal port** which is open in the container.

4. Visit `http://192.168.99.100:8888/`, `192.168.99.100` was found using `$ docker-machine ip docker-default`.

5. Stop and remove container when done

		$ docker stop myfirstapp
		$ docker rm myfirstapp

## Example: Run `apache` container

To run a basic php app with apache:

1. Create a simple Dockerfile which pulls the [tutum/apache-php image](https://hub.docker.com/r/tutum/apache-php/)

	```Dockerfile:title=Dockerfile
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

## Example: Run `nginx` server

1. Create `Dockerfile`

	```Dockerfile:title=Dockerfile
	FROM alpine:3.16.0
	
	RUN apk update
	RUN apk add nginx

	ENTRYPOINT ["nginx", "-g", "daemon off;"]
	```

2. Build **image**

	```bash
	docker build -t my-nginx .
	```

3. Run **container**: Creates and runs the container

	```bash
	docker run -it -p 8081:80 --name super-duper2 my-nginx
	```

4. Go to `http://localhost:8081` on you system.

	If you see the following it was a success:

	![nginx 4040 screen](./images/nginx-running-404.png)