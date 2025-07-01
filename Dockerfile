# -----------------------------
# Stage 1: Builder
# -----------------------------
FROM node:22.12.0-alpine AS builder

# set working directory
WORKDIR /app

# Copy only package info for installing dependencies first (cached)
COPY package*.json ./

# Install all dependencies (including cross-env from devDependencies)
RUN npm install

# Copy full source code into container
COPY . .

# Build the Next.js production bundle
RUN npm run build


# -----------------------------
# Stage 2: Runner (Production)
# -----------------------------
FROM node:22.12.0-alpine AS runner

WORKDIR /app

COPY package*.json ./

# Install only production dependencies
RUN npm install --production

# -----------------------------
# Manually copy `cross-env` binary from builder stage
# because it's a devDependency (not installed in production)
# -----------------------------
COPY --from=builder /app/node_modules/.bin/cross-env /usr/local/bin/cross-env

# Copy built app and necessary files
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./package.json
COPY --from=builder /app/tsconfig.json ./tsconfig.json

# Set internal container port using .env (e.g., CONTAINER_PORT=7004)
ENV PORT=${CONTAINER_PORT}

# Expose internal container port
EXPOSE ${CONTAINER_PORT}

# # Start app using port from .env (e.g., 7004 inside container)
# CMD ["npm", "start"]
#
#
# Set internal container port using .env (e.g., CONTAINER_PORT=7004)
ENV PORT=${CONTAINER_PORT}

# Expose internal port
EXPOSE ${CONTAINER_PORT}

# Replace cross-env with inline env vars
CMD PORT=$PORT next start -p $PORT