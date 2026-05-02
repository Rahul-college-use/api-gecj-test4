const mongoose = require('mongoose');

const PendingStudentSchema = new mongoose.Schema({
  name: { type: String, required: true },
  dept: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  reg_no: { type: String, required: true, unique: true },
  session: { type: String },
  password: { type: String },
});

module.exports = mongoose.model('PendingStudent', PendingStudentSchema);