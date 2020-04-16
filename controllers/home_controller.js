const Post=require("../models/post.js");
const User=require("../models/users.js");


module.exports.home= async function(req,res)
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
    // Post.find({})
    // .populate('user')
    // .populate(
    //     {
    //         path: "comments",
    //         populate : 
    //         {
    //             path : "user"
    //         }
    //     })
    // .exec(function(err,posts)
    // {
    //     User.find({},function(err,users)
    //     {
    //         if(err){console.log("error in getting response from database");return;}
    //         return (res.render('home.ejs',
    //             {title:"Codeial Home",
    //             posts : posts,
    //             all_users:users}
    //         ));
    //     });
    // });

    // converting into async await
    try {
        let posts= await Post.find({})
        .sort('-createdAt')
        .populate('user')
        .populate(
        {
            path: "comments",
            populate : 
            {
                path : "user"
            }
        });

    let users= await User.find({});
        
    return (res.render('home.ejs',
            {title:"Codeial Home",
            posts : posts,
            all_users:users}
            ));
        
    } catch (err) {
        console.log("error in home_controller",err);
        return;
        
    }
    
}