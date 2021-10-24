# Etcd

本页最后更新时间: {docsify-updated}

## 简介



## EXPOSE

| 端口 | 用途 |
| :--- | :--- |
| 2379 | HTTP通信端口 |
| 2380 | Peer通信端口 |



## 前置准备

```bash
#创建数据保存目录
mkdir ${NFS}/etcd
chmod 777 $NFS/etcd
```

## 启动命令

<!-- tabs:start -->
#### **Docker**
```bash
docker run -d \
--name etcd-server \
-v /mnt/nfs/etcd/etcd.conf.yml:/opt/bitnami/etcd/conf/etcd.conf.yml \
-p 2379:2379 \
-p 2380:2380  \
-e TZ=Asia/Shanghai \
-e ETCD_ENABLE_V2=true \
--env ALLOW_NONE_AUTHENTICATION=yes \
--env ETCD_ADVERTISE_CLIENT_URLS=http://etcd-server:2379 \
bitnami/etcd:latest --enable-v2=true
```


#### **Swarm**
```bash
docker service create --replicas 1 \
--name etcd-server \
--network staging \
-e TZ=Asia/Shanghai \
-e ETCD_ENABLE_V2=true \
-e ALLOW_NONE_AUTHENTICATION=yes \
-e ETCD_ADVERTISE_CLIENT_URLS=http://0.0.0.0:2379 \
-e ETCD_LISTEN_CLIENT_URLS=http://0.0.0.0:2379 \
--mount type=bind,src=${NFS}/etcd,dst=/bitnami/etcd \
--label traefik.enable=false \
bitnami/etcd:latest
```


#### **Compose**
```
version: '2'

services:
  etcd:
    image: docker.io/bitnami/etcd:latest
    environment:
      - ALLOW_NONE_AUTHENTICATION=yes
      - ETCD_ADVERTISE_CLIENT_URLS=http://0.0.0.0:2379
      - ETCD_LISTEN_CLIENT_URLS=http://0.0.0.0:2379
    volumes:
      - etcd:/bitnami/etcd
    networks:
      - staging
volumes:
  etcd:
    driver: local
```

<!-- tabs:end -->



## 参考

