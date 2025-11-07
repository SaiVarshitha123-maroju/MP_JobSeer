# Multi-stage Dockerfile for JobSeer

# Stage 1: Build React frontend
FROM node:18-alpine AS client-build
WORKDIR /app/client

# Copy client package files
COPY client/package*.json ./
RUN npm install

# Copy client source code
COPY client/ ./

# Build the React app
RUN npm run build

# Stage 2: Setup backend
FROM node:18-alpine AS backend
WORKDIR /app

# Copy backend package files
COPY package*.json ./
RUN npm install --production

# Copy backend source code
COPY server.js ./
COPY cosineSimilarityModel.js ./
COPY models/ ./models/
COPY routes/ ./routes/

# Copy built frontend from Stage 1
COPY --from=client-build /app/client/build ./client/build

# Expose port
EXPOSE 3000

# Set environment variables
ENV NODE_ENV=production

# Start the server
CMD ["node", "server.js"]
