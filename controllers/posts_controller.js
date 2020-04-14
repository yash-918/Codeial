const Post=require("../models/post.js");
const Comment= require("../models/comment.js");
module.exports.create=function(req,res)
{
    Post.create({
        content : req.body.content,
        user : req.user.id
    },function(err,post)
    {
        if(err){
            console.log("error");return;
        }
        return res.redirect("back");
    });
}

module.exports.destroy = function(req,res)
{
    // Using string params to pass id
    Post.findById(req.params.id,function(err,post)
    {
        if(err)
        {
            console.log("error in deleting post");
            return;
        }
        // .id converting the object id into string
        // checking author of post is same the current user(req.user.id)
        if(post.user == req.user.id)
        {
                post.remove();
                Comment.deleteMany({post:req.params.id},function(err)
                {
                    if(err)
                    {
                        console.log("error in deleting post");
                        return;
                    }
                    return res.redirect("back");
                });
        }
        else
        {
            return res.redirect("back");
        }
    });
}