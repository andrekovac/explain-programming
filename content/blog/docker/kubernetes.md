---
title: 'Kubernetes'
description: 'Kubernetes basics'
date: '2016-07-01'
updated: '2022-09-13'
author: 'André Kovac'
category: 'tool'
tags: ['docker', 'dev-ops']
---

## How to use Kubernetes?

1. Via [google gloud console](https://console.cloud.google.com/)

   Run cluster startup script

   Change cluster version to: `--zone $ZONE --cluster-version "1.23.8-gke.1900" \`

2. Use [minikube](https://minikube.sigs.k8s.io/docs/) for a local Kubernetes cluster
   - **Pro**: you don't have to pay cloud costs.
   - **Con**: only one node
3. Via **Docker Desktop**: Enable in Configurations

## What?

Orchestrate many micro services.

## View what's happening

Run `kubectl get pods` every second:

```bash
watch -n 1 kubectl get pods
```

View **endpoints**, **pods**, **nodes** and **services**:

```bash
kubectl get endpoints,pods,nodes,svc -o wide
```

View everything:

```bash
kubectl get all
```

Get `.yaml` file + extra information of horizontal pod autoscaler:

```bash
kubectl get hpa -o yaml
```

## Container

### Kubernetes Yaml config file

```yaml
apiVersion: v1
kind: Pod
metadata:
  name: my-pod
spec:
  containers:
    - name: nginx
      image: nginxdemos/hello:0.3
      ports:
        - containerPort: 80
      resources:
        requests:
          cpu: "100m"
          memory: "100Mi"
        limits:
          cpu: "250m"
          memory: "100Mi"
```

- **CPU** measured in millicores
  - If, for instance, we want to request **0.5 of a CPU**, we should express it as `500m` — where m represents millicores.
  - In the example above, we’ve specified the container’s requested CPU as `100m` and the limit as `250m`. This means the processing power that will be reserved for the container is `100m`. Furthermore, if a process requires more than `100m`, it can access the additional CPU resources that the scheduler will ensure are available on the node — up to the `250m` limit.
- **Memory** resources are measured in bytes and can be expressed as fixed-point numbers, integers or power-of-two equivalents. We will use the most common type of expression — the power-of-two equivalent, `Mi`. This represents a `Mebibyte`, or `220 bytes`.

see [this link](https://thenewstack.io/kubernetes-requests-and-limits-demystified/) for more.

### Multi container pods

```yaml
apiVersion: v1
kind: Pod
metadata:
  name: my-multi-pod2
spec:
  containers:
    - name: container-a
      image: alpine:3.16.0
      command:
        - "/bin/sh"
      args:
        - "-c"
        - "while true; do echo $(date) > /tmp/buffer; sleep 1; done;"
      volumeMounts:
        - name: buffer
          mountPath: /tmp
    - name: container-b
      image: alpine:3.16.0
      command:
        - "/bin/sh"
      args:
        - "-c"
        - "while true; do cat /tmp/buffer; sleep 1; done;"
      volumeMounts:
        - name: buffer
          mountPath: /tmp
  volumes:
    - name: buffer
      emptyDir: {}
```

### Jump into a running container (in a pod):

```bash
kubectl exec -it pod_name -- sh

kubectl exec -it pod_name container_name -- sh
```

- Files: `ls -lisa`
- Look at processes `ps ef`

## Replica Sets and deployments

### Selectors

- Each **replica set** has to have a **selector** which defines the set of pods.
- A **label selector** matches certain labels.

### Rollout strategies

## Services

Run **nodes** which contain **pods**.

### Service types

- `ClusterIP`: Expose ports locally on `localhost`
- `NodePort`: Expose explicit external ports on nodes (on **all** node's external IP addresses - view them via `kubectl get nodes -o wide`)
- `LoadBalancer`: Add external load balancer (not managed by Kubernetes)

## Auto-Scaling

### Horizontal pod autoscaling

Scale *horizontally* (aka horizontal pod autoscaling) with pods


```yaml
apiVersion: autoscaling/v1
kind: HorizontalPodAutoscaler
metadata:
  name: my-autoscaler
spec:
  maxReplicas: 5
  minReplicas: 1
  scaleTargetRef:
    apiVersion: apps/v1
    kind: Deployment
    name: my-deployment
  targetCPUUtilizationPercentage: 5
```

- `targetCPUUtilizationPercentage` is chosen to be low (5%) so that scaling will be triggered fast.

### Vertical node auto-scaling

- Scale *vertically* with nodes (instance groups)

## Health checks

### Probes

**health-checks** run by kubernetes to test whether everything is running well.

Types of probes: **liveness** probes, **startup** probes

### Self-healing

Compare actual state to desired state -> act on differences

## Concepts

| Concept                     | What?                                                                                                                                                            |
| --------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **cluster**                 | Physical network of nodes on which services/deployments/pods etc. run                                                                                            |
| **pod**                     | smallest entity in kubernetes. Contains containers.                                                                                                              |
| **containerd**              | default container **runtime** used by docker + kubernetes                                                                                                        |
| `kubeadm`                   | create and manage kubernetes clusters                                                                                                                            |
| controller                  | generate certain states                                                                                                                                          |
| cloud controller manager    | communicates with cloud                                                                                                                                          |
| **context**                 | Manage access to a **cluster**                                                                                                                                   |
| controler management (`cm`) | Often runs in an own pod                                                                                                                                         |
| worker nodes                | On this node, workloads of own machine (nothing external) are running. worker has **pods** running.                                                              |
| **kubelet**                 | communicates with **container runtime**                                                                                                                          |
| scheduler                   | chooses best node(s) to place resources (e.g. where to run a new pod/service etc.). Can be manually circumvented with e.g. `nodeName` to specify particular node |
| **ServiceAccount**          | virtual/technical user (not real person)                                                                                                                         |
| **DaemonSet**               | Run a pod (+ copies of that pod) on all nodes. When new nodes are created, a new pod will be automatically created for that node.                                |
| **ConfigMap** + **Secret**  | Ways to store data                                                                                                                                               |

## Namespaces

`kubectl get pods --namespace webshop`

## Useful

### View spec

View **spec** of Kubernetes object (e.g. pod or deployment etc.):

```bash
kubectl get deployments.apps my-deployment -o yaml
```

## Tools

### `helm` the kubernetes package manager

- `helm` **chart**

  ```
  my-chart/
    templates/
      configmap.yaml
      deployment.yaml
      service.yaml
    Chart.yaml
    values.yaml   <-- default values file
  my-own-values.yaml
  ```

- `values.yaml`

  ```yaml
  color: cyan
  replicas: 1
  ```

- Run all kubernetes objects defined in your `helm` **chart** via
  
  ```bash
  helm install my-release-defaults ./my-chart
  ```

### Prometheus

### Grafana