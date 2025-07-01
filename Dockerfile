# Stage 1: Build Stage
FROM node:22.12.0-alpine AS builder

WORKDIR /app

# Copy package.json and package-lock.json (if present)
COPY package*.json ./

# Install all dependencies including devDependencies for building
RUN npm install

# Copy the entire project files into the container
COPY . .

# Build the Next.js production bundle
RUN npm run build

# Stage 2: Production Stage
FROM node:22.12.0-alpine AS runner

WORKDIR /app

# Copy package.json files for production dependencies install
COPY package*.json ./

# Install ONLY production dependencies to keep image small
RUN npm install --production

# Copy built output and other needed folders/files from builder stage
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./package.json
# COPY --from=builder /app/next.config.js ./next.config.js
COPY --from=builder /app/tsconfig.json ./tsconfig.json

# Expose the port your app runs on (7005 as per your scripts)
EXPOSE 7005

# Run your app in production mode
CMD ["npm", "start"]
