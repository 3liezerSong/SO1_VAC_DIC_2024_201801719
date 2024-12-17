# so1_2s_201801719

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


PID
Nombre del Proceso
Usuario
Estado
Porcentaje Ram


make clean
make all
 
sudo insmod ram.ko
sudo dmesg

cd /proc/   --> si sale el de ram todo good
cat ram  --> con eso leemos la ram


iniciar compose: 
docker-compose build   # Construye las imágenes
docker-compose up      # Inicia los contenedores

#crear imagen mysql y subir a docker hub
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



#api de node
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
