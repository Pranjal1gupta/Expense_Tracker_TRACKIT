require("dotenv").config(); // set the enviroment
const express =require("express"); //server to run js files (express create a server)
const app =express();
const mongoose =require("mongoose");
const cors =require("cors"); // takes the data from bosy of api
require("./database/conn");

//run when data is inserted


//const demouser = require("./models/userdemo");
const router=require("./routes/router");
const port = 8003;
app.use(cors())
app.use(express.json());
app.use(router);
app.listen(port,()=>{
    console.log("server is started !!");
}); 

//node takes all the data abd filter it