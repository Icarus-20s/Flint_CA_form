# Use official Node.js image as base
FROM node:23-alpine

# Set working directory
WORKDIR /app

# Copy package.json and package-lock.json (if available)
COPY package*.json ./

# Install dependencies
RUN npm install --legacy-peer-deps

# Copy project files
COPY . .

# Build the application
RUN npm run build

# Expose the port for Vite
EXPOSE 5173

# Command to run the application
CMD ["npm", "run", "dev", "--", "--host"]
