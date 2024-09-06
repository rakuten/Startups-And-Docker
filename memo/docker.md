# Docker 常用命令

```bash
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


### 开放API

```bash
vi /usr/lib/systemd/system/docker.service
#在 ExecStart=/usr/bin/dockerd 后面直接添加 -H tcp://0.0.0.0:2375
```

> 这个操作会给匿名用户管理docker的权限，为安全考虑需要加SSL认证


### 命令补全

```bash
apt install bash-completion
docker completion bash > /etc/bash_completion.d/docker
source /etc/bash_completion.d/docker
```



### 修改Docker默认IP

- 修改/etc/docker/daemon.json 

```json
"default-address-pools":[
         {"base":"192.55.2.0/16","size":24},
         {"base":"192.55.3.0/16","size":24},
         {"base":"192.55.4.0/16","size":24},
         {"base":"192.55.5.0/16","size":24},
         {"base":"192.55.6.0/16","size":24},
         {"base":"192.55.7.0/16","size":24}
 ],
 "bip": "192.55.1.1/24"
```
> bip 为docker0使用IP段
> default-address-pools 为swarm使用ip段
- 重启docker

```bash
systemctl stop docker
ip link del docker0 down
systemctl daemon-reload
systemctl start docker
```

- 更新docker_gwbridge占用的IP(用于集群通信)
```bash
# 停止swarm所有服务
docker service rm ***
# 离开集群
docker swarm leave --force
# 删除docker_gwbridge
docker network rm docker_gwbridge
# 不能直接用ip link del来删docker_gwbridge，docker会崩

```

  - 方法一: 使用上面预留的192.55.0.0/16 地址段

  >  重新再docker swarm init或docker swarm join

  - 方法二: 使用指定地址段

```bash
docker network create \
--subnet 10.11.0.0/16 \
--opt com.docker.network.bridge.name=docker_gwbridge \
--opt com.docker.network.bridge.enable_icc=false \
--opt com.docker.network.bridge.enable_ip_masquerade=true \
docker_gwbridge
```

