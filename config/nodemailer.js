const nodemailer = require("nodemailer");
const ejs =require('ejs');
const path=require('path');

// this part sends the email
let transporter = nodemailer.createTransport({
    service : "gmail",
    host : "smpt.gmail.com",
    port : 587,
    secure : false,
    auth :
    {
        user : "codeial918@gmail.com",
        pass : "qwerty@123"
    }
});

let renderTemplate=(data,relativePath)=>
{
    let mailHTML ;
    ejs.renderFile(path.join(__dirname,'../views/mailers',relativePath),
    data, 
    function(err,template)
    {
        if(err)
        {
            console.log("error in rendering");
            return;
        }
        mailHTML=template;
    }
    );
    return mailHTML;
}

module.exports={
    transporter : transporter,
    renderTemplate : renderTemplate
}