# Node Exporter

本页最后更新时间: {docsify-updated}

## EXPOSE

| 端口 | 用途 |
| :--- | :--- |
| 9100 | Linux |
| 9182 | Windows |
| 8080 | cAdvisor |

## 前置准备

## 启动命令

<!-- tabs:start -->
#### **Linux**
* 运行exporter容器

```bash
docker run -d \
-p 9100:9100 \
--name node-exporter \
--net=backend \
--restart always \
-v /proc:/host/proc \
-v /sys:/host/sys \
-v /:/rootfs \
prom/node-exporter \
--path.procfs=/host/proc \
--path.sysfs=/host/sys \
--collector.filesystem.ignored-mount-points="^/(sys|proc|dev|host|etc)($|/)"
```

* Prometheus targets.json中添加内容

```javascript
{
    "targets": [
      "node ip:9100"
    ],
    "labels": {
      "job": "Linux"
    }
}
```

* Grafana添加面板: 左边栏 + 号 &gt; Import &gt; 输入 10467 &gt; 点击Load按钮


#### **Windows**
* 下载软件 [https://github.com/prometheus-community/windows\_exporter/releases/latest](https://github.com/prometheus-community/windows_exporter/releases/latest) \(如:windows\_exporter-0.16.0-amd64.msi\)
* 双击运行
* 打开Windows入站防火墙端口9182
* targets.json中添加内容

```javascript
{
    "targets": [
      "服务器ip:9182"
    ],
    "labels": {
      "job": "windows"
    }
}
```

* Grafana添加面板: 左边栏 + 号 &gt; Import &gt; 输入 10467 &gt; 点击Load按钮

<!-- tabs:end -->



