const  passport = require('passport');
const JWTStrategy = require ("passport-jwt").Strategy;
const ExtractJWT = require ('passport-jwt').ExtractJwt;

const User = require ('../models/user');



let opts = {
    //header will have list of keys and bearer will be the key from that list and bearer will have jwt token
    //authorization will  happen from that  extraction
    jwtFromRequest : ExtractJWT.fromAuthHeaderAsBearerToken(),
    secretOrKey : 'codeial'
}
//payload contains the infromation f user
passport.use(new JWTStrategy(opts , function(jwtPayload , done){
    User.findById(jwtPayload._id , function(err ,user){
        if(err){
            console.log("Error in finding user from JWT"); 
             return;
        }
        if(user){
            return done(null, user)
        }
        else{
            return done(null , false)
        }
    });

}));

module.exports= passport;