# Drone Agent

本页最后更新时间: {docsify-updated}

## 简介



set-executionpolicy remotesigned

## EXPOSE

无

## 启动命令

<!-- tabs:start -->
#### **Docker**



#### **Swarm**
```bash
docker service create --replicas 1 \
--name drone-runner \
--network staging \
-e TZ=Asia/Shanghai \
-e DRONE_RPC_PROTO=http \
-e DRONE_RPC_HOST=drone \
-e DRONE_RPC_SECRET=MWckgvhjqg4E3eQ0ptg2X4iNC6oQiyU4LLvO4eXFFuHtrTkIy2vwcAc3erB5f9reM \
-e DRONE_RUNNER_CAPACITY=2 \
-e DRONE_RUNNER_NAME=drone-runner \
--mount type=bind,source=/var/run/docker.sock,target=/var/run/docker.sock \
drone/drone-runner-docker
```

<!-- tabs:end -->



##  参考

