import Image from 'next/image';

## 1. Docker 的版本

Docker 从2013年3月20日发布 Docker 0.1，到现在已经发布了多个版本，从2017年3月开始 docker 在原来的基础上分为两个分治版本：Docker CE 和 Docker EE。

Docker CE 即社区免费版，可永久免费使用。

Dokcer EE 即企业版，功能更全，更强调安全，但需付费使用。

Docker 官方网站：https://www.docker.com/

## 2. Docker 的安装

首先，我们知道Docker 并不是容器，它是一个管理容器的引擎。

推荐在 Linux 环境下使用 Docker。

Centos7 系统可以直接通过 yum 进行安装：

安装前可以查看以下系统是否已经安装了Docker：
```
yum list installed | grep docker
```

安装：`yum install docker -y`

安装后，使用 `docker --version(docker version, docker -v)` 查看docker是否安装成功。

卸载：`yum remove docker -y docker.x86_64 docker-client.x86_64 docker-common.x86_64`

## 3. Docker 服务启动

安装之后启动 Docker 服务

启动：`systemctl start docker` 或者 `service docker start`

停止：`systemctl stop docker` 或者 `service docker stop`

重启：`systemctl restart docker` 或者 `service docker restart`

检查docker进程的运行状态：`systemctl status docker` 或者 `service docker status`

查看docker 进程：`ps -ef | grep docker`

## 4. Docker 服务信息

`docker info` - 查看 docker 系统信息

`docker` 查看所有的帮助信息

`docker commond --help` 查看某个 commond 命令的帮助信息

## 5. Docker 使用初体验
### 5.1 Docker 的运行机制

我们知道 Docker 并不是容器，而只是一个管理容器的引擎。

Docker 的底层运行原理：

Docker 服务启动 -> 下载镜像 -> 启动该镜像得到一个容器 -> 容器里运行着我们想要的程序。

<Image src="/docker/02-docker-env-setup-1.png" alt="docker-env-setup-1" width={720} height={720} />

### 5.2 第一个 Docker 容器

根据 Docker 的运行机制，可以按照如下步骤运行第一个 Docker 容器。

1. 将 Docker 服务启动
2. 下载一个镜像，Docker 运行一个容器前需要本地存在有对应的镜像，如果镜像不存在本地，Docker会从镜像仓库下载(默认是 Docker Hub 公共注册服务器中的仓库：https://hub.docker.com/)。

Centos 下怎么下载(pull) 镜像？

从 docker hub 官网搜索要使用的镜像，也可以在命令行中使用命令搜索要使用的镜像，比如 `docker search tomcat` 进行搜索，然后下载所需要的镜像：

下载镜像：`docker pull tomcat`
运行镜像：`docker run tomcat`，这会在前台中运行，如果想要后台运行，添加 `-d` 参数即可，即 `docker run -d tomcat`。
显示本地已有的镜像：`docker images`

<Image src="/docker/02-docker-env-setup-2.png" alt="docker-env-setup-2" width={720} height={720} />

在列出信息中，可以看到几个字段信息

- REPOSITORY：来自于哪个仓库，比如 docker.io/tomcat
- TAG: 镜像的标记，比如 latest
- IMAGE ID： 镜像的 ID 号(唯一)
- CREATED: 创建时间
- SIZE：镜像大小

3. 启动下载下来的镜像得到一个容器：`docker run -d docker.io/tomcat` 或者 `docker run -d 41a54fe1f79d`，默认是前台启动，如果需要后台启动，指定 `-d` 参数。

通过 `ps -ef | grep tomcat` 查看，检查 tomcat 镜像是否启动容器成功。

### 5.3 进入 Docker 容器

进入容器：`docker exec -it d75325026166 bash`

其中 `i` 表示交互式，也就是保持标准输入流打开；

`t` 表示虚拟控制台，分配到一个虚拟控制台；

退出容器：`exit`

### 5.4 客户机访问容器

从客户机上访问容器，需要有端口映射，docker容器默认采用桥接模式与宿主机通信，需要将宿主机的 ip 端口映射到容器的 ip 端口上。

停止容器：`docker stop 容器ID/名称`
启动容器：`docker run -d -p 8080:8080 docker.io/tomcat`









