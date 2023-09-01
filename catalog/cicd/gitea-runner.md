# Gitea Runner

本页最后更新时间: {docsify-updated}

[![GitHub Release](https://img.shields.io/github/release/gitea/act_runner.svg)](https://github.com/egitea/act_runner/releases/latest)

## 简介

而Gitea Runner是Gitea Actions的执行代理，它通过封装了[act](https://gitea.com/gitea/act)来实现监控及CI/CD功能

act但目前仅对装有Docker的Linux有效，如想在没有Docker的Windows或MacOS运行，请参考外网大神的魔改版的[runner](https://github.com/ChristopherHX/github-act-runner)和[act](https://github.com/nektos/act/issues/97#issuecomment-871735094)


## EXPOSE

| 端口 | 用途 |
| :--- | :--- |




## 前置准备


```bash
'创建程序目录'
mkdir ${NFS}/gitea/runner
```
'修改gitea配置文件 ${NFS}/gitea/gitea/conf/app.ini'
```text
[actions]
ENABLED=true

```
'获取TOKEN'
访问 https://{gitea地址}/admin/runners

## 启动命令

<!-- tabs:start -->
#### **Docker**

```bash
docker run -d \
--restart unless-stopped \
--name gitea_runner \
--network=backend \
-e TZ=Asia/Shanghai \
-e GITEA_INSTANCE_URL=${gitea_instance_url} \
-e GITEA_RUNNER_REGISTRATION_TOKEN=${gitea_runner_token} \
-v /var/run/docker.sock:/var/run/docker.sock \
-v ${NFS}/gitea/runner:/data \
gitea/act_runner:nightly

```


#### **Swarm**

```bash
docker service create --replicas 1 \
--name gitea_runner \
--network staging \
-e TZ=Asia/Shanghai \
-e GITEA_INSTANCE_URL=${gitea_instance_url} \
-e GITEA_RUNNER_REGISTRATION_TOKEN=${gitea_runner_token} \
--mount type=bind,src=/var/run/docker.sock,dst=/var/run/docker.sock \
--mount type=bind,src=${NFS}/gitea/runner,dst=/data \
gitea/act_runner:nightly
```


#### **Compose**
```yaml
...
  gitea:
    image: gitea/gitea
    ...

  runner:
    image: gitea/act_runner
    restart: always
    depends_on:
      - gitea
    volumes:
      - ./${NFS}/gitea/act_runner:/data
      - /var/run/docker.sock:/var/run/docker.sock
    environment:
      - TZ=Asia/Shanghai
      - GITEA_INSTANCE_URL=${gitea_instance_url}
      - GITEA_RUNNER_REGISTRATION_TOKEN=${gitea_runner_token}
```
<!-- tabs:end -->



## 参考

官网帮助: https://docs.gitea.io/en-us/usage/usage/actions/quickstart/
Github: https://gitea.com/gitea/act_runner

