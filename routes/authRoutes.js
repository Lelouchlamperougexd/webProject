const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const { requireLogin } = require('../middleware/auth');
const { validateRegistration, validatePasswordReset } = require('../middleware/validation');

// Login routes
router.get('/login', authController.getLogin);
router.post('/login', authController.postLogin);

// Registration routes
router.get('/register', authController.getRegister);
router.post('/register', validateRegistration, authController.postRegister);

// Logout route
router.get('/logout', authController.logout);

// Account management
router.get('/account', requireLogin, authController.getAccount);

// Password reset routes
router.get('/forgot-password', authController.getForgotPassword);
router.post('/forgot-password', authController.postForgotPassword);
router.get('/reset-password/:token', authController.getResetPassword);
router.post('/reset-password/:token', validatePasswordReset, authController.postResetPassword);

module.exports = router;