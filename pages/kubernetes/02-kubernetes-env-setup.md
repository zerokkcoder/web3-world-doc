import Image from 'next/image';

## 1. K8S 整体架构

<Image src="/kubernetes/02-kubernetes-env-setup-1.png" alt="kubernetes-env-setup-1" width={720} height={720} />

### 1.1 Master

K8S 集群控制节点，对集群进行调度管理，接受集群外用户去集群操作请求。

Master 节点 由 API Server、Scheduler、ClusterState Store(ETCD 数据库)和 Controller ManagerServer 所组成。

### 1.2 Nodes

Nodes 节点也叫 Worker 节点，包含 kubelet、kube proxy 和 Pod(COntainer Runtime)。

## 2. K8S 环境搭建方式

部署 K8S 环境(集群)主要由两种方式：

1. minikube

- minikube 可以在本地运行 K8S 的工具，minnikube 可以在个人计算机(包括 Windows、macOS和Linux PC)上运行一个单节点 K8S 集群，以便你可以试用K8S或进行日常开发工作。
- https://kubernetes.io/zh-cn/docs/tutorials/hello-minikube/

2. kind

- Kind 和 minikube 是类似的工具，让你在本地计算机上运行 K8S，此工具需要安装并配置 Docker。
- https://kind.sigs.k8s.io/

3. kubeadm

- Kubeadm 是一个 K8S 部署工具，提供 kubeadm init 和 kubeadm join 两个操作命令，可以快速部署部署一个 K8S 集群
- https://kubernetes.io/zh-cn/docs/reference/setup-tools/kubeadm/
- https://kubernetes.io/zh-cn/docs/setup/production-environment/tools/kubeadm/install-kubeadm/

4. 二进制包

- 从 Github 下载发行版的二进制包，手动部署安装每个组件，组成 K8S 集群，步骤比较繁琐，但是能让你对各个组件有更清晰的认识。

5. yum 安装

- 通过 yum 安装 K8S 的每个组件，组成 K8S 集群，不过yum源里面的K8S版本已经比较老的，所以这种方式用得也比较少了。

6. 第三方工具

- 有一些大神封装了一些工具，利用这些工具进行 K8S 环境的安装。

7. 花钱购买

- 直接购买类似阿里云这样的公有云平台K8S，一键搞定。

## 3. Kudeadm 部署 Kubernetes

Kubeadm 是官方社区退出的一个用于快速部署 K8S 集群的工具，这个工具能通过两条指令完成一个 K8S 集群的部署。

1. 创建一个 Master 节点：
```
kubeadm init
```
2. 将 Node 节点加入到 Master 集群中：
```
kubeadm join <Master 节点的IP和端口>
```

## 4. K8S 部署环境要求

1. 一台或多台机器，操作系统 CentOS 7.x-86_x64
2. 硬件配置：内存 2GB 或 2GB+，CPU 2核或2核+
3. 集群内各个机器之间能相互通信
4. 集群内各个机器可以访问外网，需要拉取镜像
5. 禁止 swap 分区

如果环境不满足要求，会报错，如下：

<Image src="/kubernetes/02-kubernetes-env-setup-2.png" alt="kubernetes-env-setup-2" width={720} height={720} />

## 5. K8S 部署环境准备

1. 关闭防火墙
```
systemctl stop firewalld
systemctl disable firewalld
```

2. 关闭 selinux
```
sed -i 's/enforcing/disable/' /etc/selinux/config #永久
setenforce 0 #临时
```

3. 关闭 swap(k8s禁止虚拟内存以提高性能)
```
sed -ri 's/.*swap.*/#&/' /etc/fstab #永久
swapoff -a #临时
```

1. 在 master 添加 hosts
```
cat >> /etc/hosts << EOF
192.168.172.131 k8smaster
192.168.172.132 k8snode
EOF
```

1. 设置网桥参数
```
cat > /etc/sysctl.d/k8s.conf << EOF
net.bridge.bridge-nf-call-ip6tables = 1
net.bridge.bridge-nf-call-iptables = 1
EOF
sysctl --system #生效
```

1. 时间同步
```
yum install ntpdate -y
ntpdate time.windows.com
```

## 6. K8S 安装具体步骤

所有服务器节点安装 Docker/kubeadm/kubelet。

Kubernetes 默认容器运行环境是 Docker，因此首先需要安装 Docker。

1. 安装 Docker

更新 Docker 的 yum 源
```
yum install wget -y
wget https://mirrors.aliyun.com/docker-ce/linux/centos/docker-ce.repo -O /etc/yum.repos.d/docker-ce.repo
```
安装指定版本的 Docker：
```
yum install docker-ce-19.03.13 -y
```
配置加速器加速下载
```
/etc/docker/daemon.json
{
    "registry-mirrors": ["Https://registry.docker-cn.com"]
}
```
然后执行：
```
systemctl enable docker.service
```
不然会提示警告。

2. 添加 K8S 的阿里云 yum 源
```
cat > /etc/yum.repos.d/kubernetes.repo << EOF
[kubernetes]
name=Kubernetes
baseurl=https://mirrors.aliyun.com/kubernetes/yun/repos/kubernetes-el7-x86_64
enabled=1
gpgcheck=0
repo_gpgcheck=0
gpgkey=https://mirrors.aliyun.com/kubernetes/yum/doc/yum-key.gpg
https://mirrors.aliyun.com/kubernetes/yum/doc/rpm-package-key.gpg
EOF
```
到时候下载 k8s 的相关组件才能找到下载源

3. 安装 kubeadm、kubelet和kubectl
```
yum install kubelet-1.19.4 kubeadm-1.19.4 kubectl-1.19.4 -y
```
然后执行：
```
systemctl enable kubelet.service
```
不然会提示警告。

查看有没有安装成功：
```
yum list installed | grep kubelet
yum list installed | grep kubeadm
yum list installed | grep kubectl
```

查看安装的版本：`kubelet --version`

Kubelet：运行在 cluster 所有节点上，负责启动 POD 和容器。

Kubeadm：用于初始化 clister 的一个工具。

Kubectl：kubectl 是 kuberbetes 命令行工具，通过 kubectl 可以部署和管理应用，查看各种资源，创建、删除和更新组件。

4. 部署 k8s Master 主节点
```
kubeadm init --apiserver-advertise-address=192.168.172.131 --image-repository registry.aliyuncs.com/google_containers --kubernetes-version v1.19.4 --service-cidr=10.96.0.0/12 --pod-network-cidr=10.244.0.0/16
```

此命令在 master 机器上执行：

执行报错：

<Image src="/kubernetes/02-kubernetes-env-setup-3.png" alt="kubernetes-env-setup-3" width={720} height={720} />

解决：重启一下centos系统，然后再次执行上面 kubeadm init 命令。

说明：

- service-cidr 的选取不能和 PodCIDR 及本机网络有重叠或者冲突，一般可以选择一个本机网络和 PodCIDR 都没有用到的私网地址段，比如 PodCIDR 使用 10.244.0.0/16，那么 service cidr 可以选择10.96.0.0/12，网络无重叠冲突即可。

接下来master机器上执行：
```
mkdir -p $HOME/.kube
sudo cp -i /etc/kubernetes/admin.conf $HOME/.kube/config
sudo chown $(id -u):$(id -g) $HOME/.kube/config

kubectl get nodes
```
接下来把 node 节点加入 Kubernetes master 中，在 node 机器上执行。

向集群添加新节点，执行在 kubeadm init 命令最后输出的 kubeadm join 命令：
```
kubeadm join 192.168.172.131:6443 --token z5nw7j.5uifpuypxz4s6sxo \
--discovery-token-ca-cert-hash sha:256:d3c990888953264e0c8eef6366573da76441d24fcddde68daa6b0f35fa1cfdd2
```

<Image src="/kubernetes/02-kubernetes-env-setup-4.png" alt="kubernetes-env-setup-4" width={720} height={720} />

5. 部署网络插件

5.1 下载 kube-flannel.yml 文件
```
wget https://raw.githubusercontent.com/coreos/flannel/master/Documention/kube-flannel.yml
```

应用 kube-flannel.yml 文件得到运行时容器
```
kubectl apply -f kube-flannel.yml
```

<Image src="/kubernetes/02-kubernetes-env-setup-5.png" alt="kubernetes-env-setup-5" width={720} height={720} />

然后查看节点状态：`kubectl get nodes`

<Image src="/kubernetes/02-kubernetes-env-setup-6.png" alt="kubernetes-env-setup-6" width={720} height={720} />

说明还没有就绪，需要等一会儿，然后节点就就绪了。

<Image src="/kubernetes/02-kubernetes-env-setup-7.png" alt="kubernetes-env-setup-7" width={720} height={720} />

至此 K8S 的环境就搭建完成了。

查看运行时容器 pod(一个 pod 里面可以运行多个 docker 容器)
```
kubectl get pods -n kube-system
```