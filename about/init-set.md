

未完待续，本页内容尚未可用!



## 前置准备

```bash
#创建数据保存目录
mkdir -p ${NFS}/initSet/conf
mkdir -p ${NFS}/initSet/data

mkdir -p ${NFS}/prometheus/conf
mkdir ${NFS}/prometheus/data
chown nobody:nogroup $USER:$USER ${NFS}/prometheus/data
touch ${NFS}/prometheus/conf/targets.json

mkdir -p ${NFS}/minio/data
mkdir ${NFS}/minio/conf

mkdir /tmp/tempo
chmod 777 /tmp/tempo

#下载配置文件
wget -O ${NFS}/initset/conf/tempo-local.yaml https://raw.githubusercontent.com/grafana/tempo/main/example/docker-compose/local/tempo-local.yaml
```

## 

{% code title="docker-compose.yaml" %}
```yaml
version: "3"
secrets: 
  POSTGRES_PWD:
    external: true
  ali_access: 
    external: true
  ali_secret: 
    external: true
    
services:
  tempo:
    image: grafana/tempo:latest
    container_name: "tempo"
    command: [ "-config.file=/etc/tempo.yaml" ]
    volumes:
      - ${NFS}/initSet/conf/tempo-local.yaml:/etc/tempo.yaml
      - /tmp/tempo:/tmp/tempo


#  synthetic-load-generator:
#    image: omnition/synthetic-load-generator:1.0.25
#    volumes:
#      - ${NFS}/initSet/conf/load-generator.json:/etc/load-generator.json
#    environment:
#      - TOPOLOGY_FILE=/etc/load-generator.json
#      - JAEGER_COLLECTOR_URL=http://tempo:14268
#    depends_on:
#      - tempo


  prometheus:
    image: prom/prometheus:latest
    container_name: "prometheus"
    volumes:
      - ${NFS}/prometheus/conf:/etc/prometheus \
      - ${NFS}/prometheus/data:/prometheus/data \

  grafana:
    image: grafana/grafana:latest
    container_name: "grafana"
    volumes:
      - ${NFS}/initSet/conf/grafana-datasources.yaml:/etc/grafana/provisioning/datasources/datasources.yaml
      - ${NFS}/grafana:/var/lib/grafana
    environment:
      - GF_AUTH_ANONYMOUS_ENABLED=true
      - GF_AUTH_ANONYMOUS_ORG_ROLE=Admin
      - GF_AUTH_DISABLE_LOGIN_FORM=true
      #- GF_SECURITY_ADMIN_PASSWORD=P@ssw0rd123
    labels:
      - "traefik.enable=true"
      - "traefik.docker.network=staging"
      - "traefik.http.services.grafana.loadbalancer.server.port=3000"
      - "traefik.http.routers.grafana.rule=Host(\`grafana.${DOMAIN}\`)"
      - "traefik.http.routers.grafana.entrypoints=http"
      - "traefik.http.routers.grafana-sec.tls=true"
      - "traefik.http.routers.grafana-sec.tls.certresolver=dnsResolver"
      - "traefik.http.routers.grafana-sec.rule=Host(\`grafana.${DOMAIN}\`)"
      - "traefik.http.routers.grafana-sec.entrypoints=https"
      
  traefik:
    image: traefik
    container_name: "traefik"
    volumes:
      - /var/run/docker.sock:/var/run/docker.sock:ro
      - ${NFS}/traefik,target=/etc/traefik 
      - ${NFS}/traefik/config:/etc/traefik/config:ro
    command:
      #- "--log.level=DEBUG"
      - "--api.insecure=true"
      - "--providers.docker=true"
      - "--providers.docker.exposedbydefault=false"
      - "--entrypoints.http.address=:80"
      - "--entrypoints.https.address=:443"
      - "--entrypoints.ssh.address=:8022"
      - "--serversTransport.insecureSkipVerify=true"
      - "--api.dashboard=true"
      - "--api.insecure=true"
      - "--providers.docker"
      - "--providers.docker.endpoint=unix:///var/run/docker.sock"
      - "--providers.docker.watch=true"
	    #- "--providers.docker.exposedByDefault=false"
	    - "--providers.docker.useBindPortIP=false"
	    - "--providers.docker.swarmMode=true"
	    - "--providers.docker.network=staging"
    ports:
      - "80:80"
      - "443:443"
      - "8080:8080"
      - "8022:8022"
      
  minio:
    image: minio/minio
    container_name: minio
    networks: staging
    volumes:
      - ${NFS}/minio/data:/data
      - ${NFS}/minio/conf:/root/.minio
    environment:
      TZ: Asia/Shanghai
      MINIO_REGION_NAME: "Area1" \
      MINIO_BROWSER: "on" \
      MINIO_ROOT_USER: "minioadmin" \
      MINIO_ROOT_PASSWORD: "wJalrXUtnFEMI/K7MD8NG/bPxRfiBY7XAMPLEKEY" \
    labels: 
      - traefik.enable=true \
      - traefik.docker.network=staging \
      - traefik.http.services.minio.loadbalancer.server.port=9000 \
      - traefik.http.routers.minio.rule="Host(\`minio.${DOMAIN}\`)" \
      - traefik.http.routers.minio.entrypoints=http \
      - traefik.http.routers.minio-sec.tls=true \
      - traefik.http.routers.minio-sec.tls.certresolver=dnsResolver \
      - traefik.http.routers.minio-sec.rule="Host(\`minio.${DOMAIN}\`)" \
      - traefik.http.routers.minio-sec.entrypoints=https \
    logging: 
      driver: loki
      options: 
        -loki-url: "http://loki:3100/api/prom/push
    restart: unless-stopped
    command: "minio server /data"
  
  postgres:
    image: postgres:alpine
    container_name: postgres
    networks: staging
    secrets: 
      - POSTGRES_PWD
    environment: 
      TZ: Asia/Shanghai
      POSTGRES_USER: admin
      POSTGRES_PASSWORD_FILE: /run/secrets/POSTGRES_PWD
    tmpfs: /dev/shm,tmpfs-size=268435456
    volumes: 
      - ${NFS}/postgres:/var/lib/postgresql/data
    labels: 
      - traefik.enable: false
    logging: 
      driver: loki
      options: 
        -loki-url: "http://loki:3100/api/prom/push
    restart: unless-stopped
```
{% endcode %}

