const mongoose = require("mongoose");
const ReminderSchema = new mongoose.Schema(
    {
        remname:{
            type:String,
            require:true
        },
        remdesc:{
            type:String,
            require:true
        },
        email:{
            type:String,
            require:true
        },
        date:{
            type:String,
            require:true
        },
        useremail:{
            type:String,
            require:true
        }
    }
);
const reminderdata = new mongoose.model("reminderdata",ReminderSchema);
module.exports = reminderdata;