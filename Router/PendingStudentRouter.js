const PendingStudent = require('../models/PendingStudent')
const bcrypt = require('bcrypt')

exports.pendingregister = async (req, res) => {
    try {
        const { name, reg_no, dept, session, phone, email, password } = req.body

        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password, salt)

        const savePendingStudent = await PendingStudent.create({
            name,
            reg_no,
            dept,
            session,
            phone,
            email,
            password: hashedPassword
        })

        return res.status(201).json({
            success: true,
            data: savePendingStudent
        })

    } catch (err) {
        console.error("Error:", err)
        return res.status(500).json({
            success: false,
            message: "Server error"
        })
    }
}