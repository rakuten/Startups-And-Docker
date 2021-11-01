# Bitwarden

文档最后更新时间: {docsify-updated}

## 简介

![](../../images/bitwarden.jpg)

Bitwarden 是一款开源的密码管理器，支持多种浏览器，拥有 iOS、Android 客户端，采用本地加密，云同步的方式。

个人用户直接使用官网免费服务即可，无需架设服务器，除非有有团队及SSO功能需求。

因为官方容器化流程需要启动7个镜像，使用上非常繁琐，所以我们采用vaultwarden/server镜像(原名:bitwardenrs/server)，并且此镜像作者是Bitwarden核心贡献者之一。

## EXPOSE

| 端口 | 用途 |
| :--- | :--- |
| 80 | Web入口 |
| 3012 | WebSocket端口 |



## 前置准备

```bash
mkdir ${NFS}/bitwarden
chmod -R 755 /${NFS}/bitwarden
```

  

## 启动命令

<!-- tabs:start -->

#### **Swarm**

```bash
docker service create --replicas 1 \
--name bitwardenrs \
--network staging \
-e TZ=Asia/Shanghai \
--mount type=bind,src=${NFS}/bitwarden,dst=/data \
-e SIGNUPS_ALLOWED=true \
-e WEBSOCKET_ENABLED=true \
-e WEB_VAULT_ENABLED=true \
-e DOMAIN=https://pwd.${DOMAIN} \
-e LOG_FILE=/data/bitwarden.log \
-e LOG_LEVEL=error \
-e EXTENDED_LOGGING=true \
-e ADMIN_TOKEN=Aj43jUOZb908JLYbh7giDRv6TqkMFflIY+ebrSQ8phvR7kY+jFDt9yThorconuWU \
vaultwarden/server:1.23.0

#traefik参数
--label traefik.enable=true \
--label traefik.docker.network=staging \
# bitwarden-ui
--label traefik.http.middlewares.redirect-https.redirectScheme.scheme=https \
--label traefik.http.middlewares.redirect-https.redirectScheme.permanent=true \
--label traefik.http.routers.bitwarden-ui-http.service=bitwarden-ui \
--label traefik.http.services.bitwarden-ui.loadbalancer.server.port=80 \
--label traefik.http.routers.bitwarden-ui-http.rule="Host(\`pwd.${DOMAIN}\`)" \
--label traefik.http.routers.bitwarden-ui-http.entrypoints=http \
--label traefik.http.routers.bitwarden-ui-http.middlewares=redirect-https \
--label traefik.http.routers.bitwarden-ui-https.rule="Host(\`pwd.${DOMAIN}\`)" \
--label traefik.http.routers.bitwarden-ui-https.entrypoints=https \
--label traefik.http.routers.bitwarden-ui-https.tls=true \
--label traefik.http.routers.bitwarden-ui-https.tls.certresolver=dnsResolver \
--label traefik.http.routers.bitwarden-ui-https.service=bitwarden-ui \
# bitwarden-websocket
--label traefik.http.routers.bitwarden-websocket-http.service=bitwarden-websocket \
--label traefik.http.services.bitwarden-websocket.loadbalancer.server.port=3012 \
--label traefik.http.routers.bitwarden-websocket-http.rule="Host(\`pwd.${DOMAIN}\`) && Path(\`/notifications/hub\`)" \
--label traefik.http.routers.bitwarden-websocket-http.entrypoints=http \
--label traefik.http.routers.bitwarden-websocket-http.middlewares=redirect-https \
--label traefik.http.routers.bitwarden-websocket-https.rule="Host(\`pwd.${DOMAIN}\`) && Path(\`/notifications/hub\`)" \
--label traefik.http.routers.bitwarden-websocket-https.entrypoints=https \
--label traefik.http.routers.bitwarden-websocket-https.tls=true \
--label traefik.http.routers.bitwarden-websocket-https.service=bitwarden-websocket \
--label traefik.http.routers.bitwarden-websocket-https.tls.certresolver=dnsResolver \
```





#### **Comp**

```yaml
version: "3.5"

services:
  bitwardenrs:
    image: vaultwarden/server
    container_name: bitwardenrs
    security_opt:
      - no-new-privileges:true
    ports:
      - "127.0.0.1:8000:80"
      - "127.0.0.1:3012:3012"
    environment:
      - SIGNUPS_ALLOWED=true
      - WEBSOCKET_ENABLED=true
      - WEB_VAULT_ENABLED=true
      - DOMAIN=https://btwd.example.com
      - LOG_FILE=/data/bitwarden.log
      - LOG_LEVEL=error
      - EXTENDED_LOGGING=true
      - ADMIN_TOKEN=Aj43jUOZb908JLYbh7giDRv6TqkMFflIY+ebrSQ8phvR7kY+jFDt9yThorconuWU
    volumes:
      - ./data:/data
    restart: unless-stopped
    networks:
      - traefik
    labels:
      - traefik.enable=true
      - traefik.docker.network=traefik
      # bitwarden-ui
      - traefik.http.middlewares.redirect-https.redirectScheme.scheme=https
      - traefik.http.middlewares.redirect-https.redirectScheme.permanent=true
      - traefik.http.routers.bitwarden-ui-https.rule=Host(`btwd.${DOMAIN}`)
      - traefik.http.routers.bitwarden-ui-https.entrypoints=https
      - traefik.http.routers.bitwarden-ui-https.tls=true
      - traefik.http.routers.bitwarden-ui-https.tls.certresolver=dnsResolver
      - traefik.http.routers.bitwarden-ui-https.service=bitwarden-ui
      - traefik.http.routers.bitwarden-ui-http.rule=Host(`btwd.${DOMAIN}`)
      - traefik.http.routers.bitwarden-ui-http.entrypoints=http
      - traefik.http.routers.bitwarden-ui-http.middlewares=redirect-https
      - traefik.http.routers.bitwarden-ui-http.service=bitwarden-ui
      - traefik.http.services.bitwarden-ui.loadbalancer.server.port=80
      # bitwarden-websocket
      - traefik.http.routers.bitwarden-websocket-https.rule=Host(`btwd.${DOMAIN}`) && Path(`/notifications/hub`)
      - traefik.http.routers.bitwarden-websocket-https.entrypoints=https
      - traefik.http.routers.bitwarden-websocket-https.tls=true
      - traefik.http.routers.bitwarden-websocket-https.service=bitwarden-websocket
      - traefik.http.routers.bitwarden-websocket-https.tls.certresolver=dnsResolver
      - traefik.http.routers.bitwarden-websocket-http.rule=Host(`btwd.${DOMAIN}`) && Path(`/notifications/hub`)
      - traefik.http.routers.bitwarden-websocket-http.entrypoints=http
      - traefik.http.routers.bitwarden-websocket-http.middlewares=redirect-https
      - traefik.http.routers.bitwarden-websocket-http.service=bitwarden-websocket
      - traefik.http.services.bitwarden-websocket.loadbalancer.server.port=3012

networks:
  traefik:
    external: true

```




<!-- tabs:end -->



## 参考

官网: https://bitwarden.com/
反代文档: https://github.com/dani-garcia/vaultwarden/wiki/Proxy-examples
