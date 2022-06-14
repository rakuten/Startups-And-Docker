
# RabbitMQ

本页最后更新时间: {docsify-updated}

## 简介



## EXPOSE

| 端口 | 用途 |
| :--- | :--- |
| 8080 | 通讯端口 |
| 15672 | 管理页面 |



## 前置准备

```bash
#创建数据保存目录
mkdir ${NFS}/rabbitmq
```

## 启动命令

<!-- tabs:start -->
#### **Docker**
```bash
docker run -d \
--name rabbitmq \
--net backend \
--restart unless-stopped \
-e RABBITMQ_VM_MEMORY_HIGH_WATERMARK="1024MiB" \
-e RABBITMQ_DEFAULT_USER="guest" \
-e RABBITMQ_DEFAULT_PASS="guest" \
-v ${NFS}/rabbitmq:/var/lib/rabbitmq \
-p 8080:8080 \
-p 15672:15672 \
rabbitmq:3.8-management
```


#### **Swarm**
```bash
docker service create --replicas 1 \
--name rabbitmq \
--network staging \
-e TZ=Asia/Shanghai \
-e RABBITMQ_VM_MEMORY_HIGH_WATERMARK="1024MiB" \
-e RABBITMQ_DEFAULT_USER="guest" \
-e RABBITMQ_DEFAULT_PASS="guest" \
--mount type=bind,src=${NFS}/rabbitmq,dst=/var/lib/rabbitmq \
--label traefik.enable=true \
--label traefik.docker.network=staging \
--label traefik.http.services.rabbitmq.loadbalancer.server.port=15672 \
--label traefik.http.routers.rabbitmq.rule="Host(\`rabbitmq.${DOMAIN}\`)" \
--label traefik.http.routers.rabbitmq.entrypoints=http \
rabbitmq:3.8-management
```

<!-- tabs:end -->



## 参考

