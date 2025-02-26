const express = require('express');
const router = express.Router();
const studentController = require('../controllers/studentController');
const { requireLogin } = require('../middleware/auth');
const { validateStudent } = require('../middleware/validation');

// Main route - get all students or search
router.get('/', studentController.getStudents);
router.post('/', studentController.searchStudents);

// Add student routes
router.get('/add', requireLogin, studentController.getAddStudent);
router.post('/add', requireLogin, validateStudent, studentController.addStudent);

// Edit student routes
router.get('/edit/:id', requireLogin, studentController.getEditStudent);
router.post('/edit/:id', requireLogin, validateStudent, studentController.updateStudent);

// Delete student route
router.get('/delete/:id', requireLogin, studentController.deleteStudent);

module.exports = router;