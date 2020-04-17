const User = require('../models/user');
const fs=require("fs");
const path = require("path");
// let's keep it same as before
module.exports.profile = function(req, res){
    User.findById(req.params.id, function(err, user){
        return res.render('user_profile', {
            title: 'User Profile',
            profile_user: user
        });
    });

}


module.exports.update = async function(req, res){
    // if(req.user.id == req.params.id){
    //     User.findByIdAndUpdate(req.params.id, req.body, function(err, user){
    //         req.flash('success', 'Updated!');
    //         return res.redirect('back');
    //     });
    // }else{
    //     req.flash('error', 'Unauthorized!');
    //     return res.status(401).send('Unauthorized');
    // }
    // converted to async await
    if(req.user.id == req.params.id){
         try {
            let user= await User.findById(req.params.id);
            // we won't be able to access the req.body without the uploadedAvatar function because it is multipart
            User.uploadedAvatar(req,res,function(err)
           
            {
                if(err){console.log("multer error",err);return;}
                user.name=req.body.name;
                user.email=req.body.email;
                if(req.file)
                {
                    // checking if there is already an avatar for the user,to delete the old one
                    if(user.avatar)
                    {
                        // checking the file path exists or not
                        if(fs.existsSync(path.join(__dirname,"..",user.avatar)))
                        {
                            // deleting the old avatar from folder
                            fs.unLinkSync(path.join(__dirname,"..",user.avatar));
                        }
                    }
                    // this is saving the path of the uploaded file into avatar field in the user
                    user.avatar=User.avatarPath+'/'+req.file.filename;
                }
                user.save();
                return res.redirect("back");
                
            });
        } catch (err) {
             req.flash('error', err);
        // added this to view the error on console as well
        // console.log(err);
            return res.redirect('back');
         }
    }
    else{
    req.flash('error', 'Unauthorized!');
    return res.status(401).send('Unauthorized');}

}


// render the sign up page
module.exports.signUp = function(req, res){
    if (req.isAuthenticated()){
        return res.redirect('/users/profile');
    }


    return res.render('user_sign_up', {
        title: "Codeial | Sign Up"
    })
}


// render the sign in page
module.exports.signIn = function(req, res){

    if (req.isAuthenticated()){
        return res.redirect('/users/profile');
    }
    return res.render('user_sign_in', {
        title: "Codeial | Sign In"
    })
}

// get the sign up data
module.exports.create = function(req, res){
    if (req.body.password != req.body.confirm_password){
        req.flash('error', 'Passwords do not match');
        return res.redirect('back');
    }

    User.findOne({email: req.body.email}, function(err, user){
        if(err){req.flash('error', err); return}

        if (!user){
            User.create(req.body, function(err, user){
                if(err){req.flash('error', err); return}

                return res.redirect('/users/sign-in');
            })
        }else{
            req.flash('success', 'You have signed up, login to continue!');
            return res.redirect('back');
        }

    });
}


// sign in and create a session for the user
module.exports.createSession = function(req, res){
    req.flash('success', 'Logged in Successfully');
    return res.redirect('/');
}

module.exports.destroySession = function(req, res){
    req.logout();
    req.flash('success', 'You have logged out!');


    return res.redirect('/');
}