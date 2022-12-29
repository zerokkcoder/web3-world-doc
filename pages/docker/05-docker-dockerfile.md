import Image from 'next/image';

## 1. 认识 Dockerfile 文件

Dockerfile 用于构建 Docker 镜像，Dockerfile 文件是由一行行命令语句组成，基于这些命令即可以构建一个镜像，比如下面就是一个 Dockerfile 文件样例：
```
FROM XXX/jdk:8
MAINTAINER docker_user
ENV JAVA_HOME /usr/local/java
ADD apache-tomcat-8.0.32.tar.gz /usr/local/
RUN mv apache-tomcat-9.0.32 tomcat8
EXPOSE 8080
RUN chmid u+x /usr/local/tomcat8/bin/*.sh
CMD /usr/local/tomcat8/bin/catalina.sh start
```

## 2. Dockerfile 的基本结构

一般的，Dockerfile 分为四部分：

- 基础镜像信息
- 维护者信息
- 镜像操作指令
- 容器启动时执行指令

## 3. Dockerfile 指令
### 3.1 FROM

格式为： `FROM <image>` 或 `FROM <image>:<tag>`

Dockerfile 文件的第一条指令必须为 FROM 指令。并且，如果在同一个 Dockerfile 中创建多个镜像时，可以使用多个 FROM 指令(每个镜像一次)。

### 3.2 MAINTAINER

格式为：`MAINTAINER <name>`，指定维护者信息。

### 3.3 ENV

格式为：`ENV <key><value>`，自定一个环境变量，会被后续 RUN 指令使用，并在容器运行时保持。

### 3.4 ADD

格式为：`ADD <src> <dest>`，复制指定的`<src>`到容器中的`<dest>`。

### 3.5 EXPOSE

格式为：`EXPOSR <port>[<port>...]`，告诉 Docker 服务端容器暴露的端口号，供互联系统使用，在启动容器时需要通过 `-p` 映射端口，Docker 主机会自动分配一个端口转发到指定的端口。

### 3.6 RUN

格式为：`RUN <command>`

RUN 指令将在当前镜像基础上执行指定命令，并提交为新的镜像，当命令较长时可以使用 `\` 来换行。

### 3.7 CMD

指定启动容器时执行的命令，每个 Dockerfile 只能有一条 CMD 命令。

如果指定了多条命令，只有最后一条会被执行。

如果用户启动容器时自定了运行的命令，则会覆盖掉 CMD 指定的命令。

### 4. Dockerfile 自定义镜像

### 4.1 自定义 JDK 镜像
```
FROM centos:latest
MAINTAINER zerodot618
ADD jdk-8u1212-linux-x64.tar.gz /usr/local
ENV JAVE_HOME /usr/local/jdk1.8.0_121
ENV CLASSPATH $JAVE_HOME/lin/dt.jar:$JAVA_HOME/lib/tools.jar
ENV PATH $PATH:$JAVA_HOME/bin
CMD java -version
```

- 构建镜像：`docker build -t zerodot618_jdk1.8.0_121 .`
- 运行镜像：`docker run -d ac84bde53958`

### 4.2 自定义 Tomcat 镜像
```
FROM zerodot618_jdk1.8.0_121
MAINTAINER zerodot618
ADD apache-tomcat-8.5.24.tar.gz /usr/local
ENV CATALINA_HOME /usr/local/apache-tomcat-8.5.24
ENV PATH $PATH:$CATALINA_HOME/lib:$CATALINA_HOME/bin
EXPOSE 8080
CMD /usr/local/apache-tomcat-8.5.24/bin/catalina.sh run
```

- 构建镜像：`docker build -t zerodot618_tomcat_8.5.24 .`
- 运行镜像：`docker run -d -p 8080:8080 ab42b5f48255`

### 4.3 自定义 MySQL 镜像
```
FROM centos:centos6
MAINTAINER zerodot618
RUN yum install -y mysql-server mysql
RUN /etc/init.d/mysqld strat && \
    mysql -e "grant all privileges on *.* to 'root'@'%' identified by '123456' WITH GRANT OPTION;" && \
    mysql -e "grant all privileges on *.* to 'root'@'localhost' identified by '123456' WITH GRANT OPTION;" && \
    mysql -uroot -p123456 -e "show databases;"
EXPOSE 3306
CMD /usr/bin/mysqld_safe
```

- 构建镜像：`docker build -t zerodot618_mysql .`
- 运行镜像：`docker run -d -p 3306:3306 ey42b5f48255`

### 4.4 自定义 Redis 镜像
```
FROM centos:latest
MAINTAINER zerodot618
RUN yum install -y epel-release && yum -y install redis && yum -y install net-tools
EXPOSE 6379
CMD /usr/bin/redis-server
```

- 构建镜像：`docker build -t zerodot618_redis .`
- 运行镜像：`docker run -d -p 3306:3306 3242b5d4d255`