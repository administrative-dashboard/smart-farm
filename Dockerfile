# Use an official Node.js runtime as the base image
FROM node:14

# Set the working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json to the container
COPY package*.json ./

# Install application dependencies
RUN npm install

# Copy the rest of your application code to the container
COPY . .

# Build the production-ready frontend code
RUN npm run build

# Expose the port your React application is running on (usually 3000)
EXPOSE 3000

# Define the command to start your React application
CMD ["npm", "start"]
