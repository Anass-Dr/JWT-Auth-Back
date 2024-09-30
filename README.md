# JWT Authentication with Node.js

## 1. Introduction

### Project Overview
This project is a web application built with Node.js and Express that uses JSON Web Tokens (JWT) for authentication. It provides a secure way for users to register, log in, and access protected routes.

### Purpose and Goals
The main goal of this project is to implement a secure authentication mechanism using JWT to protect endpoints and allow only authenticated users to perform certain actions.

### Target Audience
This application is suitable for developers looking to integrate JWT-based authentication into their Node.js applications.

## 2. Getting Started

### Prerequisites
- Node.js
- npm

### Installation Instructions
1. Clone the repository:
   ```sh
   git clone https://github.com/Anass-Dr/JWT-Authentication.git
    ```
2. Navigate to the project directory:
   ```sh
   cd JWT-Authentication
   ```
3. Install the dependencies:
   ```sh
    npm install
    ```
4. Set Up Redis:

Install Redis: If you don’t already have Redis installed, you can install it using one of the following methods:
- Using Homebrew (macOS):
    ```sh
    brew install redis
    ```
- Using apt (Ubuntu):
    ```sh
    sudo apt update
    sudo apt install redis-server
    ```
- Using Docker:
  ```sh
  docker run --name redis -p 6379:6379 -d redis
  ```
5. Start the Redis server:
- Using Homebrew (macOS):
    ```sh
    brew services start redis
    ```
- Using apt (Ubuntu):
    ```sh
    sudo systemctl start redis
    ```
- Using Docker:
    ```sh
    docker start redis
    ```
  
## Quick Start Guide
1. Create a `.env` file in the root directory and add the following environment variables:
   ```sh
    APP_HOST=localhost
   
    # Mongodb URI
    DB_URI=
    TEST_DB_URI=
   
    # JWT secret key
    JWT_SECRET=
   
    # Mail configuration
    MAIL_HOST=
    MAIL_PORT=
    MAIL_USER=
    MAIL_PASS=
   
    # AWS S3 configuration
    AWS_ACCESS_KEY_ID=
    AWS_SECRET_ACCESS_KEY=
    AWS_REGION=
    ```
2. Start the server:
    ```sh
     npm start
     ```
3. Access the application at `http://localhost:3000`.

## 3. Project Structure

### Overview
The project structure is as follows:
```
JWT-Authentication/
├── config/
├── controllers/
├── middleware/
├── models/
├── public/
├── routes/
│   └── api.js
├── services/
├── validation/
├── views/
│   └── mail/
├── .env
├── app.js
├── README.md
└── server.js
```

### Description

- `config/`: Contains the configuration files.
- `controllers/`: Contains the controller files for handling the application logic.
- `middleware/`: Contains middleware, such as the JWT authentication middleware.
- `models/`: Contains the model files for defining the database schema.
- `routes/`: Contains the route files for defining the application routes.
- `services/`: Holds utility functions that are used across the application.
- `views/`: Contains the view files for rendering the HTML pages.
- `validation/`: Contains validation logic for user inputs.
- `.env`: Contains the environment variables for the application.
- `app.js`: Contains the main application file.
- `server.js`: Server entry point file that starts the Express server.


## 4. Features

- User Authentication
    - Registration: Create a new user account.
    - Login: Authenticate users using email and password.
    - Logout: Clear the cookie and log out the user.
    - JWT Token Generation: Generate a token upon successful login.
    - Protected Routes: Only accessible with a valid JWT token.
- Password Management
    - Password Hashing: Securely store user passwords using bcrypt.
    - Password Reset: Reset the password using a secure token sent via email.
- Token Refresh
    - Generate a new token when the existing token expires.
- OTP Verification
    - OTP verification is required when logging in from a new device or location.
    - OTP is sent via email or SMS, depending on the user's choice.
    - OTP is valid for a limited time.
- Middleware
    - Input Validation: Middleware for validating inputs in requests.
    - JWT Validation: Middleware for validating JWT tokens in requests.
 

## 5. Packages Used

- `aws-sdk`: AWS SDK for JavaScript
- `axios`: Promise based HTTP client for the browser and node.js
- `bcrypt`: Library to help you hash passwords
- `cookie-parser`: Parse Cookie header and populate `req.cookies` with an object keyed by the cookie names
- `body-parser`: Node.js body parsing middleware
- `dotenv`: Loads environment variables from a `.env` file into `process.env`
- `ejs`: Embedded JavaScript templating
- `express`: Fast, unopinionated, minimalist web framework for Node.js
- `joi`: Object schema description language and validator for JavaScript objects
- `jsonwebtoken`: An implementation of JSON Web Tokens
- `lodash`: A modern JavaScript utility library delivering modularity, performance & extras
- `mongoose`: MongoDB object modeling tool designed to work in an asynchronous environment
- `nodemailer`: Send e-mails from Node.js
- `redis`: A high performance Node.js Redis client
- `ua-parser-js`: Lightweight JavaScript-based User-Agent string parser

## 6. CI with GitHub Actions

This project uses GitHub Actions for continuous integration (CI). The workflow defined in `.github/workflows/main.yml` runs whenever a push is made to the `dev` branch. The workflow performs the following steps:

1. Sets up Node.js.
2. Installs the dependencies.
3. Runs the tests.

### Secrets

```
TEST_DB_URI=: ${{ secrets.TEST_DB_URI }}
```

You can add these secrets in the "Settings" tab of your GitHub repository under "Secrets and variables" > "Actions".  This setup ensures that your application is automatically deployed whenever you push changes to the dev branch.
