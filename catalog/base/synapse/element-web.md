# Element-Web

本页最后更新时间: {docsify-updated}

## 简介



## EXPOSE

| 端口 | 用途 |
| :--- | :--- |
| 80 | WEB入口 |



## 前置准备

```bash
#创建数据保存目录
mkdir ${NFS}/element

wget -O ${NFS}/element/config.json https://raw.githubusercontent.com/vector-im/element-web/develop/element.io/app/config.json
```

* 修改config.json 先删除default\_server\_name项，然后在同位置添加以下内容

```javascript
//设置默认服务器
"default_server_config": {
  "m.homeserver": {
    "base_url": "你的synapse服务器地址"
  },
  "m.identity_server": {
    "base_url": "https://vector.im"
  }
},
//禁止修改默认服务器
"disable_custom_urls": false,
//修改邀请链接主地址
"permalinkPrefix": "你的element-web访问地址"
```

## 启动命令

<!-- tabs:start -->
#### **Docker**
```bash
docker run -d \
--name chat \
--net backend \
-p 80:80\
-e TZ=Asia/Shanghai \
-v ${NFS}/element-web/config.json:/app/config.json \
vectorim/element-web
```


#### **Swarm**
```bash
docker service create --replicas 1 \
--name chat \
--network staging \
-e TZ=Asia/Shanghai \
-e LANG=C.UTF-8 \
-e LC_ALL=C.UTF-8 \
--mount type=bind,src=${NFS}/element/config.json,dst=/app/config.json \
vectorim/element-web

#traefik参数
--label traefik.enable=true \
--label traefik.docker.network=staging \
--label traefik.http.services.chat.loadbalancer.server.port=80 \
--label traefik.http.routers.chat.rule="Host(\`chat.${DOMAIN}\`)" \
--label traefik.http.routers.chat.entrypoints=http \
--label traefik.http.routers.chat-sec.tls=true \
--label traefik.http.routers.chat-sec.tls.certresolver=dnsResolver \
--label traefik.http.routers.chat-sec.rule="Host(\`chat.${DOMAIN}\`)" \
--label traefik.http.routers.chat-sec.entrypoints=https \
```

<!-- tabs:end -->



## 参考

config.json参考: [https://github.com/vector-im/element-web/blob/develop/docs/config.md](https://github.com/vector-im/element-web/blob/develop/docs/config.md)

