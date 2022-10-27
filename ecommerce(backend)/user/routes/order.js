const express=require("express")
const jwt = require("jsonwebtoken")
const orderModal=require("../modals/order-modal")
const router=express.Router()
router.get("/",(req,res)=>{
    // console.log(req.headers,process.env.SECRETKEY)
    // jwt.verify(req.headers.authToken,process.env.SECRETKEY)
    try{
        const user=jwt.verify(req.headers.authorization,process.env.SECRETKEY);
        res.status(200).send(user) 
    }
    catch(err){
        res.status(403).send("User Not Authorized")
    }
})
router.post("/add",(req,res)=>{
    // console.log(req.body)
    orderModal.create({username:req.body.username,order_id:req.body.order_id,order_type:req.body.order_type,item_id:req.body.item_id}).then(()=>{
        //console.log(req.body)
        res.status(200).send("order placed Successfully")
    }).catch((err)=>{
res.status(400).send(err)
    })
})
router.delete("/cancel/:id",(req,res)=>{
    orderModal.deleteOne({order_id:req.params.id}).then(()=>{
        res.status(200).send('Order Cancelled Successfully')
    }).catch((err)=>{
        res.status(400).send(err)
    })
    //console.log(req.params)
})
module.exports=router