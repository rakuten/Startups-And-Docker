---
description: 如果只有一台4G内存的ECS但却啥都想要怎么办?
---

# 首页

### 基础应用

| 名称 | 用途 | 内存占用 |   端口映射 | 备注 |
| :---: | :---: | :---: | :---: | :---: |
| [Traefik](catalog/images-base/traefik.md) | 开源云原生网关 | 25M | 80,443,8080 | 替代Nginx转发功能 |
| [APISix](catalog/images-base/apisix/) | API网关 | 103M | 9080,9443 | - |
| [Nginx](catalog/images-base/nginx.md) | Web服务器 | 3M | 80,443 | - |
| [NextCloud](catalog/images-base/nexcloud.md) | OAuth供应器,WebDAV,文件共享 | 126M | 80 | 可将文件存储至Minio |
| [Cloudreve](catalog/images-base/cloudreve.md) | 开源网盘 | 33M | 5212 | 可将文件存储至公有云 |
| [Minio](catalog/images-base/minio.md) | 对象存储 | 165M | 9000 | 兼容S3协议 |
| [Wordpress](catalog/images-base/wordpress.md) | 开源博客平台 |  | 80 | - |
| Flarum | 开源论坛 |  |  |  |
| [Synapse](catalog/images-base/synapse/) | 聊天室服务器 | 87M | 8008,8448 |  |
| [Dokuwiki](catalog/images-base/dokuwiki.md) | Wiki |  | 80,443 | - |
| [Outline](catalog/images-base/outline.md) | Gitbook开源替代品 |  | 3000 |  |
| [Ocserv](catalog/images-base/ocserv.md) | OpenConnect VPN服务端 | 3M | 443 | 兼容Cisco Anyconnect |
| [Bitwarden](catalog/images-base/bitwarden.md) | 开源的密码管理服务 |  | 53,8080 | 供客户端程序使用 |
| PhotoPrism | 照片分享平台 |  |  |  |

### 开发应用

| 名称 | 用途 | 内存占用 | 端口映射 | 备注 |
| :---: | :---: | :---: | :---: | :---: |
| [MariaDB](catalog/images-develop/database/mariadb.md) | MySQL替代品 |  | 3306 | - |
| [MySQL](catalog/images-develop/database/mysql/) | 数据库 | 180M | 3306 | - |
| [Postgres](catalog/images-develop/database/postgres/) | 数据库 | 7M | 5432 | - |
| [MongoDB](catalog/images-develop/database/mongodb/) | 数据库 | 65M | 27017 |  |
| [MemCached](catalog/images-develop/cache/memcached.md) | 键值对\(Key-Value\)存储数据库 |  | 11211 |  |
| [Redis](catalog/images-develop/cache/redis.md) | 键值对\(Key-Value\)存储数据库 | 4.5M | 6379 | - |
| [RabbitMQ](catalog/images-develop/cache/rabbitmq.md) | 开源消息队列 | 83M | 5672,15672 |  |
| [Adminer](catalog/images-develop/database/adminer.md) | 多类型数据库管理 |  | 8080 | 类似PhpMyAdmin |
| [YApi](catalog/images-develop/docs/yapi.md) | 接口管理文档 |  | 3000 | - |
| [Flyway](catalog/images-develop/docs/flyway.md) | 数据库脚本管理 |  |  | - |

### CI/CD

| 名称 | 用途 | 内存占用 | 端口映射 | 备注 |
| :---: | :---: | :---: | :---: | :---: |
| [Gitea](catalog/images-cicd/gitea.md) | 版本控制 | 115M | 22,3000 | Gogs分叉版本，支持OAuth2和S3 |
| [Phabricator](catalog/images-cicd/phabricator.md) | 代码审核 |  | 8080,8443 | 界面比Gerrit更人性化 |
| [Drone](catalog/images-cicd/drone/) | 开源持续集成工具 | 21M | 80,443 | 适合发布服务端程序 |
| [Jenkins](catalog/images-cicd/jenkins.md) | 开源持续集成工具 | 1.051G | 8080,50000 | 适合发布客户端程序 |

### 运维环境

| 名称 | 用途 | 内存占用 | 端口映射 | 备注 |
| :---: | :---: | :---: | :---: | :---: |
| [Portainer](catalog/images-ops/portainer.md) | 网页版Docker管理 | 16M | 9000 | - |
| [Keycloak](catalog/images-ops/keycloak.md) | 身份和访问管理解决方案 |  | 8080 |  |
| [Matomo](catalog/images-ops/matomo.md) |  |  | 80 | - |
| Elkarbackup | 数据备份 |  |  | - |
| Alerta | 报警信息整合 |  |  | - |
| [Dnsmasq](catalog/images-ops/dnsmasq.md) | DNS解析 | 9.45M | 53,8080 | - |
| [JumpServer](catalog/images-ops/jumpserver.md) | 跳板机 | 1220M | 80,2222 |  |
| [Zabbix](catalog/images-ops/zabbix/) | 企业级开源监控方案 | 37M | 162,10051 | - |
| [Etcd](catalog/images-ops/etcd.md) | Key/Value 存储系统 | 75M | 2379,2380 | 用于分享配置和服务发现 |
| [Grafana](catalog/images-ops/grafana/) | 数据可视化工具 | 13M | 3000 | - |
| [Grafana/Loki](catalog/images-ops/grafana/grafana-loki/) | 日志聚合系统 | 35M | 3100 | 需配合Grafana使用 |
| [Grafana/Promtail](catalog/images-ops/grafana/grafana-loki/grafana-promtail.md) | 日志采集系统 | 20M |  | 需配合Loki使用 |
| [Grafana/Tempo](catalog/images-ops/grafana/grafana-tempo.md) | 链路追踪系统 | 72M | 16686 | 需配合Loki使用 |
| [Prometheus](catalog/images-ops/grafana/prometheus/) | 服务监控 | 354M | 9090 | 也是时序数据库 |
| [cAdvisor](catalog/images-ops/grafana/cadvisor.md) | Docker状态监控 | 87M |  |  |

### 私有仓库

| 名称 | 用途 | 内存占用 | 端口映射 | 备注 |
| :---: | :---: | :---: | :---: | :---: |
| [Registry](catalog/images-repository/registry.md) | Docker仓库 | 4.6M | 5000 |  |
| [Nexus3](catalog/images-repository/nexus3.md) | 仓库管理器 | 1.7G | 8081 |  |
| [Artifactory](catalog/images-repository/artifactory-1.md) | 仓库管理器 | 1.4G | 8081 |  |
| [Verdaccio](catalog/images-repository/verdaccio.md) | NPM仓库 |  | 4873 |  |
| [Apt-Cacher NG](catalog/images-repository/apt-cacher-ng.md) | 系统源缓存服务 | 3.2M | 3142 |  |
| [GOPROXY](catalog/images-repository/goproxy.md) | Go源缓存服务 |  | 8081 |  |

### 区块链

| 名称 | 用途 | 内存占用 | 端口映射 | 备注 |
| :---: | :---: | :---: | :---: | :---: |
| [Ethereum](catalog/images-blc/ethereum.md) | 以太坊 |  |  |  |
| [Tron](catalog/images-blc/tron.md) | 波场 |  |  |  |
| [IPFS](catalog/images-blc/ipfs.md) |  |  |  |  |
| [Swarm Bee](catalog/images-blc/bee.md) |  |  |  |  |

