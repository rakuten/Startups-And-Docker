# IPFS

本页最后更新时间: {docsify-updated}

## 简介



## EXPOSE

| 端口 | 用途 |
| :--- | :--- |
| 4001 |  |
| 4002/udp |  |
| 5001 |  |
| 18080 |  |
| 18081 |  |



## 前置准备

```bash
#创建数据保存目录
mkdir -p ${NFS}/ipfs/data
mkdir ${NFS}/ipfs/export
chmod -R 775 $NFS/ipfs
```

## 启动命令

<!-- tabs:start -->
#### **Docker**
```bash
docker run -d \
--name ipfs \
--restart unless-stopped \
-p 4001:4001 \
-p 4002:4002/udp \
-p 5001:5001 \
-p 8080:18080 \
-p 8081:18081 \
-v ${NFS}/ipfs/data:/data/ipfs \
-v ${NFS}/ipfs/export:/export \
ipfs/go-ipfs 

#如果webui连不上节点，需要在docker中执行以下命令，然后Restart一下
ipfs config --json API.HTTPHeaders.Access-Control-Allow-Methods '["PUT", "GET", "POST"]'
ipfs config --json API.HTTPHeaders.Access-Control-Allow-Credentials '["true"]'
ipfs config --json API.HTTPHeaders.Access-Control-Allow-Origin '["http://localhost:3000", "http://192.168.1.161:5001", "https://share.ipfs.io"]'
#或者
ipfs config --json API.HTTPHeaders.Access-Control-Allow-Origin '["*"]'
```


#### **Swarm**


<!-- tabs:end -->



## 参考

