const Student = require('../models/Student');

// Get all students or search by name
exports.getStudents = async (req, res) => {
  try {
    const searchName = req.query.searchName;
    let students;
    
    if (searchName) {
      students = await Student.find({ 
        name: { $regex: new RegExp(searchName.trim(), 'i') } 
      });
    } else {
      students = await Student.find();
    }
    
    res.render('index', { students, session: req.session });
  } catch (err) {
    console.error('Error fetching students:', err);
    res.status(500).send('Error fetching students');
  }
};

// Search students by name (POST method)
exports.searchStudents = async (req, res) => {
  try {
    const { searchName } = req.body;
    let students;
    
    if (searchName && searchName.trim() !== '') {
      students = await Student.find({ 
        name: { $regex: new RegExp(searchName.trim(), 'i') } 
      });
    } else {
      students = await Student.find();
    }
    
    res.render('index', { students, session: req.session });
  } catch (err) {
    console.error('Error searching students:', err);
    res.status(500).send('Error searching students');
  }
};

// Display add student form
exports.getAddStudent = (req, res) => {
  res.render('add');
};

// Create a new student
exports.addStudent = async (req, res) => {
  try {
    const { name, age, gender } = req.body;
    
    const newStudent = new Student({
      name,
      age,
      gender,
      createdBy: req.session.admin.id
    });
    
    await newStudent.save();
    res.redirect('/');
  } catch (err) {
    console.error('Error creating student:', err);
    res.status(500).send('Error creating student');
  }
};

// Display edit student form
exports.getEditStudent = async (req, res) => {
  try {
    const student = await Student.findById(req.params.id);
    
    if (!student) {
      return res.status(404).send('Student not found');
    }
    
    res.render('edit', { student });
  } catch (err) {
    console.error('Error rendering edit page:', err);
    res.status(500).send('Error rendering edit page');
  }
};

// Update a student
exports.updateStudent = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, age, gender } = req.body;
    
    await Student.findByIdAndUpdate(id, {
      name,
      age,
      gender
    });
    
    console.log(`Student ${id} updated successfully`);
    res.redirect('/');
  } catch (err) {
    console.error('Error updating student:', err);
    res.status(500).send('Error updating student');
  }
};

// Delete a student
exports.deleteStudent = async (req, res) => {
  try {
    const { id } = req.params;
    
    await Student.findByIdAndDelete(id);
    
    console.log(`Student ${id} deleted successfully`);
    res.redirect('/');
  } catch (err) {
    console.error('Error deleting student:', err);
    res.status(500).send('Error deleting student');
  }
};