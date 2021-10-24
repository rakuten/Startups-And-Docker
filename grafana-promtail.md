# Promtail

## 简介

收集硬盘上log文件内容并发送给Loki实例



## 前置准备

```bash
#配置文件存在loki目录下，省得再建目录了
wget -O $NFS/loki/promtail.yaml https://raw.githubusercontent.com/grafana/loki/main/clients/cmd/promtail/promtail-docker-config.yaml
```

## 启动命令

<!-- tabs:start -->
#### **Docker**
```bash

```


#### **Swarm**
```bash
docker service create --replicas 1 \
--name promtail \
--network staging \
-e TZ=Asia/Shanghai \
--mount type=bind,src=${NFS}/loki/promtail.yaml,dst=/etc/promtail/promtail.yaml \
--mount type=bind,src=/var/log,dst=/var/log \
--label traefik.enable=false \
grafana/promtail
```

<!-- tabs:end -->



## 参考

