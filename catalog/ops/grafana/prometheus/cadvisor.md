
# cAdvisor

## 简介

Google发布的容器状态监控工具，官方镜像位于[Google服务器](https://gcr.io/cadvisor/cadvisor),这里使用了UCloud的加速镜像以方便下载。

注: cAdvisor占用CPU偏高，不建议4核以下服务器安装使用

## EXPOSE

| 端口 | 用途 |
| :--- | :--- |
| 8080 | 通讯端口 |

## 前置准备



## 启动命令

<!-- tabs:start -->
#### **Docker**
```bash
docker run -d \
--name=cadvisor \
--restart always \
--privileged \
-v /:/rootfs:ro \
-v /var/run:/var/run:ro \
-v /sys:/sys:ro \
-v /var/lib/docker/:/var/lib/docker:ro \
-v /dev/disk/:/dev/disk:ro \
-p 18081:8080 \
uhub.service.ucloud.cn/gcr_io/cadvisor:v0.40.0 \
--docker_only=true \
--disable_root_cgroup_stats=true \
--storage_duration=1m0s \
--disable_metrics=disk,diskIO
```


#### **Swarm**
```bash

```

<!-- tabs:end -->

Grafana中导入面板11558和14282

## 参考

