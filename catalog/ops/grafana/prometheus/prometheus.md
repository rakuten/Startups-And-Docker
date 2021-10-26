# Prometheus

本页最后更新时间: {docsify-updated}

## 简介

时序数据库

## EXPOSE

| 端口 | 用途 |
| :--- | :--- |
| 9090 | 通讯端口 |



## 前置准备

```bash
#创建数据保存目录
mkdir -p ${NFS}/prometheus/conf
mkdir ${NFS}/prometheus/data
chown nobody:nogroup $USER:$USER ${NFS}/prometheus/data
touch ${NFS}/prometheus/conf/targets.json

#创建配置文件
vi ${NFS}/prometheus/conf/prometheus.yml
```

* prometheus.yml

```yaml
global:
  scrape_interval:     15s
  evaluation_interval: 15s
  
# Alertmanager configuration
alerting:
  alertmanagers:
  - static_configs:
    - targets:
      # - alertmanager:9093

#rule_files:
  # - "alert.rules"
  # - "first.rules"
  # - "second.rules"

scrape_configs:
  # The job name is added as a label `job=<job_name>` to any timeseries scraped from this config.
  - job_name: 'prometheus'
    # metrics_path defaults to '/metrics'
    # scheme defaults to 'http'.
    static_configs:
    - targets: ['localhost:9090']
    
  - job_name: 'file_ds'
     file_sd_configs:       #以 file_sd_configs 动态发现的模式，推荐使用这种方式，可以实现热添加
     - refresh_interval: 1m    #指定多久扫描一次目标配置文件
       files:
        - /etc/prometheus/targets.yaml   #指定目标文件的位置(注意文件的权限问题)
```

## 启动命令

<!-- tabs:start -->
#### **Docker**
```bash
docker run -d \
-p 9090:9090 \
--name prometheus \
--net=backend \
--restart always \
-v ${NFS}/prometheus/conf:/etc/prometheus \
-v ${NFS}/prometheus/data:/prometheus/data \
prom/prometheus
```


#### **Swarm**
```bash
docker service create --replicas 1 \
--name prometheus \
--network staging \
-e TZ=Asia/Shanghai \
-p 9090:9090 \
--mount type=bind,src=${NFS}/prometheus/conf,dst=/etc/prometheus \
--mount type=bind,src=${NFS}/prometheus/data,dst=/prometheus \
--label traefik.enable=false \
prom/prometheus
```

<!-- tabs:end -->



## 参考

报警规则: https://awesome-prometheus-alerts.grep.to/
