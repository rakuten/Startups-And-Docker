# Bee

本页最后更新时间: {docsify-updated}

## 简介



## EXPOSE

| 端口 | 用途 |
| :--- | :--- |
| 1633 |  |
| 1634 |  |
| 1635 |  |



## 前置准备

* 创建数据保存目录

```bash
mkdir ${NFS}/client-go
chmod 775 $NFS/client-go
```

* 运行clef用于帮助swarm签名

```bash
docker run -d \
--name clef \
--restart unless-stopped \
--net backend \
-e TZ=Asia/Shanghai \
-e CLEF_CHAINID=1 \
-v ${SHARE}/clef:/app/data \
ethersphere/clef \
full
```

{% hint style="info" %}
先去[https://infura.io](https://infura.io)注册一个帐号，然后创建一个ETHEREUM项目，项目名就叫"bee"，然后把ENDPOINTS选项从Mainnet改为Gorli，复制下面的wss地址备用
{% endhint %}

## 启动命令

<!-- tabs:start -->
#### **Docker**
```bash
docker run -d \
--name bee \
--restart unless-stopped \
--net backend \
-e TZ=Asia/Shanghai \
-v ${NFS}/bee:/home/bee/.bee \
-e BEE_CLEF_SIGNER_ENABLE=true \
-e BEE_CLEF_SIGNER_ENDPOINT=http://clef:8550 \
-e BEE_NETWORK_ID=1 \
-e BEE_FULL_NODE=true \
-e BEE_WELCOME_MESSAGE="Bzzzz bzzz bzz bzz." \
-e BEE_DEBUG_API_ENABLE=true \
-e BEE_PASSWORD=lt8110 \
-p 1635:1635 \
-p 1634:1634 \
-p 1633:1633 \
ethersphere/bee:latest \
start \
--swap-endpoint wss://goerli.infura.io/ws/v3/2222e1c423384e1abe8ac85cbb29dfce
```


#### **Swarm**


<!-- tabs:end -->



## 参考

