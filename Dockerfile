# Multi-stage Dockerfile for Fly.io

# Stage 1: Build the React application
FROM node:20-slim AS builder
WORKDIR /app
COPY package.json pnpm-lock.yaml* ./
RUN npm install -g pnpm && pnpm install
COPY . .
RUN pnpm build

# Stage 2: Serve with Express
FROM node:20-slim
WORKDIR /app
COPY package.json pnpm-lock.yaml* ./
RUN npm install -g pnpm && pnpm install --prod
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/server.js ./
COPY --from=builder /app/email-templates ./email-templates
# reviews-cache.json will be created dynamically or can be mounted

ENV NODE_ENV=production
ENV PORT=80
EXPOSE 80

CMD ["node", "server.js"]
