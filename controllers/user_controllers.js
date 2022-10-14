
const User = require('../models/user')

module.exports.profile = function(req, res){
    User.findById(req.params.id , function(err, user){
        return res.render('users', {
            title: 'User Profile',
            profile_user : user
        })
    })
   
}

module.exports.update = function(req , res){
    if(req.user.id== req.params.id){
        User.findByIdAndUpdate(req.params.id , req.body , function(err , user){
            return res.redirect('back');
        });
    }
    else{
        return res.status(401).send('Unauthorized')
    }

}
// module.exports.profile= function(req, res){
//     if(req.cookies.user_id){
//         User.findById(req.cookies.user_id ,function(err , user){
//             console.log(user)
//             if(user){
//                 return res.render('users' ,{
//                     title: "users Page",
//                     user :user
//                 })
//             }
//             return res.redirect('/users/sign-in')
//         })        
//     }else{
//         return res.redirect('/users/sign-in')
//     }
// }

//render the sign up page
module.exports.signUp= function(req, res){
    if(req.isAuthenticated()){
        return res.redirect ('/users/profile')
    }
    return res.render('user_sign_up' ,{
        title: "codeial | Sign Up"
    })
}

//render the sign in page
module.exports.signIn= function(req , res){
    if(req.isAuthenticated()){
        return res.redirect ('/users/profile')
    }
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


    //manual authentication

    //steps to authenticate

    // find the user
//     User.findOne({email :req.body.email}, function(err , user){f
//         if(err){
//             console.log("error in findinf user in sigining in"); return}
//           //handle if user is found
//     if(user){
//     //handle missmatching password
//         if(user.password != req.body.password ){
//             return res.redirect('back')
//         }
//         //handle session creation
//         res.cookie('user_id', user.id);
//         return res.redirect('/users/profile');
//     }
//     else{
//           //if user is not found and send user to signn page
//            return res.redirect('back')
 
//     }
//    });
// }

return res.redirect('/');
}

// module.exports.destroySession = function(req , res ){
//     req.logout(); // logout() is default func given by passport.js
//     return  res.redirect('/')
// }
module.exports.destroySession = function(req, res){
// logout() is default func given by passport.js
    req.logout(function(err) {
        if (err) { 
            return next(err); 
        }
        res.redirect('/');
      });
}

