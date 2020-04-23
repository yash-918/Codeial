const passport = require('passport');

const JWTStrategy = require('passport-jwt').Strategy;

const ExtractJWT=require('passport-jwt').ExtractJwt;

const User = require('../models/user');
const env=require("./environment.js");
let opts=
{
    jwtFromRequest : ExtractJWT.fromAuthHeaderAsBearerToken(),
    secretOrKey : env.jwt_secret,
    
    //issuer = 'accounts.examplesoft.com',
    //audience = 'yoursite.net'
}

passport.use(new JWTStrategy(opts,function(jwtPayLoad,done){

    User.findById(jwtPayLoad._id,function(err,user)
    {
        if(err)
        {
            console.log("error in finding user using jwt");
            return done(err);
        }
        if(user)
        {
            return done(null,user);
        }
        else{
            return done(null,false);
        }
    })

}));

module.exports=passport;
