const userControllers = require("../controller/usercontrollers");

const router=require("express").Router();
// add user;
router.post("/",userControllers.addUser);
module.exports=router;