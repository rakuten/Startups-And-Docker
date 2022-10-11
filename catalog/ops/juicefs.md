# JuiceFS

本页最后更新时间: {docsify-updated}

[![GitHub Release](https://img.shields.io/github/release/elkarbackup/elkarbackup.svg)](https://github.com/elkarbackup/elkarbackup/releases/latest)

## 简介

![](../images/bitwarden.jpg)

基于RSync/RSnapshot的免费开源备份解决方案


## EXPOSE

| 端口 | 用途 |
| :--- | :--- |
| 9000 | S3 Gateway网页端口 |
| 9567 | 监控数据端口 |



## 前置准备

```bash
mkdir -p ${NFS}/juicefs/data
mkdir ${NFS}/juicefs/logs

#创建挂载位置
mkdir /mnt/jfs
chmod 775 /mnt/jfs
```

- 编写Dockerfile

```yam
FROM alpine:latest
LABEL maintainer="Juicedata <https://juicefs.com>"

# Install JuiceFS client
RUN sed -i 's/dl-cdn.alpinelinux.org/mirrors.ustc.edu.cn/g' /etc/apk/repositories && \
	apk add --no-cache fuse curl && \
  JFS_LATEST_TAG=$(curl -s https://api.github.com/repos/juicedata/juicefs/releases/latest | grep 'tag_name' | cut -d '"' -f 4 | tr -d 'v') && \
  wget "https://github.com/juicedata/juicefs/releases/download/v${JFS_LATEST_TAG}/juicefs-${JFS_LATEST_TAG}-linux-amd64.tar.gz" && \
  tar -zxf "juicefs-${JFS_LATEST_TAG}-linux-amd64.tar.gz" && \
  install juicefs /usr/bin && \
  rm juicefs "juicefs-${JFS_LATEST_TAG}-linux-amd64.tar.gz" && \
  rm -rf /var/cache/apk/* && \
  apk del curl

ENTRYPOINT ["/usr/bin/juicefs"]
```

- build镜像

```bash
docker build -t juicefs:latest .
```

- 运行Redis作为原数据存储

- 运行Minio作为对象数据存储

  

## 启动命令

<!-- tabs:start -->
#### **Docker**

```bash
docker run -d \
--restart unless-stopped \
--name jfs \
--network=backend \
--privileged=true \
-e TZ=Asia/Shanghai \
-p 8080:80 \
-v /${NFS}/juicefs:/usr/share/nginx/html \
juicefs:v1.0.0
```



#### **Swarm**

```bash
docker service create --replicas 1 \
--name jfs \
--network staging \
-e TZ=Asia/Shanghai \
--mount type=bind,src=/${NFS}/juicefs,dst=/usr/share/nginx/html \
juicefs:v1.0.0

#traefik参数
--label traefik.enable=true \
--label traefik.docker.network=staging \
--label traefik.http.services.jfs.loadbalancer.server.port=80 \
--label traefik.http.routers.jfs.rule="Host(\`jfs.${DOMAIN}\`)" \
--label traefik.http.routers.jfs.entrypoints=http \
--label traefik.http.routers.jfs-sec.tls=true \
--label traefik.http.routers.jfs-sec.rule="Host(\`jfs.${DOMAIN}\`)" \
--label traefik.http.routers.jfs-sec.entrypoints=https \
```

<!-- tabs:end -->



## 参考

官网: https://juicefs.com/zh-cn/
数据可视化: https://juicefs.com/docs/zh/community/administration/monitoring
Github: https://github.com/juicedata/juicefs

