const jwt = require('jsonwebtoken')
const Admin = require('../models/Admin')

module.exports = async (req,res,next)=>{
    if(!req.cookie('Admin')){

    }
    else{
        const decode = jwt.verify(req.cookie.Admin,"ajdaklfhsjajdshjjaljlj23kjsaak9023902kjaa")
        let user = await Admin.findOne({email:decode.email,}).select("-password")
        req.user = user
        next()
    }
}