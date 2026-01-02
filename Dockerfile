# Optimized Dockerfile for VPS Deployment

# Stage 1: Build the React application
FROM node:20-slim AS builder
WORKDIR /app

# Install pnpm and configure it for Docker
RUN npm install -g pnpm && pnpm config set node-linker hoisted

COPY package.json pnpm-lock.yaml* ./
RUN pnpm install --frozen-lockfile

COPY . .
RUN pnpm build

# Stage 2: Serve with Express
FROM node:20-slim
WORKDIR /app

RUN npm install -g pnpm && pnpm config set node-linker hoisted

COPY package.json pnpm-lock.yaml* ./
RUN pnpm install --prod --frozen-lockfile

COPY --from=builder /app/dist ./dist
COPY --from=builder /app/server.js ./
COPY --from=builder /app/email-templates ./email-templates
# reviews-cache.json will be created dynamically or can be mounted

ENV NODE_ENV=production
ENV PORT=80
EXPOSE 80

CMD ["node", "server.js"]
