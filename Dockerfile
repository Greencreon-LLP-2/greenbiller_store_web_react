# Base image
FROM node:18-alpine

# Set working directory
WORKDIR /app

# Copy package files and install dependencies
COPY package*.json ./
RUN npm install

# Copy full source
COPY . .

# Build React app
RUN npm run build

# Install serve package to serve React build
RUN npm install -g serve

# Expose port
EXPOSE 3011

# Command to run React app
CMD ["serve", "-s", "dist", "-l", "3011"]
