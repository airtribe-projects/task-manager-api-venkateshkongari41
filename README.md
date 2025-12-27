# Task Manager API

## Overview

This is a simple REST API for managing tasks, built with Express.js. It allows you to create, read, update, and delete tasks with features like filtering by completion status, sorting by creation date, and prioritizing tasks.

The API uses in-memory storage for tasks, making it suitable for development and testing purposes.

## Setup Instructions

### Prerequisites

- Node.js version 18 or higher

### Installation

1. Clone the repository or download the project files.
2. Navigate to the project directory.
3. Install dependencies:
   ```bash
   npm install
   ```

### Running the Server

Start the development server with:

```bash
npm start
```

The server will run on `http://localhost:3000`.

### Running Tests

Run the test suite with:

```bash
npm test
```

## API Endpoints

All endpoints are prefixed with `/tasks`. The API returns JSON responses.

### 1. Get All Tasks

- **Method:** GET
- **Path:** `/tasks`
- **Query Parameters:**
  - `completed` (optional): Filter by completion status (`true` or `false`)
  - `sort` (optional): Sort by creation date (`createdAt`)
- **Response:** Array of task objects
- **Example:**
  ```bash
  curl http://localhost:3000/tasks
  curl "http://localhost:3000/tasks?completed=false"
  curl "http://localhost:3000/tasks?sort=createdAt"
  ```

### 2. Get Task by ID

- **Method:** GET
- **Path:** `/tasks/:id`
- **Path Parameters:**
  - `id`: Task ID (string)
- **Response:** Single task object or 404 if not found
- **Example:**
  ```bash
  curl http://localhost:3000/tasks/1
  ```

### 3. Get Tasks by Priority

- **Method:** GET
- **Path:** `/tasks/priority/:level`
- **Path Parameters:**
  - `level`: Priority level (`low`, `medium`, or `high`)
- **Response:** Array of tasks with the specified priority or 400 for invalid priority
- **Example:**
  ```bash
  curl http://localhost:3000/tasks/priority/high
  ```

### 4. Create New Task

- **Method:** POST
- **Path:** `/tasks`
- **Request Body:**
  ```json
  {
    "title": "Task Title",
    "description": "Task Description",
    "priority": "medium" // optional, defaults to "medium"
  }
  ```
- **Response:** Created task object (201) or 400 for validation errors
- **Example:**
  ```bash
  curl -X POST http://localhost:3000/tasks \
    -H "Content-Type: application/json" \
    -d '{"title": "New Task", "description": "Task description", "priority": "high"}'
  ```

### 5. Update Task

- **Method:** PUT
- **Path:** `/tasks/:id`
- **Path Parameters:**
  - `id`: Task ID (string)
- **Request Body:** (all fields optional)
  ```json
  {
    "title": "Updated Title",
    "description": "Updated Description",
    "completed": true,
    "priority": "low"
  }
  ```
- **Response:** Updated task object or 404 if not found, 400 for invalid priority
- **Example:**
  ```bash
  curl -X PUT http://localhost:3000/tasks/1 \
    -H "Content-Type: application/json" \
    -d '{"completed": true}'
  ```

### 6. Delete Task

- **Method:** DELETE
- **Path:** `/tasks/:id`
- **Path Parameters:**
  - `id`: Task ID (string)
- **Response:** 204 No Content or 404 if not found
- **Example:**
  ```bash
  curl -X DELETE http://localhost:3000/tasks/1
  ```

## Task Object Structure

```json
{
  "id": "1",
  "title": "Task Title",
  "description": "Task Description",
  "completed": false,
  "priority": "medium",
  "createdAt": "2025-12-20T10:00:00.000Z"
}
```

## Testing the API

You can test the API using:

- **Command line:** Use `curl` commands as shown in the examples above
- **API Client:** Tools like Postman or Insomnia
- **Automated Tests:** Run `npm test` to execute the test suite

The API includes basic validation and error handling. Make sure to send JSON data with the correct Content-Type header for POST and PUT requests.
