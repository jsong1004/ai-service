# Use official Node.js 18 image as the base
FROM node:18-alpine AS base
WORKDIR /app

# Install pnpm
RUN npm install -g npm@11.4.1

# Install dependencies only when needed
COPY package.json pnpm-lock.yaml* ./
RUN pnpm install --frozen-lockfile

# Copy the rest of the application code
COPY . .

# Build the Next.js app
RUN pnpm build

# Start the app in production mode
EXPOSE 8080
ENV PORT 8080
CMD ["pnpm", "start"] 