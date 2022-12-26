import Image from 'next/image';

## 1. Docker 架构

Docker 使用客户端-服务器(C/S)架构模式，使用远程 API 来管理和创建 Docker 容器。

<Image src="/docker/02-docker-env-setup-1.png" alt="docker-env-setup-1" width={720} height={720} />

Docker 容器通过 Docker 镜像来创建。

镜像与容器的关系类似于面向对象编程中的类与对象的关系。

| Docker | 面向对象 |
| ------ | -------- |
| 镜像   | 类       |
| 容器   | 对象     |

## 2. Docker 核心要素

Docker 包括三个核心要素：

**镜像(Image)、容器(Container)、仓库(Repository)**

理解了这三个概念，就理解了 Docker 的整个声明周期。

Docker 的运行离不开以上几个核心组件的支持，Docker 的成功也是基于这几个组件。

有人会误以为，Docker 就是容器，但 Docker 不是容器，而是管理容器的引擎。

## 3. 镜像
### 3.1 镜像的基本概念

Docker 镜像就是一个只读的模板，可以用来创建 Docker 容器。

例如：一个镜像可以包含一个完整的 centos 操作系统环境，里面仅安装了 MySQL 或用户需要的其他应用程序。

Docker 提供了一个非常简单的机制来创建镜像或者更新现有的镜像，用户甚至可以直接从其他人那里下载一个已经做好的镜像来直接使用。

### 3.2 镜像的组成结构

镜像是由许多层的文件系统叠加构成的，最下面的是一个引导文件系统 bootfs，第二层是一个 root 文件文件 rootfs，root 文件系统通常是某种操作系统，比如 centos，ubuntu，在 root 文件系统之上又有很多层文件系统，这些文件系统叠加在一起，构成 docker 中的镜像。

<Image src="/docker/03-docker-core-component-1.png" alt="docker-core-component-1" width={720} height={720} />

### 3.3 镜像的日常操作

1. 下载镜像，比如下载 redis 镜像： `docker pull redis:latest`
    
    redis 是查询到的镜像名称，latest 是镜像的标签 tag
    
    安装一个镜像有两种方式，一种是从官方镜像仓库下载，一种是自己通过 dockefile 文件构建。

    如果有官方镜像，我们就不必自己用 dockerfile 文件创建了，除非官方没有才会自己去 dockerfile 文件构建。

2. 列出已经下载的镜像：`docker images` 或者 `docker images redis`
3. 运行镜像： `docker run -d redis` 其中 `-d` 表示在后台运行，然后通过 `ps -ef | greo redis` 可以查看 redis 进程
4. 查看容器镜像的状态：`docker ps`
    
    通过 `docker exex -it 1dad8c5497f9(镜像 ID) bash` 进入容器
5.  删除镜像：`docker rmi redis:latest` 注意是 `rmi`，不是 `rm`，`rm` 是删除容器。

## 4. 容器
### 4.1 容器的基本概念

容器是从镜像创建的运行实例。它可以被启动、停止、删除。每个容器都是相互隔离的、保证安全平台。可以把它看作一个简易版的 Linux 环境，包括 root 用户权限、进程空间、用户空间、网络空间和运行在其中的应用程序。

Docker 利用容器来运行应用，镜像是只读的，容器在启动的时候创建一层可写层作为最上层。

<Image src="/docker/03-docker-core-component-1.png" alt="docker-core-component-1" width={720} height={720} />

### 4.2 容器的日常操作

启动容器有两种方式，一种是基于镜像新建一个容器并启动，另外一个是将在终止状态的容器重新启动。

- 通过镜像启动容器：`docker run -d redis`
- 查看运行中的容器：`docker ps`
- 查看所有的容器：`docker ps -a`
- 停止容器：`docker stop 容器ID 或者容器名称`，已经停止的容器，我们可以使用命令 `docker start` 来启动。
- 开启容器：`docker start 容器ID 或者容器名称`，因为 Docker 的容器实在太轻量级了，很多时候用户都是随时删除和新创建容器。
- 删除容器：`docker rm 容器ID 或者容器名称`，删除容器时，容器必须是停止状态，否则会报错。
- 进入容器：`docker exec -it 容器ID 或者容器名称 bash`
- 还可以使用 `docker inspect 容器ID 或者容器名称`来查看容器的更多信息
- 停止全部运行中的容器：`docker stop $(docker ps -q)`
- 删除全部容器：`docker rm $(docker ps -aq)`
- 一条命令实现停用并删除容器：`docker stop $(docker ps -q) & docker rm -f $(docker ps -aq)`

## 5. 仓库
### 5.1 仓库的基本概念

仓库是集中存放镜像文件的场所，有时候会把仓库和仓库注册服务器(Registry)看作同一个事物，并不严格区分。实际上，仓库注册服务器上往往存放在多个仓库，每个仓库中有包含了多个镜像，每个镜像有不同的标签(tag)。

仓库分为公开仓库(Public)和私有仓库(Private)两种形式。

最大的公开仓库 Docker Hub(https://hub.docker.com/), 存放了数量庞大的镜像供用户下载。

当然，用户也可以在本地网络内创建一个私有仓库。

当用户创建了自己的镜像之后就可以使用 push 命令将它上传到公有或私有仓库，这样下次再另外一台机器上使用这个镜像的时候，只需要从仓库上 pull 下来即可。

> 注：Docker 仓库的概念跟 Git 类似，注册服务器也类似于 Github 这样的托管服务。

### 5.2 仓库的日常操作

用户可通过 `docker search` 命令来查找官方仓库中的镜像，例：`docker search rabbitmq`

可以看到返回了很多包含关键字的镜像，其中包括镜像名字、描述、星级(表示该镜像的受欢迎程度)，是否官方创建、是否自动创建，官方的镜像说明是官方项目组创建和维护的，automated 资源允许用户验证镜像的来源和内容。

根据是否是官方提供，可将镜像资源分为两类：

一种是类似 centos 这样的基础镜像，被称为基础或根镜像。这些基础镜像是由 Docker 公司创建、验证、支持、提供。这样的镜像往往使用单个单词作为名字。

还有一种类型，比如 tianon/centos 镜像，它是由 Docker 的用户创建并维护的，往往带有用户名称前缀。可以通过前缀 user_name/ 来指定使用某个用户提供的镜像，比如 tianon 用户。

并利用 docker pull 命令来将它下载到本地。

