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

COPY package*.json ./

# ❌ Don't use --production (Next.js will break)
RUN npm install

# ✅ Copy everything needed
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./package.json
COPY --from=builder /app/tsconfig.json ./tsconfig.json

# ✅ Use env var
ENV PORT=${CONTAINER_PORT}
EXPOSE ${CONTAINER_PORT}

# ✅ Start using full path
CMD ["npx", "next", "start", "-p", "$PORT"]
