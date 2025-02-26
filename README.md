# Student Management System

This is a student management system with authentication, where administrators can add, edit, and delete student records.

## Features

- User authentication (login/register)
- Account management (profile, password reset)
- Student management (CRUD operations)
- Search functionality
- Role-based access control
- Security features (password hashing, account locking)

## Tech Stack

- Node.js
- Express.js
- MongoDB (Mongoose)
- EJS (templating)
- Bootstrap (styling)
- bcrypt (password hashing)
- nodemailer (email service)

## Setup Instructions

### Prerequisites

- Node.js (v14 or higher)
- MongoDB account

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/Lelouchlamperougexd/webProject.git
   cd webProject
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file in the root directory with the following variables:
   ```
   DB_URL=your_mongodb_connection_string
   SESSION_SECRET=your_secret_key
   EMAIL=your-email@gmail.com
   EMAIL_PSWRD=your-app-password
   NODE_ENV=development
   ```

4. Start the application:
   ```bash
   npm start
   ```

5. For development with auto-restart:
   ```bash
   npm run dev
   ```

6. Open your browser and navigate to `http://localhost:3000`

## API Documentation

### Authentication Endpoints

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|--------------|
| GET | /login | Display login page | No |
| POST | /login | Authenticate user | No |
| GET | /register | Display registration page | No |
| POST | /register | Create new user | No |
| GET | /logout | Log out user | Yes |
| GET | /account | View account details | Yes |
| GET | /forgot-password | Display forgot password page | No |
| POST | /forgot-password | Send password reset email | No |
| GET | /reset-password/:token | Display reset password page | No |
| POST | /reset-password/:token | Reset password | No |

### Student Management Endpoints

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|--------------|
| GET | / | View all students / Search | No |
| POST | / | Search students | No |
| GET | /add | Display add student form | Yes |
| POST | /add | Create new student | Yes |
| GET | /edit/:id | Display edit student form | Yes |
| POST | /edit/:id | Update student | Yes |
| GET | /delete/:id | Delete student | Yes |

## Project Structure

The application follows a modular structure:

- `app.js`: Main application file
- `config/`: Configuration files
- `controllers/`: Route handlers
- `middleware/`: Custom middleware functions
- `models/`: Database models
- `routes/`: Route definitions
- `views/`: EJS templates

## Deployment

This application is deployed on Render. You can access it at:
https://goruplist.onrender.com