# -----------------------------
# Stage 1: Builder
# -----------------------------
FROM node:22.12.0-alpine AS builder

# Set working directory
WORKDIR /app

# Copy only package info for installing dependencies first (cached)
COPY package*.json ./

# Install ALL dependencies including devDependencies
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

# Copy only package.json (again) for production install
COPY package*.json ./

# Install only production dependencies to reduce image size
RUN npm install --production

# Copy built Next.js output from builder stage
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./package.json
COPY --from=builder /app/tsconfig.json ./tsconfig.json

# Use environment variable for the port
ENV PORT=${CONTAINER_PORT}

# Expose internal port defined in .env (e.g., 7004 inside container)
EXPOSE ${CONTAINER_PORT}

# Start app using internal port
CMD ["npm", "start"]
