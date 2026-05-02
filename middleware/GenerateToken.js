const jwt = require('jsonwebtoken')

const GenerateToken =(user)=>{
    return jwt.sign({email:user.email,id:user._id},"ajdaklfhsjajdshjjaljlj23kjsaak9023902kjaa")

}
module.exports.GenerateToken = GenerateToken;