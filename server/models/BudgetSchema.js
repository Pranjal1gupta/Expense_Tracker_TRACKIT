const mongoose= require("mongoose")
const BudgetSchema= new mongoose.Schema(
    {
        bcategory:{
            type:String,
            require:true
        },
        amt:{
            type:String,
            require:true
        },
        description:{
            type:String,
            require:true
        },
        month:{
            type:String,
            require:true
        },
        useremail:{
            type:String,
            require:true
        }
    }
);
const budgetdata=new mongoose.model("budgetdata",BudgetSchema);
module.exports=budgetdata;