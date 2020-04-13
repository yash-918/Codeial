const passport= require("passport");

const LocalStrategy=require("passport-local").Strategy;

const User=require("../models/users.js");

// authentication
passport.use(new LocalStrategy({
    usernameField:"email",
    },function(email,password,done){
        // find a user and establish the identity
        User.findOne({email: email},function(err,user)
        {
            if(err)
            {
                console.log("error in finding user --> passport");
                return done(err);
            }
            if(!user || user.password != password)
            {
                console.log("Invalid Username/Password");
                return done(null,false);
            }
            return done(null,user);
        });
    }
));

// serializing the user to decide which key is to be kept in cookies
passport.serializeUser(function(user,done)
{
    done(null,user.id);
});

// deserializing the user from the key in the cookies
passport.deserializeUser(function(id,done)
{
    User.findById(id,function(err,user)
    {
        if(err)
        {
            console.log("error in finding in user");
            return done(err);
        }
        return done(null,user);
    });
});

// check authentication of user
passport.checkAuthentication=function(req,res,next)
{
    // if user in signed in,then pass on the request to the next function(controllers's action)
    if(req.isAuthenticated())
    {
        return next();
    }
    // if user in not signed in
    return res.redirect('/users/sign-in');
}

passport.setAuthenticatedUser=function(req,res,next)
{
    if(req.isAuthenticated())
    {
        // req.user contains the current signed in user
        res.locals.user=req.user;
        // console.log(req);

    }
    next();
}

module.exports= passport;
