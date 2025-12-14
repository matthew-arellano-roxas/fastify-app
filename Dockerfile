# Stage 1: Build
FROM node:20-alpine AS builder

# Set working directory
WORKDIR /usr/src/app

# Copy package.json and package-lock.json first for caching
COPY package*.json ./

# Install all dependencies (including devDependencies for TypeScript build)
RUN npm install

# Copy source files
COPY . .

# Compile TypeScript
RUN npm run build

# Stage 2: Production
FROM node:20-alpine

WORKDIR /usr/src/app

# Copy compiled files from builder stage
COPY --from=builder /usr/src/app/dist ./dist

# Copy package files
COPY package*.json ./

# Install only production dependencies
RUN npm install --production

# Expose port (adjust if needed)
EXPOSE 3000

# Start the app
CMD ["node", "dist/server.js"]


# Simple Node.js Dockerfile

# FROM node:18

# WORKDIR /usr/src/app

# COPY . . 

# RUN npm install

# RUN npm run build

# EXPOSE 3000

# CMD ["node", "dist/server.js"]