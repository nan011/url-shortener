# Use an official Node runtime as the parent image
FROM node:14-alpine

# Install pnpm
RUN npm install -g pnpm

# Set the working directory inside the container
WORKDIR /app

# Copy package.json, package-lock.json and pnpm-lock.yaml to the container
COPY package*.json pnpm-lock.yaml ./

# Install dependencies with pnpm
RUN pnpm install

# Copy the rest of the application files to the container
COPY . .

# Run the app on port 3000
EXPOSE 3000
