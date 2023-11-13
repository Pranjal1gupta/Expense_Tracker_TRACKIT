const mongoose = require("mongoose");

const ExpenseSchema = new mongoose.Schema(
    {
        expcategory:
        {
            type:String,
            require:true
        },
        expamt:
        {
            type:String,
            require:true
        },
        expdesc:
        {
            type:String,
            require:true
        },
        month:
        {
            type:String,
            require:true
        },
        date:
        {
            type:String,
            require:true
        },
        useremail:
        {
            type:String,
            require:true
        }
    }
);

const expenseschema = new mongoose.model("expenseschema",ExpenseSchema);
module.exports = expenseschema;