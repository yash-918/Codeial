const Comment = require("../models/comment.js");
const Post= require("../models/post.js");


module.exports.create=function(req,res)
{
    Post.findById(req.body.post,function (err,post) 
    {
        if(post)
        {
            Comment.create({
                content : req.body.content,
                post : req.body.post,
                user : req.user.id
            },function(err,comment) {
                if(err)
                {
                    console.log("error in creating post");return;
                }
                post.comments.push(comment);
                post.save();

                res.redirect("/");
            });
        }
    });
}

module.exports.destroy=function(req,res)
{
    Comment.findById(req.params.id,function(err,comment)
    {
        if(err)
        {
            console.log("error in deleting the comment");
            return;
        }
        if(comment.user == req.user.id)
        {
            let postId=comment.post;
            comment.remove();
            Post.findByIdAndUpdate(postId,{ $pull:{comments:req.params.id}},function(err,post)
            {
                if(err)
                {
                    console.log("error in deleting comment");
                    return;
                }
                return res.redirect("back");
            })
        }
        else
        {
            return res.redirect("back");
        }
    })
}