# Verdaccio

本页最后更新时间: {docsify-updated}

## 简介

Verdaccio 是一个 Node.js创建的轻量级私有npm proxy registry
它forked于sinopia@1.4.0并且100% 向后兼容，sinopia是最初的搭建私有npm的选择，不过已经好多年不维护了，而verdaccio则是从sinopia衍生出来并且一直在维护中的，所以现在看来，verdaccio是一个更好的选择。

![](../../images/verdaccio.png)

## EXPOSE

| 端口 | 用途 |
| :--- | :--- |
| 4873 | 管理页面 |



## 前置准备

```bash
#创建数据保存目录
mkdir $NFS/verdaccio
chmod 777 $NFS/verdaccio
```

## 启动命令

<!-- tabs:start -->
#### **Docker**
```bash
docker run -d \
--restart unless-stopped \
--network=backend \
--name verdaccio \
-p 4873:4873 \
-v $NFS/verdaccio:/verdaccio/storage \
verdaccio/verdaccio
```


#### **Swarm**
```bash
docker service create --replicas 1 \
--name verdaccio \
--network staging \
-e TZ=Asia/Shanghai \
-p 4873:4873 \
--mount type=bind,src=${NFS}/verdaccio,dst=/verdaccio/storage \
--label traefik.enable=false \
verdaccio/verdaccio
```

<!-- tabs:end -->

```yaml
设置代理的命令：
npm config set strict-ssl false    关闭npm的https；
npm config set registry "http://verdaccio:4873/"     设置npm的获取地址
```



## 参考



