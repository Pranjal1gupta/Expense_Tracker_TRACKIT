const mongoose = require("mongoose") ;
const AccountAdminSchema = new mongoose.Schema(
    {
        ufirst:
        {
            type:String,
            require:true
        },
        uemail:
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
const accadminupdate = new mongoose.model("accadminupdate",AccountAdminSchema);
module.exports = accadminupdate;