# Redis

本页最后更新时间: {docsify-updated}

## 简介



## EXPOSE

| 端口 | 用途 |
| :--- | :--- |
| 6379 | 通讯端口 |
| 8080 | 管理页面 |



## 前置准备

```bash
#创建数据保存目录
mkdir ${NFS}/redis

#修改内存分配策略，防止后台数据保存失败
sysctl vm.overcommit_memory=1
```

## 启动命令

<!-- tabs:start -->

#### **Docker**
```bash
docker run -d \
--name redis \
--net backend \
-e TZ=Asia/Shanghai \
--restart unless-stopped \
-v ${NFS}/redis:/data \
-p 6379:6379 \
redis:alpine --requirepass ${REDIS_PWD} --appendonly yes
```


#### **Swarm**
```bash
docker service create --replicas 1 \
--name redis \
--network staging \
-e TZ=Asia/Shanghai \
-p 6379:6379 \
--mount type=bind,src=${NFS}/redis,dst=/data \
--label traefik.enable=false \
redis:alpine --requirepass ${REDIS_PWD} --appendonly yes
```

<!-- tabs:end -->



##  参考

