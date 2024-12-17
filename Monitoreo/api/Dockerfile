# Usa la imagen base de Node.js
FROM node:18-alpine

# Define el directorio de trabajo dentro del contenedor
WORKDIR /app

# Copia los archivos de dependencias (package.json y package-lock.json)
COPY package*.json ./

# Instala las dependencias
RUN npm install

# Copia el código fuente de la aplicación
COPY . .

# Configura variables de entorno
ENV DB_HOST=${DB_HOST}
ENV DB_USER=${DB_USER}
ENV DB_PASSWORD=${DB_PASSWORD}
ENV DB_NAME=${DB_NAME}
ENV NODE_ENV=${NODE_ENV}
ENV API_KEY=${API_KEY}

# Expone el puerto 3000 para que la API sea accesible
EXPOSE 4000

# Define el comando que ejecutará el contenedor
CMD ["node", "index.js"]
