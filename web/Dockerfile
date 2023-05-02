# Use an official Node runtime as the parent image
FROM node:16-alpine

# Install pnpm
RUN npm install -g pnpm@7.24.3

# Set the working directory inside the container
WORKDIR /app/

# Copy package.json, package-lock.json and pnpm-lock.yaml to the container
COPY . /app/

# Install dependencies with pnpm
RUN pnpm install --frozen-lockfile

# Run the app on port 3000
EXPOSE 3000
