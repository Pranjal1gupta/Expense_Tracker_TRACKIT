const mongoose = require("mongoose")
const AdminloginSchema = new mongoose.Schema(
    {
        adminemail:
        {
            type:String,
            required:true
        },
        adminpwd:{
            type:String,
            required:true
        },
    }
);

const AdminSignupData = new mongoose.model("AdminSignupData",AdminloginSchema);
module.exports = AdminSignupData