# Flyway

本页最后更新时间: {docsify-updated}

[![GitHub Release](https://img.shields.io/github/release/flyway/flyway.svg)](https://github.com/flyway/flyway/releases/latest)

## 简介

开源的数据库移植及版本管理工具。它可以很方便的在命令行中使用，或者在Java应用程序中引入，用于管理我们的数据库版本，不需要复杂的配置。Migrations可以写成SQL脚本，也可以写在Java代码中

Flyway工作流程:
1、项目启动，应用程序完成数据库连接池的建立后，Flyway自动运行。
2、初次使用时，Flyway会创建一个flyway_schema_history表，用于记录sql执行记录。
3、自动扫描项目指定路径下(默认是classpath:db/migration)的所有sql脚本，与flyway_schema_history表脚本记录进行比对。如果数据库记录执行过的脚本记录，与项目中的sql脚本不一致，Flyway会报错并停止项目执行。
4、如果校验通过，则根据表中的sql记录最大版本号，忽略所有版本号不大于该版本的脚本。再按照版本号从小到大，逐个执行其余脚本。

支持的构建工具:
Maven and Gradle

支持的数据库:
Oracle, SQL Server, DB2, MySQL, Aurora MySQL, MariaDB, Percona XtraDB Cluster, PostgreSQL, Aurora PostgreSQL, Redshift, CockroachDB, SAP HANA, Sybase ASE, Informix, H2, HSQLDB, Derby, SQLite, Firebird

第三方插件:
SBT, Ant, Spring Boot, Grails, Play!, DropWizard, Grunt, Griffon, Ninja, ...


## EXPOSE

| 端口 | 用途 |
| :--- | :--- |
| 53 | DNS |
| 8080 | 管理页面 |



## 前置准备

```bash
mkdir ${NFS}/dnsmasq
```



## 启动命令

<!-- tabs:start -->
#### **Docker**

```bash
docker run -d \
--restart unless-stopped \
--name elkarbackup \
--network=backend \
-e TZ=Asia/Shanghai \
-v ${NFS}/flyway/sql:/flyway/sql \

flyway/flyway migrate

```



#### **Swarm**

```bash
docker service create --replicas 1 \
--name elkarbackup \
--network staging \
-e TZ=Asia/Shanghai \
```

<!-- tabs:end -->



## 参考

官网: 
Github:

