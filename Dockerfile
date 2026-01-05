# Build stage
FROM node:20-alpine AS build

WORKDIR /app

# Build arguments with defaults
ARG VITE_API_BASE_URL=http://localhost:8080
ARG VITE_RAZORPAY_KEY_ID=rzp_test_default

# Set environment variables for build
ENV VITE_API_BASE_URL=$VITE_API_BASE_URL
ENV VITE_RAZORPAY_KEY_ID=$VITE_RAZORPAY_KEY_ID

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm install --legacy-peer-deps || npm install

# Copy all source files
COPY . .

# Debug: Print environment variables
RUN echo "Building with VITE_API_BASE_URL=$VITE_API_BASE_URL"
RUN echo "Building with VITE_RAZORPAY_KEY_ID=$VITE_RAZORPAY_KEY_ID"

# Build the application
RUN npm run build

# Debug: Verify build output
RUN echo "=== Build completed ===" && \
    ls -la /app/dist && \
    echo "=== Files in dist ===" && \
    ls -R /app/dist

# Production stage - Use nginx:alpine (smaller and standard)
FROM nginx:alpine

# Remove default nginx configuration
RUN rm -f /etc/nginx/conf.d/default.conf /etc/nginx/conf.d/*.conf

# Copy nginx configuration
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Test nginx config syntax
RUN nginx -t

# Copy built files from build stage
COPY --from=build /app/dist /usr/share/nginx/html

# Verify files were copied and set permissions
RUN echo "=== Verifying nginx html directory ===" && \
    ls -la /usr/share/nginx/html && \
    chmod -R 755 /usr/share/nginx/html && \
    chown -R nginx:nginx /usr/share/nginx/html

# Create a custom entrypoint script
RUN echo '#!/bin/sh' > /docker-entrypoint.sh && \
    echo 'echo "Starting nginx on port 8080..."' >> /docker-entrypoint.sh && \
    echo 'echo "Files in /usr/share/nginx/html:"' >> /docker-entrypoint.sh && \
    echo 'ls -la /usr/share/nginx/html' >> /docker-entrypoint.sh && \
    echo 'echo "Testing nginx configuration..."' >> /docker-entrypoint.sh && \
    echo 'nginx -t' >> /docker-entrypoint.sh && \
    echo 'echo "Starting nginx..."' >> /docker-entrypoint.sh && \
    echo 'exec nginx -g "daemon off;"' >> /docker-entrypoint.sh && \
    chmod +x /docker-entrypoint.sh

# Expose port 8080
EXPOSE 8080

# Use custom entrypoint
ENTRYPOINT ["/docker-entrypoint.sh"]
