
# RabbitMQ

本页最后更新时间: {docsify-updated}

## 简介



## EXPOSE

| 端口 | 用途 |
| :--- | :--- |
| 5672 | 通讯端口 |
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
-p 5672:5672 \
-p 15672:15672 \
rabbitmq:management-alpine
```


#### **Swarm**


<!-- tabs:end -->



## 参考

