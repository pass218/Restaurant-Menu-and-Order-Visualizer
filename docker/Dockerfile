# ==============================================================================
# Multi-Stage Dockerfile: Desi Tadka Restaurant Menu & Order Visualizer
# Stage 1: Test & Quality Gate Build (Node.js 20 Alpine)
# ==============================================================================
FROM node:20-alpine AS builder

WORKDIR /build

# Copy dependency manifests first to leverage Docker layer caching
COPY app/package*.json ./

# Install clean, deterministic dependencies for testing
RUN npm ci

# Copy application source code, assets, and Jest unit tests
COPY app/ ./

# Run automated unit tests; build fails immediately if any test fails
RUN npm test

# Prepare distribution bundle including production WebP images
RUN mkdir -p /build/dist && \
    cp index.html styles.css app.js logic.js menu.json health.html /build/dist/ && \
    cp -r images /build/dist/ && \
    rm -rf /build/dist/images/raw

# ==============================================================================
# Stage 2: Hardened Non-Root NGINX Runtime (Alpine Linux)
# Final image size: ~28MB
# ==============================================================================
FROM nginx:1.27-alpine AS runtime

LABEL maintainer="Senior DevOps Engineer" \
      project="Desi Tadka: Restaurant Menu & Order Visualizer" \
      version="1.0.0" \
      cloud="AWS (ap-south-1 Mumbai)" \
      registry="Docker Hub"

# Create dedicated non-root application user and group (UID 10001)
RUN addgroup -g 10001 -S appgroup && \
    adduser -u 10001 -S appuser -G appgroup

# Remove default configuration and placeholder welcome assets
RUN rm -rf /etc/nginx/conf.d/* /usr/share/nginx/html/*

# Set up runtime directories and file permissions for unprivileged execution
RUN touch /tmp/nginx.pid && \
    chown -R appuser:appgroup /usr/share/nginx/html \
                             /var/cache/nginx \
                             /var/log/nginx \
                             /etc/nginx \
                             /tmp

# Copy custom hardened NGINX configuration
COPY --chown=appuser:appgroup docker/nginx.conf /etc/nginx/nginx.conf

# Copy compiled static assets and optimized images from builder stage
COPY --from=builder --chown=appuser:appgroup /build/dist /usr/share/nginx/html

# Expose unprivileged non-root HTTP port
EXPOSE 8080

# Production Healthcheck Probe
HEALTHCHECK --interval=30s --timeout=5s --start-period=5s --retries=3 \
  CMD wget --no-verbose --tries=1 --spider http://127.0.0.1:8080/health.html || exit 1

# Enforce non-root execution (conforms to CIS Docker Benchmark & K8s Restricted PSS)
USER 10001

# Launch NGINX in foreground
STOPSIGNAL SIGQUIT
CMD ["nginx", "-g", "daemon off;"]
