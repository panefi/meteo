# Use an official Node.js runtime as a parent image
FROM node:18-slim

# Set the working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install Node.js dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Expose port 3000 to access the Node.js app
EXPOSE 3000

# Set the environment variables for the MySQL connection
ENV DB_HOST=mysql
ENV DB_PORT=3306
ENV DB_USER=user
ENV DB_PASSWORD=Test123
ENV DB_NAME=meteo

# Set another environment variables
ENV BASE_URL=http://127.0.0.1:3000/api

# Command to run your application
CMD ["npm", "start"]