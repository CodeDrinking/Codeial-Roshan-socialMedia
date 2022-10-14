const Post = require('../models/post')
const User = require('../models/user')
// module.exports.home= function(req, res){
//     return res.end('<h1>express is up for codeial </h1>')
// }


module.exports.home= function(req, res){
    // console.log(req.cookies);
    // res.cookie('user_id' , 65)
    
    //for normal
//     Post.find({}, function(err , posts){
//     return res.render('home',{
//         title: "Codeial || Home ",
//         posts : posts
//     });
// });

//popilating user which user posted that post
     Post.find({})
     .populate('user')
     .populate({
        path : 'comments', //multiple popolate we can do
        populate :{
            path : 'user'
        }
     })
         .exec(function(err , posts){
            User.find({} , function(err , users){
                return res.render('home',{
                    title: "Codeial | Home ",
                    posts : posts,
                    all_users : users
            });
        })
    })
}
     



// module.exports.girl= function(req, res){
//     return res.end('<h1>that girl is insanely intelligent !!!!!! </h1>')
// }