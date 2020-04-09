const express=require("express");
const cookieParser = require("cookie-parser");
const app=express();
const port=8000;
const expressLayouts=require("express-ejs-layouts");
const db=require("./config/mongoose.js");

// MiddleWare
app.use(express.urlencoded());

app.use(cookieParser());

// telling app to search for static files in assets folder
app.use(express.static("./assets"));

// setting layouts
app.use(expressLayouts);

// extract style and scripts from sub pages into layout
app.set("layout extractStyles",true);
app.set("layout extractScripts",true);

// use express router
app.use("/",require("./routes/index.js"));

// set up the view engine
app.set("view engine" , "ejs");
app.set("views","./views");



app.listen(port,function(err)
{
    if(err){console.log("error in listen part while running server: ",err);return;}
    console.log("cool darling,listen part is working fine. server is running on port no.",port);
});