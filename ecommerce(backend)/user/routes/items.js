const express=require("express")
const router=express.Router();
const itemModal=require("../modals/item-modal")
router.get("/",(req,res)=>{
itemModal.find().then((itemData)=>{
    res.status(200).send({item:itemData})
})
})
router.post("/add",(req,res)=>{
    itemModal.insertMany(req.body.items).then((itemData)=>{
        res.status(200).send("Data Added Successfully")
    })
})
module.exports=router