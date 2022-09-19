// module.exports.profile= function(req, res){
//     return res.end('<h1>this is my profile </h1>')
// }

const User = require('../models/user')

module.exports.profile= function(req, res){
    return res.render('users' ,{
        title: "usersHome"
    })
}

//render the sign up page
module.exports.signUp= function(req, res){
    return res.render('user_sign_up' ,{
        title: "codeial | Sign Up"
    })
}

//render the sign in page
module.exports.signIn= function(req , res){
    return res.render('user_sign_in',{
        title :'codeial | sign In'
    })
}
//get the sign up data
module.exports.create= function(req , res){
    if(req.body.password != req.body.confirm_password){
        return res.redirect ('back')
    }

    
    User.findOne({email: req.body.email}, function(err, user){
        if(err){console.log('error in finding user in signing up'); return}

        if (!user){
            User.create(req.body, function(err, user){
                console.log(req.body)
                if(err){console.log('error in creating user while signing up'); return}

                return res.redirect('/users/sign-in');
            })
        }else{
            return res.redirect('back');
        }

    });
}

module.exports.createSession= function(req , res){
    // todo later

}

