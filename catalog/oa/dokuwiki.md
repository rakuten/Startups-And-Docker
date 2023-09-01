# DokuWiki

文档最后更新时间: {docsify-updated}

## 简介

小巧实用并且功能强大的Wiki系统，使用文件系统而不是数据库来保存数据，拥有丰富的[插件库](https://www.dokuwiki.org/plugins)并且支持OAuth2，具体差别可查看[与MediaWiki的区别](https://www.wikimatrix.org/compare/dokuwiki+mediawiki)

## EXPOSE

| 端口 | 用途 |
| :--- | :--- |
| 8080 | HTTP |
| 8443 | HTTPS |



## 前置准备

```bash
#创建数据保存目录
mkdir ${NFS}/doku
```

## 启动命令

<!-- tabs:start -->
#### **Docker**
```bash
docker run -d \
--name dokuwiki \
--net backend \
-p 8080:8080 -p 8443:8443 \
-e TZ=Asia/Shanghai \
-v ${NFS}/doku:/bitnami \
bitnami/dokuwiki:latest
```


#### **Swarm**
```bash
docker service create --replicas 1 \
--name dokuwiki \
--network staging \
-e TZ=Asia/Shanghai \
--mount type=bind,src=${NFS}/doku,dst=/bitnami \
bitnami/dokuwiki:latest

#traefik参数
--label traefik.enable=true \
--label traefik.docker.network=staging \
--label traefik.http.services.wiki.loadbalancer.server.port=8080 \
--label traefik.http.routers.wiki.rule="Host(\`wiki.${DOMAIN}\`)" \
--label traefik.http.routers.wiki.entrypoints=http \
--label traefik.http.routers.wiki-sec.tls=true \
--label traefik.http.routers.wiki-sec.tls.certresolver=dnsResolver \
--label traefik.http.routers.wiki-sec.rule="Host(\`wiki.${DOMAIN}\`)" \
--label traefik.http.routers.wiki-sec.entrypoints=https \
```

<!-- tabs:end -->



## 参考

官网: [https://www.dokuwiki.org/](https://www.dokuwiki.org/dokuwiki)

