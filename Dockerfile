# Build stage
FROM node:20.18-alpine AS builder
WORKDIR /app
# Copy package files
COPY package*.json ./
COPY pnpm-lock.yaml ./
# Install pnpm
RUN npm i -g pnpm
# Install all dependencies including devDependencies
RUN pnpm install --frozen-lockfile
# Copy source code
COPY . .
# Build the application
RUN pnpm build

# Production stage
FROM node:20.18-alpine
ENV NODE_ENV=production
WORKDIR /app
# Copy package files
COPY package*.json ./
COPY pnpm-lock.yaml ./
# Install pnpm
RUN npm i -g pnpm
# Install production dependencies only
RUN pnpm install --prod --frozen-lockfile
# Copy built application from builder stage
COPY --from=builder /app/dist ./dist
# Expose the port the app runs on
EXPOSE 3000
# Start the application
CMD ["pnpm", "run", "start:prod"]