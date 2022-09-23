---
title: 'Kubernetes config file examples'
description: 'Commented examples of kubernetes config files'
date: '2022-09-14'
author: 'André Kovac'
category: 'tool'
tags: ['docker', 'dev-ops']
--- 

## Pod + ConfigMap + Service

```yaml
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

![part of kubectl get pods output](./images/cron-job.png)

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
