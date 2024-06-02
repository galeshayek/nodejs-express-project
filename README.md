
# 🚀 TypeScript Node.js Application

## Project Description

This project is a Node.js application written in TypeScript. It includes various features such as user authentication, business card management, and error handling. The project is structured with middleware, validation schemas, services, and routes to ensure clean and maintainable code.

## Table of Contents

- [📥 Getting the Project](#-getting-the-project)
- [🛠 Installation](#-installation)
- [⚙️ Configuration](#️-configuration)
- [🚀 Usage](#-usage)
- [📂 Project Structure](#-project-structure)
- [✨ Features](#-features)
- [📄 API Documentation](#-api-documentation)

## 📥 Getting the Project

To get this project from GitHub to your local machine and open it in VS Code, follow these steps:

1. **Clone the Repository**: Open a terminal and run the following command to clone the repository:

    ```terminal
    git clone <repository-url>
    ```

    Replace `<repository-url>` with the URL of your GitHub repository.

2. **Open the Project in VS Code**: Once the repository is cloned, navigate to the project directory:

    ```terminal
    cd <project-directory>
    ```

    Then, open the project in VS Code:

    ```terminal
    code .
    ```

    Ensure that you have VS Code installed on your machine. If not, you can download it from [here](https://code.visualstudio.com/).

## 🛠 Installation

To install the necessary dependencies, run:

```terminal
npm install
```

## ⚙️ Configuration

Configuration files are located in the `config` directory. Ensure that you have the following files with the correct settings for your environment:

- `config/.env` (base configuration)
- `config/dev.env` (development environment configuration)
- `config/test.env` (test environment configuration)

## 🚀 Usage

To start the application in development mode, run:

```terminal
npm run dev
```

## 📂 Project Structure

```
.
├── config
│   ├── .env
│   ├── dev.env
│   ├── test.env
│   └── index.ts
├── public
│   └── index.html
├── src
│   ├── @types
│   ├── db
│   ├── errors
│   ├── logs
│   ├── middleware
│   ├── routes
│   ├── services
│   ├── validations
│   └── index.ts
├── package.json
├── tsconfig.json
└── README.md
```

## ✨ Features

- **User Authentication**: Middleware and services for handling user authentication and authorization, including features such as login, registration, and token validation.
- **Business Card Management**: Comprehensive functionality for managing business cards, including creating, reading, updating, and deleting cards.
- **Error Handling**: A centralized error handling mechanism that captures and manages errors throughout the application, providing clear and consistent error responses.
- **Validation**: Joi-based validation schemas to ensure data integrity and consistency across the application. These schemas validate user inputs and other data before processing.
- **Logging**: Integrated logging service to keep track of application activities and errors, which helps in debugging and monitoring the application.
- **Database Management**: Efficient database connection and schema management, including models and initial data setup for users and cards.
- **Middleware Functions**: Various middleware functions to handle different aspects of request processing, such as authorization, validation, and error handling.
- **TypeScript**: Strongly typed language features to catch errors at compile time, making the code more robust and maintainable.
- **Scalable Architecture**: Organized project structure to support scalability and maintainability, following best practices in software development.

## 📄 API Documentation

API documentation is provided through Postman. You can find the detailed API docs at the following links:

- [Postman Users Documentation](https://documenter.getpostman.com/view/34770936/2sA3QwcAMs)
- [Postman Cards Documentation](https://documenter.getpostman.com/view/34770936/2sA3QwcAHT)
