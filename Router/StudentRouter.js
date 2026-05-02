const Student = require('../models/Students');
const fs = require('fs');
const path = require('path');

exports.getStudents = async (req, res) => {
  try {
    const students = await Student.find().limit(10);
    res.status(200).json(students);
  } catch (err) {
    res.status(500).json({ message: "Server Error", error: err });
  }
};

exports.registerStudent = async (req, res) => {
  // console.log("register")
  try {
    let { name, email, phone, reg_no, session, dept, skills } = req.body;

    const parsedSkills =
      typeof skills === 'string' ? JSON.parse(skills) : skills;

    const photoPath = req.file ? `/uploads/${req.file.filename}` : null;

    const savedStudent = await Student.create({
      name,
      email,
      reg_no,
      phone,
      session,
      dept,
      skills: parsedSkills,
      photo: photoPath
    });
    res.status(201).json(savedStudent);

  } catch (err) {
    res.status(400).json({
      message: "Registration failed",
      error: err.message
    });
  }
};


exports.StudentProfile = async (req, res) => {
  try {
    const student = await Student.findById(req.params.id);

    if (!student) {
      return res.status(404).json({ message: "Student not found" });
    }

    res.status(200).json(student);

  } catch (err) {
    res.status(500).json({
      message: "Error fetching student",
      error: err.message
    });
  }
};

exports.deleteStudent = async (req, res) => {
  try {
    const { id } = req.params;

    const student = await Student.findById(id);

    if (!student) {
      return res.status(404).json({ message: "Student not found" });
    }

    // delete image if exists
    if (student.photo) {
      const imagePath = path.join(__dirname, "..", student.photo);

      fs.unlink(imagePath, (err) => {
        if (err) {
          console.log("Image delete error:", err);
        } else {
          console.log("Image deleted successfully");
        }
      });
    }

    // delete student from DB
    await Student.findByIdAndDelete(id);

    res.status(200).json({ message: "Student and image deleted successfully" });

  } catch (error) {
    res.status(500).json({
      message: "Delete failed",
      error: error.message
    });
  }
};


exports.updateProfile = async (req, res) => {
  try {
    const { id } = req.params;

    const student = await Student.findById(id);
    if (!student) {
      return res.status(404).json({ message: "Student Not found" });
    }

    let { name, email, phone, reg_no, session, dept,linkedIn, skills } = req.body;
    const parsedSkills =
      typeof skills === "string" ? JSON.parse(skills) : skills;

    const photoPath = req.file
      ? `/uploads/${req.file.filename}`
      : student.photo;

    const updatedStudent = await Student.findByIdAndUpdate(
      id,
      {
        name,
        email,
        reg_no,
        phone,
        session,
        linkedIn,
        dept,
        skills: parsedSkills,
        photo: photoPath
      },
      { returnDocument: "after" }
    );

    res.status(200).json(updatedStudent);

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Something wrong in server" });
  }
};