const mongoose=require("mongoose")
const ContactSchema=new mongoose.Schema(
    {
        uname:{
            type:String,
            require:true
        },
        email:{
            type:String,
            require:true
        },
        phn:{
            type:String,
            require:true
        },
        msg:{
            type:String,
            require:true
        }
    }
);
const contactdata=new mongoose.model("contactdata",ContactSchema);
module.exports=contactdata;