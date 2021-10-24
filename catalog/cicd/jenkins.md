# Jenkins

本页最后更新时间: {docsify-updated}

## 简介



## EXPOSE

| 端口 | 用途 |
| :--- | :--- |
| 8080 | 管理页面 |
| 50000 |  |



## 前置准备

```bash
#创建数据保存目录
mkdir ${NFS}/jenkins
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
-v ${NFS}/jenkins:/var/jenkins_home \
jenkins/jenkins:alpine
```


#### **Swarm**
```bash
docker service create --replicas 1 \
--name jenkins \
--network staging \
-e TZ=Asia/Shanghai \
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



##  参考

官网: [https://www.jenkins.io/](https://www.jenkins.io/)

