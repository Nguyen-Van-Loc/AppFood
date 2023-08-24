const mongoose=require("mongoose");
mongoose.connect("mongodb://127.0.0.1/Appfood");
const user =new mongoose.Schema({
  name:{type:String, required:true}
})
let User =mongoose.model("user",user);
module.exports =User;