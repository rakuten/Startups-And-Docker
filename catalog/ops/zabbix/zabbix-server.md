# Zabbix

本页最后更新时间: {docsify-updated}

[![GitHub Release](https://img.shields.io/github/tag/zabbix/zabbix.svg)](https://github.com/zabbix/zabbix/tags)

## 简介

企业级开源监控方案

## EXPOSE

| 端口 | 用途 |
| :--- | :--- |
| 162 |  |
| 10051 |  |



## 启动命令

<!-- tabs:start -->
#### **Docker**
```bash
docker run -d \
--name zabbix-server \
--restart unless-stopped \
--network backend \
-p 162:162 -p 10051:10051 \
--secret MYSQL_PWD \
-e DB_SERVER_HOST="mysql" \
-e MYSQL_USER="root" \
-e MYSQL_PASSWORD_FILE=/run/secrets/MYSQL_PWD \
-v ${NFS}/data/zabbix/alertscripts:/usr/lib/zabbix/alertscripts \
-v ${NFS}/data/zabbix/externalscripts:/usr/lib/zabbix/externalscripts \
-v ${NFS}/data/zabbix/modules:/var/lib/zabbix/modules \
zabbix/zabbix-server-mysql
```


#### **Swarm**
```bash
docker service create --replicas 1 \
--name zabbix-server \
--network staging \
-e TZ=Asia/Shanghai \
--secret MYSQL_PWD \
-e DB_SERVER_HOST="mysql" \
-e MYSQL_USER="root" \
-e MYSQL_PASSWORD_FILE=/run/secrets/MYSQL_PWD \
-e ZBX_UNREACHABLEDELAY=30 \
-p 162:162 -p 10051:10051 \
--mount type=bind,src=${NFS}/zabbix/data/alertscripts,dst=/usr/lib/zabbix/alertscripts \
--mount type=bind,src=${NFS}/zabbix/data/externalscripts,dst=/usr/lib/zabbix/externalscripts \
--mount type=bind,src=${NFS}/zabbix/data/modules,dst=/var/lib/zabbix/modules \
zabbix/zabbix-server-mysql

#traefik参数
--label traefik.enable=false \
```

<!-- tabs:end -->



## 参考

