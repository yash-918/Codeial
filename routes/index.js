const express= require("express");


const router=express.Router();
const homecontroller=require("../controllers/home_controller.js");

router.get("/",homecontroller.home);
router.use("/users",require("./users.js"));
router.use("/posts",require("./post.js"));
router.use("/comments",require("./comments.js"));

module.exports=router;