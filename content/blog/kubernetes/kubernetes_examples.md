---
title: 'Kubernetes config file examples'
description: 'Commented examples of kubernetes config files'
date: '2022-09-14'
updated: '2022-09-29'
author: 'André Kovac'
category: 'tool'
tags: ['docker', 'dev-ops']
--- 

## Pod + ConfigMap + Service

Run a website with a green background

Run the following pod, config map and service and check that it's running:

```bash
kubectl create -f pod.yaml
kubectl get pods,svc
```

```yaml:title=pod.yaml
apiVersion: v1 # fixate kubernetes API version
kind: Pod # define a pod
metadata:
  name: green
  labels:
    app: green # give pod label with key 'app' and value 'green'
spec:
  containers:
    - name: nginx # add one container named 'nginx'
      image: nginx:1.21.6
      volumeMounts:
        - name: html
          mountPath: /usr/share/nginx/html # place contents of volume in this path in the running container
  volumes:
    - name: html
      configMap:
        name: green
        items: # map config map: instead of filename `body`, `index.html` will be used.
          - key: body
            path: index.html
---
apiVersion: v1
kind: ConfigMap # define key-value pair to be used as data file
metadata:
  name: green
data:
  body: <body style="background-color:green;"></body>
---
apiVersion: v1
kind: Service # define service which exposes running container on port 80
metadata:
  name: green
spec:
  selector:
    app: green
  ports:
    - port: 80
```

## Jobs

### Job

```yaml
apiVersion: batch/v1
kind: Job
metadata:
  name: my-job
spec:
  completions: 10 # Run 10 times
  parallelism: 5 # Run 5 in parallel
  template:
    spec:
      containers:
        - name: alpine
          image: alpine:3.16.0
          command: ["sleep"]
          args: ["10"] # job takes 10 seconds.
      restartPolicy: Never
```

### Cron Job

Run action repeatedly. For each run of cron job a new pod starts and old ones get deleted (dependening on `successfulJobsHistoryLimit` value)

```yaml
apiVersion: batch/v1
kind: CronJob
metadata:
  name: my-cronjob
spec:
  schedule: "*/1 * * * *" # Runs every minute
  jobTemplate:
    spec:
      template:
        spec:
          containers:
            - name: alpine
              image: alpine:3.16.0
              command: ["/bin/sh"]
              args: ["-c", "date"]
          restartPolicy: OnFailure
  successfulJobsHistoryLimit: 2 # after completion, keep two jobs so that their logs may be observed
```

1. Run `watch -n 1 kubectl get cronjobs,pods` to watch changes 
2. Run `kubectl create -f cronjob.yaml` to start the cronjob.

  You'll see something like this:
  
  ![part of kubectl get pods output](./images/cron-job.png)

3. Cleanup via `kubectl delete cronjob my-cronjob` (or `kubectl delete cronjob --all`)

### Simple deployment

#### Run deployment and scale

1. Run kubernetes via `minikube` and start a watcher via `watch -n 1 kubectl get pods` in a terminal window.

2. Create deployment

  ```bash
  kubectl create deployment host-logger --image=trimhall/my-example:latest
  ```

  Image `trimhall/my-example` is an adaptation of the `hello-world` image.

3. Expose the running app (`3000` is the internal port number)

  ```bash
  kubectl expose deployment host-logger--type=NodePort --port=3000
  ```

4. Run service in browser

  ```bash
  minikube service host-logger
  ```

  This will open up the application in your browser on an url similar to `http://192.168.49.2:31601/` with the contentas

  ```
  Hello World! this application is running on host-logger-6667d64984-ln8wl
  ```

5. Scale your app up

  ```bash
  kubectl scale deployments/host-logger --replicas=10
  ```

  And scale it down

  ```bash
  kubectl scale deployments/host-logger --replicas=5
  ```

#### Auto healing

Let's destroy a running container and see how kubernetes will self-heal by spining up a new container to establish the (declared) desired state.

1. Exec into the running `minikube` docker container (which hosts the kubernetes cluster; it's name might be similar to `gcr.io/k8s-minikube/kicbase:v0.0.34`) 
   1. Run `docker ps`
   2. Use the first 3-4 alphanumeric characters (letters or digits) of the container and run `docker exec -it <FIRST_LETTERS_OF_CONTAINER_ID> /bin/sh`   

2. The minikube container is itself running all the spun up kubernetes entities as docker containers (*inception* 😉)
   
   1. Run `docker ps | grep my-example` to see the spun up containers.
   2. Use the first few characters to kill one of the containers, e.g. `docker rm -f 8db`
   3. Observe the watcher: You'll watch live auto-healing
