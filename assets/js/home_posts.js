{
    //method to submit the form data for new post using Ajax
    let createPost = function(){
        let newPostForm = $('#new-post-form')
        newPostForm.submit(function(e){
            e.preventDefault();
            console.log("******************")
            $.ajax({
                type : 'post',
                url: '/posts/create',
                data: newPostForm.serialize(),
                success : function(data){
                    let newPost= newPostDom(data.data.post);
                    $('#post-list-container > ul').prepend(newPost)

                    //we are populating that deletelink argument
                    deletePost($(' .delete-post-button' , newPost))
                     // call the create comment class
                     new PostComments(data.data.post._id);

                     // CHANGE :: enable the functionality of the toggle like button on the new post
                    new ToggleLike($(' .toggle-like-button', newPost));

                     new Noty({
                        theme: 'relax',
                        text: "Post published!",
                        type: 'success',
                        layout: 'topRight',
                        timeout: 1500
                        
                    }).show();

                }, error : function(error){
                    console.log(error.responseText)
                }
            })
        });
    }

    //to create a post in DOM

    let newPostDom= function(post){
        return $(`<li id ="post-${post._id}">
        <p class="user-post">
            <small>
                <a href="/posts/destroy/${ post._id }" class="delete-post-button">Delete Post</a>
            </small>
            ${ post.user.name}
                    <small class="comment-content">
                    ${ post.content}
                    </small>
    </p>
    <div class="post-comment">
            <form action="/comments/create" method="POST">
                <input type="text" name="content" placeholder="type here to comment..." required>
                <input type="hidden" name="post" value="${post._id }">
                <input class="submit" type="submit" value="add comment">
            </form>

                <div class="post-comments-list">
                    <ul id="post-comments-${ post._id}">
    
                    </ul>

                </div>
    </div>
</li>`)
                        
    };
  //method to delete a post  DOm
  //this  is function which sending a ajax request
    let deletePost = function(deleteLink){  
        $(deleteLink).click(function(e){
            e.preventDefault();

            $.ajax({
                type : 'get',
                url : $(deleteLink).prop('href'),
                success : function(data){
                    $(`#post-${data.data.post_id}`).remove()
                    new Noty({
                        theme: 'relax',
                        text: "Post Deleted",
                        type: 'success',
                        layout: 'topRight',
                        timeout: 1500
                        
                    }).show();
                },error : function(error){
                    console.log(error.responseText);
                }

            })
        })
    }
    

    // loop over all the existing posts on the page (when the window loads for the first time) and call the delete post method on delete link of each, also add AJAX (using the class we've created) to the delete button of each
    let convertPostsToAjax = function(){
        $('#post-list-container>ul>li').each(function(){
            let self = $(this);
            let deleteButton = $(' .delete-post-button', self);
            deletePost(deleteButton);

            // get the post's id by splitting the id attribute
            let postId = self.prop('id').split("-")[1]
            new PostComments(postId);
        });
    }



    createPost();
    convertPostsToAjax();
}