# Backend Requirements

This document outlines the requirements for setting up and running the backend server.

## Environment Variables

Create a `.env` file in the `backend` directory with the following variables:

```env
# Server Configuration
PORT=5000
NODE_ENV=development

# Database Configuration (MongoDB)
# Replace <username>, <password>, <cluster>, and <dbname> with your actual values
DATABASE_URL="mongodb+srv://<username>:<password>@<cluster>.mongodb.net/<dbname>?retryWrites=true&w=majority"

# Authentication
# Secret key for signing JWT tokens. Use a strong, random string.
JWT_SECRET=your_jwt_secret_key_here
```

## Dependencies

The following packages are required and will be installed via `npm install`:

### Production Dependencies
- **express**: Web framework for Node.js.
- **cors**: Middleware to enable Cross-Origin Resource Sharing.
- **dotenv**: Loads environment variables from `.env` file.
- **bcryptjs**: Library for hashing passwords.
- **jsonwebtoken**: Implementation of JSON Web Tokens (JWT) for authentication.
- **@prisma/client**: Auto-generated database client for Prisma.
- **prisma**: Prisma ORM tool.

### Development Dependencies
- **nodemon**: Utility that monitors for changes and automatically restarts the server.

## Installation & Setup

1.  Navigate to the backend directory:
    ```bash
    cd backend
    ```

2.  Install dependencies:
    ```bash
    npm install
    ```

3.  Generate Prisma Client:
    ```bash
    npx prisma generate
    ```

4.  Start the server:
    - Development mode:
      ```bash
      npm run dev
      ```
    - Production mode:
      ```bash
      npm start
      ```
