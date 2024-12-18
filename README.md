# so1_2s_201801719

token github
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

# Instalar Golang
cd
sudo apt update
wget https://go.dev/dl/go1.21.4.linux-amd64.tar.gz -O go.tar.gz
sudo tar -xzvf go.tar.gz -C /usr/local
echo export PATH=$HOME/go/bin:/usr/local/go/bin:$PATH >> ~/.profile
source ~/.profile
# go version

# MODULO RAM

# Instalación de stress
sudo apt update
sudo apt install stress
# Stress de ram por 60 segundos
# stress --vm 1 --vm-bytes 1G --timeout 60s &
# Instalar headers
uname -r
sudo apt update
sudo apt install linux-headers-$(uname -r) build-essential -y
ls -l /lib/modules/$(uname -r)/build
# Ejecutar modulo de ram
make clean
make all
sudo insmod ram_201801719.ko
sudo dmesg ó sudo dmesg | tail
cd /proc/
cat ram
# PID
# Nombre del Proceso
# Usuario
# Estado
# Rorcentaje Ram

# Eliminar modulo si es necesario
# sudo rmmod ram_201801719
# sudo dmesg | tail
# make clean


# MODULO CPU

# Instalación de stress
sudo apt update
# sudo apt install stress
# Stress de cpu por 60 segundos
# stress --vm 1 --vm-bytes 1G --timeout 60s &
# Instalar headers
# uname -r
# sudo apt update
# sudo apt install linux-headers-$(uname -r) build-essential
# ls -l /lib/modules/$(uname -r)/build
# Ejecutar modulo de ram
# make clean
make all
sudo insmod cpu_201801719.ko
sudo dmesg ó sudo dmesg | tail
sudo lsmod | grep cpu
cd /proc/
cat cpu
# PID
# Nombre del Proceso
# Usuario
# Estado
# Rorcentaje Ram

# Eliminar modulo si es necesario
# sudo rmmod ram_201801719
# sudo dmesg | tail
# make clean

# AGENTE
docker build -t agente_201801719:golang .
-docker hub
docker login -u ezapeta
dckr_pat_t2nv2nUtjArSeopcrKRHcB64zu0
docker tag agente_201801719:golang ezapeta/agente_custom:golang
docker push ezapeta/agente_custom:golang
docker-compose up -d

# Instalar golang
go mod init Agente
go mod tidy
go build main.go
go run main.go


# comandos contruir contenedores
docker-compose build   # Construye las imágenes
docker-compose up      # Inicia los contenedores

# crear imagen mysql y subir a docker hub
-dockerfile mysql
docker build -t mysql_201801719:8.0 .
-docker hub
docker login -u ezapeta
dckr_pat_t2nv2nUtjArSeopcrKRHcB64zu0
docker tag mysql_201801719:8.0 ezapeta/mysql_custom:8.0
docker push ezapeta/mysql_custom:8.0

#compilar docker compose
docker-compose up -d

#entrar a docker mysql mediante container_name / no volumen ni repository
docker exec -it mysql_db bash
mysql -u root -p
show database;
use grafana_db;
show tables;


#borrar mediante container_name / no volumen ni repository
docker ps -a
docker stop mysql_db
docker rm mysql_db
docker rmi ezapeta/mysql_custom:8.0



# Api de node
-dockerfile api node
docker build -t api_201801719:18-alpine .
-docker hub
docker login -u ezapeta
dckr_pat_t2nv2nUtjArSeopcrKRHcB64zu0
docker tag api_201801719:18-alpine ezapeta/api_custom:18-alpine
docker push ezapeta/api_custom:18-alpine



si cambio algo correr compose otra vez: 
docker-compose down
docker-compose up --build
docker-compose restart


# bajar todo
docker-compose down
docker rmi $(docker images -q)
docker-compose down -v
docker-compose up --build

# eliminar todo
docker rmi -f ezapeta/mysql_custom:8.0
docker rmi -f ezapeta/api_custom:18-alpine
docker rmi -f grafana/grafana:latest
docker rmi -f ezapeta/agente_custom:golang

docker volume rm monitoreo_db_data monitoreo_grafana_data
docker exec -it 63111f5af7f9 /bin/sh



sudo apt-get install -reinstall linux-headers-$(username -r)


version: '3.8'

services:
  app:
    image: <tu_usuario_en_dockerhub>/my-go-app:latest
    container_name: my-go-app-container
    ports:
      - "8080:8080"
    volumes:
      - /proc:/host/proc
      - /sys:/host/sys
      - /dev:/dev
      - /etc/hostname:/etc/hostname
    privileged: true
    restart: always



# plantilla

#!/bin/bash 
sudo apt update
sudo apt install stress -y
sudo apt install git -y
sudo apt install make -y

apt-get update -y
wget https://go.dev/dl/go1.21.4.linux-amd64.tar.gz -O go.tar.gz
sudo tar -C /usr/local -xzf go.tar.gz
echo 'export PATH=$PATH:/usr/local/go/bin' >> ~/.profile
source ~/.profile

sudo apt-get update
sudo apt-get install ca-certificates curl
sudo install -m 0755 -d /etc/apt/keyrings
sudo curl -fsSL https://download.docker.com/linux/ubuntu/gpg -o /etc/apt/keyrings/docker.asc
sudo chmod a+r /etc/apt/keyrings/docker.asc

echo \
  "deb [arch=$(dpkg --print-architecture) signed-by=/etc/apt/keyrings/docker.asc] https://download.docker.com/linux/ubuntu \
  $(. /etc/os-release && echo "$VERSION_CODENAME") stable" | \ sudo tee /etc/apt/sources.list.d/docker.list > /dev/null

sudo apt-get update
sudo apt-get install docker-ce docker-ce-cli containerd.io docker-buildx-plugin docker-compose-plugin -y

git clone https://3liezerSong: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@github.com/3liezerSong/SO1_VAC_DIC_2024_201801719.git









#!/bin/bash 
sudo apt update -y
sudo apt install stress -y
sudo apt install git -y
sudo apt install make -y

wget https://go.dev/dl/go1.21.4.linux-amd64.tar.gz -O go.tar.gz
sudo tar -C /usr/local -xzf go.tar.gz
echo 'export PATH=$PATH:/usr/local/go/bin' >> ~/.profile
source ~/.profile
go version

sudo apt-get update
sudo apt-get install ca-certificates curl -y
sudo install -m 0755 -d /etc/apt/keyrings
sudo curl -fsSL https://download.docker.com/linux/ubuntu/gpg -o /etc/apt/keyrings/docker.asc
sudo chmod a+r /etc/apt/keyrings/docker.asc

echo \
  "deb [arch=$(dpkg --print-architecture) signed-by=/etc/apt/keyrings/docker.asc] https://download.docker.com/linux/ubuntu \
  $(. /etc/os-release && echo "$VERSION_CODENAME") stable" | sudo tee /etc/apt/sources.list.d/docker.list > /dev/null

sudo apt-get update
sudo apt-get install docker-ce docker-ce-cli containerd.io docker-buildx-plugin docker-compose-plugin -y

git clone https://3liezerSong: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@github.com/3liezerSong/SO1_VAC_DIC_2024_201801719.git







#!/bin/bash 
sudo apt update -y
sudo apt install stress -y
sudo apt install git -y
sudo apt install make -y

uname -r
sudo apt install linux-headers-$(uname -r) build-essential -y
ls -l /lib/modules/$(uname -r)/build

sudo apt update -y
sudo apt install build-essential gcc -y

wget https://go.dev/dl/go1.21.4.linux-amd64.tar.gz -O go.tar.gz
sudo tar -C /usr/local -xzf go.tar.gz
echo 'export PATH=$PATH:/usr/local/go/bin' >> ~/.profile
source ~/.profile
go version

sudo apt-get update
sudo apt-get install ca-certificates curl -y
sudo install -m 0755 -d /etc/apt/keyrings
sudo curl -fsSL https://download.docker.com/linux/ubuntu/gpg -o /etc/apt/keyrings/docker.asc
sudo chmod a+r /etc/apt/keyrings/docker.asc

echo \
  "deb [arch=$(dpkg --print-architecture) signed-by=/etc/apt/keyrings/docker.asc] https://download.docker.com/linux/ubuntu \
  $(. /etc/os-release && echo "$VERSION_CODENAME") stable" | sudo tee /etc/apt/sources.list.d/docker.list > /dev/null

sudo apt-get update
sudo apt-get install docker-ce docker-ce-cli containerd.io docker-buildx-plugin docker-compose-plugin -y

sudo curl -L "https://github.com/docker/compose/releases/download/v2.27.0/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
sudo chmod +x /usr/local/bin/docker-compose
docker-compose --version

git clone https://3liezerSong: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@github.com/3liezerSong/SO1_VAC_DIC_2024_201801719.git

sudo find / -name "SO1_VAC_DIC_2024_201801719" 2>/dev/null
cd /SO1_VAC_DIC_2024_201801719/Modulos/Ram
make all
sudo insmod ram_201801719.ko
sudo dmesg
cd /proc/
cat ram

cd /SO1_VAC_DIC_2024_201801719/Modulos/Cpu
make all
sudo insmod cpu_201801719.ko
sudo dmesg
cd /proc/
cat cpu

sudo find / -name "SO1_VAC_DIC_2024_201801719" 2>/dev/null
cd /SO1_VAC_DIC_2024_201801719/Agente
docker-compose up -d



