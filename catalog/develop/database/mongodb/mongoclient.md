# Mongo Client

本页最后更新时间: {docsify-updated}

## 简介

内存占用约110M\(使用内置mongodb\)、64M\(使用外部mongodb\)

本配置使用外部mongodb存储mongo-client数据+web登录时需验证

## EXPOSE

| 端口 | 用途 |
| :--- | :--- |
| 3000 | 管理页面 |



## 启动命令

<!-- tabs:start -->
#### **Docker**
```bash
docker run -d \
--name mongo-client \
--restart unless-stopped \
--net backend \
-e MONGO_URL="mongodb://admin:r00t@mongo:27017" \
-e MONGOCLIENT_AUTH=true \
-e MONGOCLIENT_USERNAME="webadmin" \
-e MONGOCLIENT_PASSWORD="webr00t" \
mongoclient/mongoclient
```


#### **Swarm**
```bash
docker service create --replicas 1 \
--name mongo-client \
--network staging \
-e TZ=Asia/Shanghai \
-e MONGO_URL="mongodb://admin:r00t@mongo:27017" \
-e MONGOCLIENT_AUTH=true \
-e MONGOCLIENT_USERNAME="webadmin" \
-e MONGOCLIENT_PASSWORD="webr00t" \
mongoclient/mongoclient

#traefik参数
--label traefik.enable=true \
--label traefik.docker.network=staging \
--label traefik.http.routers.mongo-express.rule="Host(\`mongoc.${DOMAIN}\`)" \
--label traefik.http.routers.mongo-express.entrypoints=http \
--label traefik.http.services.mongo-express.loadbalancer.server.port=3000 \
```

<!-- tabs:end -->



##  参考

