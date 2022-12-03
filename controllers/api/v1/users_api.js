const User = require ('../../../models/user');
const jwt = require ('jsonwebtoken');
const env = require('../../../config/environment')



///whenever username and password sreceived , we have to generate jsonwebtoken
module.exports.createSession= async function(req , res){
    try{
        let user  = await User.findOne({email : req.body.email});

        if(!user  || user.password != req.body.password){
            return res.json(422 , {
                message : "Invalid Username/Password"
            })
        }
        return res.status(200).json({
            message : 'Sign in succesfull ,here is your token keep it safe !! ',
            data : {
                //sign is the function
                // user.toJSON() = this is the part which get encrypted
                token : jwt.sign(user.toJSON() ,env.JWT_secret_key ,{expiresIn : 100000})
            }
        })
    }
    catch (err){
        console.log('*******' , err);
        return res.json(200 ,  {
            message : "Internal Server Error"
        })
    }
}