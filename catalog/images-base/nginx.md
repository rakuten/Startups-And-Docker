---
description: Web Server
---

# Nginx

## 简介



## EXPOSE

| 端口 | 用途 |
| :--- | :--- |
| 80 | HTTP |
| 443 | HTTPS |



## 前置准备

* 项目配置

```bash
#创建网站保存目录
mkdir -p ${NFS}/nginx/data
#创建配置文件目录
mkdir -p ${NFS}/nginx/conf/conf.d

#复制配置文件
docker run -d --name tmp-nginx nginx  
docker cp tmp-nginx:/etc/nginx/nginx.conf ${NFS}/nginx/conf/
docker cp tmp-nginx:/etc/nginx/conf/conf.d ${NFS}/nginx/conf/conf.d
docker rm -f tmp-nginx
```

* 加装OpenTraceing插件\(可选\)

```bash
wget -O ${NFS}/nginx/ngx_http_module.so.tgz https://github.com/opentracing-contrib/nginx-opentracing/releases/download/v0.18.0/linux-amd64-nginx-1.20.1-ngx_http_module.so.tgz
tar zxvf ngx_http_module.so.tgz
rm -rf ngx_http_module.so.tgz
```

## 启动命令

{% tabs %}
{% tab title="Docker" %}
```bash
docker run -d \
--name nginx \
--restart unless-stopped \
--net backend \
-e TZ=Asia/Shanghai \
-e LANG=C.UTF-8 \
-e LC_ALL=C.UTF-8 \
-p 80:80 \
-p 443:443 \
-v ${NFS}/nginx/data/www:/usr/share/nginx/html \
-v ${NFS}/nginx/conf/nginx.conf:/etc/nginx/nginx.conf:ro \
-v ${NFS}/nginx/conf/conf.d:/etc/nginx/conf.d:ro \
nginx:1.20.1-alpine
```
{% endtab %}

{% tab title="Swarm" %}
```bash
#使用host模式映射端口会失去负载均衡功能，但可以取到真实IP
docker service create --replicas 1 \
--name nginx \
--network staging \
-e TZ=Asia/Shanghai \
-e LANG=C.UTF-8 \
-e LC_ALL=C.UTF-8 \
--mount type=bind,src=${NFS}/nginx/data/www,dst=/usr/share/nginx/html \
--mount type=bind,src=${NFS}/nginx/conf/nginx.conf,dst=/etc/nginx/nginx.conf,readonly \
--mount type=bind,src=${NFS}/nginx/conf/conf.d,dst=/etc/nginx/conf.d,readonly \
nginx:1.20.1-alpine

#traefik参数(同时需去除--publish参数)
--label traefik.enable=true \
--label traefik.docker.network=staging \
--label traefik.http.services.nginx.loadbalancer.server.port=80 \
--label traefik.http.routers.nginx.rule="Host(\`www.${DOMAIN}\`) || Host(\`admin.${DOMAIN}\`)" \
--label traefik.http.routers.nginx.entrypoints=http \
--label traefik.http.routers.nginx-sec.tls=true \
--label traefik.http.routers.nginx-sec.tls.certresolver=dnsResolver \
--label traefik.http.routers.nginx-sec.rule="Host(\`www.${DOMAIN}\`) || Host(\`admin.${DOMAIN}\`)" \
--label traefik.http.routers.nginx-sec.entrypoints=https \
```
{% endtab %}
{% endtabs %}

## 调试

重启Nginx\(修改配置文件后\)

```bash
docker exec -it 容器ID service nginx reload
```

## 参考

nginx-opentracing: [https://github.com/opentracing-contrib/nginx-opentracing](https://github.com/opentracing-contrib/nginx-opentracing)

