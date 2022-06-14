# Zookeeper

本页最后更新时间: {docsify-updated}

[![GitHub Release](https://img.shields.io/github/release/elkarbackup/elkarbackup.svg)](https://github.com/elkarbackup/elkarbackup/releases/latest)

## 简介

![](../images/bitwarden.jpg)

基于RSync/RSnapshot的免费开源备份解决方案


## EXPOSE

| 端口 | 用途 |
| :--- | :--- |
| 2181 | 客户端交互端口 |
| 2888 | 集群端口 |
| 3888 | 选举端口 |
| 8080 | AdminServer端口 |



## 前置准备

```bash
mkdir ${NFS}/zookeeper
```



## 启动命令

<!-- tabs:start -->
#### **Docker**

```bash
docker run -d \
--restart unless-stopped \
--name zookeeper \
--network=backend \
-e TZ=Asia/Shanghai \
-p 2181:2181 \
-p 2888:2888 \
-p 3888:3888 \
-p 8080:8080 \
-v zookeeper/conf:/conf/zoo.cfg \
-v ${NFS}/zookeeper/data:/data \
-v ${NFS}/zookeeper/logs/logs \
zookeeper:3.6

```



#### **Swarm**

```bash
docker service create --replicas 1 \
--name zookeeper \
--network staging \
-e TZ=Asia/Shanghai \
-p 2181:2181 \
-p 2888:2888 \
-p 3888:3888 \
--mount type=bind,src=${NFS}/zookeeper/data,dst=/data \
--mount type=bind,src=${NFS}/zookeeper/logs,dst=/logs \
--mount type=bind,src=${NFS}/zookeeper/conf/zoo.cfg,dst=/conf/zoo.cfg \
--label traefik.enable=true \
--label traefik.docker.network=staging \
--label traefik.http.services.zookeeper.loadbalancer.server.port=8080 \
--label traefik.http.routers.zookeeper.rule="Host(\`zookeeper.${DOMAIN}\`)" \
--label traefik.http.routers.zookeeper.entrypoints=http \
zookeeper:3.6
```

<!-- tabs:end -->



## 参考

官网: 
Github:

