const Post = require('../models/post')
const User = require('../models/user')
// module.exports.home= function(req, res){
//     return res.end('<h1>express is up for codeial </h1>')
// }


module.exports.home=  async function(req, res){
//popilating user which user posted that post

    try{
            
     let posts = await Post.find({})
     .populate('user')
     .populate({
        path : 'comments', //multiple popolate we can do
        populate :{
            path : 'user'
        }
     })
        let users= await User.find({});
        return res.render('home',{
            title: "Codeial | Home ",
            posts : posts,
            all_users : users
        });
    }

    
    catch (err){
        console.log('Error' , err);
        return;

    }


    }
                
        

     



// module.exports.girl= function(req, res){
//     return res.end('<h1>that girl is insanely intelligent !!!!!! </h1>')
// }


//using then / promise like functionality
// Post.find({}) .populate('comments').then ());


// let posts =  Post.find({}) .populate('comments').exec();
// posts.then();



