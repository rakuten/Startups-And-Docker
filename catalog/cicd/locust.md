# Locust

本页最后更新时间: {docsify-updated}

[![GitHub Release](https://img.shields.io/github/release/locustio/locust.svg)](https://github.com/locustio/locust/releases/latest)

## 简介

![Locust](../../images/locust.png)

开源负载测试工具，使用 Python 代码定义用户行为，可同时模拟数百万个用户。

## EXPOSE

| 端口 | 用途 |
| :--- | :--- |
| 5557 |  |
| 8089 |  |



## 启动命令

<!-- tabs:start -->
#### **Docker**
```bash
docker run \
-p 8089:8089 \
-v $PWD:/mnt/locust \
locustio/locust -f /mnt/locust/locustfile.py
```


#### **Swarm**



#### **Compose**
```yaml
version: '3'

services:
  master:
    image: locustio/locust
    ports:
     - "8089:8089"
    volumes:
      - ./:/mnt/locust
    command: -f /mnt/locust/locustfile.py --master -H http://master:8089
  
  worker:
    image: locustio/locust
    volumes:
      - ./:/mnt/locust
    command: -f /mnt/locust/locustfile.py --worker --master-host master
```

<!-- tabs:end -->



## 参考

官网: [https://locust.io/](https://locust.io/)

插件:  
[https://github.com/SvenskaSpel/locust-plugins](https://github.com/SvenskaSpel/locust-plugins)  
[https://github.com/SvenskaSpel/locust-swarm](https://github.com/SvenskaSpel/locust-swarm)

