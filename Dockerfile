# -----------------------------
# Stage 1: Builder
# -----------------------------
FROM node:22.12.0-alpine AS builder

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .
RUN npm run build

# -----------------------------
# Stage 2: Runner
# -----------------------------
FROM node:22.12.0-alpine AS runner

WORKDIR /app

# Copy full app code, including node_modules
COPY --from=builder /app /app

# Set PORT from env
ENV PORT=${CONTAINER_PORT}

EXPOSE ${CONTAINER_PORT}

# Use npx to reliably call Next.js from node_modules
CMD ["sh", "-c", "npx next start -p $PORT"]

