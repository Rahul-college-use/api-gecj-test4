const express = require('express');
const cors = require('cors'); // ✅ added
const dns = require('dns')

dns.setServers([
  '1.1.1.1',
  '8.8.8.8'
])

const app = express();
const upload = require('./middleware/upload');
const connectdb = require('./config/db');
const { getStudents, registerStudent } = require('./Router/StudentRouter');
const { StudentProfile, deleteStudent, updateProfile } = require('./Router/StudentRouter')
const { AdminLogin, AdminLogout } = require('./Router/AdminRoute');
const {pendingregister} = require('./Router/PendingStudentRouter')
const bcrypt = require('bcrypt')

// ✅ CORS middleware added here
app.use(cors({
  origin: 'https://gecj-tpo-2026-1.vercel.app',
  credentials: true
}));
// middleware
app.use(express.json());
const path = require('path');
const Admin = require('./models/Admin');
const Students = require('./models/Students');
const PendingStudent = require('./models/PendingStudent');

// static uploads
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// database
connectdb();

// home route
app.get('/', (req, res) => {
  res.send("Welcome to the College API");
});

// routes
app.use('/api/student/pendingregister',pendingregister)

app.use('/api/students/register', registerStudent);
app.use('/get/student/profile/:id', StudentProfile)
app.use('/get/studentProfile/id/:id', StudentProfile)
app.use('/get/students', getStudents);
app.use('/api/delete/student/:id', deleteStudent)
app.use('/api/student/update/:id', upload.single('photo'), updateProfile)

app.get('/add', (req, res) => {
  let password = "123"
  bcrypt.genSalt(12, (err, salt) => {
    bcrypt.hash(password, salt, async (err, hash) => {
      if (err) { return res.send(`Got Something Error : - ${err}`)}
      else {
        const adminCreate = await Admin.create({
          name: "admin",
          email: "admin@gmail.com",
          password: hash
        })
        if (adminCreate) {
          res.send(`Created Successfully`)
        }
      }
    })
  })
})

app.use('/api/admin/login', AdminLogin)
app.use('/api/admin/logout', AdminLogout)

// server
const PORT = 3000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});