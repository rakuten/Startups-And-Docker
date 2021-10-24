# Ocserv

文档最后更新时间: {docsify-updated}

## 简介

OpenConnect VPN服务端

## EXPOSE

| 端口 | 用途 |
| :--- | :--- |
| 443/TCP | 通讯端口 |
| 443/UDP | 通讯端口 |



## 前置准备

```bash
#创建数据保存目录
mkdir -p ${NFS}/ocserv/certs
chmod 777 -R ${NFS}/ocserv

#生成配置文件
docker run -d \
--name ocserv \
-e VPN_DOMAIN=sec.${DOMAIN} \
-e VPN_NETWORK=10.8.8.0 \
-e VPN_NETMASK=255.255.255.0 \
-e LAN_NETWORK=172.16.0.0 \
-e LAN_NETMASK=255.255.0.0 \
-e VPN_USERNAME=admin \
-e VPN_PASSWORD=password \
--cap-add NET_ADMIN \
-v ${NFS}/ocserv/certs:/etc/ocserv/certs \
icodex/docker-ocserv

#备份配置文件
docker cp ocserv:/etc/ocserv/ocserv.conf $NFS/ocserv/
docker cp ocserv:/etc/ocserv/ocpasswd $NFS/ocserv/

#删除实例
docker rm -f ocserv
```

## 启动命令

<!-- tabs:start -->
#### **Docker**
```bash
docker run -d \
--name ocserv \
--restart unless-stopped \
-e VPN_DOMAIN=sec.${DOMAIN} \
-p 9872:443 \
-v ${NFS}/ocserv/certs:/etc/ocserv/certs \
-v ${NFS}/ocserv/ocserv.conf:/etc/ocserv/ocserv.conf \
-v ${NFS}/ocserv/ocpasswd:/etc/ocserv/ocpasswd \
icodex/docker-ocserv
```


#### **Swarm**
```bash
docker service create --replicas 1 \
--name ocserv \
--network staging \
-e TZ=Asia/Shanghai \
-e VPN_DOMAIN=sec.${DOMAIN} \
-p 9872:443 \
--cap-add NET_ADMIN \
--mount type=bind,src=${NFS}/ocserv/certs,dst=/etc/ocserv/certs \
--mount type=bind,src=${NFS}/ocserv/ocserv.conf,dst=/etc/ocserv/ocserv.conf \
--mount type=bind,src=${NFS}/ocserv/ocpasswd,dst=/etc/ocserv/ocpasswd \
icodex/docker-ocserv
```


#### **Compose**
```
ocserv:
  image: icodex/docker-ocserv
  ports:
    - "443:443/tcp"
    - "443:443/udp"
  volumes:
    - ${NFS}/ocserv/certs:/etc/ocserv/certs
    - ${NFS}/ocserv/ocserv.conf:/etc/ocserv/ocserv.conf
    - ${NFS}/ocserv/ocpasswd:/etc/ocserv/ocpasswd
  environment:
    - VPN_DOMAIN=sec.${DOMAIN}
    - VPN_PORT=443
    - VPN_NETWORK=10.8.8.0
    - VPN_NETMASK=255.255.255.0
    - LAN_NETWORK=172.16.0.0
    - LAN_NETMASK=255.255.0.0
    - VPN_USERNAME=admin
    - VPN_PASSWORD=password
  cap_add:
    - NET_ADMIN
  restart: always
```

<!-- tabs:end -->



## 参考

