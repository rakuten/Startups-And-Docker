# 初始环境

## 环境变量

> 以后在启动容器时会我们会大量用到这些环境变量

```text
#创建存储位置,可以用网络位置，这里我们先直接使用本地磁盘了
#数据卷也是一个选择，但我们倾向把数据直接存到NAS上去
mkdir /nfs

#设置数据路径
NFS=/nfs

#设置域名，请填写自己的域名
#如果你有多个域名这一步可以略过
DOMAIN=mytrade.fun

#修改系统参数 /etc/profile
echo -e 'NFS=/nfs\nDOMAIN=mytrade.fun'>>/etc/profile
```

## 创建Swarm

> 即使只有一台服务器我们依然强烈推荐使用Swarm，因为可以使用滚动升级功能。

```text
docker swarm init
```

## 创建网桥

> 创建一个新的overlay网络\(默认的overlay不带自动发现无法通过--name参数调用到其它容器\)

```text
docker network create -d overlay staging
```

