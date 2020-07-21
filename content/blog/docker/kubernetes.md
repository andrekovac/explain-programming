---
title: 'Kubernetes'
description: ''
date: '2019-08-01T17:52:03.284Z'
author: 'André Kovac'
category: 'tool'
tags: ['docker', 'dev-ops']
draft: true
---

## Workflow

### gcloud

1. Make sure you're logged in with the right user

		gcloud config list

2. Create `project` and switch to project

	Use `gcloud init` to switch users/projects.

3. Create `cluster` in GCP

### docker

1. Update own image in local docker environment

	Edit `Dockerfile` and `docker_compose.yml`

2. Build and push to DockerHub or google cloud

		docker build -t gcr.io/my-project/server-worker-cms:$(git rev-parse HEAD) .
		gcloud docker push gcr.io/my-project/server-worker-cms:4912c5f410ccc5d2170cfa12b7a1af0b6f78ed3f

3. Using images from DockerHub

	1. [Create secret with Docker config](http://kubernetes.io/docs/user-guide/images/)

			kubectl create secret docker-registry myregistrykey --docker-server=DOCKER_REGISTRY_SERVER --docker-username=DOCKER_USER --docker-password=DOCKER_PASSWORD --docker-email=DOCKER_EMAIL

		e.g. in our case

			kubectl create secret docker-registry my-company-registrykey --docker-server=https://index.docker.io/v1/ --docker-username=michael --docker-password=12345678 --docker-email=info@my-company.com

		Alternative: `--docker-server=https://hub.docker.com/`

		Check that it's there in `~/.docker/config.json`

	2. ??


### kubernetes

5. Get credentials for your cluster

		gcloud container clusters get-credentials my-project-cluster --zone europe-west1-d

	Check which cluster you're connected to by checking

 		`~/.kube/config`

3. Render `kubernetes_config.yml` file

		kubectl create -f kubernetes_config.yml

4. Edit kubernetes config file on

		kubectl apply -f kubernetes_config.yml


### Scaling - Include results from load tests

5. Do load test

	Run script

		go build main.go
		./main -host="http://myserver.com" -repeats=3 -concurreny=2 -image="blub"

	Show all pods

		kubectl get pod

	Edit the `kubernetes_config.yml` file on the server

		kubectl edit deployment pod_name

	Edit the file, hit save and observe change in script

6. Manual scaling: Ramp up number of replicas (pods) + nodes (instances)

	* Check pod processes:

			kubectl exec -it pod_name container_name bash

		Inside the pod:

			top

	Tipps:

	* Use Kubernetes horizontal autoscaling: Change number of pods
	* Scaling in instance groups: Change number of managed instances (nodes)

7. Auto scaling: Switch on `Autoscaling` in `instance groups`.


### Add more containers (if needed)

For example add a worker container from the same image but with a different command to run:

	- name: worker
        image: eu.gcr.io/rare-haiku-127113/whazatbackend-php:fe514626459d3935acfd51d8906c2d40e8b0502b
        imagePullPolicy: Always
        command:
          - "cd /var/www && php artisan queue:listen"
        volumeMounts:
        - name: "content"
          mountPath: "/var/www"
        -

## Clusters

1. Create cluster in the Google Cloud Platform (GCP) dashboard

2. Choose from different `Services`:

	spec > type: `LoadBalancer` or `NodePort`

### Load Balancer

Give `Deployment` kind a `template` to handle the entire pod lifecycle, incl. creating them and the containers within

	kubectl create -f path/to/kubernetes_config.yml
	kubectl apply path/to/kubernetes_config.yml

View current kubernetes config:

	kubectl get service
	kubectl get deployment

Do edit on the running service directly:

	kubectl edit service my_service


- local default editor `echo $EDITOR`

### NodePort

Use this type in case you need static IPs

* Add Load Balancer manually on Google Cloud Platform
* `NodePort` - Port which will be opened on the machines. Reserved for pod running that service.

#### Steps

1. `$ kubectl get service` and copy `NodePort`
2. Create Loadbalancer in GCP dashboard
3. Backend configurations: Copy the `NodePort` to field `port numbers`
	* Add health-checks which send requests to node port from internal google IPs (health check source IPs)
	* Allow access to cluster from these internal google ports by setting a new firewall rules and allow IP ranges (google's internal IPs)

			130.211.0.0/22
			tcp:<my_node_port>

		Go to `instance groups` --> copy `tag` representing all nodes in cluster.

2. Choose IP address which remains your static external IP
3. Other configurations:

	* Add rerouting/target ports e.g. when using new API `/v2/` version.


## Commands

### Jenkins workflow could be

* `myfile.yml.tmpl` --> with placeholder `$(git rev-parse HEAD)` for commit hash as container tag.
* use `sed` to replace that placeholder with current tag and rename to `myfile.yml`.

## Terms/Infos

* `context` = cluster + user
* `service` exposes sth beyond the pod
* Stuff within a pod is available at `localhost` from within the pot
* `Volumes` share content among containers in cluster. Define `volume` and then refer to it with `VolumesMount`.
* `gcloud instance groups`

	* members of an instance group are all nodes in the cluster. there you can e.g. switch on/off autoscaling
	* tag of instance groups in google cloud platform is same concept of labels in kubernetes.

## Tipps

* Create separate cluster for production
* In namespaces, define quotas on resources
* Kill a node / pod every day

## Resources to learn

- Copy-on-write: http://stackoverflow.com/a/628943/450598
- Docker Cache: http://thenewstack.io/understanding-the-docker-cache-for-faster-builds
- K8s:
    - https://www.youtube.com/watch?v=-8aUxpVrD40 (intro)
    - https://www.youtube.com/watch?v=sQ2_m22_K_0 (state of the art)
    - https://www.youtube.com/watch?v=WwBdNXt6wO4 (technical overview)