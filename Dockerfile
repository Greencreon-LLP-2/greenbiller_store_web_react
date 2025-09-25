# Use Node.js as base image
FROM node:20-alpine

# Set working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy all source code
COPY . .

# Expose port 3011
EXPOSE 3011

# Start the React app on port 3011
CMD ["npm", "start", "--", "--port", "3011"]
