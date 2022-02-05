# Tron

本页最后更新时间: {docsify-updated}

## 简介

官方提供的docker镜像不仅偏大而且很旧，所以我们需要自己动手丰衣足食

## EXPOSE

| 端口 | 用途 |
| :--- | :--- |
| 8090 | Full Node HTTP API |
| 8091 | Solidity Node HTTP API |
| 18888 | P2P 端口 |



## 前置准备

```bash
#创建数据保存目录
mkdir ${NFS}/tron
chmod 775 $NFS/tron

#获取SuStake(Tron侧链)官方提供的Dockerfile
wget https://github.com/SunStake/docker-java-tron/archive/refs/heads/master.zip
unzip master.zip
cd docker-java-tron-master
docker build --build-arg JAVA_TRON_VERSION="GreatVoyage-v4.2.2.1" -t java-tron:4.2.2.1 .
```

## 启动命令

<!-- tabs:start -->
#### **Docker**
```bash
docker run -d \
--name=tron \
-e NETWORK=dev \
-e WITNESS_MODE=true \
-p 8090:8090 \
-v $NFS/tron:/data \
java-tron:4.2.2.1
```


#### **Swarm**


<!-- tabs:end -->

####  调用测试

```text
curl -X POST http://localhost:8090/wallet/getnowblock
```

#### 测试帐号

> 本地网络环境包含一个见证人帐号及一些TRX:  
> `Private Key: da146374a75310b9666e834ee4ad0866d6f4035967bfc76217c5a495fff9f0d0`
> `Address: TPL66VK2gCXNCD7EJg9pgJRfqcRazjhUZY`

## 配置参数

Configuration can be done via environment variables. The entry script modifies the config file on the fly before the node is run.

#### NETWORK

The Tron network to connect to.

Options:

* `mainnet` \(default\)
* `nile`
* `dev` \(local single-node test network\)

#### P2P\_PORT

The port on which the node listens on for P2P networking. Defaults to `18888`.

#### FULL\_NODE\_PORT

The port on which the node serves full node HTTP API. Defaults to `8090`.

#### SOLIDITY\_NODE\_PORT

The port on which the node serves solidity node HTTP API. Defaults to `8091`.

#### VM\_MAX\_TIME\_RATIO

TVM time ratio to avoid timeout. See this [issue](https://github.com/tronprotocol/java-tron/issues/2228). Defaults to `5.0`.

#### WITNESS\_MODE

> **NOTE**  
> This option is only supported on version `4.1.1` or higher.

Whether to enable witness mode \(block producer\), useful for running a local test network.

Options:

* `true`
* `false` \(default\)

#### EVENT\_PLUGIN\_ENABLED

Whether to enable the Kafka [event plugin](https://github.com/tronprotocol/event-plugin).

Options:

* `true`
* `false` \(default\)

#### EVENT\_PLUGIN\_KAFKA\_SERVER

Kafka server address for the event plugin. Mandatory if `EVENT_PLUGIN_ENABLED` is `true`.

#### EVENT\_PLUGIN\_BLOCK\_TRIGGER\_ENABLED

Whether to enable the `block` trigger for the event plugin.

Options:

* `true`
* `false` \(default\)

#### EVENT\_PLUGIN\_TRANSACTION\_TRIGGER\_ENABLED

Whether to enable the `transaction` trigger for the event plugin.

Options:

* `true`
* `false` \(default\)

#### EVENT\_PLUGIN\_CONTRACTEVENT\_TRIGGER\_ENABLED

Whether to enable the `contractevent` trigger for the event plugin.

Options:

* `true`
* `false` \(default\)

#### EVENT\_PLUGIN\_CONTRACTLOG\_TRIGGER\_ENABLED

Whether to enable the `contractlog` trigger for the event plugin.

Options:

* `true`
* `false` \(default\)

#### EVENT\_PLUGIN\_SOLIDITY\_BLOCK\_TRIGGER\_ENABLED

Whether to enable the `solidity` trigger for the event plugin.

Options:

* `true`
* `false` \(default\)

#### EVENT\_PLUGIN\_SOLIDITY\_EVENT\_TRIGGER\_ENABLED

Whether to enable the `solidityevent` trigger for the event plugin.

Options:

* `true`
* `false` \(default\)

#### EVENT\_PLUGIN\_SOLIDITY\_LOG\_TRIGGER\_ENABLED

Whether to enable the `soliditylog` trigger for the event plugin.

Options:

* `true`
* `false` \(default\)

#### EVENT\_PLUGIN\_ADDRESS\_FILTER

Contract address filter for the event plugin. Multiple addresses are separated by space. By default no filter is applied.

#### EVENT\_PLUGIN\_TOPIC\_FILTER

Contract topic filter for the event plugin. Multiple topics are separated by space. By default no filter is applied.  


## 参考

Tron官网: [https://tron.network/index?lng=zh](https://tron.network/index?lng=zh)  
TRC20说明: [https://cn.developers.tron.network/docs/trc20%E5%90%88%E7%BA%A6%E4%BA%A4%E4%BA%92%E4%BB%A5usdt%E4%B8%BA%E4%BE%8B](https://cn.developers.tron.network/docs/trc20%E5%90%88%E7%BA%A6%E4%BA%A4%E4%BA%92%E4%BB%A5usdt%E4%B8%BA%E4%BE%8B)  
Docker环境变量: [https://github.com/SunStake/docker-java-tron](https://github.com/SunStake/docker-java-tron)

