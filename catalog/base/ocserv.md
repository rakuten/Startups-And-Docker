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
-e SRV_CN=sec.${DOMAIN} \
-e SRV_ORG=${DOMAIN} \
-e VPN_DOMAIN=sec.${DOMAIN} \
-e VPN_NETWORK=10.8.8.0 \
-e VPN_NETMASK=255.255.255.0 \
-e LAN_NETWORK=172.16.120.0 \
-e LAN_NETMASK=255.255.255.0 \
-e VPN_USERNAME=admin \
-e VPN_PASSWORD=password \
--cap-add NET_ADMIN \
stilleshan/ocserv

#备份配置文件
docker cp ocserv2:/etc/ocserv/ocserv.conf $NFS/ocserv/ocserv.conf
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
--privileged \
--sysctl=net.ipv4.ip_forward=1 \
-e SRV_CN=sec.${DOMAIN} \
-e SRV_ORG=${DOMAIN} \
-e VPN_DOMAIN=sec.${DOMAIN} \
-e VPN_PORT=443 \
-e VPN_NETWORK=10.8.8.0 \
-e VPN_NETMASK=255.255.255.0 \
-e LAN_NETWORK=172.16.120.0 \
-e LAN_NETMASK=255.255.255.0 \
-e VPN_USERNAME=admin \
-e VPN_PASSWORD=password \
-p 9872:443 \
-p 9872:443/udp \
-v ${NFS}/ocserv:/etc/ocserv \
stilleshan/ocserv
```

#### **Swarm**

```bash
docker service create --replicas 1 \
--name ocserv \
--network staging \
-e TZ=Asia/Shanghai \
-e VPN_DOMAIN=sec.${DOMAIN} \
-e VPN_PORT=443 \
-e VPN_NETWORK=10.8.8.0 \
-e VPN_NETMASK=255.255.255.0 \
-e LAN_NETWORK=172.16.120.0 \
-e LAN_NETMASK=255.255.255.0 \
-e VPN_USERNAME=admin \
-e VPN_PASSWORD=password \
-p 9872:443 \
-p 9872:443/udp \
--cap-add NET_ADMIN \
--sysctl=net.ipv4.ip_forward=1 \
--security-opt=no-new-privileges \
--mount type=bind,src=${NFS}/ocserv/certs,dst=/etc/ocserv/certs \
--mount type=bind,src=${NFS}/ocserv/ocserv.conf,dst=/etc/ocserv/ocserv.conf \
--mount type=bind,src=${NFS}/ocserv/ocpasswd,dst=/etc/ocserv/ocpasswd \
stilleshan/ocserv
```


#### **Compose**
```
ocserv:
  image: stilleshan/ocserv
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
    - LAN_NETWORK=172.16.120.0
    - LAN_NETMASK=255.255.255.0
    - VPN_USERNAME=admin
    - VPN_PASSWORD=password
  cap_add:
    - NET_ADMIN
  restart: always
```

<!-- tabs:end -->

### 备用命令

```bash
# 创建一个新用户
docker exec -ti ocserv ocpasswd -c /etc/ocserv/ocpasswd [用户名]

# 删除test用户
docker exec -ti ocserv ocpasswd -c /etc/ocserv/ocpasswd -d [用户名]

# 添加用户到组:
docker exec -ti ocserv ocpasswd -c /etc/ocserv/ocpasswd -g [组名] [用户名]

# 锁定用户:
docker exec -ti ocserv ocpasswd -c /etc/ocserv/ocpasswd -l [用户名]

# 解锁用户:
docker exec -ti ocserv ocpasswd -c /etc/ocserv/ocpasswd -u [用户名]

```

## 参考

