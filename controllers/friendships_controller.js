const Post = require('../models/post');
const User = require('../models/user');
const FriendShip=require("../models/Friendship.js");

module.exports.create= async function(req,res)
{
    try{
        //let existingfriendship=false;
        // console.log("hhvjhbjhbjhbhj");
        let friend_user= await User.findById(req.params.id);
        let current_user = await User.findById(req.user._id);
        // console.log(friend_user.id);
        // console.log(current_user.id);
        // console.log(friendship_1);
        // console.log(current_user);
        // console.log(friendship_2);
        // if friendship doesn't exists,then create a new one
            // console.log(friend_user);
        let friendship_1= await FriendShip.findOne(
            {
                to_user : req.params.id,
                from_user : req.user.id
            }
        );
        if(friendship_1)
        {
            return res.redirect("back");
        }
            friendship_1 = await FriendShip.create({
                to_user : friend_user.id,
                from_user : current_user.id
            });
            let friendship_2 = await FriendShip.create({
                to_user : current_user.id,
                from_user : friend_user.id
            });
            // await friend_user.friendships.push(friendship_1.id);
            await friend_user.friendships.push(friendship_2.id);

            await current_user.friendships.push(friendship_1.id);
            // await current_user.friendships.push(friendship_2.id);

            friend_user.save();
            current_user.save();
            // existingfriendship=true;
            // console.log(current_user);

        // res.cookie("existingfriendship",existingfriendship);
        return res.redirect('back');

        
    }
    catch(err)
    {
        console.log("error in friendship",err);
        return res.redirect("back");
    }
}

module.exports.breakup=async function(req,res)
{
    try {
        let friendship_1= await FriendShip.findOne(
            {
                to_user : req.params.id,
                from_user : req.user.id
            }
        );
        console.log(friendship_1);
        let friendship_2= await FriendShip.findOne(
            {
                to_user : req.user.id,
                from_user : req.params.id
            }
        );
        let friend_user= await User.findById(req.params.id);
        let current_user = await User.findById(req.user._id);

        await friend_user.friendships.pull(friendship_2.id);

        await current_user.friendships.pull(friendship_1.id);
            // await current_user.friendships.pull(friendship_2.id);  
            // console.log(current_user);
            friend_user.save();
            current_user.save();

        await FriendShip.findByIdAndDelete(friendship_1.id);

        await FriendShip.findByIdAndDelete(friendship_2.id); 
        return res.redirect("back");

    } catch (err) {
        console.log("error in breakup",err);
        return res.redirect(back);
    }

}