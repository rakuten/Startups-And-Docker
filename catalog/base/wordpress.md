# Wordpress

本页最后更新时间: {docsify-updated}

## 简介



## EXPOSE

| 端口 | 用途 |
| :--- | :--- |
| 80 | HTTP |



## 前置准备

```bash
#创建数据保存目录
mkdir ${NFS}/wordpress
```

## 启动命令

<!-- tabs:start -->
#### **Docker**
```bash
docker run -d \
--name wordpress \
--net backend \
-p 80:80 \
-e TZ=Asia/Shanghai \
-e WORDPRESS_DB_HOST=mysql \
-e WORDPRESS_DB_USER=root \
-e WORDPRESS_DB_PASSWORD=Test123456 \
-v ${NFS}/wordpress:/var/www/html \
wordpress
```


#### **Swarm**
```text
docker service create --replicas 1 \
--name wordpress \
--network staging \
-p 80:80 \
-e TZ=Asia/Shanghai \
-e WORDPRESS_DB_HOST=mysql \
-e WORDPRESS_DB_USER=root \
-e WORDPRESS_DB_PASSWORD=Test123456 \
--mount type=bind,src=${NFS}/wordpress,dst=/var/www/html \
wordpress
```

<!-- tabs:end -->



## 参考

官网: [https://wordpress.org/](https://wordpress.org/)

