# Use official Node.js image
FROM node:18

# Set working directory inside container
WORKDIR /app

# Copy package.json and package-lock.json first (better for caching)
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application
COPY . .

# Expose port 3011 for Vite dev server
EXPOSE 3011

# Start React app in dev mode
CMD ["npm", "run", "dev", "--", "--host", "0.0.0.0", "--port", "3011"]
