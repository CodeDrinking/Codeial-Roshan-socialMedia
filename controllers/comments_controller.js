
const Comment = require('../models/comment')
const Post = require ('../models/post')

module.exports.create = async function(req, res ){
    try{
        let post = await Post.findById(req.body.post );

        if(post){
         //now post is found and and we r creating coomment in comment schema means storing
         let comment = await Comment.create({
             content : req.body.content,
             post : req.body.post,
             user : req.user. _id
         });
          //handle error 

          //now comment is stored in comment schema now we are storing it in that post schema's document 
          //which is comments
          //it's updating 
         post.comments.push(comment);
         //save methode tells the db that this is final version now block it
         post.save();
         res.redirect('/');
    }
}
    catch (err){
        console.log('Error' , err);
        return;

    }
}

module.exports.destroy = async function(req , res){
    try{
        let comment = await Comment.findById(req.params.id );

            //.id means converting the Object id into string
            if(comment.user == req.user.id){
                let postId = comment.post;
    
                comment.remove();
    
                let post = Post.findByIdAndUpdate(postId , { $pull: {comments: req.params.id}});
                    return res.redirect('back')
            }
            else{
                return res.redirect('back')
            }
        }catch(err){
                console.log('Error', err)
        }  
}
    

    
    
