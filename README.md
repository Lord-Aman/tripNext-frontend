# TripNext Backend

The **TripNext Backend** is a Node.js-based backend service for managing trips, events, and tasks within the TripNext platform. It provides REST APIs for handling users, trips, events, and to-dos, and is powered by Express.js and MongoDB for efficient data handling and storage.

## Features

- **User Management**: Create and manage user accounts with secure data handling.
- **Trip Management**: Create, update, and delete trips with customizable details like name, destination, and dates.
- **Event Management**: Add and manage events related to specific trips.
- **To-Do Management**: Add, manage, and track to-dos for trips and events.
- **Database Management**: MongoDB is used to persist all user, trip, event, and to-do data.
- **Environment Configuration**: The project uses `dotenv` to manage environment variables securely.

## Technologies Used

- **Node.js**: JavaScript runtime for building server-side applications.
- **Express.js**: Fast, minimalist web framework for Node.js.
- **MongoDB**: NoSQL database for storing user, trip, event, and to-do data.
- **Mongoose**: Elegant MongoDB object modeling for Node.js.
- **dotenv**: Environment variable management.
- **CORS**: Cross-origin resource sharing middleware.

## Prerequisites

- **Node.js**: Version 14.x or higher.
- **MongoDB**: Installed and running either locally or on a cloud platform like MongoDB Atlas.
- **npm**: Node package manager for installing dependencies.

## Getting Started

### Clone the Repository

```bash
git clone https://github.com/Lord-Aman/tripnext-backend.git
cd tripnext-backend
```

### Install Dependencies

Install the project dependencies using npm:

```bash
npm install
```

### Environment Variables

Create a `.env` file in the root directory with the following variables:

```env
MONGO_URI=your-mongodb-connection-string
PORT=3000
```

### Run the Server

Start the server locally with the following command:

```bash
npm start
```

The server will be running on `http://localhost:3000`.

### Run in Development Mode

To run the project in development mode with automatic server restarts using `nodemon`, use the command:

```bash
npm run dev
```

## API Endpoints

### User Routes

- **POST** `/api/users/register`: Register a new user.
- **POST** `/api/users/login`: Authenticate a user and return a JWT token.

### Trip Routes

- **GET** `/api/trips`: Retrieve all trips for the logged-in user.
- **POST** `/api/trips`: Create a new trip.
- **PUT** `/api/trips/:id`: Update a trip by its ID.
- **DELETE** `/api/trips/:id`: Delete a trip by its ID.

### Event Routes

- **GET** `/api/events`: Retrieve all events for a specific trip.
- **POST** `/api/events`: Create a new event.
- **PUT** `/api/events/:id`: Update an event by its ID.
- **DELETE** `/api/events/:id`: Delete an event by its ID.

### To-Do Routes

- **GET** `/api/todos`: Retrieve all to-dos for a specific trip.
- **POST** `/api/todos`: Create a new to-do item.
- **PUT** `/api/todos/:id`: Update a to-do by its ID.
- **DELETE** `/api/todos/:id`: Delete a to-do by its ID.

## Deployment

The backend for TripNext is deployed on a Linux Virtual Machine (VM). You can access the live backend at:

[**https://tripnext-backend.labs.crio.do/**](https://tripnext-backend.labs.crio.do/)

## Project Structure

```bash
├── config              # Configuration files (e.g., database setup)
│   └── db.js           # MongoDB connection setup
├── models              # Mongoose models for Trip, Event, and ToDo
│   ├── eventModel.js
│   ├── todoModel.js
│   └── tripModel.js
├── routes              # API route handlers for users, trips, events, and todos
├── index.js            # Main server file
├── package.json        # Project metadata and dependencies
├── .env                # Environment variables (not included in repo)
└── .gitignore          # Git ignore file for sensitive data and node_modules
```

## How to Contribute

1. Fork the repository.
2. Create a new branch with your feature or bugfix.
3. Commit your changes and push the branch.
4. Open a pull request for review.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.
