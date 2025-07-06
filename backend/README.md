# Meeting Calendar Backend (Spring Boot)

This is the backend REST API for the Meeting Calendar app.

## Features

- CRUD API for managing meetings
- Built with Spring Boot

## Getting Started

### Prerequisites

- Java 17 or later
- Maven (or use the Maven wrapper)

### Running the App

1. Navigate to the backend directory:

   ```bash
   cd backend
   ```

2. Build and run the app:

   ```bash
   mvn spring-boot:run
   ```

   or, if using the Maven wrapper:

   ```bash
   ./mvnw spring-boot:run
   ```

The API will be available at [http://localhost:8080](http://localhost:8080).

## API Endpoints

- `GET    /api/meetings` — List all meetings
- `POST   /api/meetings` — Create a new meeting
- `GET    /api/meetings/{id}` — Get a meeting by ID
- `PUT    /api/meetings/{id}` — Update a meeting
- `DELETE /api/meetings/{id}` — Delete a meeting

## Project Structure

- `src/main/java` — Java source code
- `src/main/resources` — Application config
- `src/test/java` — Tests

---

See the main project README for frontend instructions.
