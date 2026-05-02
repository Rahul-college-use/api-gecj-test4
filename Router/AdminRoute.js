const Admin = require('../models/Admin');
const bcrypt = require('bcrypt')
const {GenerateToken} = require('../middleware/GenerateToken')
const cookiesParser = require('cookie-parser')
cookiesParser()

exports.AdminLogin = async (req, res) => {
    // console.log("enter")
    try {
        const { identifier, password } = req.body;

        // 1. Find Admin
        const find = await Admin.findOne({ email: identifier });

        if (find) {
            // 2. Use bcrypt to compare the hashed password
            const isMatch = await bcrypt.compare(password, find.password);
            
            if (isMatch) {
                // 3. Generate Token
                const token = GenerateToken(find);

                // 4. Set the Cookie (Do NOT assign this to a variable)
                res.cookie('Admin', token, { 
                    httpOnly: false, 
                    maxAge: 24 * 60 * 60 * 1000 
                });

                // 5. Send JSON (Use the 'token' variable, not the response object)
                return res.json({
                    message: "True",
                    adminEmail: find.email,
                    token: token 
                });

            } else {
                return res.json({ message: "false", error: "Invalid Password" });
            }
        } else {
            return res.json({ message: "false", error: "User not found" });
        }
    } catch (err) {
        console.error("Login Error:", err);
        return res.status(500).json({ message: "false", error: "Server Error" });
    }
};

exports.AdminLogout = (req, res) => {
    // 1. Cookie delete karein
    res.clearCookie('Admin', {
        path: '/', 
        httpOnly: false, 
        sameSite: 'strict'
    });

    return res.status(200).json({ 
        success: true, 
        message: "Logged out successfully" 
    });
};