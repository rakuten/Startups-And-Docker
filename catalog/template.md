# Elkarbackup

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
mkdir ${NFS}/dnsmasq
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

