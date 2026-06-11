# Task Management API

A robust REST API for managing tasks and user authentication built with Node.js, Express, and MongoDB.

**Live Demo:** https://task-management-erbp.onrender.com

## Table of Contents

- [Installation](#installation)
- [Project Structure](#project-structure)
- [Environment Variables](#environment-variables)
- [API Documentation](#api-documentation)
- [Running the Project](#running-the-project)

## Installation

1. Clone the repository:

```bash
git clone <repository-url>
cd case-study
```

2. Install dependencies:

```bash
npm install
```

3. Create `.env` file in the root directory with required environment variables (see [Environment Variables](#environment-variables))

4. Start the server:

```bash
npm start          # Production mode
npm run dev        # Development mode with nodemon
```

## Project Structure

```
case-study/
├── src/
│   ├── index.js                    # Application entry point
│   ├── server.js                   # Express server configuration
│   ├── constants/
│   │   └── index.js               # Application constants
│   ├── controller/
│   │   ├── auth.js                # Authentication controllers
│   │   └── task.js                # Task controllers
│   ├── db/
│   │   ├── connectMongoDB.js      # MongoDB connection
│   │   └── models/
│   │       ├── user.js            # User schema
│   │       ├── task.js            # Task schema
│   │       └── session.js         # Session schema
│   ├── middleware/
│   │   ├── authenticate.js        # JWT authentication middleware
│   │   ├── errorHandler.js        # Global error handler
│   │   ├── isValidId.js           # MongoDB ID validation
│   │   ├── notFoundHandler.js     # 404 handler
│   │   └── validateBody.js        # Request body validation
│   ├── router/
│   │   ├── index.js               # Main router
│   │   ├── auth.js                # Authentication routes
│   │   └── task.js                # Task routes
│   ├── service/
│   │   ├── auth.js                # Authentication business logic
│   │   └── task.js                # Task business logic
│   ├── utils/
│   │   ├── ctrlWrapper.js         # Controller error wrapper
│   │   └── env.js                 # Environment variable helper
│   └── validation/
│       ├── auth.js                # Auth request validation schemas
│       └── task.js                # Task request validation schemas
└── package.json
```

## Environment Variables

Create a `.env` file in the root directory with the following variables:

```env
PORT=3000
MONGODB_URI=<your-mongodb-connection-string>
JWT_SECRET=<your-jwt-secret-key>
JWT_EXPIRE=<jwt-expiration-time>
```

## API Documentation

### Base URL

```
https://task-management-erbp.onrender.com/api
```

---

### Authentication Endpoints

#### 1. Register User

- **Method:** `POST`
- **Endpoint:** `/auth/register`
- **Description:** Register a new user account
- **Request Body:**

```json
{
  "email": "user@example.com",
  "password": "password123"
}
```

- **Response (201):**

```json
{
  "message": "Registration was successful",
  "data": {
    "_id": "user-id",
    "email": "user@example.com"
  }
}
```

#### 2. Login User

- **Method:** `POST`
- **Endpoint:** `/auth/login`
- **Description:** Login with email and password
- **Request Body:**

```json
{
  "email": "user@example.com",
  "password": "password123"
}
```

- **Response (200):**

```json
{
  "message": "The login was successful",
  "data": {
    "token": "access-token-jwt"
  }
}
```

- **Cookies Set:**
  - `refreshToken` (httpOnly)
  - `sessionId` (httpOnly)

#### 3. Logout User

- **Method:** `GET`
- **Endpoint:** `/auth/logout`
- **Description:** Logout the current user
- **Authentication:** Not required
- **Response (204):** No content

#### 4. Refresh Token

- **Method:** `GET`
- **Endpoint:** `/auth/refresh`
- **Description:** Get a new access token using refresh token
- **Authentication:** Not required (uses cookies)
- **Response (201):**

```json
{
  "message": "The refresh was successfully applied",
  "data": {
    "token": "new-access-token-jwt"
  }
}
```

- **Cookies Set:**
  - `refreshToken` (httpOnly)
  - `sessionId` (httpOnly)

---

### Task Endpoints

**⚠️ All task endpoints require authentication (Bearer token)**

#### 1. Create Task

- **Method:** `POST`
- **Endpoint:** `/task`
- **Description:** Create a new task
- **Authentication:** Required ✓
- **Request Body:**

```json
{
  "title": "Task title",
  "description": "Task description",
  "status": "todo"
}
```

- **Response (201):**

```json
{
  "_id": "task-id",
  "title": "Task title",
  "description": "Task description",
  "status": "todo",
  "userId": "user-id",
  "createdAt": "2024-01-01T00:00:00.000Z"
}
```

#### 2. Get All Tasks

- **Method:** `GET`
- **Endpoint:** `/task`
- **Description:** Retrieve all tasks for the authenticated user
- **Authentication:** Required ✓
- **Response (200):**

```json
[
  {
    "_id": "task-id-1",
    "title": "Task 1",
    "description": "Description 1",
    "status": "todo",
    "userId": "user-id",
    "createdAt": "2024-01-01T00:00:00.000Z"
  },
  {
    "_id": "task-id-2",
    "title": "Task 2",
    "description": "Description 2",
    "status": "in-progress",
    "userId": "user-id",
    "createdAt": "2024-01-02T00:00:00.000Z"
  }
]
```

#### 3. Get Single Task

- **Method:** `GET`
- **Endpoint:** `/task/:id`
- **Description:** Retrieve a specific task by ID
- **Authentication:** Required ✓
- **Parameters:**
  - `id` (string, required): MongoDB task ID
- **Response (200):**

```json
{
  "_id": "task-id",
  "title": "Task title",
  "description": "Task description",
  "status": "todo",
  "userId": "user-id",
  "createdAt": "2024-01-01T00:00:00.000Z"
}
```

#### 4. Update Task

- **Method:** `PUT`
- **Endpoint:** `/task/:id`
- **Description:** Update a task
- **Authentication:** Required ✓
- **Parameters:**
  - `id` (string, required): MongoDB task ID
- **Request Body:**

```json
{
  "title": "Updated title",
  "description": "Updated description",
  "status": "completed"
}
```

- **Response (200):**

```json
{
  "_id": "task-id",
  "title": "Updated title",
  "description": "Updated description",
  "status": "completed",
  "userId": "user-id",
  "updatedAt": "2024-01-05T00:00:00.000Z"
}
```

#### 5. Delete Task

- **Method:** `DELETE`
- **Endpoint:** `/task/:id`
- **Description:** Delete a task
- **Authentication:** Required ✓
- **Parameters:**
  - `id` (string, required): MongoDB task ID
- **Response (204):** No content

---

## Running the Project

### Development Mode

```bash
npm run dev
```

Starts the server with nodemon for automatic restarts on file changes.

### Production Mode

```bash
npm start
```

Starts the server normally.

---

## Technologies Used

- **Runtime:** Node.js
- **Framework:** Express.js
- **Database:** MongoDB
- **Authentication:** JWT (JSON Web Tokens)
- **Validation:** Joi
- **Security:** bcrypt, CORS, Cookie Parser
- **Development:** Nodemon

## Dependencies

- `express` - Web framework
- `mongoose` - MongoDB ODM
- `jsonwebtoken` - JWT authentication
- `bcrypt` - Password hashing
- `joi` - Data validation
- `cors` - Cross-origin requests
- `cookie-parser` - Cookie parsing
- `dotenv` - Environment variables
- `http-errors` - HTTP error handling

---

## Error Handling

The API includes a global error handler that returns standardized error responses:

```json
{
  "status": "error",
  "message": "Error description",
  "code": 400
}
```

Common HTTP status codes:

- `200` - OK
- `201` - Created
- `204` - No Content
- `400` - Bad Request
- `401` - Unauthorized
- `404` - Not Found
- `500` - Server Error

---
