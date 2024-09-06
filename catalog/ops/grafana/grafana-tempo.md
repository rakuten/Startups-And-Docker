# Grafana/Tempo

本页最后更新时间: {docsify-updated}

[![GitHub Release](https://img.shields.io/github/release/grafana/tempo.svg)](https://github.com/grafana/tempo/releases/latest)

## 简介

与 Grafana，Prometheus 和 Loki 深度集成分布式跟踪后端，可以使用 Jaeger，Zipkin，OpenCensus 和 OpenTelemetry 中的任何一个追踪协议。

Tempo配置相对比较复杂，你可以通过\[[官方范例](https://github.com/grafana/tempo/tree/main/example/docker-compose)\]获得所有配置文件参数及docker-compose文件。

## EXPOSE

| 端口 | 用途 |
| :--- | :--- |
| 16686 | WEB管理页面 |
| 3200 | HTTP数据查询端口 |
| 9095 | gRPC数据查询端口 |
| 55680 | OpenTelemetry gRPC |
| 55681 | OpenTelemetry HTTP |
| 6831 | Jaeger - Thrift Compact |
| 6832 | Jaeger - Thrift Binary |
| 14268 | Jaeger - Thrift HTTP |
| 14250 | Jaeger - gRPC |
| 9411 | Zipkin |

## 前置准备

```bash
#创建数据保存目录
mkdir ${NFS}/tempo
mkdir /tmp/tempo
chmod 777 /tmp/tempo

#下载配置文件
wget -O ${NFS}/tempo/tempo-local.yaml https://raw.githubusercontent.com/grafana/intro-to-mltp/main/tempo/tempo.yaml
```

## 启动命令

<!-- tabs:start -->
#### **Docker**



#### **Swarm**
```bash
docker service create --replicas 1 \
--name tempo \
--network staging \
-e TZ=Asia/Shanghai \
-p 14268:14268 \
--mount type=bind,src=${NFS}/tempo/tempo-local.yaml,dst=/etc/tempo.yaml \
--mount type=bind,src=/tmp/tempo,dst=/tmp/tempo \
--log-driver=loki \
--log-opt loki-url="http://loki:3100/api/prom/push" \
--label traefik.enable=false \
grafana/tempo \
--config.file='/etc/tempo.yaml'


#Traefik添加追踪变量(需重启)
--tracing.jaeger=true
--tracing.jaeger. gen128Bit=true
--tracing.jaeger.collector.endpoint=http://tempo.${DOMAIN}:14268/api/traces?format=jaeger.thrift

```

<!-- tabs:end -->

## 参考

官网: [https://grafana.com/oss/tempo/](https://grafana.com/oss/tempo/)  
官方文档: [https://grafana.com/docs/tempo/latest/](https://grafana.com/docs/tempo/latest/)  
Github: [https://github.com/grafana/tempo](https://github.com/grafana/tempo)  
配置范例: [https://github.com/grafana/tempo/tree/main/operations/tempo-mixin/yamls](https://github.com/grafana/tempo/tree/main/operations/tempo-mixin/yamls)

