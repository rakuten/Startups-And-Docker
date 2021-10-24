# Docker Secret 常用命令

## 说明

从Docker 1.13开始在集群状态下可以使用Secret来保存敏感数据\(密码，证书，文件\)



## 用法

```text
#设置密码
printf "Test123456" | docker secret create MYSQL_PWD -
##或
echo 'Test123456' | docker secret create MYSQL_PWD -

##使用时在docker运行命令时添加以下参数
--secret MYSQL_PWD \
-e MYSQL_PASSWORD_FILE=/run/secrets/MYSQL_PWD \



#查看密码列表
docker secret ls
```

## 

## 参考

[https://docs.docker.com/engine/swarm/secrets/](https://docs.docker.com/engine/swarm/secrets/)

