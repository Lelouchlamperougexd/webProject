const Admin = require('../models/Admin');
const crypto = require('crypto');
const nodemailer = require('nodemailer');
const { emailConfig, baseUrl } = require('../config/config');

// Create transporter for sending emails
const transporter = nodemailer.createTransport(emailConfig);

// Display login page
exports.getLogin = (req, res) => {
  res.render('login', { error: req.query.error, message: req.query.message });
};

// Process login
exports.postLogin = async (req, res) => {
  const { username, password } = req.body;

  try {
    const admin = await Admin.findOne({ username });
    if (!admin) {
      return res.redirect('/login?error=Admin not found');
    }

    // Check if account is locked
    if (admin.isLocked) {
      return res.redirect('/login?error=Account locked. Reset password.');
    }

    // Compare passwords
    const isPasswordValid = await admin.comparePassword(password);
    if (!isPasswordValid) {
      admin.failedLoginAttempts += 1;

      // Lock account after 5 failed attempts
      if (admin.failedLoginAttempts >= 5) {
        admin.isLocked = true;
      }

      await admin.save();
      return res.redirect('/login?error=Invalid password');
    }

    // Reset failed attempts on successful login
    admin.failedLoginAttempts = 0;
    admin.isLocked = false;
    await admin.save();

    req.session.admin = {
      id: admin._id,
      username: admin.username,
      email: admin.email,
      role: admin.role
    };
    
    res.redirect('/');
  } catch (err) {
    console.error('Login error:', err);
    res.redirect('/login?error=Error logging in');
  }
};

// Display register page
exports.getRegister = (req, res) => {
  res.render('register', { error: req.query.error });
};

// Process registration
exports.postRegister = async (req, res) => {
  const { username, password, email } = req.body;

  try {
    // Check if username already exists
    const existingUsername = await Admin.findOne({ username });
    if (existingUsername) {
      return res.redirect('/register?error=Username already exists');
    }

    // Check if email already exists
    const existingEmail = await Admin.findOne({ email });
    if (existingEmail) {
      return res.redirect('/register?error=Email already exists');
    }

    // Create new admin (default role is 'user')
    const admin = new Admin({ username, password, email });
    await admin.save();
    
    res.redirect('/login?message=Registration successful! Please log in.');
  } catch (err) {
    console.error('Registration error:', err);
    res.redirect('/register?error=Error registering account');
  }
};

// Logout
exports.logout = (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      return res.status(500).send('Could not log out');
    }
    res.redirect('/');
  });
};

// Display account page
exports.getAccount = (req, res) => {
  res.render('account', { session: req.session });
};

// Display forgot password page
exports.getForgotPassword = (req, res) => {
  res.render('forgot-password', { error: req.query.error });
};

// Process forgot password
exports.postForgotPassword = async (req, res) => {
  const { email } = req.body;
  
  try {
    const admin = await Admin.findOne({ email });
    if (!admin) {
      return res.redirect('/forgot-password?error=Email not found');
    }

    // Generate reset token
    const resetToken = crypto.randomBytes(20).toString('hex');
    admin.resetPasswordToken = resetToken;
    admin.resetPasswordExpires = Date.now() + 3600000; // 1 hour expiration
    await admin.save();

    // Send email with reset link
    const resetUrl = `${baseUrl}/reset-password/${resetToken}`;
    const mailOptions = {
      to: admin.email,
      from: process.env.EMAIL,
      subject: 'Password Reset Request',
      text: `Click the following link to reset your password: ${resetUrl}`
    };

    transporter.sendMail(mailOptions, (err, info) => {
      if (err) {
        console.error("Nodemailer Error:", err);
        return res.redirect('/forgot-password?error=Error sending email');
      }
      console.log("Email sent:", info.response);
      res.redirect('/login?message=Check your email for reset link');
    });
  } catch (err) {
    console.error('Forgot password error:', err);
    res.redirect('/forgot-password?error=An error occurred');
  }
};

// Display reset password page
exports.getResetPassword = async (req, res) => {
  try {
    const admin = await Admin.findOne({
      resetPasswordToken: req.params.token,
      resetPasswordExpires: { $gt: Date.now() }
    });

    if (!admin) {
      return res.redirect('/forgot-password?error=Invalid or expired token');
    }

    res.render('reset-password', { token: req.params.token, errors: [] });
  } catch (err) {
    console.error('Reset password error:', err);
    res.redirect('/forgot-password?error=An error occurred');
  }
};

// Process reset password
exports.postResetPassword = async (req, res) => {
  const { password } = req.body;
  
  try {
    const admin = await Admin.findOne({
      resetPasswordToken: req.params.token,
      resetPasswordExpires: { $gt: Date.now() }
    });

    if (!admin) {
      return res.redirect('/forgot-password?error=Invalid or expired token');
    }
    
    admin.failedLoginAttempts = 0;
    admin.isLocked = false;
    admin.password = password;  // Auto-hashed in `pre('save')`
    admin.resetPasswordToken = undefined;
    admin.resetPasswordExpires = undefined;

    await admin.save();

    res.redirect('/login?message=Password successfully reset');
  } catch (err) {
    console.error('Reset password error:', err);
    res.redirect('/forgot-password?error=An error occurred');
  }
};