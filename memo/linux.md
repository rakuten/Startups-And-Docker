# Linux 常用命令

* 用户管理

```bash
#添加新用户
#-d 指定用户home目录
#-s 指定shell(rbash为受限shell,不能切换目录)
sudo useradd -m 用户名 -g 组名 -d /home/用户名 -s /bin/rbash
sudo passwd 密码


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
#挂载Windows目录
sudo mount -t cifs -o username=guest,password="",dir_mode=0777,file_mode=0777,iocharset=utf8,vers=3.0,sec=ntlm,noexec,auto,rw //192.168.0.54/DataDisk /mnt/share2

#vi /etc/fstab
//192.168.0.54/DataDisk /mnt/share2 cifs username=guest,password=,dir_mode=0777,file_mode=0777,iocharset=utf8,vers=3.0,sec=ntlm,noexec,auto,rw,users 0 0
```

