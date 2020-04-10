const User=require("../models/users.js");

module.exports.profile=function(req,res)
{
    if(req.cookies.user_id)
    {
        User.findById(req.cookies.user_id,function(err,user)
        {
            if(user)
            {
                return res.render('users_profile.ejs',{
                    title : "Users Profile",
                    user : user
                });
            }
            res.clearCookie("user_id");
            return(res.redirect("/users/sign-in"));
        });
    }
    else
    {
        return(res.redirect("/users/sign-in"));
    }
}

// render the sign in page
module.exports.signUp=function(req,res)
{
    return(res.render('user_sign_up.ejs',{title:"Codeial | Sign Up"}));
};

// render the sign up page
module.exports.signIn=function(req,res)
{
    if(req.cookies.user_id)
    {
        User.findById(req.cookies.user_id,function(err,user)
        {
            if(user)
            {
                return res.redirect("/users/profile");
            }
            else
            {
                res.clearCookie("user_id");
                return(res.render('user_sign_in.ejs',{title:"Codeial | Sign In"}));
            }
        });
    }
    else
    {
        return(res.render('user_sign_in.ejs',{title:"Codeial | Sign In"}));
    }
};

module.exports.create=function(req,res)
{
    if(req.body.password!=req.body.confirm_password)
    {
        return(res.redirect("back"));
    }
    User.findOne({email:req.body.email},function(err,user)
    {
        if(err){console.log("error in finding user in signing up");return;}
        if(!user)
        {
            User.create(req.body,function(err,user)
            {
                if(err){console.log("error in creating user in sign up");return;}
                return(res.redirect("/user/sign-in"));
            });
        }
        else
        {
            return(res.redirect("back"));
        }
    });
};

module.exports.createSession=function(req,res)
{
    // steps to authoenticate
    // find the user
    User.findOne({email:req.body.email},function(err,user)
    {
        if(err){console.log("error in finding user in signing in");return;}
        // handle user found
        if(user)
        {
            //handle passwords mismatching
            if(user.password!=req.body.password)
            {
                return(res.redirect("back"));
            }
            //handle session creation
            res.cookie('user_id',user.id);
            // console.log(req.cookie);
            return(res.redirect("./profile"));
        }
        // handle user not found
        else
        {
            return(res.redirect("back"));
        }

    });
};
