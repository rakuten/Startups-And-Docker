# Flarum

本页最后更新时间: {docsify-updated}

[![GitHub Release](https://img.shields.io/github/release/flarum/flarum.svg)](https://github.com/flarum/flarum/releases/latest)

## 简介

![](../../images/flarum.png)

PHP开发的开源论坛，相比Discourse更轻巧，部署更容易。



## EXPOSE

| 端口 | 用途 |
| :--- | :--- |
| 8000 | Web入口 |

## 前置准备

```bash
mkdir ${NFS}/flarum
chmod 775 ${NFS}/flarum
```



## 启动命令

<!-- tabs:start -->
#### **Docker**

```bash
docker run -d \
-p 8000:8000 \
--name flarum \
--network=backend \
--name flarum \
--restart unless-stopped \
-e TZ=Asia/Shanghai \
-v ${NFS}/flarum:/data \
--secret MYSQL_PWD \
-e DB_HOST=mysql \
-e DB_USER=${MYSQL_USER} \
-e DB_PASSWORD_FILE=/run/secrets/MYSQL_PWD \
-e "FLARUM_BASE_URL=http://bbs.${DOMAIN}" \
crazymax/flarum:latest
```



#### **Swarm**

```bash
docker service create --replicas 1 \
--name flarum \
--network staging \
-e TZ=Asia/Shanghai \
--mount type=bind,src=${NFS}/flarum,dst=/data \
--secret MYSQL_PWD \
-e DB_HOST=mysql \
-e DB_USER=${MYSQL_USER} \
-e DB_PASSWORD_FILE=/run/secrets/MYSQL_PWD \
-e "FLARUM_BASE_URL=http://bbs.${DOMAIN}" \
crazymax/flarum:latest

#traefik参数
--label traefik.enable=true \
--label traefik.docker.network=staging \
--label traefik.http.services.flarum.loadbalancer.server.port=8000 \
--label traefik.http.routers.flarum.rule="Host(\`bbs.${DOMAIN}\`)" \
--label traefik.http.routers.flarum.entrypoints=http \
--label traefik.http.routers.flarum-sec.tls=true \
--label traefik.http.routers.flarum-sec.tls.certresolver=dnsResolver \
--label traefik.http.routers.flarum-sec.rule="Host(\`bbs.${DOMAIN}\`)" \
--label traefik.http.routers.flarum-sec.entrypoints=https \
```



<!-- tabs:end -->

- 安装中文语言包

```bash
#查找flarum容器并记住容器id
docker ps | grep flarum

#进入容器
docker exec -it 容器id /bin/sh

#安装中文语言包
composer require flarum-lang/chinese-simplified
php flarum cache:clear

#退出容器
exit

#打开网页并进入管理页面(如已打开请刷新页面)
#左侧菜单底部开启中文语言包
#左侧菜单"常规"项，设置默认语言为中文
```



## 参考

插件: https://extiverse.com/
