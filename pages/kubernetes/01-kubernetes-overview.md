import Image from 'next/image';

## 1. Kubernetes 简介

- Kubernetes 这个单词来自于希腊语，含义是 舵手 或 领航员。
- 生产环境级别的容器编排

编排是什么意思？

1. 按照一定的目的一次排列
2. 调配，安排

Kubernetes，也称 K8S，其中 8 是表示中间 “ubernetes” 的8个字符，是Google在2014年开源的一个容器编排引擎，用于自动化容器化应用程序的部署、规划、扩展和管理，它将组成应用程序的容器分组为逻辑单元，以便于管理和发现，用于管理云平台中多个主机上的容器化的应用。Kubernetes 的目标是让部署容器化的应用简单且高效，很多细节都不需要运维人员去进行复杂的手工配置和处理。

Kubernetes 拥有 Google 在生产环境上 15年运行的经验，并结合了社区中最佳实践。

K8S 是 CNCF 毕业的项目，本来 K8S 是 Google 的内部项目，后来开源出来，又后来为了其茁壮成长，捐给了 CNCF。

CNCF 全称 Cloud Native Computing Foundation(云原生计算基金会)。

官网：https://kubernetes.io
代码：https://github.com/kubernetes/kubernetes

K8S 是采用 Go 语言开发的，Go 语言是谷歌 2009年发布的一款开源编程语言。

## 2. Kubernetes 管理员仁恒(CKA)

CKA 全称 Certified Kubernetes Administrator，是Linux基金会和Cloud Native Computing Foundation(CNCF)官方推出的全球 K8S 管理员认证，对于技术团队，CKA认证可以作为团队成员的技术能力的一个考察指标，也可以作为整个团队对K8S云平台的管理能力的有利证明。

**考试难易程度**

考试只允许查阅官方文档，在考试过程中你只能去 

- https://kunernetes.io
- https://github.com

如果去了其他的网站，按作弊处理

**考试时长**

考试时间为 3 小时。

**多少分及格**

CKA 满分 100 分，66分及格。

**考试费用**

美金：$300
人民币：￥2088

有一次免费开始的机会，一年后过期。
