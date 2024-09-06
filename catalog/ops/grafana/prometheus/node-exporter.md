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
* 下载软件 [https://github.com/prometheus-community/windows_exporter/releases/latest](https://github.com/prometheus-community/windows_exporter/releases/latest) \(如:windows_exporter-0.25.1-amd64.msi)

* 打开Windows入站防火墙端口9182

* 运行安装命令

  ```bash
  PSNativeCommandArgumentPassing = 'Legacy' msiexec /i windows_exporter-0.25.1-amd64.msi ADD_FIREWALL_EXCEPTION=yes ENABLED_COLLECTORS=defaults,memory,tcp  --% EXTRA_FLAGS="--collector.service.services-where ""Name='windows_exporter'"""
  ```
  
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


#### GPU

参考:  [utkuozdemir/nvidia_gpu_exporter](https://github.com/utkuozdemir/nvidia_gpu_exporter/blob/master/INSTALL.md)

```bash
#打开防火墙9835端口
New-NetFirewallRule -DisplayName "Nvidia GPU Exporter" -Direction Inbound -Action Allow -Protocol TCP -LocalPort 9835

#下载软件
Invoke-WebRequest -OutFile c:\alloy\nvidia_gpu_exporter_1.2.1_windows_x86_64.zip https://github.com/utkuozdemir/nvidia_gpu_exporter/releases/download/v1.2.1/nvidia_gpu_exporter_1.2.1_windows_x86_64.zip
unzip c:\alloy\nvidia_gpu_exporter_1.2.1_windows_x86_64.zip

#下载NSSM
https://nssm.cc/builds
解压后将nssm.exe放至c:\windows\system32目录下

#将程序安装为服务
nssm install nvidia_gpu_exporter C:\alloy\nvidia_gpu_exporter.exe
# 设置工作目录(可选)
nssm set nvidia_gpu_exporter AppDirectory C:\alloy
```

- prometheus添加接收节点

```bash
global:
  scrape_interval:     15s
  evaluation_interval: 15s
scrape_configs:
  - job_name: 'nvidia_gpu_exporter'
    static_configs:
    - targets: ['显卡服务器IP:9835']
```

- grafana添加 14574 面板

<!-- tabs:end -->
