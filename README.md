# Manual Técnico
## Eliezer Abraham Zapeta Alvarado **Carnet:** 201801719

## Tabla de Contenidos

1. [Instalación de Golang](#instalación-de-golang)
2. [Instalación de Stress](#instalación-de-stress)
3. [Instalación de Headers](#instalación-de-headers)
4. [Módulo de RAM](#módulo-de-ram)
5. [Módulo de CPU](#módulo-de-cpu)
6. [Agente](#agente)
7. [Comandos de Docker](#comandos-de-docker)
8. [Plantillas de Scripts](#plantillas-de-scripts)

## Instalación de Golang

Para instalar Golang en su sistema, ejecute los siguientes comandos:

```bash
# VM EN GOOGLE CLOUD
* Habilitar Api de google cloud
* Crear VM con distro debian (Ubuntu)
* Instalar lo necesario

# Instalar Golang
```bash
cd
sudo apt update
wget https://go.dev/dl/go1.21.4.linux-amd64.tar.gz -O go.tar.gz
sudo tar -xzvf go.tar.gz -C /usr/local
echo export PATH=$HOME/go/bin:/usr/local/go/bin:$PATH >> ~/.profile
source ~/.profile
go version
```

# Instalación de stress
### RAM
```bash
sudo apt update
sudo apt install stress
# Stress de ram por 60 segundos
# stress --vm 1 --vm-bytes 1G --timeout 60s &
```

### CPU
```bash
# Instalación de stress
sudo apt update
# sudo apt install stress
# Stress de cpu por 60 segundos
# stress --vm 1 --vm-bytes 1G --timeout 60s &
```


# Instalar headers
```bash
uname -r
sudo apt update
sudo apt install linux-headers-$(uname -r) build-essential -y
ls -l /lib/modules/$(uname -r)/build
```

# MODULO RAM
```bash
make clean
make all
sudo insmod ram_201801719.ko
sudo dmesg ó sudo dmesg | tail
cd /proc/
cat ram
```

* PID
* Nombre del Proceso
* Usuario
* Estado
* Rorcentaje Ram

### Eliminar modulo si es necesario
```bash
# sudo rmmod ram_201801719
# sudo dmesg | tail
# make clean
```


# MODULO CPU
```bash
# make clean
make all
sudo insmod cpu_201801719.ko
sudo dmesg ó sudo dmesg | tail
sudo lsmod | grep cpu
cd /proc/
cat cpu
```

* PID
* Nombre del Proceso
* Usuario
* Estado
* Rorcentaje Cpu

#### Eliminar modulo si es necesario
```bash
# sudo rmmod cpu_201801719
# sudo dmesg | tail
# make clean
```

# AGENTE EN GOLANG
```bash
go mod init Agente
go mod tidy
docker build -t agente_201801719:golang .
* docker hub
docker login -u ezapeta
* dckr_pat_t2nv2nUtjArSeopcrKRHcB64zu0
docker tag agente_201801719:golang ezapeta/agente_custom:golang
docker push ezapeta/agente_custom:golang
```
```bash
docker-compose up -d
```

```bash
# SI es necesario ejecutar agente golang a mano para pruebas

go mod init Agente
go mod tidy
go build main.go
go run main.go
```

# Crear Imagen MySql y subir a Docker hub
```bash
* dockerfile mysql
docker build -t mysql_201801719:8.0 .
* docker hub
docker login -u ezapeta
dckr_pat_t2nv2nUtjArSeopcrKRHcB64zu0
docker tag mysql_201801719:8.0 ezapeta/mysql_custom:8.0
docker push ezapeta/mysql_custom:8.0
```

### Compilar Docker Compose
```bash
#ejecuta y no muestra logs

docker-compose up -d
```

### Entrar a docker mysql mediante container_name
```bash
#si es necesario revisar lo que agrega

docker exec -it mysql_db bash
mysql -u root -p
show database;
use grafana_db;
show tables;
```

### Borrar mediante container_name
```bash
# si fuera necesario

docker ps -a
docker stop mysql_db
docker rm mysql_db
docer rmi ezapeta/mysql_custom:8.0
```


# API NODE
```bash
# compilar dockerfile
docker build -t api_201801719:18-alpine .

# subir a docker hub
docker login -u ezapeta
* dckr_pat_t2nv2nUtjArSeopcrKRHcB64zu0

docker tag api_201801719:18-alpine ezapeta/api_custom:18-alpine
docker push ezapeta/api_custom:18-alpine
```


#### Si existe algun cambio, correr compose otra vez: 
```bash
docker-compose down
docker-compose up --build
docker-compose restart
```


#### Bajar todo
```bash
docker-compose down
docker rmi -f $(docker images -q)
docker-compose down -v
```

#### Eliminar todo
```bash
docker rmi -f ezapeta/mysql_custom:8.0
docker rmi -f ezapeta/api_custom:18-alpine
docker rmi -f grafana/grafana:latest
docker rmi -f ezapeta/agente_custom:golang


# Eliminar los volumen creados
docker volume rm monitoreo_db_data monitoreo_grafana_data
```

#### Comandos contruir contenedores
```bash
docker-compose build   # Construye las imágenes
docker-compose up      # Inicia los contenedores
```

#### Token temporal de github
```bash
# valido por 7 días
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
```


# Plantilla para grupo de instancias de gcp
```bash
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
```

Glosario
```
API (Application Programming Interface): Conjunto de definiciones y protocolos que permite la comunicación entre diferentes aplicaciones.
```
```
VM (Virtual Machine): Emulación de un sistema informático que proporciona la funcionalidad de una computadora física.
```
```
Golang: Lenguaje de programación desarrollado por Google, también conocido como Go.
```
```
Stress: Herramienta de carga que permite generar carga en el sistema para probar su rendimiento.
```
```
Headers del Kernel: Archivos necesarios para compilar módulos del kernel.
Docker: Plataforma de software que permite crear, desplegar y ejecutar aplicaciones en contenedores.
```
```
Docker Hub: Servicio de registro de contenedores Docker que permite almacenar y compartir imágenes de contenedores.
```
```
Docker Compose: Herramienta para definir y ejecutar aplicaciones Docker multi-contenedor.
RAM (Random Access Memory): Tipo de memoria de acceso aleatorio que se utiliza en computadoras.
```
```
CPU (Central Processing Unit): Unidad central de procesamiento, el cerebro de la computadora donde se realizan las operaciones de procesamiento.
```