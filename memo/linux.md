# Linux 常用命令

* 用户管理

```bash
#添加新用户
#-d 指定用户home目录
#-s 指定shell(rbash为受限shell,不能切换目录)
sudo useradd -m 用户名 -g 组名 -d /home/用户名 -s /bin/rbash
sudo passwd 密码

#查看uid
id 用户名

#修改用户home目录
usermod -d /usr/newfolder -u {uid}

#删除帐号
userdel 用户名
```

* 挂载新硬盘

```bash
# 查看挂载情况 
df -h

# 查看硬盘情况
fdisk -l

# 格式化硬盘
mkfs.ext4 /dev/vdb

# 创建挂载目录
mkdir /mnt/data

# 挂载硬盘到目录
mount /dev/vdb /mnt/data

# 设置重启后自动挂载
echo '/dev/vdb /mnt/data ext4 defaults 0 0' >> /etc/fstab

# 查看自动挂载是否生效
cat /etc/fstab
```

* 进程管理

```bash
## 找到进程的pid
ps -ef|grep 程序名

## 查看该进程的状态
top -p 进程id

## 每隔1秒查看进程状态，总共10次的数据
pidstat 1 10
```

* 更改DNS Server

```bash
vi /etc/resolv.conf
#nameserver 8.8.8.8

systemctl restart networking
```

* 共享管理

```bash
#安装cifs模块
apt-get i cifs-utils

#查看cifs模块信息
modinfo cifs

#挂载Windows目录
sudo mount -t cifs -o username=guest,password="",dir_mode=0777,file_mode=0777,iocharset=utf8,vers=3.0,sec=ntlm,noexec,auto,rw //192.168.0.54/DataDisk /mnt/share

#vi /etc/fstab
//192.168.0.54/DataDisk /mnt/share cifs username=guest,password=,dir_mode=0777,file_mode=0777,iocharset=utf8,vers=3.0,sec=ntlm,noexec,auto,rw,users 0 0
```

- 修改文件

```
# 将两个文件的差异输出到指定文件
diff -u lib/engine.js /tmp/engine.js > engine.patch

# 将差异合并回源文件
patch -p3 < engine.patch lib/engine.js
```

- 日志管理

```bash
# 查看系统内核日志
journalctl -k

# 查看服务日志
journalctl -u 服务名

# 查看日志磁盘占用量
journalctl --disk-usage

# 2d之前的自动删除旧的
journalctl --vacuum-time=2d

# 大于500M后自动删除旧的
journalctl --vacuum-size=500M

# 修改日志设置
/etc/systemd/journald.conf
SystemMaxUse=16M
ForwardToSyslog=no

# 重启日志服务
systemctl restart systemd-journald.service
```
