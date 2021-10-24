# Apisix-Dashboard

本页最后更新时间: {docsify-updated}

## 简介



## EXPOSE

| 端口 | 用途 |
| :--- | :--- |
| 9000 | 管理页面 |
| 9080 |  |
| 2379 |  |



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
apache/apisix-dashboard:2.7
```


#### **Swarm**
```bash
docker service create --replicas 1 \
--name apisix-dashboard \
--network staging \
-e TZ=Asia/Shanghai \
--mount type=bind,src=${NFS}/apisix/dashboard.yaml,dst=/usr/local/apisix-dashboard/conf/conf.yaml \
apache/apisix-dashboard:2.7

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

> Dashboard版本号与相应的Apisix版本的并不同步，目前高0.1

## 参考

