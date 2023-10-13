# Dockerfile

# Use an official Node.js runtime as the base image
FROM node:17

# Set the working directory inside the container
WORKDIR /usr/src/app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install the application's dependencies inside the container
RUN npm install

# Copy the rest of the application's files to the working directory
COPY . .

# Make the application's port available to the outside world
EXPOSE 3000

# Define the command to run the application
CMD ["npm", "start"]

