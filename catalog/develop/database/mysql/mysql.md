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
echo 'Test123456' | docker secret create MYSQL_PWD -
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
--secret MYSQL_PWD \
-e MYSQL_ROOT_PASSWORD_FILE=/run/secrets/MYSQL_PWD \
-v ${NFS}/mysql:/var/lib/mysql \
mysql --lower_case_table_names=1
```


#### **Swarm**
```bash
docker service create --replicas 1 \
--name mysql \
--network staging \
-p 3306:3306 \
-e TZ=Asia/Shanghai \
--secret MYSQL_PWD \
-e MYSQL_ROOT_PASSWORD_FILE=/run/secrets/MYSQL_PWD \
--mount type=bind,src=${NFS}/mysql,dst=/var/lib/mysql \
--label traefik.enable=false \
mysql --lower_case_table_names=1
```

<!-- tabs:end -->

> lower\_case\_table\_names参数可忽略表名大小写，Windows平台程序员常用

##  参考

