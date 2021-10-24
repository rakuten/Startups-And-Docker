# MongoExpress

本页最后更新时间: {docsify-updated}

## 简介



## EXPOSE

| 端口 | 用途 |
| :--- | :--- |
| 8081 | 管理页面 |



## 启动命令

<!-- tabs:start -->
#### **Docker**
```bash
docker run -it --rm \
--name mongo-express \
--restart unless-stopped \
--network backend \
-p 8081:8081 \
-e ME_CONFIG_OPTIONS_EDITORTHEME="ambiance" \
-e ME_CONFIG_MONGODB_SERVER="mongo" \
-e ME_CONFIG_BASICAUTH_USERNAME="mongoadmin" \
-e ME_CONFIG_BASICAUTH_PASSWORD="r00t" \
mongo-express
```


#### **Swarm**
```bash
docker service create --replicas 1 \
--network staging \
-e TZ=Asia/Shanghai \
--name mongo-express \
-e ME_CONFIG_OPTIONS_EDITORTHEME="ambiance" \
-e ME_CONFIG_MONGODB_SERVER="mongo" \
-e ME_CONFIG_BASICAUTH_USERNAME="webadmin" \
-e ME_CONFIG_BASICAUTH_PASSWORD="webr00t" \
mongo-express


#traefik参数
--label traefik.enable=true \
--label traefik.docker.network=staging \
--label traefik.http.routers.mongo-express.rule="Host(\`mongoe.${DOMAIN}\`)" \
--label traefik.http.routers.mongo-express.entrypoints=http \
--label traefik.http.services.mongo-express.loadbalancer.server.port=8081 \

```

<!-- tabs:end -->



##  参考

