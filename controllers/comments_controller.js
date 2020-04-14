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