# MongoDB

本页最后更新时间: {docsify-updated}

## 简介



## EXPOSE

| 端口 | 用途 |
| :--- | :--- |
| 27017 | 通讯端口 |

## 前置准备

```bash
#创建数据保存目录
mkdir ${NFS}/mongo

#将密码保存进Docker Secret
echo 'r00t' | docker secret create MONGO_PWD -
```

## 启动命令

<!-- tabs:start -->
#### **Docker**
```bash
docker run -d \
--name mongo \
--restart unless-stopped \
--net backend \
-v ${NFS}/mongo:/data/db \
--secret MONGO_PWD \
-e MONGO_INITDB_ROOT_USERNAME="mongoadmin" \
-e MONGO_INITDB_ROOT_PASSWORD_FILE=/run/secrets/MONGO_PWD \
-p 27017:27017 \
mongo --auth
```


#### **Swarm**
```bash
docker service create --replicas 1 \
--network staging \
-e TZ=Asia/Shanghai \
--name mongo \
--mount type=bind,src=${NFS}/mongo,dst=/data/db \
--secret MONGO_PWD \
-e MONGO_INITDB_ROOT_USERNAME="admin" \
-e MONGO_INITDB_ROOT_PASSWORD_FILE=/run/secrets/MONGO_PWD \
--label traefik.enable=false \
mongo --auth
```

<!-- tabs:end -->

* 添加新用户

```bash
#进入相应的MongoDB容器：
docker exec -it 容器ID /bin/bash
# 进入mongo数据库
mongo
# 首先切换到admin数据库下
use admin
# 使用管理员帐号
db.auth("admin","r00t")
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
# 退出docker实例
exit
```

* Role角色参数参考：

Read：允许用户读取指定数据库   
readWrite：允许用户读写指定数据库   
dbAdmin：允许用户在指定数据库中执行管理函数，如索引创建、删除，查看统计或访问system.profile userAdmin：允许用户向system.users集合写入，可以找指定数据库里创建、删除和管理用户 clusterAdmin：只在admin数据库中可用，赋予用户所有分片和复制集相关函数的管理权限 readAnyDatabase：只在admin数据库中可用，赋予用户所有数据库的读权限   
readWriteAnyDatabase：只在admin数据库中可用，赋予用户所有数据库的读写权限 userAdminAnyDatabase：只在admin数据库中可用，赋予用户所有数据库的userAdmin权限 dbAdminAnyDatabase：只在admin数据库中可用，赋予用户所有数据库的dbAdmin权限   
root：只在admin数据库中可用。超级账号，超级权限 

**注：**

* admin的作用是管理用户，MongoDB下的每个数据库，用户都被它管理，除此外它基本没什么更多权限做其他事情
* MongoDB没有通常意义的超级用户的概念，yapi库的授权用户只能被admin创建，而admin只能登陆admin数据库

##  参考

教程: [https://www.runoob.com/mongodb/mongodb-tutorial.html](https://www.runoob.com/mongodb/mongodb-tutorial.html)

