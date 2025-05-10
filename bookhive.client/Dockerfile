# Stage de build
FROM node:20-alpine AS vite-app

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

RUN npm run build

FROM nginx:alpine

# Copiar o conteúdo gerado pelo Vite
COPY --from=vite-app /app/dist /usr/share/nginx/html

# Copiar o arquivo de configuração personalizado
COPY nginx.conf /etc/nginx/nginx.conf

# Expondo a porta 8080 para o NGINX
EXPOSE 8080

# Definir a variável de ambiente PORT
ENV PORT=8080

# Alterar o comando do NGINX para ouvir na porta 8080
CMD ["nginx", "-g", "daemon off;", "-p", "8080"]

