const User=require("../models/users.js");

module.exports.profile=function(req,res)
{
    return res.render('users_profile.ejs',
    {
        title : "Codeial Profile Page"
    });
}

// render the sign in page
module.exports.signUp=function(req,res)
{
    if(req.isAuthenticated())
    {
        return res.redirect("/users/profile");
    }
    return(res.render('user_sign_up.ejs',{title:"Codeial | Sign Up"}));
};

// render the sign up page
module.exports.signIn=function(req,res)
{
    if(req.isAuthenticated())
    {
        return res.redirect("/users/profile");
    }
    return(res.render('user_sign_in.ejs',{title:"Codeial | Sign In"}));
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
                return(res.redirect("/users/sign-in"));
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
    return res.redirect("/");
};

module.exports.destroySession= function(req,res)
{
    req.logout();
    return res.redirect("/");
}
