# Zabbix-Client

本页最后更新时间: {docsify-updated}

## 简介



## EXPOSE

| 端口 | 用途 |
| :--- | :--- |
| 8080 | 管理页面 |



## 启动命令

<!-- tabs:start -->
#### **Docker**
```bash
docker run -d \
--restart=unless-stopped \
--network=backend \
-h zabbix-web \
-p 8080:8080 \
-e DB_SERVER_HOST="mysql" \
-e MYSQL_USER="root" \
-e MYSQL_PASSWORD_FILE=/run/secrets/MYSQL_PWD \
-e ZBX_SERVER_HOST=zabbix-server \
zabbix/zabbix-web-nginx-mysql
```


#### **Swarm**
```bash
docker service create --replicas 1 \
--name zabbix-web \
--network staging \
-e TZ=Asia/Shanghai \
-e DB_SERVER_HOST="mysql" \
-e MYSQL_USER="root" \
--secret MYSQL_PWD \
-e MYSQL_PASSWORD_FILE=/run/secrets/MYSQL_PWD \
-e ZBX_SERVER_HOST=zabbix-server \
zabbix/zabbix-web-nginx-mysql

#traefik参数
--label traefik.enable=true \
--label traefik.docker.network=staging \
--label traefik.http.services.zabbix.loadbalancer.server.port=8080 \
--label traefik.http.routers.zabbix.rule="Host(\`zabbix.${DOMAIN}\`)" \
--label traefik.http.routers.zabbix.entrypoints=http \
--label traefik.http.routers.zabbix-sec.tls=true \
--label traefik.http.routers.zabbix-sec.tls.certresolver=dnsResolver \
--label traefik.http.routers.zabbix-sec.rule="Host(\`zabbix.${DOMAIN}\`)" \
--label traefik.http.routers.zabbix-sec.entrypoints=https \
```

<!-- tabs:end -->



## 参考

