
const User=require("../../../models/user.js");
const jwt =require("jsonwebtoken");

// sign in and create a session for the user
module.exports.createSession = async function(req, res){
    try{
        let user = await User.findOne({email:req.body.email});
        if(!user || user.password!=req.body.password)
        {
            return res.json(422,{
                message : "Invalid username or password"
            });
        }
        else
        {
            res.json(200,{
                message : "Sign in successfully ,here is the token,pls keep it save",
                data :{
                    token : jwt.sign(user.toJSON(),'codeial',{
                        expiresIn : 10000
                    })
                }
            });
        }
    }
    catch{
        console.log("*****",err);
        return res.json(500,{
            message:"Internal Server Error"
        });
    }
}