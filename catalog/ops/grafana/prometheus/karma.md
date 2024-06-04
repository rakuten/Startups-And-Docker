# Karma

本页最后更新时间: {docsify-updated}

## 简介

![](karma.png)

AlertManager自身的UI缺乏做为仪表板的功能，在告警消息的展示这方面一直是个痛点。而Karma即是为了解决这个需求而出现的，它可以聚合多个AlertManager的消息，并以看板的方式直观地展示给用户，高效且方便。

## EXPOSE

| 端口 | 用途 |
| :--- | :--- |
| 8080 | 管理页面 |



## 启动命令

<!-- tabs:start -->

#### **Docker**

```bash
$ docker run -d \
--name karma  \
--net=backend \
--restart always \
-p 8080:8080 \
-e TZ=Asia/Shanghai \
-e ALERTMANAGER_URI=https://<alertmanager_address> \
ubuntu/karma:0.120-22.04
```



#### **Swarm**

```bash
docker service create --replicas 1 \
--name karma \
--network staging \
-e TZ=Asia/Shanghai \
-p 8080:8080 \
-e ALERTMANAGER_URI=https://<alertmanager_address> \
ubuntu/karma:0.120-22.04
```




<!-- tabs:end -->



## 参考

官网:https://karma-dashboard.io

Github:https://github.com/prymitive/karma
