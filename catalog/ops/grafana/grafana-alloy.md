# Grafana/Alloy

本页最后更新时间: {docsify-updated}

[![GitHub Release](https://img.shields.io/github/release/grafana/alloy.svg)](https://github.com/grafana/alloy/releases/latest)

## 简介

![](../images/alloy.jpg)

开源分布式 OpenTelemetry 收集器，同时整合了`Agent、Node-Exporter、Promtail`等功能

## EXPOSE

| 端口 | 用途 |
| :--- | :--- |
| 12345 | 管理页面 |



## 前置准备

```bash
mkdir ${NFS}/alloy
```

<!-- tabs:start -->

### **config.linux**

```json
logging {
  level  = "warn"
  format = "logfmt"
}

tracing {
  sampling_fraction = 0.1
  write_to = [otelcol.processor.batch.default.input]
}

//----- otel ----
otelcol.exporter.otlp "default" {
  client {
    endpoint = env("OTLP_ENDPOINT")
    tls {
        insecure = true
        insecure_skip_verify = true
    }
  }
}
otelcol.processor.batch "default" {
  output {
    metrics = [otelcol.exporter.otlp.default.input]
    logs    = [otelcol.exporter.otlp.default.input]
    traces  = [otelcol.exporter.otlp.default.input]
  }
}

otelcol.processor.attributes "loki" {
  action {
    key = "loki.attribute.labels"
    action = "insert"
    value = "event.domain, event.name"
  }

  action {
    key = "loki.resource.labels"
    action = "insert"
    value = "service.name, service.namespace"
  }

  output {
    logs = [otelcol.processor.batch.default.input]
  }
}


loki.process "local" {
  forward_to = [otelcol.receiver.loki.default.receiver]
  stage.timestamp {
    source = "time"
    format = "RFC3339"
  }
}

//----- prometheus receiver -----
otelcol.receiver.prometheus "default" {
  output {
    metrics = [otelcol.processor.batch.default.input]
  }
}

//----- loki receiver -----
otelcol.receiver.loki "default" {
  output {
    logs = [otelcol.processor.attributes.loki.input]
  }
}

//---- linux system logs ----- 
local.file_match "log_files" {
  path_targets = [
    {
      "__path__" = "/var/log/**/*.log",
    },
  ]
}

loki.source.file "files" {
  targets    = local.file_match.log_files.targets
  forward_to = [loki.process.local.receiver]
}

//----- linux metrics -----
prometheus.exporter.unix "node" {
  disable_collectors       = ["mdadm"]
  include_exporter_metrics = true
}

prometheus.scrape "linux" {
  targets = prometheus.exporter.unix.node.targets
  forward_to = [otelcol.receiver.prometheus.default.receiver]
}

//----- docker metrics -----
//discovery.docker "containers" {
//  host = "unix:///var/run/docker.sock"
//}

//prometheus.scrape "docker" {
//  targets    = discovery.docker.containers.targets
//  forward_to = [otelcol.receiver.prometheus.default.receiver]
//}

```

#### **config.swarm**

```json
logging {
  level  = "info"
  format = "logfmt"
}

tracing {
  sampling_fraction = 0.1
  write_to = [otelcol.processor.batch.default.input]
}

//----- jaeger api -----
otelcol.receiver.jaeger "default" {
  protocols {
//    grpc {} //14250/tcp
    thrift_http {} //14268
//    thrift_binary {} //6832/udp
    thrift_compact {} //6831/udp
  }

  output {
    metrics = [otelcol.processor.batch.default.input]
    logs    = [otelcol.processor.batch.default.input]
    traces  = [otelcol.processor.batch.default.input]
  }
}

//----- otel ----
otelcol.exporter.otlp "default" {
  client {
    endpoint = env("OTLP_ENDPOINT")
    tls {
        insecure = true
        insecure_skip_verify = true
    }
  }
}
otelcol.processor.batch "default" {
  output {
    metrics = [otelcol.exporter.otlp.default.input]
    logs    = [otelcol.exporter.otlp.default.input]
    traces  = [otelcol.exporter.otlp.default.input]
  }
}
//otelcol.receiver.otlp "default" {
//  grpc {}
//  output {
//    metrics = [otelcol.processor.batch.default.input]
//    logs    = [otelcol.processor.batch.default.input]
//    traces  = [otelcol.processor.batch.default.input]
//  }
//}

otelcol.processor.attributes "loki" {
  action {
    key = "loki.attribute.labels"
    action = "insert"
    value = "event.domain, event.name"
  }

  action {
    key = "loki.resource.labels"
    action = "insert"
    value = "service.name, service.namespace"
  }

  output {
    logs = [otelcol.processor.batch.default.input]
  }
}


loki.process "local" {
  forward_to = [otelcol.receiver.loki.default.receiver]
  stage.timestamp {
    source = "time"
    format = "RFC3339"
  }
}

//----- prometheus receiver -----
otelcol.receiver.prometheus "default" {
  output {
    metrics = [otelcol.processor.batch.default.input]
  }
}

//----- loki receiver -----
otelcol.receiver.loki "default" {
  output {
    logs = [otelcol.processor.attributes.loki.input]
  }
}

//---- linux system logs ----- 
local.file_match "log_files" {
  path_targets = [
    {
      "__path__" = "/var/log/**/*.log",
    },
  ]
}

loki.source.file "files" {
  targets    = local.file_match.log_files.targets
  forward_to = [loki.process.local.receiver]
}

//----- linux metrics -----
prometheus.exporter.unix "node" {
  set_collectors = [
    "cpu",
    "ethtool",
    "diskstats",
    "filesystem",
    "loadavg",
    "meminfo",
    "logind",
    "netstat",
    "tcpstat",
  ]
  include_exporter_metrics = true
}

prometheus.scrape "linux" {
  targets    = prometheus.exporter.unix.node.targets
  forward_to = [otelcol.receiver.prometheus.default.receiver]
}

//----- swarm metrics -----
discovery.dockerswarm "default" {
  host = "unix:///var/run/docker.sock"
  role = "services"
}

prometheus.scrape "swarm" {
  targets    = discovery.dockerswarm.default.targets
  forward_to = [otelcol.receiver.prometheus.default.receiver]
}
```

#### **config.windows**

```json
logging {
  level  = "info"
  format = "logfmt"
}

tracing {
  sampling_fraction = 0.1
  write_to = [otelcol.exporter.otlp.default.input]
}

//----- otel ----
otelcol.exporter.otlp "default" {
  client {
    endpoint = env("OTLP_ENDPOINT")
		tls {
        insecure = true
        insecure_skip_verify = true
    }
  }
}
otelcol.processor.batch "default" {
  output {
    metrics = [otelcol.exporter.otlp.default.input]
    logs    = [otelcol.exporter.otlp.default.input]
    traces  = [otelcol.exporter.otlp.default.input]
  }
}

//----- prometheus receiver -----
otelcol.receiver.prometheus "default" {
  output {
    metrics = [otelcol.processor.batch.default.input]
  }
}

//----- loki receiver -----
otelcol.receiver.loki "default" {
  output {
    logs = [otelcol.processor.batch.default.input]
  }
}

//---- windows system logs ----- 
loki.source.windowsevent "application" {
  eventlog_name = "Application"
  exclude_event_data = true
  exclude_user_data = true
  use_incoming_timestamp = true
  forward_to = [otelcol.receiver.loki.default.receiver]
}

//----- windows metrics -----
prometheus.exporter.windows "default" { /* use defaults */ }

prometheus.scrape "windows" {
  targets    = prometheus.exporter.windows.default.targets
  forward_to = [otelcol.receiver.prometheus.default.receiver]
}

//----- gpu metrics -----
prometheus.scrape "nvidia_gpu" {
    targets = [{job = "nvidia_gpu", server = constants.hostname, "__address__" = "127.0.0.1:9835"}]
    forward_to = [otelcol.receiver.prometheus.default.receiver]
}
```

#### **config.collector**

```json
logging {
  level  = "info"
  format = "logfmt"
}

tracing {
  sampling_fraction = 0.1
  write_to = [otelcol.processor.batch.default.input]
}

livedebugging {
  enabled = true
}

prometheus.remote_write "default" {
  endpoint {
    url = env("PROM_ENDPOINT")
  }
}
loki.write "default" {
  endpoint {
    url = env("LOKI_ENDPOINT")
  }
}

//----- jaeger api -----
otelcol.receiver.jaeger "default" {
  protocols {
    grpc {} //14250/tcp
    thrift_http {} //14268
//    thrift_binary {} //6832/udp
//    thrift_compact {} //6831/udp
  }

  output {
        metrics = [otelcol.processor.batch.default.input]
    logs    = [otelcol.processor.batch.default.input]
    traces  = [otelcol.processor.batch.default.input]
  }
}

//----- otel -----
//otelcol.exporter.otlp "default" {
//  client {
//    endpoint = env("OTLP_ENDPOINT")
//  }
//}

otelcol.processor.batch "default" {
  output {
    metrics = [otelcol.exporter.prometheus.default.input]
    logs    = [otelcol.exporter.loki.default.input]
    traces  = [otelcol.exporter.otlp.tempo.input]
  }
}
otelcol.receiver.otlp "default" {
//  http {}
  grpc {}

  output {
    metrics = [otelcol.processor.batch.default.input]
    logs    = [otelcol.processor.batch.default.input]
    traces  = [otelcol.processor.batch.default.input]
  }
}

//----- prometheus receiver -----
otelcol.receiver.prometheus "default" {
  output {
    metrics = [otelcol.processor.batch.default.input]
  }
}

//----- loki receiver -----
otelcol.receiver.loki "default" {
  output {
    logs = [otelcol.processor.batch.default.input]
  }
}

otelcol.processor.attributes "loki" {
  action {
    key = "loki.attribute.labels"
    action = "insert"
    value = "event.domain, event.name"
  }

  action {
    key = "loki.resource.labels"
    action = "insert"
    value = "service.name, service.namespace"
  }

  output {
    logs = [otelcol.processor.batch.default.input]
  }
}

//----- loki api -----
loki.source.api "loki_push_api" {
    http {
        listen_address = "0.0.0.0"
        listen_port = 3100
    }
    forward_to = [loki.write.default.receiver]
    labels = {
        forwarded = "true",
    }
}

//----- otel exporter -----
otelcol.exporter.prometheus "default" {
  forward_to = [prometheus.remote_write.default.receiver]
}
prometheus.relabel "keep_backend_only" {
  forward_to = [prometheus.remote_write.default.receiver]

  rule {
    action        = "replace"
    source_labels = ["__address__", "instance"]
    separator     = "/"
    target_label  = "host"
  }
  rule {
    action        = "keep"
    source_labels = ["app"]
    regex         = "backend"
  }
  rule {
    action = "labeldrop"
    regex  = "instance"
  }
}

otelcol.exporter.loki "default" {
  forward_to = [loki.write.default.receiver]
}

otelcol.exporter.otlp "tempo" {
  client {
    endpoint = env("TEMPO_ENDPOINT")
    tls {
        insecure = true
        insecure_skip_verify = true
    }
  }
}
```




<!-- tabs:end -->


## 启动命令

<!-- tabs:start -->

#### **Debian**

```bash
# 一、在线安装方式
apt install -y gpg
mkdir -p /etc/apt/keyrings/
wget -q -O - https://apt.grafana.com/gpg.key | gpg --dearmor | tee /etc/apt/keyrings/grafana.gpg > /dev/null
echo "deb [signed-by=/etc/apt/keyrings/grafana.gpg] https://apt.grafana.com stable main" | tee /etc/apt/sources.list.d/grafana.list
apt-get update
apt install -y alloy

# 二、离线安装方式
ALLOY_VER=1.3.1-1
wget https://github.com/grafana/alloy/releases/download/v1.3.1/alloy-${ALLOY_VER}.amd64.deb
dpkg -i alloy-${ALLOY_VER}.amd64.deb

# 为alloy添加docker调用权限
usermod -aG docker alloy

# 随系统启动
systemctl enable alloy.service

# 启动alloy
systemctl start alloy

# 查看日志
journalctl -n -u alloy
```

- 启动参数及环境变量 /etc/default/alloy 
- 配置文件 /etc/alloy/config.alloy
- 系统服务 /etc/systemd/system/multi-user.target.wants/alloy.service

#### **Collector**

```bash
docker service create --replicas 1 \
--name alloy-col \
--network otel \
-e TZ='CST-8' \
--constraint=node.role==manager \
--mount type=bind,src=${NFS}/alloy/data,dst=/var/lib/alloy/data \
--mount type=bind,source=${NFS}/alloy/alloy.collector,dst=/etc/alloy/config.alloy \
--mount type=bind,source=/var/run/docker.sock,dst=/var/run/docker.sock \
--mount type=bind,src=/var/run/dbus,dst=/var/run/dbus \
--mount type=bind,src=/var/log,dst=/var/log \
--mount type=bind,src=/proc,dst=/host/proc \
--mount type=bind,src=/sys,dst=/host/sys \
--mount type=bind,src=/,dst=/rootfs \
-p 12345:12345 \
-p 9090:9090 \
-p 3100:9999 \
-p 4317:4317 \
-e TZ=Asia/Shanghai \
-e PROM_ENDPOINT="http://promethus:9092/api/v1/write" \
-e LOKI_ENDPOINT="http://loki:3101/loki/api/v1/push" \
-e TEMPO_ENDPOINT="tempo:43171" \
grafana/alloy:v1.3.1 \
run --disable-reporting=true \
--server.http.listen-addr=0.0.0.0:12345 \
--storage.path=/var/lib/alloy/data \
--stability.level=experimental \
/etc/alloy/config.alloy
```

#### **Docker**

```bash
docker run -d \
--restart unless-stopped \
--name staging \
--network=backend \
-e TZ='CST-8' \
-e TZ=Asia/Shanghai \
-p 12345:12345 \
-v ${NFS}/alloy/data:/var/lib/alloy/data \
-v ${NFS}/alloy/config.docker:/etc/alloy/config.alloy \
-v /var/run/docker.sock:/var/run/docker.sock \
-v /var/run/dbus:/var/run/dbus \
-v /var/log:/var/log \
-v /proc:/host/proc \
-v /sys:/host/sys \
-v /:/rootfs \
grafana/alloy:v1.3.1 \
run --disable-reporting=true \
--server.http.listen-addr=0.0.0.0:12345 \
--storage.path=/var/lib/alloy/data \
/etc/alloy/config.alloy \
--stability.level=public-preview
````

#### **Swarm**

```bash
docker service create --replicas 1 \
--name alloy \
--network otel \
-e TZ='CST-8' \
-e TZ=Asia/Shanghai \
-e OTLP_ENDPOINT="otel.7zcloud.lan:4317" \
-p 12345:12345 \
--mount type=bind,src=${NFS}/alloy/data,dst=/var/lib/alloy/data \
--mount type=bind,src=${NFS}/alloy/config.swarm,dst=/etc/alloy/config.alloy \
--mount type=bind,source=/var/run/docker.sock,target=/var/run/docker.sock \
--mount type=bind,src=/var/run/dbus,dst=/var/run/dbus \
--mount type=bind,src=/var/log,dst=/var/log \
--mount type=bind,src=/proc,dst=/host/proc \
--mount type=bind,src=/sys,dst=/host/sys \
--mount type=bind,src=/,dst=/rootfs \
grafana/alloy:v1.3.1 \
run --disable-reporting=true \
--server.http.listen-addr=0.0.0.0:12345 \
--storage.path=/var/lib/alloy/data \
/etc/alloy/config.alloy \
--stability.level=public-preview
```

#### **Windows**

```powershell
#下载安装包
Invoke-WebRequest -OutFile alloy-installer-windows-amd64.exe.zip https://github.com/grafana/alloy/releases/download/v1.3.1/alloy-installer-windows-amd64.exe.zip

unzip alloy-installer-windows-amd64.exe.zip

#安装alloy
alloy-installer-windows-amd64.exe /S /CONFIG=c:\alloy\config.windows /DISABLEREPORTING=yes /ENVIRONMENT="OTLP_ENDPOINT=otel.7zcloud.lan:4317\0KEY2=VALUE2"
```

<!-- tabs:end -->



## 参考

官网: https://grafana.github.io/alloy-configurator/
Github:https://github.com/grafana/alloy-configurator

