# Data Visualization Dashboard - Backend

This is the backend server for the Data Visualization Dashboard assignment. It is built using **Node.js**, **Express**, and **MongoDB** to serve insight data from a provided JSON dataset.

## Features

- **RESTful API**: Serves data via a GET endpoint.
- **Data Import Script**: Easily seed your MongoDB database with the provided `jsondata.json`.
- **Environment Configuration**: Uses `dotenv` for secure database URI management.
- **CORS Enabled**: Configured to allow requests from your frontend application.

---

## Prerequisites

- [Node.js](https://nodejs.org/) (v14 or higher recommended)
- [MongoDB](https://www.mongodb.com/) (Local instance or MongoDB Atlas)

---

## Installation

1. **Navigate to the server directory**:

   ```bash
   cd server
   ```

2. **Install dependencies**:

   ```bash
   npm install
   ```

3. **Environment Setup**:
   Create a `.env` file in the `server` folder and add your MongoDB connection string:

   ```env
   MONGO_URI=mongodb://localhost:27017/analytics
   ```

---

## Database Seeding

Before running the server, you need to import the data from `jsondata.json` into your MongoDB collection.

Run the import script:

```bash
node importData.js

```

_Note: Ensure your MongoDB service is running before executing this command._

---

## Running the Server

### Development Mode (with Nodemon)

Restarts the server automatically on file changes:

```bash
npm start

```

### Production Mode

```bash
npm run start-server

```

The server will be running at: `http://localhost:5000`

---

## API Endpoints

### GET `/api/data`

Fetches all insight records from the database.

**Response Body Sample**:

```json
[
  {
    "intensity": 6,
    "sector": "Energy",
    "topic": "gas",
    "insight": "Annual Energy Outlook",
    "region": "Northern America",
    "country": "United States of America",
    "relevance": 2,
    "pestle": "Industries",
    "likelihood": 3,
    ...
  }
]

```

---

## Project Structure

- `index.js`: Main entry point and Express server configuration.
- `models/Insight.js`: Mongoose schema defining the structure of an insight record.
- `importData.js`: Script to parse `jsondata.json` and save it to MongoDB.
- `jsondata.json`: The raw dataset for the assignment.
