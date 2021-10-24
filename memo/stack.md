# Docker Stack 常用命令

```text
#启动一个Stack
docker stack deploy -c docker-compose.yml stackdemo

#查看指定实例
docker stack services stackdemo

#删除指定Stack的所有实例
docker stack rm stackdemo
```

