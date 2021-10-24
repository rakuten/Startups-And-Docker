# PyPi

本页最后更新时间: {docsify-updated}

## 简介

Python私有仓库


## EXPOSE

| 端口 | 用途 |
| :--- | :--- |
| 8080 | 通讯接口 |



## 前置准备

```bash
mkdir /${NFS}/pypi
```

## 启动命令

<!-- tabs:start -->
#### **Docker**
```bash
docker run -d \
--restart unless-stopped \
--network=backend \
-e TZ=Asia/Shanghai \
-p 8080:8080 \
-v /${NFS}/pypi:/data/packages \
pypiserver/pypiserver:latest
```


#### **Swarm**
```bash
docker service create --replicas 1 \
--name pypi \
--network staging \
-e TZ=Asia/Shanghai \
--mount type=bind,src=/${NFS}/pypi,dst=/data/packages \
--label traefik.enable=false \
pypiserver/pypiserver:latest
```

<!-- tabs:end -->



## 参考

