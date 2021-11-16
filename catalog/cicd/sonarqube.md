# SonarQube

本页最后更新时间: {docsify-updated}

[![GitHub Release](https://img.shields.io/github/release/SonarSource/sonarqube.svg)](https://github.com/SonarSource/sonarqube/releases/latest)

## 简介

![](../../images/sonarqube.png)
SonarQube是管理代码质量开放平台，有开源的社区版本和收费的开发者版本及企业版本，支持各种IDE和Jenkins等软件集成可审查多种编程语言，帮助你快速的定位代码中潜在的或者明显的错误。



## EXPOSE

| 端口 | 用途 |
| :--- | :--- |
| 9000 | Web端口 |
| 9001 | Elasticsearch端口 |



## 前置准备

- 创建程序目录

```bash
mkdir ${NFS}/sonar
chmod 775 ${NFS}/sonar
```
- 修改kernel参数(为符合[Elasticsearch 生产模式要求](https://www.elastic.co/guide/en/elasticsearch/reference/current/docker.html#docker-cli-run-prod-mode))
```bash
sudo sysctl -w vm.max_map_count=524288
sudo sysctl -w fs.file-max=131072
ulimit -n 131072
ulimit -u 8192
```
- 部署**postgres**
- 在**prostgres**中创建`sonar`库
- 创建sonarqube用户并分配`sonar`库权限



## 启动命令

<!-- tabs:start -->
#### **Docker**

```bash
docker run -d \
--restart unless-stopped \
--name sonarqube \
--network=backend \
-e TZ=Asia/Shanghai \
-p 8080:8080 -p 8443:8443 \
-e ALLOW_EMPTY_PASSWORD=yes \
-e SONARQUBE_DATABASE_USER=sonarqube \
-e SONARQUBE_DATABASE_PASSWORD=bitnami \
-e SONARQUBE_DATABASE_NAME=sonar \
-v ${NFS}/sonar:/bitnami/sonarqube \
bitnami/sonarqube:latest
```



#### **Swarm**

```bash
docker service create --replicas 1 \
--name sonarqube \
--network staging \
-e TZ=Asia/Shanghai \
-e ALLOW_EMPTY_PASSWORD=yes \
-e SONARQUBE_DATABASE_USER=sonarqube \
-e SONARQUBE_DATABASE_PASSWORD=bitnami \
-e SONARQUBE_DATABASE_NAME=sonar \
--mount type=bind,src=${NFS}/sonar,dst=/bitnami/sonarqube \
bitnami/sonarqube:latest

#traefik参数
--label traefik.enable=true \
--label traefik.docker.network=staging \
--label traefik.http.services.sonarqube.loadbalancer.server.port=8080 \
--label traefik.http.routers.sonarqube.rule="Host(\`sonarqube.${DOMAIN}\`)" \
--label traefik.http.routers.sonarqube.entrypoints=http \
--label traefik.http.routers.sonarqube-sec.tls=true \
--label traefik.http.routers.sonarqube-sec.tls.certresolver=dnsResolver \
--label traefik.http.routers.sonarqube-sec.rule="Host(\`sonarqube.${DOMAIN}\`)" \
--label traefik.http.routers.sonarqube-sec.entrypoints=https \
```



#### Compose

```yaml
version: '3'
services:
  postgresql:
    image: docker.io/bitnami/postgresql:13
    volumes:
      - 'postgresql_data:/bitnami/postgresql'
    environment:
      # ALLOW_EMPTY_PASSWORD is recommended only for development.
      - ALLOW_EMPTY_PASSWORD=yes
      - POSTGRESQL_USERNAME=sonarqube
      - POSTGRESQL_DATABASE=sonar
  sonarqube:
    image: docker.io/bitnami/sonarqube:9
    ports:
      - '80:9000'
    volumes:
      - 'sonarqube_data:/bitnami/sonarqube'
    depends_on:
      - postgresql
    environment:
      # ALLOW_EMPTY_PASSWORD is recommended only for development.
      - ALLOW_EMPTY_PASSWORD=yes
      - SONARQUBE_DATABASE_HOST=postgres
      - SONARQUBE_DATABASE_PORT_NUMBER=5432
      - SONARQUBE_DATABASE_USER=sonarqube
      - SONARQUBE_DATABASE_NAME=sonar
volumes:
  postgresql_data:
    driver: local
  sonarqube_data:
    driver: local
```



<!-- tabs:end -->

## 环境变量

##### 用户和站点配置

- `SONARQUBE_USERNAME`：SonarQube 应用程序用户名。默认：**admin**
- `SONARQUBE_PASSWORD`：SonarQube 应用程序密码。默认值：**bitnami**
- `SONARQUBE_EMAIL`：SonarQube 应用程序电子邮件。默认值：**[user@example.com](mailto:user@example.com)**
- `SONARQUBE_SKIP_BOOTSTRAP`：是否跳过对应用程序执行初始引导。如果您使用已经有 SonarQube 数据的数据库，这是必要的。默认值：**no**
- `SONARQUBE_PORT_NUMBER`：SonarQube Web 应用程序端口号。默认值：**9000**
- `SONARQUBE_ELASTICSEARCH_PORT_NUMBER`：SonarQube Elasticsearch 应用程序端口号。默认值：**9001**
- `SONARQUBE_WEB_CONTEXT`：用于访问应用程序的 SonarQube 前缀。默认值：**/**
- `SONARQUBE_MAX_HEAP_SIZE`：SonarQube 服务（CE、搜索和 Web）的最大堆大小。没有默认值。
- `SONARQUBE_MIN_HEAP_SIZE`：SonarQube 服务（CE、搜索和 Web）的最小堆大小。没有默认值。
- `SONARQUBE_CE_JAVA_ADD_OPTS`：Compute Engine 的其他 Java 选项。没有默认值。
- `SONARQUBE_ELASTICSEARCH_JAVA_ADD_OPTS`：用于 Elasticsearch 的其他 Java 选项。没有默认值。
- `SONARQUBE_WEB_JAVA_ADD_OPTS`：用于 Web 的其他 Java 选项。没有默认值。
- `SONARQUBE_EXTRA_PROPERTIES`：要在 sonar.properties 文件中设置的以逗号分隔的属性列表，例如`my.sonar.property1=property_value,my.sonar.property2=property_value`。没有默认值。
- `SONARQUBE_START_TIMEOUT`：应用程序启动的超时时间（以秒为单位）。默认值：**300**。

##### 数据库连接配置

- `SONARQUBE_DATABASE_HOST`: PostgreSQL 服务器的主机名。默认值：**postgresql**
- `SONARQUBE_DATABASE_PORT_NUMBER`: PostgreSQL 服务器使用的端口。默认值：**5432**
- `SONARQUBE_DATABASE_NAME`：SonarQube 将用于连接数据库的数据库名称。默认值：**bitnami_sonarqube**
- `SONARQUBE_DATABASE_USER`：SonarQube 将用于连接数据库的数据库用户。默认值：**bn_sonarqube**
- `SONARQUBE_DATABASE_PASSWORD`：SonarQube 将用于连接数据库的数据库密码。没有默认。
- `ALLOW_EMPTY_PASSWORD`: 可用于允许空白密码。默认值：**no**

##### 使用 postgresql-client 为 SonarQube 创建数据库

- `POSTGRESQL_CLIENT_DATABASE_HOST`：PostgreSQL 服务器的主机名。默认值：**postgresql**
- `POSTGRESQL_CLIENT_DATABASE_PORT_NUMBER`: PostgreSQL 服务器使用的端口。默认值：**5432**
- `POSTGRESQL_CLIENT_POSTGRES_USER`: 数据库管理员用户。默认值：**root**
- `POSTGRESQL_CLIENT_POSTGRES_PASSWORD`：数据库管理员用户的数据库密码。没有默认。
- `POSTGRESQL_CLIENT_CREATE_DATABASE_NAME`: 由 mysql 客户端模块创建的新数据库。没有默认。
- `POSTGRESQL_CLIENT_CREATE_DATABASE_USER`: 由 mysql 客户端模块创建的新数据库用户。没有默认。
- `POSTGRESQL_CLIENT_CREATE_DATABASE_PASSWORD`:`POSTGRESQL_CLIENT_CREATE_DATABASE_USER`用户的数据库密码。没有默认。
- `POSTGRESQL_CLIENT_CREATE_DATABASE_EXTENSIONS`: 在第一次初始化期间在指定数据库中启用的 PostgreSQL 扩展。没有默认。
- `ALLOW_EMPTY_PASSWORD`: 可用于允许空白密码。默认值：**no**

##### SMTP 配置

要将 SonarQube 配置为使用 SMTP 发送电子邮件，您可以设置以下环境变量：

- `SONARQUBE_SMTP_HOST`: SMTP 主机。
- `SONARQUBE_SMTP_PORT_NUMBER`: SMTP 端口。
- `SONARQUBE_SMTP_USER`: SMTP 帐户用户。
- `SONARQUBE_SMTP_PASSWORD`: SMTP 帐号密码。
- `SONARQUBE_SMTP_PROTOCOL`: 如果指定，则使用 SMTP 协议。允许值：*tls*，*ssl*。没有默认。

## 参考

官网: https://www.sonarqube.org/
Github: https://github.com/SonarSource/sonarqube

