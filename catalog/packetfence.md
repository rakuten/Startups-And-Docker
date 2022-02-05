# PacketFence

本页最后更新时间: {docsify-updated}

[![GitHub Release](https://img.shields.io/github/release/elkarbackup/elkarbackup.svg)](https://github.com/elkarbackup/elkarbackup/releases/latest)

## 简介

![](../images/bitwarden.jpg)

基于RSync/RSnapshot的免费开源备份解决方案


## EXPOSE

| 端口 | 用途 |
| :--- | :--- |
| 53 | DNS |
| 8080 | 管理页面 |



## 前置准备

```bash
mkdir ${NFS}/packetfence
```

- Dockerfile

```yaml
FROM debian:11.1-slim

EXPOSE 1443/tcp

VOLUME ["/usr/local/pf"]

RUN apt-get update -y \
	&& apt install linux-headers-$(uname -r)
	&& echo 'deb http://inverse.ca/downloads/PacketFence/debian/11.1 bullseye bullseye' > \
/etc/apt/sources.list.d/packetfence.list
	&& apt install -y gnupg \
	&& wget -q -O - https://inverse.ca/downloads/GPG_PUBLIC_KEY | apt-key add - \
	&& apt-get -y update \
	&& apt-get -y install packetfence \
	&& apt-get clean

HEALTHCHECK --interval=10s --timeout=2s --retries=3 \
    CMD wget -q -t1 -O /dev/null  http://localhost:1443 || exit 1


ENTRYPOINT ["/bin/bash", "-c"]
```



## 启动命令

<!-- tabs:start -->
#### **Docker**

```bash
docker run -d \
--restart unless-stopped \
--name elkarbackup \
--network=backend \
-e TZ=Asia/Shanghai \

```



#### **Swarm**

```bash
docker service create --replicas 1 \
--name elkarbackup \
--network staging \
-e TZ=Asia/Shanghai \
```

<!-- tabs:end -->



## 参考

官网: 
Github:

