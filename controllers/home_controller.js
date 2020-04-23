const Post = require('../models/post');
const User = require('../models/user');
const FriendShip=require("../models/Friendship.js");


module.exports.home = async function(req, res){

    try{
        // CHANGE :: populate the likes of each post and comment
        let posts = await Post.find({})
        .sort('-createdAt')
        .populate('user')
        .populate({
            path: 'comments',
            populate: {
                path: 'user'
            },
            populate: {
                path: 'likes'
            }
        }).populate('likes');

    
        let users = await User.find({});
        let current_user;
        let friends;
        if(req.user)
        {
            current_user= await User.findById(req.user._id).populate({
                path : "friendships",
                populate : {
                    path : "to_user"
                }
            });
            // console.log(current_user.friendships[0]._id);
        }
        return res.render('home', {
            title: "Codeial | Home",
            posts:  posts,
            all_users: users,
            current_user : current_user
        });

    }catch(err){
        console.log('Error', err);
        return;
    }
   
}

// module.exports.actionName = function(req, res){}


// using then
// Post.find({}).populate('comments').then(function());

// let posts = Post.find({}).populate('comments').exec();

// posts.then()
