
// {} when data needs to be stored(fetch)
//data encode when  in api
// [] to declare variable

const express = require("express");
const router = express.Router();
//const demouser = require("../models/userdemo");
//const demos = require("../models/userdemo");

//const userdemo = require("../models/userdemo");
const signupdata = require("../models/SignupSchema");
const contactschema=require("../models/ContactSchema");
const adminschema= require("../models/AdminloginSchema");
const accupdate = require("../models/AccountSchema");
const expenseschema=require("../models/ExpenseSchema");
const budget = require("../models/BudgetSchema");
const reminder = require("../models/ReminderSchema");
const feedbackschema = require("../models/FeedbackSchema");
const AccountAdminSchema=require("../models/AdminAccountSchema");


/////////////////////////// signup /////////////////////////////

router.post("/getusersignup", async (req, res) => {
    const { uname, email, pwd ,date,status} = req.body;
    try {
        const userexist= await signupdata.findOne({email:email});
        if(userexist){
            return res.status(404).json("user already exists");
        }
        else{
            const signup = new signupdata({uname, email, pwd,date,status});
            await signup.save();
            res.status(201).json(signup);
            console.log(signup);
        }
        }
        
    catch (error) {
        res.status(404).json(error);
    }
});


//////////////////// login ///////////////////

router.post("/login",async(req,res)=>{
    const {email,pwd}=req.body;
    try{
        const check=await signupdata.findOne({email:email,status:0})
        console.log(req.body,check);
        const stat=await signupdata.findOne({email:email,status:1});
        if(check){
            const check_pass=await signupdata.findOne({email:email,pwd:pwd});
            console.log(check_pass);
            if(check_pass){
                res.status(200).json(check_pass);
            }
            else{
                res.status(201).json("incorrect password")
            }
        }
        else if(stat){
            res.status(400).json("blocked")
        }
        else{
            res.status(401).json("email is not registered");
        }
    }
    catch(error){
        res.status(404).json(error)
    }
});

//////////LOGIN ADMIN///////

router.post("/loginadminapi",async(req,res)=>{
    const {adminemail,adminpwd}=req.body;
    try{
        const admcheck=await adminschema.findOne({adminemail:adminemail})
        console.log(req.body,admcheck);
        if(admcheck){
            const check_admpass=await adminschema.findOne({adminemail:adminemail,adminpwd:adminpwd});
            console.log(check_admpass);

            if(check_admpass){
                res.status(200).json(check_admpass);
            }
            else{
                res.status(201).json("incorrect password")
            }
        }
        else{
            res.status(401).json("email is not registered");
        }
    }
    catch(error){
        res.status(400).json(error)
    }
});

///////////////// MAINPAGE GET  EXPENSE //////////////////

router.get("/getexpenseapimainpage/:email/:currdate",async(req,res)=>
{
    try{
        const {email} = req.params;
        const {currdate} = req.params;
        const allexpense = await expenseschema.find({useremail:email,month:currdate}).sort({date:1});
        res.status(201).json(allexpense);
        console.log(allexpense);
    }
    catch(error)
    {
        alert(error);
        res.status(404).json(error);
    }
})


///////////MAINPAGE GET BUDGET/////////

router.get("/getbudgetapimainpage/:email/:currdate",async(req,res)=>
{
    try{
        const {email} = req.params;
        const {currdate} = req.params;
        const allbudget = await budget.find({useremail:email,month:currdate}).sort({date:1});
        res.status(201).json(allbudget);
        console.log(allbudget);
    }
    catch(error)
    {
        alert(error);
        res.status(422).json(error);
    }
});


////////////////////GET USER DATA ///////////////////////

router.get("/signupdatamainpage/:email", async (req, res) => {
    try {
        const {email} = req.params;
        const indivisualuser = await signupdata.findOne({email:email});
        console.log(indivisualuser);
        res.status(201).json(indivisualuser);
    }
    catch (error) {
        console.log(error);
        res.status(422).json(error);
    }
})

/////////////////ACCOUNT UPDATE /////////////////

router.post("/updateprofile", async (req, res) => {
    const { ufirst,ulast,uabout,uemail,uphone,uaddress } = req.body;
    try {
        const check=await accupdate.findOne({uemail:uemail})
        console.log(check);
        if(check){
            res.status(401).json("email is already registered");
        }
        else{
            const newupdateaccount = new accupdate({ ufirst,ulast,uabout,uemail,uphone,uaddress });
            await newupdateaccount.save();
            res.status(201).json(newupdateaccount);
            console.log(newupdateaccount);
        }
    }
    catch (error) {
        res.status(404).json(error);
    }
});


/////////////////////EXPENSE INSERET////////////////////
router.post("/expenseapi", async (req, res) => {
    const {expcategory,expamt,expdesc,month,date,useremail} = req.body;
    try {
        console.log(req.body);
        const newexpensesschema = new expenseschema({ expcategory,expamt,expdesc,month,date,useremail});
        await newexpensesschema.save();

        res.status(201).json(newexpensesschema);
        console.log(newexpensesschema);
    }
    catch (error) {
        res.status(404).json(error);
    }
});

router.post("/addcontactapi",async(req,res)=>{
    const {uname,email,phn,msg} = req.body;
console.log("server working !!!")
    try {
        console.log(req.body);
        const newcontactschema = new contactschema({uname,email,phn,msg});
        await newcontactschema.save();

        res.status(201).json(newcontactschema);
        console.log(newcontactschema);
    }
    catch (error) {
        res.status(404).json(error);
    }
})

/////////////////////////GET EXPENSE////////////////////////

router.get("/getexpenseapi/:email/:month",async(req,res)=>
{
    try{
        const {email} = req.params;
        const {month} = req.params;
        const allexpense = await expenseschema.find({useremail:email,month:month}).sort({date:1});
        res.status(201).json(allexpense);
        console.log(allexpense);
    }
    catch(error)
    {
        alert(error);
        res.status(404).json(error);
    }
})


////////////////////DELETE EXPENSE//////////////////

router.delete("/deleteexpenseapi/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const deleteexpense = await expenseschema.findByIdAndDelete({ _id: id });
        res.status(201).json(deleteexpense);
    }
    catch (error) {
        console.log(error);
    }
})


/////////////////////// VIEW UPDATE EXPENSES /////////////////////////

router.get("/viewexpenseapibyid/:id",async(req,res)=>
{
    try{
        const { id } = req.params;
        const expupdget = await expenseschema.find({_id: id});
        res.status(201).json(expupdget);
        console.log(expupdget);
    }
    catch(error)
    {
        alert(error);
        res.status(404).json(error);
    }
});


///////////////////////UPDATE EXPENSES/////////////////////////

router.patch("/updateexpenseapi/:id", async (req, res) => {
    try {
        const { id } = req.params;
        console.log(id)
        const updxpense = await expenseschema.findByIdAndUpdate(id, req.body, {
            new:true
        });
        console.log(updxpense);
        res.status(201).json(updxpense);
    }
    catch (error) {
        console.log("error")
        res.status(422).json(error);
    }
})

///////////////////////////BUDGET INSERT////////////////////////////////

router.post("/budget",async(req,res)=>{
    const{bcategory,amt,description,month,useremail}=req.body;
    console.log(req.body);
    try{
        const budgetdata= new budget({bcategory,amt,description,month,useremail})
        await budgetdata.save();
        res.status(201).json(budgetdata)
        console.log(budgetdata);
    }
    catch(error){
        res.status(404).json(error);
    }
});

/////////////////////// GET BUDGET ////////////////////////
router.get("/getbudgetapi/:email/:month",async(req,res)=>
{
    try{
        const {email} = req.params;
        const {month} = req.params;
        const allbudget = await budget.find({useremail:email,month:month}).sort({date:1});
        res.status(201).json(allbudget);
        console.log(allbudget);
    }
    catch(error)
    {
        alert(error);
        res.status(422).json(error);
    }
});

/////////////////////// DELETE BUDGET ///////////////////////////

router.delete("/deletebudgetapi/:id",async(req,res)=>{
    try{
        const{id}=req.params;
        const deletebudget=await budget.findByIdAndDelete({_id:id});
        res.status(201).json(deletebudget);
    }
    catch(error){
        console.log(error);
    }
});

/////////////////////// VIEW UPDATE BUDGET /////////////////////////

router.get("/viewbudgetbyid/:id",async(req,res)=>
{
    try{
        const { id } = req.params;
        const budgetupget = await budget.find({_id: id});
        res.status(201).json(budgetupget);
        console.log(budgetupget);
    }
    catch(error)
    {
        alert(error);
        res.status(404).json(error);
    }
});

///////////////////////////// UPDATE BUDGET ////////////////////////////

router.patch("/updatebudgetapi/:id", async (req, res) => {
    try {
        const { id } = req.params;
        console.log(id)
        const updbudget = await budget.findByIdAndUpdate(id, req.body, {
            new:true
        });
        console.log(updbudget);
        res.status(201).json(updbudget);
    }
    catch (error) {
        console.log("error")
        res.status(422).json(error);
    }
})


/////////////////////// REMINDER INSERT /////////////////////

router.post("/reminderapi",async(req,res)=>{
    const{remname,remdesc,email,date,useremail} = req.body;
    console.log(req.body);
    try{
        const reminderdata = new reminder({remname,remdesc,email,date,useremail});
        await reminderdata.save();
        res.status(201).json(reminderdata)
        console.log(reminderdata);

    }
    catch
    {
        res.status(404).json(error);
    }
});

/////////////////////GET REMINDER////////////////////

router.get("/getreminderapi/:email",async(req,res)=>
{
    try{
        const { email } = req.params;
        const allreminder = await reminder.find({useremail:email});
        res.status(201).json(allreminder);
        console.log(allreminder);
    }
    catch(error)
    {
        alert(error);
        res.status(404).json(error);
    }
});

///////////////////////////////DELETE REMINDER/////////////////////////////////

router.delete("/deletereminderapi/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const deletereminder  = await reminder.findByIdAndDelete({ _id: id });
        res.status(201).json(deletereminder);
    }
    catch (error) {
        console.log(error);
    }

});

/////////////////////GET REMINDER BY ID////////////////////

router.get("/viewreminderbyidapi/:id",async(req,res)=>
{
    try{
        const { id } = req.params;
        const allreminder = await reminder.find({_id: id});
        res.status(201).json(allreminder);
        console.log(allreminder);
    }
    catch(error)
    {
        alert(error);
        res.status(404).json(error);
    }
});

//////////////////////////UPDATE REMINDER//////////////////////

router.patch("/updatereminderapi/:id", async (req, res) => {
    try {
        const { id } = req.params;
        console.log(id)
        const updreminder = await reminder.findByIdAndUpdate(id, req.body, {
            new:true
        });
        console.log(updreminder);
        res.status(201).json(updreminder);
    }
    catch (error) {
        console.log("error")
        res.status(422).json(error);
    }
})

//////////// GET EXPENSESHEET EXPENSE ///////////

router.get("/expensesheetapi/:email/:currmonth",async(req,res)=>
{
    try{
        const {email} = req.params;
        const {currmonth} = req.params;
        const allexpensesheet = await expenseschema.find({useremail:email,month:currmonth});
        res.status(201).json(allexpensesheet);
        console.log(allexpensesheet);
    }
    catch(error)
    {
        alert(error);
        res.status(404).json(error);
    }
})

//////////// GET EXPENSESHEET BUDGET ////////////

router.get("/expsheetbudgetapi/:email/:currmonth",async(req,res)=>
{
    try{
        const {email} = req.params;
        const {currmonth} = req.params;
        const allexpense = await budget.find({useremail:email,month:currmonth});
        res.status(201).json(allexpense);
        console.log(allexpense);
    }
    catch(error)
    {
        alert(error);
        res.status(404).json(error);
    }
});

////////////////////// GET ANNUAL BUDGET ///////////////////////

router.get("/annualbudget/:email",async(req,res)=>
{
    try{
        const {email} = req.params;
        const allexpense = await budget.find({useremail:email});
        res.status(201).json(allexpense);
        console.log(allexpense);
    }
    catch(error)
    {
        alert(error);
        res.status(404).json(error);
    }
});

///////////////// GET ANNUAL EXPENSE //////////////////

router.get("/annualexpense/:email",async(req,res)=>
{
    try{
        const {email} = req.params;
        const allexpensesheet = await expenseschema.find({useremail:email});
        res.status(201).json(allexpensesheet);
        console.log(allexpensesheet);
    }
    catch(error)
    {
        alert(error);
        res.status(404).json(error);
    }
})

///////////INSERT FEEDBACK//////

router.post("/getfeedbackapi", async (req, res) => {
    const {op1,op2,op3,op4,op5,op6,op7,op8,op9,op10,features,feedemail,uname,date} = req.body;
    try {
        console.log(req.body);
        const newfeedbackschema = new feedbackschema({ op1,op2,op3,op4,op5,op6,op7,op8,op9,op10,features,feedemail,uname,date});
        await newfeedbackschema.save();

        res.status(201).json(newfeedbackschema);
        console.log(newfeedbackschema);
    }
    catch (error) {
        res.status(404).json(error);
    }
});

//////////////// GET FEEDBACK //////////

router.get("/getfeedbackapi",async(req,res)=>
{
    try{
        const allfeedback = await feedbackschema.find();
        res.status(201).json(allfeedback);
        console.log(allfeedback);
    }
    catch(error)
    {
        alert(error);
        res.status(404).json(error);
    }
})


/////////////// DELETE FEEDBACK /////////////

router.delete("/deletefeedbackapi/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const deletefeedbacks = await feedbackschema.findByIdAndDelete({ _id: id });
        res.status(201).json(deletefeedbacks);
    }
    catch (error) {
        console.log(error);
    }

})

////////////////////GET ACCOUNT DETAILS////////////////////

router.get("/accdetails/:email", async (req, res) => {
    try {
        const {email} = req.params;
        const userdetails = await accupdate.findOne({uemail:email});
        console.log("server working !!!!");
        res.status(201).json(userdetails);
    }
    catch (error) {
        console.log(error);
        res.status(422).json(error);
    }
})


////////////////////// GET SIGNUP DATA /////////////////////////

router.get("/getusermangapi",async(req,res)=>
{
    try{
        const allusermang = await signupdata.find().sort({id:-1});
        res.status(201).json(allusermang);
        console.log(allusermang);
    }
    catch(error)
    {
        alert(error);
        res.status(404).json(error);
    }
});


//////////DELETE MANAGE USER//////////

router.delete("/deletemanageuserapi/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const deleteusermng = await signupdata.findByIdAndDelete({ _id: id })
        res.status(201).json(deleteusermng);
    }
    catch (error) {
        console.log(error);
    }
});

////////////////GET EXPENSE///////////

router.get("/getexpenseapi",async(req,res)=>
{
    try{
        const allexpense = await expenseschema.find().sort({id:-1});
        res.status(201).json(allexpense);
        console.log(allexpense);
    }
    catch(error)
    {
        alert(error);
        res.status(404).json(error);
    }
})

/////////////// GET BUDGET//////////

router.get("/getbudgetapi",async(req,res)=>
{
    try{
        const allbudget = await budget.find().sort({id:-1});
        res.status(201).json(allbudget);
        console.log(allbudget);
    }
    catch(error)
    {
        alert(error);
        res.status(404).json(error);
    }
})

/////////////GET last month EXPENSES////////

router.get("/lastmonthdataadmin/:thirtydays/:currdate",async(req,res)=>
{
    try{
  
        const { thirtydays } = req.params;
        const { currdate } = req.params;
        const allexpensemonth = await expenseschema.find({date:{$gte:thirtydays,$lte:currdate}});
        res.status(201).json(allexpensemonth);
        console.log("server working")
        console.log("last month",allexpensemonth);
    }
    catch(error)
    {
        //alert(error);
        res.status(404).json(error);
    }
})

////////SEVEN DAYS////////

router.get("/sevendaysadminapi/:sevendays/:currdate",async(req,res)=>
{
    try{
  
        const { sevendays } = req.params;
        const { currdate } = req.params;
        
        const allexpensevendays = await expenseschema.find({date:{$gte:sevendays,$lte:currdate}});
        res.status(201).json(allexpensevendays);
        console.log("server working")
        console.log("last month",allexpensevendays);
    }
    catch(error)
    {
        //alert(error);
        res.status(404).json(error);
    }
})


/////CURRENT DATE SUM/////////

router.get("/currentdateadminapi/:currdate",async(req,res)=>
{
    try{

        const { currdate } = req.params;
        
        const allexpensecurrent = await expenseschema.find({date:currdate});
        res.status(201).json(allexpensecurrent);
        console.log("last month",allexpensecurrent);
    }
    catch(error)
    {
        //alert(error);
        res.status(404).json(error);
    }
})


//////////DELETE MANAGE USER//////////

router.delete("/deletemanageuserapi/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const deleteusermng = await signupdata.findByIdAndDelete({ _id: id })
        res.status(201).json(deleteusermng);
    }
    catch (error) {
        console.log(error);
    }

});

////////GET INDIVIDUAL USER DATA//////////

router.get("/getindivusermangapi/:id", async (req, res) => {
    try {
        const { id } = req.params;
        console.log(id);
        const indivisualusermang = await signupdata.findById({ _id: id });
        console.log(indivisualusermang);
        res.status(201).json(indivisualusermang);
    }
    catch (error) {
        console.log(error);
        res.status(422).json(error);
    }
}) 

//////////DELETE MANAGE USER//////////

router.delete("/deletemanageuserapi/:id", async (req, res) => {
    try {
        const { id } = req.params;
        console.log("delete",id)
        const deleteusermng = await signupdata.findByIdAndDelete({ _id: id })
        res.status(201).json(deleteusermng);
    }
    catch (error) {
        console.log(error);
    }
});

////GET INDIVIDIUAL USER BUDGET///////

router.get("/getuserbudgetapi/:useremail", async (req, res) => {
    try {
        const { useremail } = req.params;
        console.log(useremail);
        const indivisualuserbudget = await budget.find({ useremail:useremail});
        console.log(indivisualuserbudget);
        res.status(201).json(indivisualuserbudget);
    }
    catch (error) {
        console.log(error);
        res.status(422).json(error);
    }
}) 

///GET INDIVIDUAL USER EXPENSE//////

router.get("/getuserexpenseapi/:useremail",async(req,res)=>
{
    try{
        const {useremail} = req.params;
        const allexpense = await expenseschema.find({useremail:useremail})
        res.status(201).json(allexpense);
        console.log(allexpense);
    }
    catch(error)
    {
        alert(error);
        res.status(404).json(error);
    }
})

//PROFILE ADMIN UPDATE///

router.post("/updateadmindetails", async (req, res) => {
    const { ufirst,ulast,uabout,uemail,uphone,uaddress } = req.body;
    console.log("serverworking")
    try {
        const check=await AccountAdminSchema.findOne({uemail:uemail})
        console.log(check);
        if(check){
            res.status(401).json("email is already registered");
        }
        else{
            const newadmupdateaccount = new AccountAdminSchema({ ufirst,ulast,uabout,uemail,uphone,uaddress });
            await newadmupdateaccount.save();
            res.status(201).json(newadmupdateaccount);
            console.log(newadmupdateaccount);
        }
    }
    catch (error) {
        
        res.status(404).json(error);
    }
});


////////BLOCK THE USER/////////

router.patch("/blockuserapi/:id", async (req, res) => {
    try {
        const { id } = req.params;
        console.log(id)
        const updblockuser = await signupdata.findByIdAndUpdate(id, req.body, {
            new:true
        });
        console.log("updated");
        res.status(201).json(updblockuser);
    }
    catch (error) {
        console.log("error")
        res.status(422).json(error);
    }
})

////UNBLOCK THE USER/////////

router.patch("/unblockuserapi/:id", async (req, res) => {
    try {
       
        const { id } = req.params;
        console.log(id)
        const updblockuser = await signupdata.findByIdAndUpdate(id, req.body, {
            new:true
        });
        console.log("updated");
        res.status(201).json(updblockuser);
    }
    catch (error) {
        console.log("error")
        res.status(422).json(error);

    }
})

////////// USERMANAGE TABLE //////////

router.get("/getublockeduser", async (req, res) => {
    try {
        const blockedlist = await signupdata.find({status:0});
        console.log(blockedlist );
        res.status(201).json(blockedlist );
    }
    catch (error) {
        console.log(error);
        res.status(422).json(error);
    }
}) 

//BLOCK USERS LIST///

router.get("/getblockeduserlist", async (req, res) => {
    try {
        const { id } = req.params;
        console.log(id);
        const blockedlist = await signupdata.find({status:1});
        console.log(blockedlist );
        res.status(201).json(blockedlist );
    }
    catch (error) {
        console.log(error);
        res.status(422).json(error);
    }
}) 

////// ADMIN USER DATA (EXPENSE)/////

router.get("/adminuserexpenseapi/:email", async (req, res) => {
    try {
        const {email} = req.params;
        const admexpuser = await expenseschema.find({useremail:email});
        console.log(admexpuser);
        res.status(201).json(admexpuser);
    }
    catch (error) {
        console.log(error);
        res.status(422).json(error);
    }
})


////// ADMIN USER DATA (BUDGET)/////

router.get("/adminuserbudgetapi/:email", async (req, res) => {
    try {
        const {email} = req.params;
        const admbudguser = await budget.find({useremail:email});
        console.log(admbudguser);
        res.status(201).json(admbudguser);
    }
    catch (error) {
        console.log(error);
        res.status(422).json(error);
    }
})

//////GET ADMIN ACCOUNT DETAIL//////////

router.get("/adminaccdetails/:email", async (req, res) => {
    try {
        const {email} = req.params;
        const admdetails = await AccountAdminSchema.findOne({uemail:email});
        res.status(201).json(admdetails);
    }
    catch (error) {
        console.log(error);
        res.status(422).json(error);
    }
})








router.post("/getdefaultdata", async (req, res) => {
    const { uname, uid, pwd, email, date, status } = req.body;
    try {
        console.log(req.body);
        const defaultuserentry = await defaultentery({
            uname, uid, pwd, email, date, status
        });
        await defaultuserentry.save();
        res.status(201).json(defaultuserentry);
        console.log(defaultuserentry);
    }
    catch (error) {
        res.status(404).json(error);
    }
})
//get data from demodetails
router.get("/getdemodata", async (req, res) => {
    try {
        const userdata = await userdemo.findOne();
        res.status("201").json(userdata);
    }
    catch (error) {
        res.status(404).json(error);
    }

});


router.get("/getuser/:id", async (req, res) => {
    try {
        console.log("error")
        console.log(req.params);
        const { id } = req.params;
        const indivisualuser = await users.findById({ _id: id });
        console.log(indivisualuser);
        console.log('data fetched')
        res.status(201).json(indivisualuser);
    }
    catch (error) {
        console.log(error);
        res.status(422).json(error);
    }
})


router.post("/demo", async (req, res) => {
    const { uid, uname, email } = req.body;
    try {
        console.log(req.body)
        const adddemo = new userdemo({ uid, uname, email });//  demouser object of schema made in app.js
        console.warn('hey i am here')
        await adddemo.save(); // save function to save the data


        res.status(201).json(adddemo); // the data is saved in the databsewqs
        console.log(adddemo);

    }
    catch (error) {
        res.status(404).json(error)
    }
})

//Insert Data For Unregisterd User
router.post("/register", async (req, res) => {
    console.log(req.body);
    const { contact, email, detail } = req.body;
    if (!contact || !email || !detail) {
        req.status(404).json("Please enter your all data");
    }
    try {

        const preuser = await users.findOne({ email: email });
        console.log(preuser);
        if (preuser) {
            res.status(404).json("This user already register");
        }
        else {

            const adduser = new users({
                contact, email, detail
            });
            await adduser.save();
            res.status(201).json(adduser);
            console.log(adduser);
        }
    }
    catch (error) { res.status(404).json(error) }
});

//Get all data without any condition
router.get("/getdata", async (req, res) => {
    try {
        const userdata = await users.findOne();
        console.log(userdata);
        res.status("201").json(userdata);
    }
    catch (error) {
        res.status(404).json(error);
    }
})


//Get User Detail By Id 



router.get("/feedbackuser/:id", async (req, res) => {
    try {
        console.log(req.params);
        const { id } = req.params;
        const indivisualuser = await users.findById({ _id: id });
        console.log(indivisualuser);
        res.status(201).json(indivisualuser);
    }
    catch (error) {
        console.log(error);
        res.status(422).json(error);
    }
})
//Get user Detail By Id And Email
router.get("/getuser/:id/:email", async (req, res) => {
    try {
        console.log(req.params);
        const { id } = req.params;
        const { email } = req.params;
        const indivisualuser = await users.findOne({ _id: id }, { email: email });
        console.log(indivisualuser);
        res.status(201).json(indivisualuser);

    }
    catch (error) {
        console.log(error);
        res.status(422).json(error);
    }
})

//updateuser
// router.patch("/updateuser/:id", async (req, res) => {
//     try {
//         const { id } = req.params;
//         const updateuser = await users.findByIdAndUpdate(id, req.body, {
//             new: true
//         });
//         console.log("updated");
//         req.status(201).json(updateuser);
//     }
//     catch (error) {
//         console.log("error")
//         req.status(422).json(error);

//     }
// })
///
//delete
router.delete("/deleteuser/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const deleteuser = await users.findByIdAndDelete({ _id: id })
        res.status(201).json(deleteuser);
    }
    catch (error) {
        console.log(error);
    }

})
module.exports = router;