const express=require("express");
const app=express();
const port=8000




app.listen(port,function(err)
{
    if(err){console.log("error in listen part while running server: ",err);return;}
    console.log("cool darling,listen part is working fine. server is running on port no.",port);
});