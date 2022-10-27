const express=require("express");
const app=express()
const userController=require("./user/routes/user")
const orderController=require("./user/routes/order")
const cartController=require("./user/routes/cart")
const itemController=require("./user/routes/items")
const jwt=require("jsonwebtoken")
const multer=require("multer")();
const mongoose=require("mongoose")
require('dotenv').config()
const cors=require("cors")
app.use(cors())
const unprotectedRoutes=['/user/login','/user/signup']
//starting server
app.listen(3003,(err)=>{
    if(err){
        // console.log("Server started at port 3003")
        console.log(err)
    }else{
        // console.log(err)
        console.log("Server started at port 3003")
    }
});
//body parser middileware
app.use(express.json())
app.use(express.urlencoded({extended:false}));
app.use(multer.array())
// app.use((req,res,next)=>{
//     console.log(req.url)
//     unprotectedRoutes.forEach((route)=>{
//         if(req.url.includes(route)){
//             next()
//         }else{
//             const user=jwt.verify(req.headers.authorization,process.env.SECRETKEY)
  
//         }
//     })
//     //const user=jwt.verify(req.headers.authorization,process.env.SECRETKEY)
//     next()
//     console.log(req.headers)
// })
//database connection
mongoose.connect("mongodb://localhost/ecommerce",(data)=>{
 console.log("Successfully connected to db")
},(err)=>{
    console.log(err)
})
//1.defining our base route
app.get("/",(req,res)=>{
    res.send("Ecommerce Backend")
})
//2.middleware
app.use("/user",userController)
app.use("/order",orderController)
app.use("/cart",cartController)
app.use("/item",itemController)