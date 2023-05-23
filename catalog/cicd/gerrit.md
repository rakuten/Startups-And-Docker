# Gerrit

本页最后更新时间: {docsify-updated}

[![GitHub Release](https://img.shields.io/maven-central/v/com.google.gerrit/gerrit-war)](https://github.com/eGerritCodeReview/gerrit/releases/latest)

## 简介

![](../images/bitwarden.jpg)

Gerrit 是一个免费、开放源代码的代码审查软件，使用网页界面。利用网页浏览器，同一个团队的软件程序员，可以相互审阅彼此修改后的程序代码，决定是否能够提交，退回或者继续修改。它使用 Git 作为底层版本控制系统。它分支自 Rietveld，作者为 Google 公司的 Shawn Pearce，原先是为了管理 Android 计划而产生。

## EXPOSE

| 端口 | 用途 |
| :--- | :--- |
| 8080 | 管理页面 |
| 29418 | SSH入口 |



## 前置准备

```bash
# 创建初始目录
mkdir ${NFS}/gerrit
cd ${NFS}/gerrit
mkdir -p etc git db index cache plugins
chmod 777 cache db etc git index
chmod 766 plugins

# 下载OAuth插件(非必须)
wget -O /{NFS}/gerrit/oauth.jar https://github.com/davido/gerrit-oauth-provider/releases/download/v3.5.1/gerrit-oauth-provider.jar
```



## 启动命令

<!-- tabs:start -->
#### **Docker**

```bash
docker run -d \
--restart unless-stopped \
--name gerrit \
--network=backend \
-e TZ=Asia/Shanghai \
-p 8080:8080 \
-p 29418:29418 \
-v ${NFS}/gerrit/etc:/var/gerrit/etc \
-v ${NFS}/gerrit/git:/var/gerrit/git \
-v ${NFS}/gerrit/db:/var/gerrit/db \
-v ${NFS}/gerrit/index:/var/gerrit/index \
-v ${NFS}/gerrit/cache:/var/gerrit/cache \
gerritcodereview/gerrit
```



#### **Swarm**

```bash
docker service create --replicas 1 \
--name gerrit \
--network staging \
-e TZ=Asia/Shanghai \
--mount type=bind,src=${NFS}/gerrit/etc,dst=/var/gerrit/etc \
--mount type=bind,src=${NFS}/gerrit/git,dst=/var/gerrit/git \
--mount type=bind,src=${NFS}/gerrit/db,dst=/var/gerrit/db \
--mount type=bind,src=${NFS}/gerrit/index,dst=/var/gerrit/index \
--mount type=bind,src=${NFS}/gerrit/cache,dst=/var/gerrit/cache \
gerritcodereview/gerrit

#traefik参数
--label traefik.enable=true \
--label traefik.docker.network=staging \
--label traefik.http.services.gerrit.loadbalancer.server.port=8080 \
--label traefik.http.routers.gerrit.rule="Host(\`gerrit.${DOMAIN}\`)" \
--label traefik.http.routers.gerrit.entrypoints=http \
--label traefik.http.routers.gerrit-sec.tls=true \
--label traefik.http.routers.gerrit-sec.tls.certresolver=dnsResolver \
--label traefik.http.routers.gerrit-sec.rule="Host(\`gerrit.${DOMAIN}\`)" \
--label traefik.http.routers.gerrit-sec.entrypoints=https \
--label traefik.tcp.services.gerrit.loadbalancer.server.port=29418 \
--label traefik.tcp.routers.gerrit.rule="Host(\`gerrit.${DOMAIN}\`)" \
--label traefik.tcp.routers.gerrit.entrypoints=ssh \
```

<!-- tabs:end -->

## 附加配置

- 1. HTTP登录认证
```bash
 cd ${NFS}/gerrit/etc/
 vi gerrit.config
# 1、将auth下的 type 变为HTTP
# 2、将`canonicalWebUrl`  设置成自己的url
# 退出gerrit.config编辑模式
 touch gerrit.password. # 创建验证文件
 htpasswd -b gerrit.password xl 123456 # 创建用户
 # 重启gerrit容器实例
```

- 2. OAuth登录认证
```bash
wget -O /{NFS}/gerrit/oauth.jar https://github.com/davido/gerrit-oauth-provider/releases/download/v3.5.1/gerrit-oauth-provider.jar
```

## 参考

官网:  https://www.gerritcodereview.com/
Github: https://gerrit.googlesource.com/gerrit
Docker: https://hub.docker.com/r/gerritcodereview/gerrit
插件: https://gerrit-ci.gerritforge.com/
配置参考: https://gerrit-review.googlesource.com/Documentation/config-gerrit.html

