const mongoose=require("mongoose");
const cartSchema=new mongoose.Schema({
    username:{
        type:String,
        required:true
    },
  item_id:{
        type:String,
        required:true,
        // minLength:10,
        // maxLength:10
    },
    
    
});
const cartModal=mongoose.model("cart",cartSchema)
module.exports=cartModal