
# Meteorological Application Setup

## Docker Setup

This repository contains the setup for a meteorological backend application using MySQL and Node.js with the Express framework. To begin, clone the repository using the following command:

```bash
git clone https://github.com/panefi/meteo.git
```

Follow the instructions below to set up the database and populate it with fake data.

## Docker Setup

The easiest way to run this application is through Docker, which will set up both the Express application and the MySQL database in separate containers.

### Prerequisites
- Docker

### Step 1: Build and Start the Docker Containers

1. **Build the Docker containers**:
   ```bash
   docker-compose build
   ```

2. **Start the containers**:
   ```bash
   docker-compose up
   ```

   This will start both the Express application and the MySQL database in separate containers.

### Step 2: Access the API

Once the containers are up and running, you can access the Express application. 

The application provides API documentation generated with Swagger. You can access it by navigating to:
```
http://127.0.0.1:3000/api-docs
```

This page gives a detailed overview of the available API endpoints for managing stations and sensors, along with allowed queries and request body structures.

### Step 3: Stopping the Containers

To stop the running containers, use:
```bash
docker-compose down
```

## Local Development Setup

If you prefer to run the application on your local machine without Docker, follow the steps below.

### Prerequisites
- MySQL Server installed
- Node.js 16+ installed
- Required Node.js packages (listed in `package.json`)

### Step 1: Set Up the MySQL Database

1. Connect to your MySQL database:
   ```bash
   mysql -u [your_username] -p
   ```
   Enter your MySQL password when prompted.

2. Run the `a_setup.sql` file to create the `meteo` database and the necessary tables:
   ```bash
   source path/to/a_setup.sql;
   ```
   
3. Populate the `stations`, `sensors` and`sensors_data` tables with fake data by running `b_fake_data.sql`:
   ```bash
   source path/to/b_fake_data.sql;
   ```

### Step 2: Set Up the Node.js Environment

1. Clone the repository to your local machine.

2. Install the required dependencies:
   ```bash
   npm install
   ```

### Step 3: Configure the Environment Variables

Create a `.env` file in the project root with your database credentials and API base URL. Use the following template:
```
DB_HOST=127.0.0.1
DB_USER=[USER]
DB_PASSWORD=[USER_PASSWORD]
DB_PORT=3306
DB_NAME=meteo

BASE_URL=http://127.0.0.1:3000/api
```

### Step 4: Run the Express Application

Start the application:
```bash
npm start
```

Alternatively, for development with live-reloading, use:
```bash
npm run dev
```

### Step 5: Access the API

Once the application is running, access the API documentation by visiting:
```
http://127.0.0.1:3000/api-docs
```

---
