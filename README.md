# SE-2323 Student Management System

This is a web application for managing student data, built as part of the SE-2323 final project. It includes features for adding, editing, deleting, and searching student records. The application also supports user authentication, account management, and password reset functionality.

---

## Table of Contents
1. [Features](#features)
2. [Technologies Used](#technologies-used)
3. [Setup Instructions](#setup-instructions)
4. [Deployment](#deployment)
5. [API Documentation](#api-documentation)
6. [Advanced Features](#advanced-features)
7. [Project Structure](#project-structure)
8. [License](#license)
9. [Acknowledgments](#acknowledgments)

---

## Features

### Student Management
- Add new students with name, age, and gender.
- Edit existing student records.
- Delete students from the database.
- Search for students by name.

### User Authentication
- Register new admin accounts.
- Login with username and password.
- Logout functionality.
- Account lockout after multiple failed login attempts.

### Account Management
- View account details (username, email).
- Reset password via email.

### Password Reset
- Request a password reset link via email.
- Reset password using a secure token.

---

## Technologies Used

- **Backend**: Node.js, Express.js, MongoDB (with Mongoose)
- **Frontend**: EJS (Embedded JavaScript templates), Bootstrap
- **Authentication**: bcrypt for password hashing, express-session for session management
- **Email Service**: Nodemailer for sending password reset emails

---

## Setup Instructions

### Prerequisites
- Node.js and npm installed on your machine.
- MongoDB database (local or cloud-based).
- Gmail account for sending password reset emails (or any other SMTP service).

### Installation
1. **Clone the repository**:
   ```bash
   git clone https://github.com/AskhatSBK/WebPageList.git
   cd WebPageList
   ```
2. **Install dependencies**:
   ```bash
   npm install
   ```
3. **Set up environment variables**:
   Create a `.env` file in the root directory and add the following variables:
   ```env
   DB_URL=mongodb://localhost:27017/your-database-name
   EMAIL=your-email@gmail.com
   EMAIL_PSWRD=your-email-password
   SESSION_SECRET=your-secret-key
   ```
4. **Start the server**:
   ```bash
   npm start
   ```
5. **Access the application**:
   Open your browser and navigate to `http://localhost:3000`.

---

## Deployment

This project is deployed on Render. You can access the live application here: [Live Application URL]

### Deployment Steps on Render
1. **Create a Render Account**: Sign up at [Render](https://render.com/).
2. **Create a New Web Service**: Connect your GitHub repository to Render.
3. **Set Environment Variables**: Add the required environment variables (`DB_URL`, `EMAIL`, `EMAIL_PSWRD`, `SESSION_SECRET`) in the Render dashboard.
4. **Deploy**: Render will automatically deploy your application from the connected repository.

---

## API Documentation

### Authentication (Public Endpoints)

#### `POST /register`
Register a new user.

**Request Body:**
```json
{
  "username": "admin",
  "password": "password123",
  "email": "admin@example.com"
}
```
**Response:**
```json
{
  "message": "User registered successfully"
}
```

#### `POST /login`
Authenticate a user and return a session token.

**Request Body:**
```json
{
  "username": "admin",
  "password": "password123"
}
```
**Response:**
```json
{
  "message": "Login successful",
  "session": "session-token"
}
```

### User Management (Private Endpoints)

#### `GET /account`
Retrieve the logged-in user's profile.

**Response:**
```json
{
  "username": "admin",
  "email": "admin@example.com"
}
```

#### `PUT /account`
Update the logged-in user's profile.

**Request Body:**
```json
{
  "email": "new-email@example.com"
}
```
**Response:**
```json
{
  "message": "Profile updated successfully"
}
```

### Student Management (Private Endpoints)

#### `POST /add`
Create a new student.

**Request Body:**
```json
{
  "name": "John Doe",
  "age": 22,
  "gender": true
}
```
**Response:**
```json
{
  "message": "Student added successfully"
}
```

#### `GET /`
Retrieve all students.

**Response:**
```json
[
  {
    "name": "John Doe",
    "age": 22,
    "gender": true
  }
]
```

#### `PUT /edit/:id`
Update a specific student.

**Request Body:**
```json
{
  "name": "Jane Doe",
  "age": 23,
  "gender": false
}
```
**Response:**
```json
{
  "message": "Student updated successfully"
}
```

#### `DELETE /delete/:id`
Delete a specific student.

**Response:**
```json
{
  "message": "Student deleted successfully"
}
```

---

## Advanced Features

- **Role-Based Access Control (RBAC)**: Admins can manage students, while regular users can only view the student list.

---

## Project Structure

```
server.js - Main server file
views/ - Contains EJS templates
  index.ejs - Home page with student list
  add.ejs - Form for adding new students
  edit.ejs - Form for editing student records
  login.ejs - Login page
  register.ejs - Registration page
  forgot-password.ejs - Forgot password page
  reset-password.ejs - Reset password page
  account.ejs - Account management page
public/ - Static files (CSS, JS, etc.)
```

---

## License

This project is licensed under the MIT License. See the `LICENSE` file for details.

---

## Acknowledgments

- Bootstrap for styling.
- Nodemailer for email functionality.
- Mongoose for MongoDB object modeling.

