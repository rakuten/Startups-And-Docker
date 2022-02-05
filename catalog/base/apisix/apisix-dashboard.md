# Apisix-Dashboard

本页最后更新时间: {docsify-updated}

[![GitHub Release](https://img.shields.io/github/release/apache/apisix-dashboard.svg)](https://github.com/apache/apisix-dashboard/releases/latest)

## 简介



## EXPOSE

| 端口 | 用途 |
| :--- | :--- |
| 9000 | 管理页面 |


## 前置准备
```bash
wget https://raw.githubusercontent.com/apache/apisix-dashboard/master/api/conf/conf.yaml -O ${NFS}/apisix/dashboard.yaml
```

## 启动命令

<!-- tabs:start -->
#### **Docker**
```bash
docker run -d \
--network=backend \
--restart unless-stopped \
-e TZ=Asia/Shanghai \
--name apisix-dashboard
-v ${NFS}/apisix/dashboard.yaml:/usr/local/apisix-dashboard/conf/conf.yaml 
-p 9000:9000 
apache/apisix-dashboard:2.10.1-alpine
```


#### **Swarm**
```bash
docker service create --replicas 1 \
--name apisix-dashboard \
--network staging \
-e TZ=Asia/Shanghai \
-p 9000:9000 \
--mount type=bind,src=${NFS}/apisix/dashboard.yaml,dst=/usr/local/apisix-dashboard/conf/conf.yaml \
apache/apisix-dashboard:2.10.1-alpine

#traefik参数
--label traefik.enable=true \
--label traefik.docker.network=staging \
--label traefik.http.services.apisix.loadbalancer.server.port=9000 \
--label traefik.http.routers.apisix.rule="Host(\`apisix.${DOMAIN}\`)" \
--label traefik.http.routers.apisix.entrypoints=http \
--label traefik.http.routers.apisix-sec.tls=true \
--label traefik.http.routers.apisix-sec.tls.certresolver=dnsResolver \
--label traefik.http.routers.apisix-sec.rule="Host(\`apisix.${DOMAIN}\`)" \
--label traefik.http.routers.apisix-sec.entrypoints=https \
```

<!-- tabs:end -->

> Dashboard版本号与相对应的ApiSix版本的并不同步，目前低0.1

## 参考

