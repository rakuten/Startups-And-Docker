# APISix

本页最后更新时间: {docsify-updated}

[![GitHub Release](https://img.shields.io/github/release/apache/apisix.svg)](https://github.com/apache/apisix/releases/latest)

## 简介

![Apisix Dashboard](../../../images/apisix.png)

## EXPOSE

| 端口 | 用途 |
| :--- | :--- |
| 9080 | HTTP API端口 |
| 9443 | HTTPS API端口 |

## 前置准备

```bash
mkdir ${NFS}/apisix
cd ${NFS}/apisix
wget https://raw.githubusercontent.com/apache/apisix/master/conf/config.yaml -O ${NFS}/apisix/config.yaml
```


## 启动命令

<!-- tabs:start -->
#### **Docker**
```bash
docker run -d \
--network=backend \
--restart unless-stopped \
-e TZ=Asia/Shanghai \
--name apisix
-e TZ=Asia/Shanghai \
-v ${NFS}/apisix/config.yaml:/usr/local/apisix/conf/config.yaml 
-p 9080:9080 \
-p 9443:9443 \
apache/apisix:2.14.1-alpine
```


#### **Swarm**
```bash
docker service create --replicas 1 \
--name apisix \
--network staging \
-e TZ=Asia/Shanghai \
--publish published=9080,target=9080,mode=host \
--publish published=9443,target=9443,mode=host \
--mount type=bind,src=${NFS}/apisix/config.yaml,dst=/usr/local/apisix/conf/config.yaml \
--label traefik.enable=false \
apache/apisix:2.14.1-alpine
```

<!-- tabs:end -->



## 参考
官网: https://apisix.apache.org/zh/
