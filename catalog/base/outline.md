# Outline

文档最后更新时间: {docsify-updated}

## 简介

小团队专用的Gitbook开源替代品

## EXPOSE

| 端口   | 用途   |
| ---- | ---- |
| 3000 | 网页入口 |



## 前置准备

* 运行[postgers](../images-develop/database/postgres/)
* 运行[redis](../images-develop/cache/redis.md)
* 运行[minio](minio.md)
* 在minio中创建一个名为`outline`的桶
* 在postgres数据库中创建一个名为`outliner`的库
* 生成管理密钥

```bash
if [ "$OUTLINE_KEY" = "" ]; then OUTLINE_KEY=`cat /dev/urandom | tr -dc a-f0-9 | head -c 64`; echo "OUTLINE_KEY=$OUTLINE_KEY" >> ~/.bashrc; echo $OUTLINE_KEY; else echo $OUTLINE_KEY; fi
if [ "$OUTLINE_SECRET" = "" ]; then OUTLINE_SECRET=`cat /dev/urandom | tr -dc a-f0-9 | head -c 64`; echo "OUTLINE_SECRET=$OUTLINE_SECRET" >> ~/.bashrc; echo $OUTLINE_SECRET; else echo $OUTLINE_SECRET; fi
```

## 启动命令

<!-- tabs:start -->

#### **Swarm**
```bash
docker service create --replicas 1 \
--name outline \
--network staging \
-e TZ=Asia/Shanghai \
-e PGSSLMODE=disable \
-e DATABASE_URL=postgres://admin:$POSTGRES_PWD@postgres:5432/outline \
-e DATABASE_URL_TEST=postgres://admin:$POSTGRES_PWD@postgres:5432/outline-test \
-e REDIS_URL=redis://redis:6379 \
-e FORCE_HTTPS=false \
-e DEFAULT_LANGUAGE=zh_CN \
-e SECRET_KEY=$OUTLINE_KEY \
-e UTILS_SECRET=$OUTLINE_SECRET \
-e AWS_REGION=myregion \
-e AWS_ACCESS_KEY_ID=MINIO_ROOT_USER \
-e AWS_SECRET_ACCESS_KEY=MINIO_ROOT_PASSWORD \
-e AWS_S3_UPLOAD_MAX_SIZE=100M \
-e AWS_S3_UPLOAD_BUCKET_URL=http://minio:9000 \
-e AWS_S3_UPLOAD_BUCKET_NAME=outline \
outlinewiki/outline \
yarn sequelize:migrate --env production-ssl-disabled && yarn start

#traefik参数
--label "traefik.enable=true" \
--label "traefik.docker.network=staging" \
--label "traefik.http.services.outline.loadbalancer.server.port=3000" \
--label "traefik.http.routers.outline.rule=Host(\`outline.${DOMAIN}\`)" \
--label "traefik.http.routers.outline.entrypoints=http" \
--label "traefik.http.routers.outline-sec.tls=true" \
--label "traefik.http.routers.outline-sec.tls.certresolver=dnsResolver" \
--label "traefik.http.routers.outline-sec.rule=Host(\`outline.${DOMAIN}\`)" \
--label "traefik.http.routers.outline-sec.entrypoints=https" \
```


#### **Compose**
```yaml
version: "3"
services:
  outline:
    image: outlinewiki/outline
    networks: 
      - staging
    command: sh -c "yarn sequelize:migrate --env production-ssl-disabled && yarn start"
    environment:
      - PGSSLMODE: disable
      - DATABASE_URL: postgres://user:pass@postgres:5432/outline
      - DATABASE_URL_TEST: postgres://user:pass@postgres:5432/outline-test  
      - REDIS_URL: redis://redis:6379
      - FORCE_HTTPS: false      
      - DEFAULT_LANGUAGE: zh_CN
      #- TEAM_LOGO: https://example.com/images/logo.png      
      - SECRET_KEY: $OUTLINE_KEY
      - UTILS_SECRET: $OUTLINE_SECRET
      - AWS_REGION: myregion
      - AWS_S3_UPLOAD_MAX_SIZE: 100M
      - AWS_ACCESS_KEY_ID: MINIO_ROOT_USER
      - AWS_SECRET_ACCESS_KEY: MINIO_ROOT_PASSWORD
    labels: 
      - "traefik.enable=true"
      - "traefik.docker.network=staging"
      - "traefik.http.services.outline.loadbalancer.server.port=3000"
      - "traefik.http.routers.outline.rule=Host(`outline.${DOMAIN}`)"
      - "traefik.http.routers.outline.entrypoints=http"
      - "traefik.http.routers.outline-sec.tls=true"
      - "traefik.http.routers.outline-sec.tls.certresolver=dnsResolver"
      - "traefik.http.routers.outline-sec.rule=Host(`outline.${DOMAIN}`)"
      - "traefik.http.routers.outline-sec.entrypoints=https"
    restart: unless-stopped
    logging: 
      driver: loki
      options: 
        -loki-url: "http://loki:3100/api/prom/push"

networks:
  staging:
```

<!-- tabs:end -->



## 参考

官网: [https://www.getoutline.com/](https://www.getoutline.com)\
Github: [https://github.com/outline](https://github.com/outline)
