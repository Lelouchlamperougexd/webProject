// Validation middleware functions

const validateStudent = (req, res, next) => {
    const { name, age, gender } = req.body;
    const errors = [];
  
    if (!name || name.trim() === '') {
      errors.push('Name is required');
    }
  
    if (!age) {
      errors.push('Age is required');
    } else if (isNaN(age) || age < 1 || age > 120) {
      errors.push('Age must be a number between 1 and 120');
    }
  
    if (gender === undefined) {
      errors.push('Gender is required');
    }
  
    if (errors.length > 0) {
      return res.status(400).json({ errors });
    }
  
    next();
  };
  
  const validateRegistration = (req, res, next) => {
    const { username, password, email, 'confirm-password': confirmPassword } = req.body;
    const errors = [];
  
    if (!username || username.length < 3) {
      errors.push('Username must be at least 3 characters');
    }
  
    if (!email || !email.includes('@')) {
      errors.push('Valid email is required');
    }
  
    if (!password || password.length < 6) {
      errors.push('Password must be at least 6 characters');
    }
  
    if (password !== confirmPassword) {
      errors.push('Passwords do not match');
    }
  
    if (errors.length > 0) {
      return res.render('register', { errors });
    }
  
    next();
  };
  
  const validatePasswordReset = (req, res, next) => {
    const { password, 'confirm-password': confirmPassword } = req.body;
    const errors = [];
  
    if (!password || password.length < 6) {
      errors.push('Password must be at least 6 characters');
    }
  
    if (password !== confirmPassword) {
      errors.push('Passwords do not match');
    }
  
    if (errors.length > 0) {
      return res.render('reset-password', { 
        errors, 
        token: req.params.token 
      });
    }
  
    next();
  };
  
  module.exports = {
    validateStudent,
    validateRegistration,
    validatePasswordReset
  };