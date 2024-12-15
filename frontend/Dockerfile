# Fase 1: Construcción de la app React
FROM node:20 AS build

WORKDIR /app

# Instalar dependencias
COPY package.json yarn.lock ./
RUN yarn install

# Copiar código fuente y construir la app
COPY . .
RUN yarn build

# Depuración: lista los archivos en /app
RUN echo "Contenido de /app:" && ls -l /app && echo "Contenido de /app/build:" && ls -l /app/build

# Fase 2: Servir con Nginx
FROM nginx:alpine
COPY --from=build /app/build /usr/share/nginx/html

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
