# Docker 常用命令

```text
#设置数据路径
set NFS=/nfs/docker

#创建网桥
docker network create -d bridge backend

#将当前用户加入docker组
sudo usermod -aG docker $USER

#创建数据卷
docker volume create --name 卷名

#清理build时生成的无用中间层
docker rmi $(docker images -f "dangling=true" -q)

#更改目录权限
sudo chown -R 999:docker 目录名

#清理已停止的容器
docker rm $(docker ps -aq)

# 删除所有退出状态的容器
docker container prune 

# 删除未被使用的数据卷
docker volume prune 

# 删除 dangling 及所有未被使用的镜像
docker image prune 

#删除已停止的容器、dangling 镜像、未被容器引用的 network 和构建过程中的 cache
# 安全起见，这个命令默认不会删除那些未被任何容器引用的数据卷，如果需要同时删除这些数据卷，你需要显式的指定 --volumns 参数
docker system prune 

#这次不仅会删除数据卷，而且连确认的过程都没有了！注意，使用 --all 参数后会删除所有未被引用的镜像而不仅仅是 dangling 镜像
docker system prune --all --force --volumns 

# 开启Proxy
/etc/systemd/system/docker.service.d/http-proxy.conf
Environment="HTTP_PROXY=http://ip:port" "NO_PROXY=localhost,*.ibm.com,192.168.0.0/16,127.0.0.1,10.0.0.0/8"
/etc/systemd/system/docker.service.d/https-proxy.conf
Environment="HTTPS_PROXY=https://ip:port" "NO_PROXY=localhost,*.ibm.com,192.168.0.0/16,127.0.0.1,10.0.0.0/8"
 
systemctl show --property=Environment docker
```

