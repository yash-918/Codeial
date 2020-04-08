module.exports.profile=function(req,res)
{
    res.render('users_profile.ejs',
    {
        title : "Codeial Profile Page"
    })
}