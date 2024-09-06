# Grist

本页最后更新时间: {docsify-updated}

[![GitHub Release](https://img.shields.io/github/release/gristlabs/grist-core.svg)](https://github.com/gristlabs/grist-core/releases/latest)

## 简介

<video id="video" controls="none" autoplay muted preload loop>
      <source id="mp4" src="../../images/grist.mp4" type="video/mp4">
</videos>

现代的关系电子表格。它结合了电子表格的灵活性和数据库的稳健性来组织您的数据，并提高您的工作效率。可以让您在几分钟内轻松构建自己的关系电子表格—而无需任何代码。

## EXPOSE

| 端口 | 用途 |
| :--- | :--- |
| 8484 | 网站入口 |



## 前置准备

```bash
mkdir ${NFS}/grist
```



## 启动命令

<!-- tabs:start -->
#### **Docker**

```bash
docker run -d \
--restart unless-stopped \
--name grist \
--network=backend \
-e TZ=Asia/Shanghai \
-e GRIST_SESSION_SECRET=invent-a-secret-here \
-e GRIST_SANDBOX_FLAVOR=gvisor \
-e APP_HOME_URL="https://grist.${DOMAIN}" \
-e GRIST_DOMAIN="https://grist.${DOMAIN}" \
-e GRIST_HIDE_UI_ELEMENTS=helpCenter,billing,templates,multiSite,multiAccounts \
-v /${NFS}/grist:/persist \
gristlabs/grist:1.1.18

```



#### **Swarm**

```bash
docker service create --replicas 1 \
--name grist \
--network staging \
-e TZ=Asia/Shanghai \
-e GRIST_SESSION_SECRET=invent-a-secret-here \
-e GRIST_SANDBOX_FLAVOR=gvisor \
-e APP_HOME_URL="https://grist.${DOMAIN}" \
-e GRIST_DOMAIN="https://grist.${DOMAIN}" \
-e GRIST_HIDE_UI_ELEMENTS=helpCenter,billing,templates,multiSite,multiAccounts \
--mount type=bind,src=${NFS}/grist,dst=/persist \
--label "traefik.enable=true" \
--label "traefik.docker.network=staging" \
--label "traefik.http.services.notes.loadbalancer.server.port=8484" \
--label traefik.http.routers.notes-sec.tls=true \
--label traefik.http.routers.notes-sec.rule="Host(\`grist.${DOMAIN}\`)" \
--label traefik.http.routers.notes-sec.entrypoints=https \
gristlabs/grist:1.1.18
```

<!-- tabs:end -->



## 参考

官网: https://www.getgrist.com/
Github: https://github.com/gristlabs/grist-core
参数: https://github.com/gristlabs/grist-core#environment-variables
