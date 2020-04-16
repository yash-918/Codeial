{
    // method to submit the form data for new post using ajax
    console.log("Hello");
    let createPost=function()
    {
        let newPostForm=$('#new-post-form');
        newPostForm.submit(function(e)
        {
            e.preventDefault();
            $.ajax(
                {
                    type : "post",
                    url : "/posts/create",
                    // converts into the format of json
                    data : newPostForm.serialize(),
                    success : function(data)
                    {
                        let newPost = newPostDom(data.data.post);
                        $("#posts-list-container>ul").prepend(newPost);
                        deletePost($(' .delete-post-button', newPost));
                    },
                    error : function(error)
                    {
                        console.log(error.responseText);
                    }
                    
                }

            );
        });
    }

    // method to create post in DOM
    let newPostDom = function(post)
    {
        return $(`<li id="post-${post._id}">    
            <p>
                    <ol>${post.content}</ol>
                    <ol>${post.user.name}</ol>
                    <small>
                        <a class="delete-post-button" href="/posts/destroy/${post._id}" >
                        Delete This Post
                        </a>
                    </small>
                </p>
                <div class="post-comments">
                    <form action="/comments/create" method="POST">
                        <textarea name="content" cols="10" rows="4" placeholder="Type your comments here" required ></textarea>
                        <input type="hidden" name="post" value= "${post._id}" >
                        <input type="submit" value="Add Comment">
                    </form>
                </div>
                <div class="post-comments-list">
                    <ul id="post-comments-${post.id}" >
                    
                    </ul>
                </div>
            </li>`);
    }

    // method to delete a post from dom
    let deletePost=function(deleteLink)
    {
        $(deleteLink).click(function(e)
        {
            e.preventDefault();
            $.ajax(
            {
                type : "get",
                url : $(deleteLink).prop("href"),
                success : function(data)
                {
                    $(`#post-${data.data.post_id}`).remove();
                },
                error :function(err)
                {
                    console.log("error",err);
                }
            }
            );
        });
    }
    createPost();
}