# Stage 1: Build React App
FROM node:18-alpine AS build
WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .
RUN npm run build

# Stage 2: Nginx Server
FROM nginx:alpine

# Remove default nginx site config
RUN rm /etc/nginx/conf.d/default.conf

# Copy our custom nginx config
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Copy React build files
COPY --from=build /app/dist /var/www/static_html/greenbiller_store_web_react

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
