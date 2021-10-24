# PgAdmin4

本页最后更新时间: {docsify-updated}

## 简介



## EXPOSE

| 端口 | 用途 |
| :--- | :--- |
| 80 | 管理页面 |



## 启动命令

<!-- tabs:start -->
#### **Docker**
```bash
docker run -d \
-e PGADMIN_DEFAULT_EMAIL=user@domain.com \
-e PGADMIN_DEFAULT_PASSWORD=SuperSecret \
-p 8082:80 \
dpage/pgadmin4
```


#### **Swarm**
```bash
docker service create --replicas 1 \
--name pgadmin \
--network staging \
-e TZ=Asia/Shanghai \
-e PGADMIN_DEFAULT_EMAIL=admin@domain.com \
-e PGADMIN_DEFAULT_PASSWORD=SuperSecret \
dpage/pgadmin4

#traefik参数
--label traefik.enable=true \
--label traefik.docker.network=staging \
--label traefik.http.services.pgadmin.loadbalancer.server.port=80 \
--label traefik.http.routers.pgadmin.rule="Host(\`pgadmin.${DOMAIN}\`)" \
--label traefik.http.routers.pgadmin.entrypoints=http \
--label traefik.http.routers.pgadmin-sec.tls=true \
--label traefik.http.routers.pgadmin-sec.tls.certresolver=dnsResolver \
--label traefik.http.routers.pgadmin-sec.rule="Host(\`pgadmin.${DOMAIN}\`)" \
--label traefik.http.routers.pgadmin-sec.entrypoints=https \
```

<!-- tabs:end -->



##  参考

PgAdmin4帮助: [链接](https://www.pgadmin.org/docs/pgadmin4/latest/container_deployment.html)

