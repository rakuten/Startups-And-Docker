
> 有些系统默认没有root密码，需先通过'sudo passwd root'先设置root密码


# 打开root远程登录
```bash
sudo cp /etc/ssh/sshd_config /etc/ssh/sshd_config.bak
sudo vi /etc/ssh/sshd_config

#PermitRootLogin prohibit-password //解除注释，prohibit-password改为yes
#PasswordAuthentication yes        //解除注释，密码认证


#重启ssh服务
/etc/init.d/ssh restart
```

#使用root帐号登录

```bash
#debian11后nftables代替了iptables，所以先需要将iptables命令替换为原始版本的iptables
sudo update-alternatives --set iptables /usr/sbin/iptables-legacy
sudo update-alternatives --set ip6tables /usr/sbin/ip6tables-legacy

sudo apt-get update
sudo apt-get install apt-transport-https \
ca-certificates \
curl \
gnupg2  \
software-properties-common
```

### 装docker-ce
```bash
#添加GPG key
#为了确认所下载软件包的合法性，需要添加软件源的 GPG 密钥
sudo curl -fsSL https://mirrors.ustc.edu.cn/docker-ce/linux/debian/gpg | sudo apt-key add -

#安装中科大的docker源(支持arm)
sudo add-apt-repository \
"deb https://mirrors.ustc.edu.cn/docker-ce/linux/debian \
$(lsb_release -cs) \
stable"

#安装docker-ce (必须root帐号安装，不然很麻烦)
sudo apt-get update
sudo apt-get install docker-ce
```

### 6.镜像加速器(有可能会下不到最新的镜像)
打开/etc/docker/daemon.json文件，配置代码如下
```json
{
	"registry-mirrors": ["https://dockerhub.azk8s.cn","https://hub-mirror.c.163.com"],
	//如果想更改docker存储目录，可添加data-root属性
	"data-root":"/mnt/docker_root"
}
```

### Docker运行报错
vi /usr/lib/systemd/system/docker.service

在ExecStart那行末尾添加-H unix:///var/run/docker.sock，让最终结果如下:
ExecStart=/usr/bin/dockerd -H fd:// --containerd=/run/containerd/containerd.sock -H unix:///var/run/docker.sock

systemctl daemon-reload
systemctl restart docker


### 为非root帐号授权使用docker
sudo usermod -aG docker <username>
