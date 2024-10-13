# JWT Authentication with Node.js

## 1. Introduction

### Project Overview
This project is a web application built with Node.js and Express that uses JSON Web Tokens (JWT) for authentication. It provides a secure way for users to register, log in, and access protected routes.

### Purpose and Goals
The main goal of this project is to implement a secure authentication mechanism using JWT to protect endpoints and allow only authenticated users to perform certain actions.

### Target Audience
This application is suitable for developers looking to integrate JWT-based authentication into their Node.js applications.

## 2. Getting Started

1. Clone the repository:
   ```sh
   git clone https://github.com/Anass-Dr/JWT-Auth-Back.git
    ```
2. Navigate to the project directory:
   ```sh
   cd JWT-Auth-Back
   ```
3. Create a `.env` file in the root directory and add the following environment variables:
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
2. Build and start the Docker containers:
    ```sh
     docker-compose up --build -d
     ```
3. Access the application at `http://localhost:3210`.

## 3. Project Structure

### Overview
The project structure is as follows:
```
JWT-Auth-Back/
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
├── docker-compose.yml
├── Dockerfile
├── package.json
├── package-lock.json
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
- `docker-compose.yml`: Docker Compose configuration file.
- `Dockerfile`: Dockerfile for building the application image.
- `package.json`: Contains the npm dependencies and scripts.
- `package-lock.json`: Contains the exact version of the npm dependencies.
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

## 6. CI/CD with GitHub Actions

This project uses GitHub Actions for continuous integration (CI) and continuous deployment (CD). The workflow defined in .github/workflows/main.yml runs whenever a push is made to the main branch. The workflow performs the following steps:

1. Login to Docker Hub: Authenticates with Docker Hub using the provided credentials.
2. Set up Docker Buildx: Configures Docker Buildx for building multi-platform images.
3. Build and test: Builds the Docker image and runs tests.
4. Build and push: Builds the Docker image for multiple platforms and pushes it to Docker Hub.
5. Deploy to AWS ECR: Publishes the Docker image to AWS Elastic Container Registry (ECR).

### Secrets
The following secrets are used in the GitHub Actions workflow:
```
DOCKER_EMAIL: Docker Hub email.
DOCKERHUB_TOKEN: Docker Hub access token.
AWS_ACCESS_KEY_ID: AWS access key ID.
AWS_SECRET_ACCESS_KEY: AWS secret access key.
```

You can add these secrets in the "Settings" tab of your GitHub repository under "Secrets and variables" > "Actions".  This setup ensures that your application is automatically deployed whenever you push changes to the dev branch.
