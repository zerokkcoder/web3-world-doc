import Image from 'next/image';

## 1. 部署 Nginx

在 Kubernetes 集群中部署一个 Nginx：
```
kubectl create deployment nginx --image=nginx
kubectl expose deployment nginx --port=80 --type=NodePort
kubectl get pod, svc
```
访问地址：http://NodeIP:Port

查看：
```

kubectl get deploy(ment)
kubectl get pod(s)
kubectl get service(s)
kubectl --help
```

删除控制器：`kubectl delete deployment nginx`

删除 Pod：`kubectl delete pod nginx-6799fc88d8-zc48d(pod名字)`

## 2. 部署 Tomcat

在 Kubernetes 集群中部署一个 Tomcat：
```
kubectl create deployment tomcat --image=tomcat
kubectl expose deployment tomcat --port=8080 --type=NodePort
```
访问地址：http://NodeIP:Port

