const express=require("express");
const signupModal=require("../modals/signup-modal")
const {checkExistingUser,generatePasswordHash}=require("../utility");
const bcrypt=require("bcryptjs")
const jwt=require("jsonwebtoken");
// const crypto=require("crypto");
// const salt=10;
//const secretKey=crypto.randomBytes(64).toString("hex");
//console.log(secretKey)
const router=express.Router();
router.post("/login",(req,res)=>{
    //res.status(200).send("Log in works")
    signupModal.find({username:req.body.username}).then((userData)=>{
         if(userData.length){
           bcrypt.compare(req.body.password,userData[0].password).then((val)=>{
          if(val){
         const authToken=jwt.sign(userData[0].username,process.env.SECRETKEY);
         res.status(200).send({authToken});
          }else{
            res.status(400).send("INVALID PASSWORD")
          }
           })
         }else{
            res.status(400).send("UNAUTHORIZED USER")
         }
    })
});
router.post("/signup",async(req,res)=>{
    //console.log(req.body)
    if(await checkExistingUser(req.body.username)){
        res.status(400).send("Username Exist please try with different one")
    }else{
       generatePasswordHash(req.body.password).then((passwordHash)=>{
        //console.log(passwordHash)
                signupModal.create({username:req.body.username,phone_number:req.body.phone_number,
                password:passwordHash})
           .then(()=>{
             res.status(200).send(`${req.body.username} added successfully`)
            }).catch((err)=>{
                console.log(err.message)
          res.status(400).send(err.message)
            })
       })
      
    
    }
   
});
 router.post("/logout",(req,res)=>{
     res.status(200).send("Log out works");
 });
 router.put("/updatepassword",(req,res)=>{
  signupModal.find({username:req.body.username}).then((user)=>{
        if(user.length){
          bcrypt.compare(req.body.oldpassword,user[0].password).then((isMatch)=>{
            if(isMatch){
              generatePasswordHash(req.body.newpassword).then((hashedPassword)=>{
                signupModal.updateOne({username:req.body.username},{password:hashedPassword}).then(()=>{
                  res.status(200).send("Password Updated Successfully")
                }).catch((err)=>{
                  res.status(400).send(err)
                })
              })
       signupModal.updateOne({username:req.body.username})
            }else{
              res.status(400).send("Old Password is Incorrect")
            }
          })
        }else{
          res.status(400).send("Invalid User")
        }
  })
 })
module.exports=router