# GOPROXY

本页最后更新时间: {docsify-updated}

## 简介

Go 源缓存服务


## EXPOSE

| 端口 | 用途 |
| :--- | :--- |
| 8081 | 通讯端口 |



## 前置准备

```bash
mkdir ${NFS}/goproxy
```

## 启动命令

<!-- tabs:start -->
#### **Docker**
```bash
docker run -d \
--network=backend \
--restart unless-stopped \
-e TZ=Asia/Shanghai \
--name goproxy \
-p 8081:8081 \
-v ${NFS}/goproxy:/go \
goproxy/goproxy
```


#### **Swarm**
```bash
docker service create --replicas 1 \
--name goproxy \
--network staging \
-e TZ=Asia/Shanghai \
-p 8081:8081 \
--mount type=bind,src=${NFS}/goproxy,dst=/go \
--label traefik.enable=false \
goproxy/goproxy
```

<!-- tabs:end -->



1. 设置 `export GOPROXY=http://localhost #允许goproxy`
2. 设置 `export GOPROXY=direct #禁止goproxy`

## 参考

官网: [https://goproxy.io/zh/](https://goproxy.io/zh/)  
DockerHub: [https://github.com/goproxyio/goproxy](https://github.com/goproxyio/goproxy)

