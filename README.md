# Student Management System

A robust Node.js web application for managing student records with secure user authentication, role-based access control, and comprehensive account management features.

![Node.js](https://img.shields.io/badge/Node.js-v14+-green.svg)
![Express](https://img.shields.io/badge/Express-v4.x-blue.svg)
![MongoDB](https://img.shields.io/badge/MongoDB-v4.x-green.svg)
![License](https://img.shields.io/badge/License-MIT-yellow.svg)

## ✨ Features

### Authentication & Security
- **User Authentication**: Secure login and registration system
- **Role-Based Access Control**: Admin and regular user permission levels
- **Password Security**: bcrypt hashing for secure password storage
- **Account Protection**: Automatic account locking after 5 failed login attempts
- **Password Recovery**: Email-based password reset functionality

### Student Management
- **Complete CRUD Operations**:
  - Create new student records
  - View existing students
  - Update student information
  - Delete student entries
- **Search Functionality**: Filter students by name
- **Data Validation**: Server-side validation for all form submissions

### User Experience
- **Responsive Design**: Mobile-friendly interface using Bootstrap
- **Intuitive Navigation**: Clear workflow for managing students
- **Informative Messaging**: Helpful notifications and error messages

## 🛠️ Tech Stack

- **Backend**: Node.js, Express.js
- **Database**: MongoDB with Mongoose ODM
- **Frontend**: EJS templating, Bootstrap 5
- **Authentication**: Session-based with express-session
- **Security**: bcrypt (password hashing)
- **Email Service**: Nodemailer
- **Environment**: dotenv for configuration

## 📋 Prerequisites

Before you begin, ensure you have the following installed:
- Node.js (v14.x or higher)
- MongoDB account (local or Atlas)
- Git

## 🚀 Installation and Setup

### Step 1: Clone the repository

```bash
git clone https://github.com/Lelouchlamperougexd/webProject.git
cd webProject
```

### Step 2: Install dependencies

```bash
npm install
```

### Step 3: Configure environment variables

Create a `.env` file in the root directory with the following variables:

```
# Database
DB_URL=your_mongodb_connection_string

# Authentication
SESSION_SECRET=your_session_secret_key

# Email Configuration
EMAIL=your-email@gmail.com
EMAIL_PSWRD=your-app-password

# Environment
NODE_ENV=development
PORT=3000
```

> **Note**: For Gmail, you'll need to use an app password, not your regular password. Enable 2-factor authentication in your Google account, then create an app password.

### Step 4: Start the application

For production:
```bash
node app.js
```

For development (with auto-restart):
```bash
npm run dev
```

### Step 5: Access the application

Open your browser and navigate to:
```
http://localhost:3000
```

## 🔍 Usage Guide

### Administrator Functions

1. **Register/Login**: Create an admin account or login with existing credentials
2. **Manage Students**:
   - View the list of all students on the home page
   - Click "Add New Student" to create a new entry
   - Use Edit/Delete buttons to modify existing records
3. **Search**: Use the search bar to filter students by name
4. **Account Management**:
   - View account details through the "Account" link
   - Reset password if needed
   - Logout when finished

### Regular User Functions

1. **Viewing Students**: See the complete list of students
2. **Searching**: Search students by name using the search form

## 📚 API Documentation

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
| GET | / | View all students | No |
| POST | / | Search students | No |
| GET | /add | Display add student form | Yes |
| POST | /add | Create new student | Yes |
| GET | /edit/:id | Display edit student form | Yes |
| POST | /edit/:id | Update student | Yes |
| GET | /delete/:id | Delete student | Yes |

## 📂 Project Structure

```
student-management-system/
├── app.js                  # Main application entry point
├── config/                 # Configuration files
│   ├── config.js           # General config settings
│   └── db.js               # Database connection
├── controllers/            # Route handlers
│   ├── authController.js   # Authentication logic
│   └── studentController.js # Student management logic
├── middleware/             # Custom middleware functions
│   ├── auth.js             # Authentication middleware
│   └── validation.js       # Form validation
├── models/                 # Database schemas
│   ├── Admin.js            # Admin user model
│   └── Student.js          # Student model
├── public/                 # Static assets
│   └── styles.css          # CSS styles
├── routes/                 # Route definitions
│   ├── authRoutes.js       # Authentication routes
│   └── studentRoutes.js    # Student management routes
├── views/                  # EJS templates
│   ├── account.ejs         # Account management view
│   ├── add.ejs             # Add student form
│   ├── edit.ejs            # Edit student form
│   ├── error.ejs           # Error page
│   ├── forgot-password.ejs # Password recovery
│   ├── index.ejs           # Home page/student list
│   ├── login.ejs           # Login form
│   ├── register.ejs        # Registration form
│   └── reset-password.ejs  # Password reset form
├── .env                    # Environment variables (create this)
├── .gitignore              # Git ignore file
├── package.json            # Project dependencies
└── README.md               # Project documentation
```

## 🔒 Security Features

- Passwords are securely hashed using bcrypt
- Automatic account locking after 5 failed login attempts
- Secure password reset via email with time-limited tokens
- Session-based authentication with secure cookies
- Input validation to prevent injection attacks
- Error handling to prevent information leakage

## 🌐 Deployment

This application is deployed on Render. You can access the live demo at:
https://goruplist.onrender.com

### Deployment Steps

1. Create a Render account
2. Connect your GitHub repository
3. Configure environment variables
4. Set the build command to `npm install`
5. Set the start command to `node app.js`

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.
