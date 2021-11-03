# Grafana/Loki

本页最后更新时间: {docsify-updated}

[![GitHub Release](https://img.shields.io/github/release/grafana/loki.svg)](https://github.com/grafana/loki/releases/latest)

## 简介

`Loki`是 Grafana Labs 团队最新的开源项目，是一个水平可扩展，高可用性，多租户的日志聚合系统。它的设计非常经济高效且易于操作，因为它不会为日志内容编制索引，而是为每个日志流编制一组标签。项目受 Prometheus 启发，官方的介绍就是：`Like Prometheus, but for logs.`，类似于 Prometheus 的日志系统。

Loki 由以下3个部分组成：

* `loki`是主服务器，负责存储日志和处理查询。
* `promtail`是监控，负责收集日志并将其发送给 loki 。
* `Grafana`用于 UI 展示。

Loki支持以下应用作为日志数据发送方

官方支持:

* [Promtail](https://grafana.com/docs/loki/latest/clients/promtail/)
* [Docker Driver](https://grafana.com/docs/loki/latest/clients/docker-driver/)
* [Fluentd](https://grafana.com/docs/loki/latest/clients/fluentd/)
* [Fluent Bit](https://grafana.com/docs/loki/latest/clients/fluentbit/)
* [Logstash](https://grafana.com/docs/loki/latest/clients/logstash/)
* [Lambda Promtail](https://grafana.com/docs/loki/latest/clients/lambda-promtail/)

第三方支持:

* [promtail-client](https://github.com/afiskon/promtail-client) \(Go\)
* [push-to-loki.py](https://github.com/sleleko/devops-kb/blob/master/python/push-to-loki.py) \(Python 3\)
* [Serilog-Sinks-Loki](https://github.com/JosephWoodward/Serilog-Sinks-Loki) \(C\#\)
* [loki-logback-appender](https://github.com/loki4j/loki-logback-appender) \(Java\)
* [Log4j2 appender for Loki](https://github.com/tkowalcz/tjahzi) \(Java\)
* [LokiLogger.jl](https://github.com/fredrikekre/LokiLogger.jl) \(Julia\)



## EXPOSE

| 端口 | 用途 |
| :--- | :--- |
| 3100 | 管理入口 |



## 前置准备

1.[部署ETCD](../../etcd.md) \(可选，用于保存索引\)

2.[部署Minio](../../../images-base/minio.md) \(可选，用于远端保存数据\)

3.项目配置

```bash
#创建数据保存目录
mkdir -p ${NFS}/loki/data
chmod 777 ${NFS}/loki/data

#安装Docker插件(可获取容器log)
docker plugin install grafana/loki-docker-driver:latest --alias loki --grant-all-permissions

#下载配置文件
wget -O ${NFS}/loki/local-config.yaml https://raw.githubusercontent.com/grafana/loki/main/cmd/loki/loki-docker-config.yaml
```

## 启动命令

<!-- tabs:start -->
#### **Docker**



#### **Swarm**
```bash
docker service create --replicas 1 \
--name loki \
--network staging \
-e TZ=Asia/Shanghai \
--mount type=bind,src=${NFS}/loki/data,dst=/loki \
--mount type=bind,source=${NFS}/loki/local-config.yaml,target=/etc/loki/local-config.yaml \
-e JAEGER_AGENT_HOST=tempo \
-e JAEGER_ENDPOINT="http://tempo:14268/api/traces" \
-e JAEGER_SAMPLER_TYPE=const \
-e JAEGER_SAMPLER_PARAM=1 \
--label traefik.enable=false \
--log-driver=loki \
--log-opt loki-url="http://loki.${DOMAIN}:3100/loki/api/v1/push" \
grafana/loki:2.3.0
```

<!-- tabs:end -->

在Grafana中添加Loki数据源，然后在Explore中查看收集到的日志信息

## 参考

官网文档:[https://grafana.com/docs/loki/latest/](https://grafana.com/docs/loki/latest/)  
Github: [https://github.com/grafana/loki](https://github.com/grafana/loki)  
DockerHub: [https://hub.docker.com/r/grafana/loki/](https://hub.docker.com/r/grafana/loki/)

