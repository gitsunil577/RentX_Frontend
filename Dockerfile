# Build stage
FROM node:20-alpine AS builder

# Set working directory
WORKDIR /app

# Build arguments for environment variables
ARG VITE_API_BASE_URL
ARG VITE_RAZORPAY_KEY_ID

# Set environment variables from build args
ENV VITE_API_BASE_URL=$VITE_API_BASE_URL
ENV VITE_RAZORPAY_KEY_ID=$VITE_RAZORPAY_KEY_ID

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm ci

# Copy source code
COPY . .

# Build the application
RUN npm run build

# Verify build output exists
RUN ls -la /app/dist && echo "Build successful, dist directory contents listed above"

# Production stage
FROM nginx:alpine

# Remove default nginx config
RUN rm /etc/nginx/conf.d/default.conf

# Copy custom nginx configuration
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Copy built assets from builder stage
COPY --from=builder /app/dist /usr/share/nginx/html

# Verify files were copied
RUN ls -la /usr/share/nginx/html

# Create a startup script to handle PORT environment variable
RUN echo $'#!/bin/sh\n\
echo "Starting nginx on port ${PORT:-8080}"\n\
nginx -g "daemon off;"' > /start.sh && chmod +x /start.sh

# Expose port 8080 (Cloud Run default)
EXPOSE 8080

# Use the startup script
CMD ["/start.sh"]
