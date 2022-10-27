const express=require("express")
const jwt=require("jsonwebtoken")
const cartModal=require("../modals/cart-modal")
const router=express.Router();
router.post("/add",(req,res)=>{
  //const payload=JSON.parse(req.body)
  try{
    const username=jwt.verify(req.headers.authorization,process.env.SECRETKEY);
    cartModal.create({username:username,item_id:req.body.itemid}).then(()=>{
      res.status(200).send("Item Added Successfully")
  }).catch((err)=>{
    res.status(400).send(err)
  })
}catch(err){
  res.status(400).send("User not authorized")
}
});
router.get("/",(req,res)=>{
  try{
    const username=jwt.verify(req.headers.authorization,process.env.SECRETKEY)
    cartModal.find({username:username}).then((cart)=>{
      res.status(200).send({cart:cart})
    })
  } catch(err){
    console.log(err)
  }
})
router.delete("/remove/:id",(req,res)=>{
    cartModal.deleteOne({item_id:req.params.id}).then(()=>{
        res.status(200).send("Item removed Successfully")
    }).catch((err)=>{
      res.status(400).send(err)
    })
})
module.exports=router