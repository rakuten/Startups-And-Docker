# SNMP Exporter

本页最后更新时间: {docsify-updated}

## 简介

网络设备数据收集器

## EXPOSE

| 端口 | 用途 |
| :--- | :--- |
| 9116 | 通讯端口 |

## 前置准备

```text
wget -O ${NFS}/prometheus/conf/snmp.yml https://github.com/prometheus/snmp_exporter/raw/main/snmp.yml
```

* Prometheus targets.json中添加内容

```yaml
scrape_configs:
  - job_name: 'snmp'
    static_configs:
      - targets:
        - 192.168.0.1  # SNMP设备.
        - switch.local # SNMP设备.
    metrics_path: /snmp
    params:
      module: [if_mib]
    relabel_configs:
      - source_labels: [__address__]
        target_label: __param_target
      - source_labels: [__param_target]
        target_label: instance
      - target_label: __address__
        replacement: 127.0.0.1:9116  # SNMP Exporter的IP与端口
```

## 启动命令

<!-- tabs:start -->
#### **Docker**



#### **Swarm**
```text
docker service create --replicas 1 \
--name snmp_exporter \
--network staging \
-e TZ=Asia/Shanghai \
--mount type=bind,src=${NFS}/prometheus/conf/snmp.yml,dst=/etc/snmp_exporter/snmp.yml \
prom/snmp-exporter
```

<!-- tabs:end -->

* Prometheus targets.json中添加内容

