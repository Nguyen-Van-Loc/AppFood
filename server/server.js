const express =require("express")
const cors=require("cors");
const app=express();

var bodyParser=require("body-parser");

const useRouter=require("./router/userRouter");

app.use(bodyParser.json());

app.use(cors())

app.use("/v1/user",useRouter)

app.listen(3000,()=>{
  console.log("dang chay")
})