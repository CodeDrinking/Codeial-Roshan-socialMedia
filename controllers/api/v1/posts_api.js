const Post = require ('../../../models/post')
const Comment = require('../../../models/comment')

module.exports.index = async function(req , res){

    let posts = await Post.find({})
    .sort('-createdAt') // to keep post in ascending order
    .populate('user')
    .populate({
       path : 'comments', //multiple popolate we can do
       populate :{
           path : 'user'
       }
    })
    return res.json(200 , {
        message : "List of posts",
        posts  : posts
    });
}

module.exports.destroy = async function(req , res){
    try{
        let post = await Post.findById(req.params.id);
     
        //.id means converting the Object id into string
        if(post.user == req.user.id){
         post.remove();
 
         await Comment.deleteMany({post : req.params.id})
         
         return res.json(200 , {
            message : 'Post and Associated Comments deleted succesfully !!'
         })
     }else{
         return res.json(401 ,{
            message : "You cannot delete this post !!"
         })
        }
    }
    
    catch(err){
        console.log("***********" , err)
        // req.flash('error' ,err);
        // return res.redirect('back')
        return res.status(200).json({
            message : 'Internal Server Error',

        })

    }
}