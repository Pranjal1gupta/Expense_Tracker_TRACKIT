const mongoose =require("mongoose");
//const DB="mongodb+srv://sushant:sushant@cluster0.kwnwnfw.mongodb.net/project?retryWrites=true&w=majority";
const DB = "mongodb+srv://ExpenseTracker:ExpenseTracker@cluster0.npcdwpr.mongodb.net/ExpenseTracker?retryWrites=true&w=majority";
mongoose.connect(DB,{
  
    useNewUrlParser: true,
   
    
    useUnifiedTopology: true
}).then(()=>console.log("connection start")).catch((error)=>console.log(error.message));