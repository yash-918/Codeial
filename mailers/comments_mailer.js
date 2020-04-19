const nodemailer=require("../config/nodemailer.js");


module.exports.newComment=(comment) =>
{
    let htmlString= nodemailer.renderTemplate({comment:comment},"/comments/new_comment.ejs");
    // console.log(htmlString);
    console.log("inside newComment mailer");
    nodemailer.transporter.sendMail({
        from : 'codeial918@gmail.com',
        to : comment.user.email,
        subject :"new comment published",
        html : htmlString
    },function(err,info)
    {
        if(err)
        {
            console.log("error in sending mail",err);
            return;
        }
        console.log("mailed delivered",info);
        return;
    });
}