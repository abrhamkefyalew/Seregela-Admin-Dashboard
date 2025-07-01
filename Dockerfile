# -----------------------------
# Stage 1: Builder
# -----------------------------
FROM node:22.12.0-alpine AS builder

# Set working directory
WORKDIR /app

# Copy only package info for installing dependencies first (cached)
COPY package*.json ./

# Install ALL dependencies including devDependencies (to get cross-env etc)
RUN npm install

# Copy full source code into container
COPY . .

# Build the Next.js production bundle
RUN npm run build


# -----------------------------
# Stage 2: Runner
# -----------------------------
FROM node:22.12.0-alpine AS runner

WORKDIR /app

# Copy only package.json for production dependencies install
COPY package*.json ./

# Install only production dependencies (smaller image)
RUN npm install --production

# Copy built Next.js output and other necessary files from builder

# Copy cross-env binary from builder stage
COPY --from=builder /app/node_modules/.bin/cross-env /usr/local/bin/cross-env

COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./package.json
COPY --from=builder /app/tsconfig.json ./tsconfig.json

# Set internal container port from .env (CONTAINER_PORT)
ENV PORT=${CONTAINER_PORT}

# Expose the container's internal port
EXPOSE ${CONTAINER_PORT}

# Run app with npm start (which uses cross-env and $PORT from env)
CMD ["npm", "start"]
