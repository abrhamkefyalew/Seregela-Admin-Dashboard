# -----------------------------
# Stage 1: Builder
# -----------------------------
FROM node:22.12.0-alpine AS builder

WORKDIR /app

COPY package*.json ./

# Install all dependencies including devDependencies (for cross-env etc)
RUN npm install

COPY . .

RUN npm run build

# -----------------------------
# Stage 2: Runner (Production)
# -----------------------------
FROM node:22.12.0-alpine AS runner

WORKDIR /app

COPY package*.json ./

# Install production dependencies only (smaller image)
RUN npm install

# Copy built app and necessary files from builder

# Add next binary
COPY --from=builder /app/node_modules/.bin/next /usr/local/bin/next

COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./package.json
COPY --from=builder /app/tsconfig.json ./tsconfig.json

# Set environment variable PORT from .env (CONTAINER_PORT)
ENV PORT=${CONTAINER_PORT}

# Expose internal container port
EXPOSE ${CONTAINER_PORT}

# Start the app (no cross-env, PORT is already set)
CMD ["npm", "start"]
