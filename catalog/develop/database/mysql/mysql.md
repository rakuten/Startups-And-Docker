# MySQL

本页最后更新时间: {docsify-updated}

## 简介



## EXPOSE

| 端口 | 用途 |
| :--- | :--- |
| 3306 | 通讯端口 |



## 前置准备

```bash
#创建数据保存目录
mkdir ${NFS}/mysql

#将密码保存进Docker Secret
echo 'Test123456' | docker secret create mysql_pwd -
```

## 启动命令

<!-- tabs:start -->
#### **Docker**
```bash
docker run -d \
--name mysql \
--restart unless-stopped \
--net backend \
-p 3306:3306 \
-e TZ=Asia/Shanghai \
--secret mysql_pwd \
-e MYSQL_ROOT_PASSWORD_FILE=/run/secrets/mysql_pwd \
-v ${NFS}/mysql:/var/lib/mysql \
mysql \ 
--lower_case_table_names=1 \
--character-set-server=utf8mb4 \
--collation-server=utf8mb4_unicode_ci
```


#### **Swarm**
```bash
docker service create --replicas 1 \
--name mysql \
--network staging \
-p 3306:3306 \
-e TZ=Asia/Shanghai \
--secret mysql_pwd \
-e MYSQL_ROOT_PASSWORD_FILE=/run/secrets/mysql_pwd \
--mount type=bind,src=${NFS}/mysql,dst=/var/lib/mysql \
--label traefik.enable=false \
mysql \ 
--lower_case_table_names=1 \
--character-set-server=utf8mb4 \
--collation-server=utf8mb4_unicode_ci
```

#### **Compose**

```bash
version: '3'
services:
  mysql:
    environment:
      - TZ=Asia/Shanghai
      - MYSQL_DATABASE=root
      - MYSQL_ROOT_PASSWORD=password
    ports:
      - "3306:3306"
    restart: always
    command: [
      '--lower_case_table_names=1',
      '--character-set-server=utf8mb4',
      '--collation-server=utf8mb4_unicode_ci',
    ]
```



<!-- tabs:end -->

> lower\_case\_table\_names参数可忽略表名大小写，Windows平台程序员常用

##  参考

