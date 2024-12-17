# Usa MySQL 8.0 como base
FROM mysql:8.0

# Configura variables de entorno (pueden ser sobreescritas con --env al crear el contenedor)
ENV MYSQL_ROOT_PASSWORD=${MYSQL_ROOT_PASSWORD}
ENV MYSQL_DATABASE=${MYSQL_DATABASE}
ENV MYSQL_USER=${MYSQL_USER}
ENV MYSQL_PASSWORD=${MYSQL_PASSWORD}
ENV MYSQL_INITDB_SKIP_TZINFO=1

# Copia el script SQL al directorio de inicialización
COPY script_201801719.sql /docker-entrypoint-initdb.d/

# Exponer el puerto por defecto de MySQL
EXPOSE 3306

