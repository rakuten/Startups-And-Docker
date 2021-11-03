# JumpServer

本页最后更新时间: {docsify-updated}

[![GitHub Release](https://img.shields.io/github/release/jumpserver/jumpserver.svg)](https://github.com/jumpserver/jumpserver/releases/latest)

## 简介

堡垒机

默认帐号：admin 密码：admin

## EXPOSE

| 端口 | 用途 |
| :--- | :--- |
| 80 | 管理页面 |
| 2222 | 通讯接口 |



## 前置准备

1. [部署MySQL](../images-develop/database/mysql/)
2. [部署Redis](../images-develop/cache/redis.md)
3. 生成随机加密密钥

```bash
if [ "$SECRET_KEY" = "" ]; then SECRET_KEY=`cat /dev/urandom | tr -dc A-Za-z0-9 | head -c 50`; echo "SECRET_KEY=$SECRET_KEY" >> ~/.bashrc; echo $SECRET_KEY; else echo $SECRET_KEY; fi

if [ "$BOOTSTRAP_TOKEN" = "" ]; then BOOTSTRAP_TOKEN=`cat /dev/urandom | tr -dc A-Za-z0-9 | head -c 16`; echo "BOOTSTRAP_TOKEN=$BOOTSTRAP_TOKEN" >> ~/.bashrc; echo $BOOTSTRAP_TOKEN; else echo $BOOTSTRAP_TOKEN; fi
```

4. 初始化数据库

```bash
# docker exec -it mysql /bin/bash
# mysql -u root -p abcd@1234
mysql> create database jumpserver default charset 'utf8mb4';
mysql> grant all on jumpserver.* to 'jumpserver'@'%' identified by 'abcd@1234';
mysql> flush privileges;
mysql> exit;
# exit
```

5. 创建数据目录

```bash
#创建数据保存目录
mkdir -p ${NFS}/jumpserver/logs/nginx
```

6. 查看Docker网段

```bash
#把staging改为你的网络名
docker network inspect staging
#复制 "Config">"Subnet"中的内容如 "10.0.0.0/24"，然后赋值给启动命令中的DOCKER_SUBNET变量
```

`不设置DOCKER_SUBNET将会导致连接服务器失败`

## 启动命令

<!-- tabs:start -->
#### **Docker**
```bash
docker run -d \
--restart unless-stopped \
--network=backend \
--name jumpserver \
-h jumpserver \
-p 80:80 \
-p 2222:2222 \
-e SECRET_KEY=$SECRET_KEY \
-e BOOTSTRAP_TOKEN=$BOOTSTRAP_TOKEN \
-e DB_HOST=mysql \
-e DB_USER=jumpserver \
-e DB_PASSWORD="abcd@1234" \
-e DB_NAME=jumpserver \
-e REDIS_HOST=redis \
-e REDIS_PASSWORD="123456" \
-v ${NFS}/jumpserver:/opt/jumpserver/data/media \
jumpserver/jms_all
```


#### **Swarm**
```bash
docker service create --replicas 1 \
--network staging \
-e TZ=Asia/Shanghai \
--name jms \
-e DOCKER_SUBNET=10.0.0.0/24 \
-e SECRET_KEY=$SECRET_KEY \
-e BOOTSTRAP_TOKEN=$BOOTSTRAP_TOKEN \
-e DB_HOST=mysql \
-e DB_USER=jumpserver \
-e DB_PASSWORD="abcd@1234" \
-e DB_NAME=jumpserver \
-e REDIS_HOST=redis \
-e REDIS_PASSWORD="123456" \
--mount type=bind,src=${NFS}/jumpserver,dst=/opt/jumpserver/data/media \
--mount type=bind,src=${NFS}/jumpserver/logs,dst=/opt/jumpserver/logs \
--mount type=bind,src=${NFS}/jumpserver/logs/nginx,dst=/var/log/nginx \
jumpserver/jms_all

#traefik参数
--label traefik.enable=true \
--label traefik.docker.network=staging \
--label traefik.http.services.jms.loadbalancer.server.port=80 \
--label traefik.http.routers.jms.rule="Host(\`jms.${DOMAIN}\`)" \
--label traefik.http.routers.jms.entrypoints=http \
--label traefik.http.routers.jms-sec.tls=true \
--label traefik.http.routers.jms-sec.tls.certresolver=dnsResolver \
--label traefik.http.routers.jms-sec.rule="Host(\`jms.${DOMAIN}\`)" \
--label traefik.http.routers.jms-sec.entrypoints=https \
```

<!-- tabs:end -->

{% hint style="info" %}
DOCKER\_SUBNET必须为前置第6步中查到的值，不然远程连接会失败
{% endhint %}

## 常见问题

* 如第一次运行因参数错而失败，请修改参数后并重置数据库再试
* 安装完后，连远程服务器如报nginx 502错误，将容器重启一次即可

## 参考

官网 [http://www.jumpserver.org](http://www.jumpserver.org)   
文档 [http://docs.jumpserver.org](http://docs.jumpserver.org)

