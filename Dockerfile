# Use Node.js as the base image
FROM node:23-alpine

# Set working directory
WORKDIR /app

# Copy package.json and package-lock.json files
COPY package*.json ./

# Install dependencies
RUN npm ci

# Copy the rest of the application code
COPY . .

# Build the Next.js application
RUN npm run build

# Expose the port that Next.js runs on
EXPOSE 3000

# Command to run the application
CMD ["npm", "start"]