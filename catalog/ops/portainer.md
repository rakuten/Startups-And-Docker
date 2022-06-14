# Portainer

本页最后更新时间: {docsify-updated}

## 简介

可视化容器管理工具，支持管理Docker、Swarm、K8s，现在分社区版与企业版，企业版可以申请免费5个节点的授权，对小微企业非常友好，但如果你是家用，那也可以直接使用了稍旧一点的版本，无需授权也可以省去启动Agent容器，单机的话功能足够

## EXPOSE

| 端口   | 用途   |
| ---- | ---- |
| 9000 | 管理页面 |



## 启动命令



#### 无Agent版

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



#### 企业版

<!-- tabs:start -->

#### **Swarm**

'agent'

```bash
docker service create \
--name portainer-agent \
--network staging \
-e TZ=Asia/Shanghai \
--mode global \
--mount type=bind,source=/var/run/docker.sock,target=/var/run/docker.sock \
--mount type=bind,source=/var/lib/docker/volumes,target=/var/lib/docker/volumes \
--label traefik.enable=false \
portainer/agent:alpine
```

'server'

```bash
docker service create --replicas 1 \
--name portainer \
--network staging \
-e TZ=Asia/Shanghai \
--constraint=node.role==manager \
--mode replicated \
--mount type=bind,source=${NFS}/portainer,target=/data \
portainer/portainer-ee:alpine \
-H tcp://portainer-agent:9001 --tlsskipverify

#traefik参数
--label traefik.enable=true \
--label traefik.docker.network=staging \
--label traefik.http.routers.docker.rule="Host(\`docker.${DOMAIN}\`)" \
--label traefik.http.routers.docker.entrypoints=http \
--label traefik.http.services.docker.loadbalancer.server.port=9000 \
```



#### **Compose**

```bash
version: '3.2'

services:
  agent:
    image: portainer/agent:alpine
    volumes:
      - /var/run/docker.sock:/var/run/docker.sock
      - /var/lib/docker/volumes:/var/lib/docker/volumes
    networks:
      - agent_network
    deploy:
      mode: global
      placement:
        constraints: [node.platform.os == linux]

  portainer:
    image: portainer/portainer-ee:alpine
    command: -H tcp://tasks.agent:9001 --tlsskipverify
    ports:
      - "9443:9443"
      - "9000:9000"
      - "8000:8000"
    volumes:
      - portainer_data:/data
    networks:
      - agent_network
    deploy:
      mode: replicated
      replicas: 1
      placement:
        constraints: [node.role == manager]

networks:
  agent_network:
    driver: overlay
    attachable: true

volumes:
  portainer_data:
```

<!-- tabs:end -->

## 参考

官网: [https://www.portainer.io/](https://www.portainer.io)
