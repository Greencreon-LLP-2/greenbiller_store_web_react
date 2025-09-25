
# Use Node LTS
FROM node:20-alpine

# Set working directory
WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy all source files
COPY . .

# Move CSS files and fix imports (Linux case-sensitive)
RUN mkdir -p src/pages/settings && \
    mv src/styles/Settings/ProfileSettings.css src/pages/settings/ 2>/dev/null || true && \
    mv src/styles/settings/SecurityPage.css src/pages/settings/ 2>/dev/null || true && \
    sed -i 's|../../styles/Settings/ProfileSettings.css|./ProfileSettings.css|' src/pages/settings/ProfileSettings.jsx || true && \
    sed -i 's|../../styles/settings/SecurityPage.css|./SecurityPage.css|' src/pages/settings/SecurityPage.jsx || true

# Build React app
RUN npm run build && \
    # Ensure output folder is 'dist' for consistency
    if [ -d "build" ]; then mv build dist; fi

# Expose port 3011
EXPOSE 3011

# Start server (using serve package)
RUN npm install -g serve
CMD ["serve", "-s", "dist", "-l", "3011"]
