const express=require('express');
const app=express();
const cors=require('cors');
const mongoose=require('mongoose');
require('./db/config');
const User=require('./db/users');
const Product=require('./db/Product');


app.use(express.json());
app.use(cors());

app.post("/register",async (req,resp)=>{
  let user=new User(req.body);
  let result = await user.save();
  result=result.toObject();
  delete result.password;
  resp.send(result)
})

app.post("/add-product",async (req,resp)=>{
  let product=new Product(req.body);
  let result = await product.save();
  resp.send(result)
})



app.post("/login", async(req,resp)=>{
  if(req.body.password && req.body.email){
let user=await User.findOne(req.body).select("-password");

if (user){
  resp.send(user);
}else{
  resp.send("no user found")
}
  }else{
    resp.send("no user found")
  }
})


app.listen(5000)