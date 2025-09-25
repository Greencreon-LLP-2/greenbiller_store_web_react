# Stage 1: Build React App
FROM node:18-alpine AS build
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

# Stage 2: Minimal container just to hold files
FROM alpine:latest
WORKDIR /var/www/static_html/greenbiller_store_web_react
COPY --from=build /app/dist .

# Keep container alive (no nginx)
EXPOSE 3011
CMD ["sh", "-c", "while :; do sleep 1; done"]
