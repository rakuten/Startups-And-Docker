# Portainer

本页最后更新时间: {docsify-updated}

## 简介

可视化容器管理工具，使用了稍旧一点的版本，单机的话功能足够，但可以省去启动agent

## EXPOSE

| 端口   | 用途   |
| ---- | ---- |
| 9000 | 管理页面 |



## 启动命令

<!-- tabs:start -->
#### **Docker**
```bash
docker run -d \
--name portainer \
--restart unless-stopped \
-e TZ=Asia/Shanghai \
--privileged \
-p 9000:9000 \
-v /var/run/docker.sock:/var/run/docker.sock \
portainer/portainer:1.24.1-alpine
```


#### **Swarm**
```bash
docker service create --replicas 1 \
--name portainer \
--network staging \
-e TZ=Asia/Shanghai \
--mount type=bind,source=/var/run/docker.sock,target=/var/run/docker.sock \
portainer/portainer:1.24.1-alpine

#traefik参数
--label traefik.enable=true \
--label traefik.docker.network=staging \
--label traefik.http.routers.docker.rule="Host(\`docker.${DOMAIN}\`)" \
--label traefik.http.routers.docker.entrypoints=http \
--label traefik.http.services.docker.loadbalancer.server.port=9000 \
```

<!-- tabs:end -->



## 参考

官网: [https://www.portainer.io/](https://www.portainer.io)
