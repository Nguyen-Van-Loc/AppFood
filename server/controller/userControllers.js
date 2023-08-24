const User=require("../model/model");
const userControllers={
    addUser: async(req,res)=>{
        res.status(200).json(req.body);
    },
};
module.exports=userControllers;