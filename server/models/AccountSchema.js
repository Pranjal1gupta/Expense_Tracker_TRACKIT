const mongoose = require("mongoose") ;
const AccountSchema = new mongoose.Schema(
    {
        ufirst:
        {
            type:String,
            require:true
        },
        ulast:
        {
            type:String,
            require:true
        },
        uabout:
        {
            type:String,
            require:true
        },
        uemail:
        {
            type:String,
            require:true
        },
        uphone:
        {
            type:String,
            require:true
        },
        uaddress:
        {
            type:String,
            require:true
        }
    }
);
const accupdate = new mongoose.model("accupdate",AccountSchema);
module.exports = accupdate;