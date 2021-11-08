# 初始环境



## 环境变量

> 以后在启动容器时会我们会大量用到这些环境变量

```text
#创建存储位置(可以用网络位置，这里我们先使用本地磁盘目录代替了)
#数据卷也是一个选择，但我倾向把数据直接存到NAS上去
mkdir /nfs

#设置数据路径
NFS=/nfs

#设置域名变量，请填写自己的域名
#如果你有多个域名这一步可以略过
DOMAIN=mytrade.fun

#修改系统参数
echo 'NFS=/nfs\\nDOMAIN=mytrade.fun'>>/etc/profile
```

## 创建Bridge网络

> 同网络内的Docker容器可以通过由`--name`参数指定的名称互相访问到

```bash
docker network create -d bridge backend
```

## 初始化Swarm

> 即使只有一台服务器我依然强烈推荐使用Swarm，因为在容器进行版本升级时可以让你使用滚动升级功能。

```text
docker swarm init
```

## 创建Overlay网络

> 同网络内的Swarm容器可以通过由`--name`参数指定的名称互相访问到
> \(默认的overlay网络带有隔离,Swarm无法用`--name`参数指定的名称调用同网络容器\)

```text
docker network create -d overlay staging
```

