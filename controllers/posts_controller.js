const Post=require("../models/post.js");
const Comment= require("../models/comment.js");
module.exports.create= async function(req,res)
{
    try
    {
        let post = await Post.create({
        content : req.body.content,
        user : req.user.id
        });
        if(req.xhr)
        {
            return res.status(200).json({
                data : {
                post : post
                },
                message : "Post Created"
            });
        }
        req.flash("success","post created");
        return res.redirect("back");
    }
    catch(err)
    {
        req.flash("error",err);
        return;
    }
}

module.exports.destroy = async function(req,res)
{
    try{
        // Using string params to pass id
    let post= await Post.findById(req.params.id);
        // .id converting the object id into string
        // checking author of post is same the current user(req.user.id)
        if(post.user == req.user.id)
        {
                post.remove();
                await Comment.deleteMany({post:req.params.id});
                if(req.xhr)
                {
                    return res.status(200).json({
                        data:
                        {
                            post_id:req.params.id
                        },
                        message : "Post deleted successfully"
                    });
                }
                req.flash("success","post deleted");
                return res.redirect("back");
        }
        else
        {
            req.flash("error","not authorised to delete this post");
            return res.redirect("back");
        }
    }
    catch(err)
    {
        req.flash("error",err);
        return;
    }
}