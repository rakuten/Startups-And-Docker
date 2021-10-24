# Dnsmasq

本页最后更新时间: {docsify-updated}

## 简介

轻量级的DNS服务器端

## EXPOSE

| 端口 | 用途 |
| :--- | :--- |
| 53 | DNS端口 |
| 8080 | 管理页面 |



## 前置准备

```bash
#创建数据保存目录
mkdir ${NFS}/dnsmasq

#下载配置文件
wget -O ${NFS}/dnsmasq.conf https://raw.githubusercontent.com/jpillora/docker-dnsmasq/master/dnsmasq.conf
```

## 启动命令

<!-- tabs:start -->
#### **Docker**
```bash
docker run -d \
--name dnsmasq \
--restart unless-stopped \
--network backend \
-e TZ=Asia/Shanghai \
-p 53:53/udp \
-p 8080:8080 \
-v ${NFS}/dnsmasq/dnsmasq.conf:/etc/dnsmasq.conf \
--log-opt "max-size=100m" \
-e "HTTP_USER=admin" \
-e "HTTP_PASS=test123" \
jpillora/dnsmasq
```


#### **Swarm**
```bash
docker service create --replicas 1 \
--name dnsmasq \
--network staging \
-p 53:53/udp \
-e TZ=Asia/Shanghai \
--mount type=bind,src=${NFS}/dnsmasq/dnsmasq.conf,dst=/etc/dnsmasq.conf \
--log-opt "max-size=100m" \
-e "HTTP_USER=admin" \
-e "HTTP_PASS=test123" \
jpillora/dnsmasq

#traefik参数
--label traefik.enable=true \
--label traefik.docker.network=staging \
--label traefik.http.services.dnsmasq.loadbalancer.server.port=8080 \
--label traefik.http.routers.dnsmasq.rule="Host(\`dnsmasq.${DOMAIN}\`)" \
--label traefik.http.routers.dnsmasq.entrypoints=http \
--label traefik.http.routers.dnsmasq-sec.tls=true \
--label traefik.http.routers.dnsmasq-sec.tls.certresolver=dnsResolver \
--label traefik.http.routers.dnsmasq-sec.rule="Host(\`dnsmasq.${DOMAIN}\`)" \
--label traefik.http.routers.dnsmasq-sec.entrypoints=https \
```

<!-- tabs:end -->

* 编辑/etc/docker/daemon.json并添加dns节点

```bash
{
  "dns":[
    "服务器IP地址" #包含引号
  ]
}
```

```bash
#更改权限，不然docker重启时会报错
chmod 777 /etc/docker/daemon.json

#重启Docker
systemctl restart docker
```

## 参考

