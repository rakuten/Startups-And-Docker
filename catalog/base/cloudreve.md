
# Cloudreve

文档最后更新时间: {docsify-updated}

## 简介

出色的国产开源网盘程序，除了可以将网盘文件储存在服务器本机硬盘之外，它还能快速对接国内外多家云存储平台，将文件储存到腾讯云 COS、阿里云 OSS、七牛、又拍云、亚马逊 AWS S3、OneDrive。

虽然只有网页版，但支持WebDAV，可通过第三方客户端登录使用。

另外还有Cloudreve Pro为收费版本，价格为299元/域名，提供积份充值、下载计费、激活码及QQ登录等功能。

## EXPOSE

| 端口 | 用途 |
| :--- | :--- |
| 5212 | 管理页面 |



## 前置准备

```bash
mkdir -p ${NFS}/cloudreve/uploads
mkdir -p ${NFS}/cloudreve/config
mkdir -p ${NFS}/cloudreve/db
mkdir -p ${NFS}/cloudreve/avatar
```

## 启动命令

<!-- tabs:start -->
#### **Docker**
```bash
docker run -d \
--name cloudreve \
-p 5212:5212 \
--restart=unless-stopped \
-v ${NFS}/cloudreve/uploads:/cloudreve/uploads \
-v ${NFS}/cloudreve/config:/cloudreve/config \
-v ${NFS}/cloudreve/db:/cloudreve/db \
-v ${NFS}/cloudreve/avatar:/cloudreve/avatar \
xavierniu/cloudreve
```


#### **Swarm**
```bash
docker service create --replicas 1 \
--name cloudreve \
--network staging \
--mount type=bind,src=${NFS}/cloudreve/uploads,dst=/cloudreve/uploads \
--mount type=bind,src=${NFS}/cloudreve/config,dst=/cloudreve/config \
--mount type=bind,src=${NFS}/cloudreve/db,dst=/cloudreve/db \
--mount type=bind,src=${NFS}/cloudreve/avatar,dst=/cloudreve/avatar \
xavierniu/cloudreve

#traefik参数
--label traefik.enable=true \
--label traefik.docker.network=staging \
--label traefik.http.services.pan.loadbalancer.server.port=5212 \
--label traefik.http.routers.pan.rule="Host(\`pan.${DOMAIN}\`)" \
--label traefik.http.routers.pan.entrypoints=http \
--label traefik.http.routers.pan-sec.tls=true \
--label traefik.http.routers.pan-sec.tls.certresolver=dnsResolver \
--label traefik.http.routers.pan-sec.rule="Host(\`pan.${DOMAIN}\`)" \
--label traefik.http.routers.pan-sec.entrypoints=https \
```

<!-- tabs:end -->

* 查看初始密码

```bash
docker service logs cloudreve
```

* 修改默认数据库位置，然后重启

```bash
# vi ${NFS}/cloudreve/config/conf.ini
# 向下追加
[Database]
DBFile = /cloudreve/db/cloudreve.db

docker service update --image xavierniu/cloudreve cloudreve
```

* 
## 参考

配置文件参考: [https://docs.cloudreve.org/getting-started/config](https://docs.cloudreve.org/getting-started/config)

