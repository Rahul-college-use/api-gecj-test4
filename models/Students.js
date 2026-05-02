// models/Student.js
const mongoose = require('mongoose');

const StudentSchema = new mongoose.Schema({
  name: { type: String, required: true },
  dept: { type: String, required: true }, 
  phone: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  reg_no: { type: String, required: true, unique: true },
  skills: [String],
  linkedIn: [String],
  session: [String],
  photo: { type: String },
  linkedIn: { type: String },
});

module.exports = mongoose.model('Student', StudentSchema);