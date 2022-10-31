const passport = require ('passport');
const googleStrategy = require('passport-google-oauth').OAuth2Strategy;
const crypto = require ('crypto');

const User = require('../models/user');


//tell passport to use new strategy for google login 
passport.use(new googleStrategy ({ 
    clientID : "788810000089-lv621rtcrmrvost7l9a33bgp2b1714rt.apps.googleusercontent.com",
    clientSecret :"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",
    callbackURL : "http://localhost:8000/users/auth/google/callback"
    },
    function (accessToken , refreshToken , profile , done) {
        //find a user 
        User.findOne({email: profile.emails[0].value}).exec(function (err ,user){
            if(err){
                console.log( 'Error in google strategy-passport' , err); return}
                console.log(profile);
                console.log(accessToken ,refreshToken);

            if(user){
                //if  found set this user as req.user
                return done(null , user)
            }else{
                //if not found , create the user ans se t it as req.user ....req.user means sign in that
                User.create({
                    name : profile.displayName,
                    email : profile.emails[0].value,
                    password : crypto.randomBytes(20).toString('hex')
                },
                function(err, user ){
                    if(err){console.log('Error in creating user of  google strategy-passport'); return ;}
                    
                    return done(null , user)
                });
            }    
        })
    })

 )
 module.exports =passport;

