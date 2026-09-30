# ==============================================================================
# Multi-Stage Dockerfile: Restaurant Menu & Order Visualizer
# Stage 1: Build & Test Validation (Node.js 20 Alpine)
# ==============================================================================
FROM node:20-alpine AS builder

WORKDIR /build

# Copy dependency manifests first to leverage Docker layer caching
COPY app/package*.json ./

# Install clean, deterministic dependencies
RUN npm ci

# Copy application source code and test files
COPY app/ ./

# Run automated unit tests during build; aborts build if tests fail
RUN npm test

# Bundle production assets into distribution folder
RUN mkdir -p /build/dist && \
    cp index.html styles.css app.js logic.js menu.json health.html /build/dist/

# ==============================================================================
# Stage 2: Hardened Non-Root NGINX Runtime (Alpine Linux)
# Final image size: ~25MB
# ==============================================================================
FROM nginx:1.27-alpine AS runtime

LABEL maintainer="Senior DevOps Engineer" \
      project="Restaurant Menu & Order Visualizer" \
      version="1.0.0" \
      cloud="AWS (ap-south-1)" \
      orchestrator="Kubernetes"

# Create dedicated non-root application user and group (UID 10001)
RUN addgroup -g 10001 -S appgroup && \
    adduser -u 10001 -S appuser -G appgroup

# Remove default configuration and placeholder welcome assets
RUN rm -rf /etc/nginx/conf.d/* /usr/share/nginx/html/*

# Set up runtime directories and file permissions for unprivileged user
RUN touch /tmp/nginx.pid && \
    chown -R appuser:appgroup /usr/share/nginx/html \
                             /var/cache/nginx \
                             /var/log/nginx \
                             /etc/nginx \
                             /tmp

# Copy custom NGINX configuration
COPY --chown=appuser:appgroup docker/nginx.conf /etc/nginx/nginx.conf

# Copy compiled static assets from builder stage
COPY --from=builder --chown=appuser:appgroup /build/dist /usr/share/nginx/html

# Expose unprivileged HTTP port
EXPOSE 8080

# Production Healthcheck Probe using Alpine native Busybox wget
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD wget --no-verbose --tries=1 --spider http://127.0.0.1:8080/health.html || exit 1

# Enforce non-root execution (satisfies Kubernetes Restricted Pod Security Standards)
USER 10001

# Launch NGINX in foreground
STOPSIGNAL SIGQUIT
CMD ["nginx", "-g", "daemon off;"]
