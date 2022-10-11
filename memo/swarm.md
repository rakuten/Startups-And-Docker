# Docker Swarm 常用命令

```text
#创建overlay网络(默认的overlay不带自动发现无法通过名称调用到其它容器)
docker network create -d overlay staging

#滚动升级
docker service update --image nginx:stable-alpine nginx

#扩展实例数量
docker service scale nginx=2

#离开当前Swarm
docker swarm leave --force

```



### 将服务运行在指定服务器

```bash
# 先在指定node上创建标签
docker node update --label-add func=minio $HOSTNAME
# 然后在指定node集群上运行服务
docker service create --name my_nginx --constraint 'node.labels.func == nginx' nginx
```

