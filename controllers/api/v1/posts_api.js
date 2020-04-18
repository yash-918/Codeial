const Post=require("../../../models/post.js");
const Comment=require("../../../models/comment.js");
module.exports.index= async function(req,res)
{
    let posts = await Post.find({})
        .sort('-createdAt')
        .populate('user')
        .populate({
            path: 'comments',
            populate: {
                path: 'user'
            }
        });
    return res.json(200,
    {
        message:"list of posts",
        posts : posts
    });
}

module.exports.destroy = async function(req, res){

    try{
        let post = await Post.findById(req.params.id);

        // if (post.user == req.user.id){
            post.remove();

            await Comment.deleteMany({post: req.params.id});

            return res.json(200,{
                message: "post deleted successfully"
            });

            // req.flash('success', 'Post and associated comments deleted!');

            // return res.redirect('back');
        // }else{
            // req.flash('error', 'You cannot delete this post!');
            // return res.redirect('back');
        // }

    }catch(err){
        return res.json(500,
            {
                messgae :"internal server error",
            })
    }
    
}