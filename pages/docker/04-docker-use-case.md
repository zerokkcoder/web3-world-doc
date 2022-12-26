import Image from 'next/image';

## 1. Docker 安装 MySQL

1. 下载 MySQL 镜像：
```
docker pull mysql:latest
docker run -p 3306:3306 -e MYSQL_DATABASE=workdb -e MYSQL_ROOT_PASSWORD=123456 -d mysql:latest
```
其中 -e 是指定环境变量。

2. 进入容器
```
docker exec -it mysql:latest bash
```

3. 登录 MySQL：
```
mysql -u root -p
```

4. 修改密码
```
ALTER USER 'root@localhost' IDENTIFIED BY '123456';
```

5. 授权远程登录访问：
```
CREATE USER 'zerodot618'@'%' IDENTIFIED WITH mysql_native_password BY '123456';
GRANT ALL PRIVILEGES ON *.* TO 'zerodot618'@'%';
```

## 2. Docker 安装 Nginx

1. 下载 Nginx 镜像：
```
docker pull nginx
docker run -p 80:80 -d nginx
```
2. 进入容器
```
docker exec -it nginx bash
```

3. 浏览器访问 Nginx: http://localhost
4. Nginx 部署静态网站：

将宿主机中的文件拷贝到 docker 容器狗某个目录下：
```
docker cp test.html bf8a58328e18:/usr/share/nginx/html
```

## 3. Docker 安装 Zookeeper

1. 下载 Zookeeper 镜像：
```
docker pull zookeeper
docker run -p 2181:2181 -d zookeeper
```

2. 进入容器：
```
docker exec -it 3e8bf7392b4e bash
```

3. 客服端工具访问 Zookeeper：

## 4. Docker 安装 ActiveMQ

1. 下载 ActiveMQ 镜像：
```
docker pull webcenter/activemq
docker run -p 8161:8161 -d activemq
```

2. 进入容器
```
docker exec -it activemq bash
```

3. 浏览器访问 activemq: http://localhost:8161






   




