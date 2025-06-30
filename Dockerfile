# Etapa 1: build
FROM node:18 AS builder

WORKDIR /app

# Copiar dependencias
COPY package.json package-lock.json ./
RUN npm install

# Copiar el resto del código
COPY . .

# Compilar la app (genera /dist)
RUN npm run build

# Etapa 2: imagen ligera con servidor
FROM nginx:alpine

# Eliminar archivos por defecto de Nginx
RUN rm -rf /usr/share/nginx/html/*

# Copiar la app compilada desde el builder
COPY --from=builder /app/dist /usr/share/nginx/html

# Copiar configuración personalizada (opcional)
# COPY nginx.conf /etc/nginx/nginx.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
