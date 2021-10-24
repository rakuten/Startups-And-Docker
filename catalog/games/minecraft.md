# Minecraft

本页最后更新时间: {docsify-updated}

## 简介

我的世界私服

虽然Minecraft服务端程序由官方提供，但架设时分为 `mod` 和 `plugins` 两个阵营，两者并不兼容，只能选其一种。

*   mod

    可以安装在客户端上，也可以安装在服务器上，然后通过服务器下发给客户端，拥有更多客户端显示效果与性能优化的模块，但想绕过官方登录游戏的话需要通过第三方认证服务器(authlib-injector)，所以更受正版玩家的欢迎
*   plugins

    只能安装在服务器上，通过LoginSecurity插件可以无需连接认证服务器，直接登录私服进行，这也是目前大多数私服的选择

不管是`mod` 还是 `plugins` 都需要安装加载器(Loader)，然后才能加载相应类型的插件或模块

不同项目组的`mod` 或 `plugins` 是可以混用的(高版本或fork版向下兼容)，但 `mod` 与 `plugins` 之间不能混用

本文中使用plugins方式架设服务器，并安装PAPER加载器，以及LoginSecurity插件(免认证)，同时还运行了一个RCON协议的web-admin网站

## EXPOSE

| 端口    | 用途     |
| ----- | ------ |
| 25565 | 游戏通讯端口 |
|       |        |



## 前置准备

```bash
mkdir /${NFS}/minecraft
```

## 启动命令

<!-- tabs:start -->
#### **Docker**
> * minecraft server

```bash
docker run -d \
--restart always \
-p 25565:25565 \
--name mc \
-e TZ=Asia/Shanghai \
-e EULA=true \
-e ENABLE_RCON=true \
-e RCON_PASSWORD=testing \
-e TYPE=PAPER \
-e SPIGET_RESOURCES=19362 \
-e ONLINE_MODE=true \
-e ALLOW_FLIGHT=true \
-e EXEC_DIRECTLY=true \
-e SNOOPER_ENABLED=false \
-e ENABLE_QUERY=true \
-e ALLOW_NETHER=true \
-e ANNOUNCE_PLAYER_ACHIEVEMENTS=true \
-e ENABLE_COMMAND_BLOCK=true \
-e MAX_MEMORY=4G \
-v /${NFS}/minecraft:/data \
itzg/minecraft-server
```

  

* rcon-web-admin

```bash
docker run -d --name rcon \
--restart always \
--network=backend \
-p 4326:4326 -p 4327:4327 \
-e TZ=Asia/Shanghai \
-e RWA_RCON_HOST=mc \
-e RWA_RCON_PASSWORD=testing \
-e RWA_ADMIN=true \
-e RWA_USERNAME=admin \
-e RWA_PASSWORD=admin \
itzg/rcon
```


#### **Swarm**



#### **Compose**
```yaml
version: '3.3'

services:
  web:
    image: itzg/rcon
    environment:
      RWA_USERNAME: admin
      RWA_PASSWORD: admin
      RWA_ADMIN: "TRUE"
      # is referring to the hostname of 'mc' compose service below
      RWA_RCON_HOST: mc
      # needs to match the password configured for the container, which is 'minecraft' by default
      RWA_RCON_PASSWORD: minecraft
    ports:
      - 4326:4326
      - 4327:4327
  mc:
    image: itzg/minecraft-server
    ports:
      - 25565:25565
    environment:
      EULA: "TRUE"
```

<!-- tabs:end -->





## 参考

DockerHub: [https://hub.docker.com/u/itzg](https://hub.docker.com/u/itzg)

参数说明: [https://github.com/itzg/docker-minecraft-server/blob/master/README.md](https://github.com/itzg/docker-minecraft-server/blob/master/README.md)

spigot插件站： [https://www.spigotmc.org/resources/](https://www.spigotmc.org/resources/)

bukkit插件站： [https://dev.bukkit.org](https://dev.bukkit.org)

客户端启动器: [https://hmcl.huangyuhui.net/download/](https://hmcl.huangyuhui.net/download/)
