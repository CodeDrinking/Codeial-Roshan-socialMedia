
const Comment = require('../models/comment')
const Post = require ('../models/post')
const queue = require('../config/kue');
const commentEmailWorker = require('../workers/comment_email_worker');
const commentsMailer = require('../mailers/comments_mailer');
const Like = require('../models/like');
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
         
         // Similar for comments to fetch the user's id and evrytime 
        //  comment = await comment.populate('user', 'name email').execPopulate();
          // commentsMailer.newComment(comment);

        //   let job = queue.create('emails', comment).save(function(err){
        //     if (err){
        //         console.log('Error in sending to the queue', err);
        //         return;
        //     }
        //     console.log('job enqueued', job.id);

        // })
        //  commentsMailer.newComment(comment);
         if (req.xhr){
            comment = await comment.populate('user', 'name email').execPopulate();
            return res.status(200).json({
                data: {
                    comment: comment
                },
                message: "Post created!"
            });
        }
        req.flash('success', 'Comment published!');

        res.redirect('/');
    }
}
    catch (err){
        req.flash('error', err);
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
             // CHANGE :: destroy the associated likes for this comment
             await Like.deleteMany({likeable: comment._id, onModel: 'Comment'});

             // send the comment id which was deleted back to the views
            if (req.xhr){
                return res.status(200).json({
                    data: {
                        comment_id: req.params.id
                    },
                    message: "Post deleted"
                });
            }


            req.flash('success', 'Comment deleted!');

            return res.redirect('back');
        }
        else{
            req.flash('error', 'Unauthorized');
            return res.redirect('back');
        }
    }catch(err){
        req.flash('error', err);
        return;
    } 
}
    

    
    
