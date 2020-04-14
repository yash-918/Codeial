const Post=require("../models/post.js")
module.exports.home=function(req,res)
{
    // console.log(req.cookies);
    // Post.find({},function(err,posts)
    // {
    //     if(err){console.log("error in getting response from database");return;}
    //     return (res.render('home.ejs',{title:"Codeial Home",
    //     posts : posts
    // }));
    // });
    
    // populate the user
    Post.find({})
    .populate('user')
    .populate(
        {
            path: "comments",
            populate : 
            {
                path : "user"
            }
        })
    .exec(function(err,posts)
    {
        if(err){console.log("error in getting response from database");return;}
        return (res.render('home.ejs',{title:"Codeial Home",
        posts : posts
    }));
    });
}