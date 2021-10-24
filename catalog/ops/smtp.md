# SMTP

本页最后更新时间: {docsify-updated}

## 简介

自建SMTP服务，可为其它容器提供邮件通知功能，也可加快公司内网邮件发送速度

### 环境变量

容器接受`RELAY_NETWORKS`环境变量，并必须以:开头，如  
  
__`:192.168.0.0/24:192.168.0.0/24:10.0.0.0/16`

容器接受`KEY_PATH`和`CERTIFICATE_PATH`环境变量，如果提供的服务将启用TLS支持。路径必须指向公开卷上的密钥和证书文件。密钥将被复制到容器位置。

容器接受`MAILNAME`将设置外发邮件主机名的环境变量。

容器还接受`PORT`环境变量，以设置邮件守护程序将在容器内侦听的端口。默认端口是`25`.

容器接受`BIND_IP`和`BIND_IP6`环境变量。默认值为`0.0.0.0`和`::0`。

要禁用 IPV6，您可以将`DISABLE_IPV6`环境变量设置为任何值。

容器接受`OTHER_HOSTNAMES`环境变量，该变量将设置该机器应将自己视为最终目的地的域列表。

### 以下是使用此容器的场景

#### 作为 SMTP 服务器

您不需要指定任何环境变量来启动它。

#### 作为辅助 SMTP 服务器

指定“RELAY\_DOMAINS”以设置应接受哪些域以转发到距离更短的 MX 服务器。

格式是 `<domain1> : <domain2> : <domain3> etc`

#### 作为 Gmail 中继

您需要设置`GMAIL_USER`并`GMAIL_PASSWORD`才能使用它。

#### 作为亚马逊 SES 中继

您需要设置`SES_USER`并`SES_PASSWORD`才能使用它。  
您也可以通过设置来覆盖 SES 区域`SES_REGION`。如果您使用 Google Compute Engine，您还应该设置`SES_PORT`为 2587。

#### 作为通用 SMTP 中继

您还可以使用任何带有身份验证的通用 SMTP 服务器作为智能主机。  
你需要设置`SMARTHOST_ADDRESS`，`SMARTHOST_PORT`（连接参数）`SMARTHOST_USER`，`SMARTHOST_PASSWORD`（认证参数）和`SMARTHOST_ALIASES`：这是一个以分号作为间隔的身份验证数据列表。  
&gt; 

> 范例:
>
> * SMARTHOST\_ADDRESS=mail.mysmtp.com
> * SMARTHOST\_PORT=587
> * SMARTHOST\_USER=myuser
> * SMARTHOST\_PASSWORD=secret
> * SMARTHOST\_ALIASES=\*.mysmtp.com

### 标签和拱门

## EXPOSE

| 端口 | 用途 |
| :--- | :--- |
| 25 | 通讯端口 |



## 启动命令

<!-- tabs:start -->
#### **Docker**
```bash
docker run -d\
--restart unless-stopped \
--network=backend \
-e TZ=Asia/Shanghai \
--name smtp \
-p 25:25 \
ixdotai/smtp
```


#### **Swarm**
```bash
docker service create --replicas 1 \
--name smtp \
--network staging \
-e TZ=Asia/Shanghai \
ixdotai/smtp
```

<!-- tabs:end -->



##  参考

Github: [https://github.com/ix-ai/smtp](https://github.com/ix-ai/smtp)

