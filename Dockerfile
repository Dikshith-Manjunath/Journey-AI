# --- Stage 1: Build the app ---
    FROM node:23-alpine AS builder

    WORKDIR /app
    
    # Copy and install dependencies
    COPY package*.json ./
    RUN npm ci
    
    # Copy the rest of the app
    COPY . .
    
    # Build the Next.js app
    RUN npm run build
    
    # --- Stage 2: Run the app ---
    FROM node:23-alpine
    
    WORKDIR /app
    
    # Copy necessary build artifacts
    COPY --from=builder /app/package*.json ./
    COPY --from=builder /app/.next .next
    COPY --from=builder /app/public public
    COPY --from=builder /app/next.config.js .
    COPY --from=builder /app/node_modules node_modules
    
    # Expose port 3000
    EXPOSE 3000
    
    # Start the app
    CMD ["npm", "start"]
    