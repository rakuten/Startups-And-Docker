# YApi

本页最后更新时间: {docsify-updated}

## 简介

默认超级管理员帐号  
  admin@admin.com，密码 ymfe.org  


## EXPOSE

| 端口 | 用途 |
| :--- | :--- |
| 3000 | 管理页面 |



## 前置准备

1. [部署MongoDB](../database/mongodb/)
2. 创建用户

```bash
#进入相应的MongoDB容器：
docker exec -it 容器ID /bin/bash
# 进入mongo数据库
mongo
# 首先切换到admin数据库下
use admin
# 登录admin帐号
db.auth("admin","Test123456")
# 切换到yapi数据库下
use yapi
# 创建一个用户yapi, 密码是Hello123
# user: 用户名 
# pwd: 密码明文 
# role: 用户角色 db: 该用户将创建到哪个数据库中
db.createUser({
    user: 'yapi',
    pwd: 'Hello123',
    roles: [{role: 'readWrite', db: 'yapi'}]
});
# 测试下是否正确
db.auth("yapi", "Hello123");
1 # 返回1表示正确
# 退出MongoDB
exit
# 退出容器
exit
```

  3.安装YApi

```bash
docker service create --replicas 1 \
--name yapi-i \
--network staging \
-e YAPI_DB_SERVERNAME=mongo \
-e YAPI_DB_USER=yapi \
-e YAPI_DB_PASS=Hello123 \
xiao0yy/yapi-docker run install-server
```

## 启动命令

<!-- tabs:start -->
#### **Docker**



#### **Swarm**
    docker service create --replicas 1 \
    --name yapi \
    --network staging \
    -e YAPI_CLOSE_REGISTER=false \
    -e YAPI_DB_SERVERNAME=mongo \
    -e YAPI_DB_USER=yapi \
    -e YAPI_DB_PASS=Hello123 \
    -e YAPI_PLUGINS="[{\"name\":\"oauth2\",\"options\":{}}, \
    {\"name\":\"interface-oauth2-token\",\"options\":{}}, \
    {\"name\":\"notifier\",\"options\":{}}, \
    {\"name\":\"pl-test-dashboard\",\"options\":{}}, \
    {\"name\":\"response-to-ts\",\"options\":{}}, \
    {\"name\":\"proxy-jkdh\",\"options\":{}}]" \
    xiao0yy/yapi-docker


    #traefik参数
    --label traefik.enable=true \
    --label traefik.docker.network=staging \
    --label traefik.http.routers.yapi.rule="Host(\`yapi.${DOMAIN}\`)" \
    --label traefik.http.routers.yapi.entrypoints=http \
    --label traefik.http.services.yapi.loadbalancer.server.port=3000 \

<!-- tabs:end -->

##  参考

Docker说明: [https://github.com/xiao0yy/yapi-docker](https://github.com/xiao0yy/yapi-docker)  
OAuth2插件: [https://github.com/xwxsee2014/yapi-plugin-oauth2](https://github.com/xwxsee2014/yapi-plugin-oauth2)

