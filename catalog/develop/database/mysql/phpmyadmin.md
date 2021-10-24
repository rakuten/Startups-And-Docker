# PhpMyAdmin

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
--name myadmin \
--restart unless-stopped \
--net backend \
-e TZ=Asia/Shanghai \
-e PMA_ARBITRARY=1 \
-p 8081:80 \
phpmyadmin/phpmyadmin
```


#### **Swarm**
```bash
docker service create --replicas 1 \
--name pma \
--network staging \
-e TZ=Asia/Shanghai \
-e PMA_ARBITRARY=1 \
-e PMA_HOST=mysql \
phpmyadmin/phpmyadmin

#traefik参数
--label traefik.enable=true \
--label traefik.docker.network=staging \
--label traefik.http.services.pma.loadbalancer.server.port=80 \
--label traefik.http.routers.pma.rule="Host(\`pma.${DOMAIN}\`)" \
--label traefik.http.routers.pma.entrypoints=http \
--label traefik.http.routers.pma-sec.tls=true \
--label traefik.http.routers.pma-sec.tls.certresolver=dnsResolver \
--label traefik.http.routers.pma-sec.rule="Host(\`pma.${DOMAIN}\`)" \
--label traefik.http.routers.pma-sec.entrypoints=https \
```

<!-- tabs:end -->

> PMA\_ARBITRARY 可连接其它数据库 
>
> PMA\_HOST 默认数据库地址,相同network情况下可直接使用MySQL容器的name参数值

##  参考

