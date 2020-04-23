const passport = require("passport");
const googleStrategy=require("passport-google-oauth").OAuth2Strategy;
const env= require("./environment.js");
const crypto = require("crypto");

const User=require("../models/user.js");
// tell password to use new strategy
passport.use(new googleStrategy({
    clientID: env.google_client_id,
    clientSecret: env.google_client_secret,
    callbackURL: env.google_call_back_url,
    },
    function(accessToken,refreshToken,profile,done)
    {
        // find the user*
        User.findOne({email:profile.emails[0].value}).exec(function(err,user)
        {
            if(err)
            {
                console.log("eroor in google strategy",err);
                return done(err);
            }
            console.log(profile);
            if(user)
            {
                return done(null,user);
            }
            else
            {
                User.create(
                    {
                        name : profile.displayName,
                        email : profile.emails[0].value,
                        password : crypto.randomBytes(20).toString('hex'),
                    },
                    function(err,user)
                    {
                        if(err)
                        {
                           console.log("eroor in google strategy",err);
                            return done(err);
                        }
                        return done(null,user)
                    });
            }
        });
    }));

module.exports=passport;