// Authentication middleware
const requireLogin = (req, res, next) => {
    if (!req.session.admin) {
      return res.redirect('/login');
    }
    next();
  };
  
  // Role-based authorization middleware
  const requireAdmin = (req, res, next) => {
    if (!req.session.admin || req.session.admin.role !== 'admin') {
      return res.status(403).send('Access denied. Admins only.');
    }
    next();
  };
  
  module.exports = {
    requireLogin,
    requireAdmin
  };