# Fase de construcción
FROM golang:1.21.4-alpine AS build

# Instalar dependencias necesarias
RUN apk add --no-cache git

# Establecer el directorio de trabajo
WORKDIR /app

# Copiar los archivos del módulo Go
COPY go.mod go.sum ./

# Descargar las dependencias
RUN go mod tidy

# Copiar el código fuente
COPY . .

# Compilar el binario
RUN go build -o main main.go

# Fase de producción
FROM alpine:latest

# Establecer el directorio de trabajo
WORKDIR /app

# Copiar el binario desde la fase de construcción
COPY --from=build /app/main .

# Exponer el puerto donde se ejecuta la API
EXPOSE 5200

# Comando por defecto para ejecutar la aplicación
ENTRYPOINT ["./main"]
