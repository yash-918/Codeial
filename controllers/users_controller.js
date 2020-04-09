module.exports.profile=function(req,res)
{
    return res.render('users_profile.ejs',
    {
        title : "Codeial Profile Page"
    });
}