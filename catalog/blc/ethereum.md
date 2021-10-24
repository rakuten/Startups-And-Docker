# Ethereum

本页最后更新时间: {docsify-updated}

## 简介
以太坊


## EXPOSE

| 端口 | 用途 |
| :--- | :--- |
| 8545 |  |
| 8546 |  |
| 30303/tcp |  |
| 30303/udp |  |



## 前置准备

```bash
#创建数据保存目录
mkdir ${NFS}/client-go
chmod 775 $NFS/client-go
```

#### 创世块配置文件

_genesis.json_

```scheme
{
  "config": {
        "chainId": 45,      //见Chain_ID 列表:
        "homesteadBlock": 0,
        "eip155Block": 0,
        "eip158Block": 0
    },
  "coinbase"   : "0x0000000000000000000000000000000000000000",
  "difficulty" : "0x20000",
  "extraData"  : "",
  "gasLimit"   : "0x2fefd8",
  "nonce"      : "0x0000000000000042",
  "mixhash"    : "0x0000000000000000000000000000000000000000000000000000000000000000",
  "parentHash" : "0x0000000000000000000000000000000000000000000000000000000000000000",
  "timestamp"  : "0x00",
  "alloc"      : {
            "0xb1bde370a02d8d3b4cfab0e329f272e68e33afc4":{
            "balance": "50000000000000000000000000"}
  },
}
```

## 启动命令

<!-- tabs:start -->
#### **Docker**
```bash
docker run -d \
--name client-go \
--restart unless-stopped \
-p 8545:8545 \
-p 8546:8546 \
-p 30303:30303 \
-p 30303:30303/udp \
-v ${NFS}/client-go:/root \
ethereum/client-go \
--identity "MyNodeName" \
--networkid 45 \
--syncmode "fast" \
--nodiscover \
--http --http.corsdomain "*" \
--http.addr=0.0.0.0 \
--http.api personal,db,eth,net,web3 \
--port 30303 \
--bootnodes "enode://ee34a768a235ab295f220cede5dd66dedb1c034a64fee8a2769f1c59e6378cf2fc87fcd02c066934b72580890470adf43edb5ba109267d2d075379f9b76c2ba1@119.3.2.153:30303"
--bootnodes=<bootnode-enode-url-from-above>  //连接主节点(选填)
```


#### **Swarm**


<!-- tabs:end -->



#### Chain\_ID 列表:

chainId必须与geth的networkId相同，否则私链与第三方钱包之间无法转帐

| `CHAIN_ID` | Chain\(s\) |
| :--- | :--- |
| 1 | Ethereum mainnet |
| 2 | Morden \(disused\), Expanse mainnet |
| 3 | Ropsten |
| 4 | Rinkeby |
| 30 | Rootstock mainnet |
| 31 | Rootstock testnet |
| 42 | Kovan |
| 61 | Ethereum Classic mainnet |
| 62 | Ethereum Classic testnet |
| 66 | ewasm testnet |
| 1337 | Geth private chains \(default\) |



**启动参考**

```bash
#连接主网
./geth --syncmode "light" --nousb --nodiscover --verbosity 1 console

#创建私有链
./geth \
--networkid 45 \
--nodiscover \
--http --http.corsdomain "*" \
--http.addr=0.0.0.0 \
--http.api personal,db,eth,net,web3 \
--bootnodes "enode://ee34a768a235ab295f220cede5dd66dedb1c034a64fee8a2769f1c59e6378cf2fc87fcd02c066934b72580890470adf43edb5ba109267d2d075379f9b76c2ba1@119.3.2.153:30303"

#启动开发者模式
./geth --networkid 45 --dev --dev.period 1 --rpc --rpcapi "db,eth,net,web3,miner,personal" --verbosity 1 console

#连接OKChain测试网
./geth --syncmode "light" --nousb attach [https://exchaintest.okexcn.com](https://exchaintest.okexcn.com/) console

```

#### 运行参数参考

```bash
#生成一个新的帐号
./geth account new  

#生成创世块
./geth init genesis.json 

#启动1个线程进行挖矿
./geth --exec 'miner.start(1)' attach /root/.ethereum/geth.ipc 

#查看本机帐户余额
./geth --exec 'eth.getBalance(eth.accounts[0])' attach /root/.ethereum/geth.ipc

#查看远程帐户余额
./geth --exec 'eth.getBalance(eth.accounts[0])' attach http://ip地址:8545

```

#### 控制台命令参考

```bash
#查看帐户余额
eth.getBalance(eth.coinbase)
balance = web3.fromWei(eth.getBalance(eth.coinbase), "ether")

#解锁帐户(转帐前需先解锁)
personal.unlockAccount(eth.accounts[0], "帐户密码")

#转帐
eth.sendTransaction({from: "0xa66c7b8b1c26856d284a0b962385babe02caa51d", to: "0x3e822e05ee975e02be3f15f32b0fddced8d5bdd0", value: web3.toWei(0.1, "ether")})

#或者
personal.unlockAccount(eth.accounts[0])
amount = web3.toWei(10, 'ether')
eth.sendTransaction({from: eth.accounts[0], to: 收款地址, value: amount})

#查看挂起的交易(如为空[]，说明转帐已完成)
eth.pendingTransactions

#查看某区块信息
eth.getBlock(0)

#查看某交易信息(hash id)
eth.getTransaction("0xdc6e22cf55db26a14486375e278712af8a19667f4541a8cca3d7ad67fcb5fad7")

#查看支持的智能合约编译器
eth.compile

#查看节点数量
net.peerCount

#使用1个线程挖矿(默认2个线程，并保存至coinbase)
miner.start(1)

#切换挖矿帐号
miner.setEtherbase("0xdaa65af5d348c25266a5588148a9c0e9e4c056f8")
```

## 参考

