const mongoose = require("mongoose")
const SignupSchema = new mongoose.Schema(
    {
        uname:
        {
            type:String,
            required:true
        },
        email:
        {
            type:String,
            required:true
        },
        pwd:{
            type:String,
            required:true
        },
        date:
        {
            type:Date,
            required:true
        },
        status:
        {
            type:Number,
            required:true
        }
        
    }
);

const signupdata = new mongoose.model("signupdata",SignupSchema);
module.exports = signupdata;