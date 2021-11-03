# Synapse

本页最后更新时间: {docsify-updated}

[![GitHub Release](https://img.shields.io/github/release/matrix-org/synapse.svg)](https://github.com/matrix-org/synapse/releases/latest)

## 简介

Synapse是riot/matrix的官方服务器端

相对于Rocket.Chat需要占用510M内存，并且使用MongoDB，我更喜欢只占86M内存的Synaps

默认情况下Synapse使用SQLite数据库，但你可以手动切换成PostgreSQL



### 附加组件\(可选\)

* [instrumentisto/coturn](https://hub.docker.com/r/instrumentisto/coturn/) - the [Coturn](https://github.com/coturn/coturn) STUN/TURN server
* [vectorim/element-web](https://hub.docker.com/r/vectorim/element-web/) - the [Element](https://element.io/) web client 
* [ma1uta/ma1sd](https://hub.docker.com/r/ma1uta/ma1sd/) - the [ma1sd](https://github.com/ma1uta/ma1sd) Matrix Identity server

## EXPOSE

| 端口 | 用途 |
| :--- | :--- |
| 8008 | HTTP |
| 8448 | HTTPS |



## 前置准备

```bash
#创建存储目录
mkdir ${NFS}/synapse

#生成配置文件
docker run -it --rm \
-v ${NFS}/synapse:/data \
-e SYNAPSE_SERVER_NAME=synapse.${DOMAIN} \
-e SYNAPSE_REPORT_STATS=no \
matrixdotorg/synapse:latest generate

#修改配置文件
vi /${NFS}/synapse/homeserver.yaml

#找到以下参数并改为相应值
server_name: "你的服务器地址+端口号"

#修改为使用PostgreSQL(可选)
database: 

#允许注册
enable_registration: true

#默认语言
url_preview_accept_language:
   - zh-CN
   
trusted_key_servers:
  - server_name: "vector.im"

#修改vector.im(默认的需要翻墙)
default_identity_server: https://vector.im
   
#以下变量改一下默认值(小改几个值的字母即可)
registration_shared_secret:
macaroon_secret_key:
form_secret:

##缓存(可选)
redis:
	host:redis
```

## 启动命令  

<!-- tabs:start -->
#### **Docker**
运行服务器

```bash
docker run -d \
--network=backend \
--restart unless-stopped \
-e TZ=Asia/Shanghai \
--name synapse \
--mount type=volume,src=synapse-data,dst=/data \
-p 8008:8008 \
matrixdotorg/synapse:latest
```


#### **Swarm**
```bash
docker service create --replicas 1 \
--name synapse \
--network staging \
-e TZ=Asia/Shanghai \
--mount type=bind,source=${NFS}/synapse,target=/data \
matrixdotorg/synapse:latest

#traefik参数
--label traefik.enable=true \
--label traefik.docker.network=staging \
--label traefik.http.services.synapse.loadbalancer.server.port=8008 \
--label traefik.http.routers.synapse.rule="Host(\`synapse.${DOMAIN}\`)" \
--label traefik.http.routers.synapse.entrypoints=http \
--label traefik.http.routers.synapse-sec.tls=true \
--label traefik.http.routers.synapse-sec.tls.certresolver=dnsResolver \
--label traefik.http.routers.synapse-sec.rule="Host(\`synapse.${DOMAIN}\`)" \
--label traefik.http.routers.synapse-sec.entrypoints=https \
```

<!-- tabs:end -->



## 设置

* 设置Admin

```text
/usr/local/bin/matrix-change-user-admin-status <username> <0/1>
```

* 注册新用户

```text
register_new_matrix_user -c homeserver.yaml http://chat.${DOMAIN}:8008
```

* 重设密码

```text
$ ~/synapse/env/bin/hash_password
Password:
Confirm password:
$2a$12$xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
```

## 参考

PlayBook: [https://github.com/spantaleev/matrix-docker-ansible-deploy](https://github.com/spantaleev/matrix-docker-ansible-deploy)

Postgres说明： [https://github.com/matrix-org/synapse/blob/master/docs/postgres.md](https://github.com/matrix-org/synapse/blob/master/docs/postgres.md)

