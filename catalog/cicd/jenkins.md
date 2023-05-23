# Jenkins

本页最后更新时间: {docsify-updated}

## 简介

[![GitHub Release](https://img.shields.io/github/release/jenkinsci/jenkins.svg)](https://github.com/jenkinsci/jenkins/releases/latest)

## EXPOSE

| 端口 | 用途 |
| :--- | :--- |
| 8080 | 管理页面 |
| 50000 | Agent |



## 前置准备

```bash
#创建数据保存目录
mkdir ${NFS}/jenkins
chmod 777 ${NFS}/jenkins
```

## 启动命令

<!-- tabs:start -->
#### **Docker**
```bash
docker run -d \
--name jenkins \
--restart unless-stopped \
--network=backend \
-e TZ=Asia/Shanghai \
-p 8080:8080 \
-p 50000:50000 \
-u root \
-v /var/run/docker.sock:/var/run/docker.sock \
-v /etc/localtime:/etc/localtime \
-v ${which docker}:/bin/docker \
-v /usr/lib64/libltdl.so.7:/usr/lib/x86_64-linux-gnu/libltdl.so.7 \
-v /var/lib/docker/tmp:/var/lib/docker/tmp \
-v ${NFS}/jenkins:/var/jenkins_home \
jenkins/jenkins:alpine
```


#### **Swarm**
```bash
docker service create --replicas 1 \
--name jenkins \
--network staging \
-e TZ=Asia/Shanghai \
--mount type=bind,src=/etc/localtime,dst=/etc/localtime \
--mount type=bind,src=/var/run/docker.sock,dst=/var/run/docker.sock \
--mount type=bind,src=${which docker},dst=/bin/docker \
--mount type=bind,src=/var/lib/docker/tmp,dst=/var/lib/docker/tmp \
--mount type=bind,src=${NFS}/jenkins,dst=/var/jenkins_home \
jenkins/jenkins:alpine

#traefik参数
--label traefik.enable=true \
--label traefik.docker.network=staging \
--label traefik.http.services.jenkins.loadbalancer.server.port=8080 \
--label traefik.http.routers.jenkins.rule="Host(\`jenkins.${DOMAIN}\`)" \
--label traefik.http.routers.jenkins.entrypoints=http \
--label traefik.http.routers.jenkins-sec.tls=true \
--label traefik.http.routers.jenkins-sec.tls.certresolver=dnsResolver \
--label traefik.http.routers.jenkins-sec.rule="Host(\`jenkins.${DOMAIN}\`)" \
--label traefik.http.routers.jenkins-sec.entrypoints=https \
```

<!-- tabs:end -->

查看初始密码

```bash
cat ${NFS}/jenkins/secrets/initialAdminPassword
```

禁止下载源码 `8080需根据实际端口号更改`

```bash
iptables -A INPUT -p tcp --dport 8080  -m string --string "/ws/" --algo bm -j REJECT --reject-with tcp-reset

#保存进防火墙规则
iptables-save > /etc/sysconfig/iptables
```



##  参考

官网: [https://www.jenkins.io/](https://www.jenkins.io/)
Github: https://github.com/jenkinsci/jenkins

