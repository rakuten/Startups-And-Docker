
# Nginx

文档最后更新时间: {docsify-updated}

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
mkdir -p ${NFS}/nginx/{data,conf}
#创建配置文件目录
mkdir ${NFS}/nginx/conf/conf.d

#复制配置文件
docker run -d --name tmp-nginx nginx:1.21.3-alpine
docker cp tmp-nginx:/etc/nginx/nginx.conf ${NFS}/nginx/conf/
docker cp tmp-nginx:/etc/nginx/conf.d ${NFS}/nginx/conf
docker rm -f tmp-nginx
```

- 修改nginx.conf

```conf
#error_log /var/log/nginx/error.log notice;
error_log /dev/stdout warn;

#access_log /var/log/nginx/access.log main;
access_log /var/stdout;

#gzip  on;
gzip  on;
gzip_min_length 1k;
gzip_comp_level 2;
gzip_types text/plain application/javascript application/x-javascript text/css application/xml text/javascript application/x-httpd-php image/jpeg image/gif image/png;
gzip_vary on;
```



* 加装OpenTraceing插件\(可选\)

```bash
wget -O ${NFS}/nginx/ngx_http_module.so.tgz https://github.com/opentracing-contrib/nginx-opentracing/releases/download/v0.21.0/linux-amd64-nginx-1.21.3-ngx_http_module.so.tgz
tar zxvf ngx_http_module.so.tgz
rm -rf ngx_http_module.so.tgz
```

## 启动命令

<!-- tabs:start -->
#### **Docker**
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
-v ${NFS}/nginx/data:/usr/share/nginx/html \
-v ${NFS}/nginx/conf/nginx.conf:/etc/nginx/nginx.conf:ro \
-v ${NFS}/nginx/conf/conf.d:/etc/nginx/conf.d:ro \
nginx:1.21.3-alpine
```


#### **Swarm**
```bash
#使用host模式映射端口会失去负载均衡功能，但可以取到真实IP
docker service create --replicas 1 \
--name nginx \
--network staging \
-e TZ=Asia/Shanghai \
-e LANG=C.UTF-8 \
-e LC_ALL=C.UTF-8 \
--mount type=bind,src=${NFS}/nginx/data,dst=/usr/share/nginx/html \
--mount type=bind,src=${NFS}/nginx/conf/nginx.conf,dst=/etc/nginx/nginx.conf,readonly \
--mount type=bind,src=${NFS}/nginx/conf/conf.d,dst=/etc/nginx/conf.d,readonly \
--log-driver=loki \
--log-opt loki-url="http://loki.${DOMAIN}:3100/loki/api/v1/push" \
nginx:1.21.3-alpine

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

<!-- tabs:end -->

## 调试

重启Nginx\(修改配置文件后\)

```bash
docker exec -it 容器ID service nginx reload
```

## 参考

nginx-opentracing: [https://github.com/opentracing-contrib/nginx-opentracing](https://github.com/opentracing-contrib/nginx-opentracing)

