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
# Stage 2: Runner (production)
# -----------------------------
FROM node:22.12.0-alpine AS runner

WORKDIR /app

COPY package*.json ./

#  Don't use --production
#  Install all to include Next.js in runtime
RUN npm install

COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./package.json
COPY --from=builder /app/tsconfig.json ./tsconfig.json

ENV PORT=${CONTAINER_PORT}
EXPOSE ${CONTAINER_PORT}

CMD ["next", "start", "-p", "$PORT"]
