import React,{useEffect, useState, useRef } from 'react'
import Sidenav from "./Sidenav";
import useric from '../Home/media/useric.gif';
// import rem from "../Home/media/reminder.jpg"
import reminderimg from '../Home/media/reminder.gif'
import emailjs from '@emailjs/browser';
import { Link } from 'react-router-dom';

const Reminder = () => {

  const email=localStorage.getItem("email");
  console.log(email);

  const [getrem,setrem] = useState({
    remname:"",
    remdesc:"",
    email:"",
    date:"",
    repeat:"",
    useremail:email
  });


  const [getuserdata, setuserdata] = useState([]);

  const getsignup = async () => {
    const signupres = await fetch(`/signupdatamainpage/${email}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json"
      }
    })
    const sdata = await signupres.json();
    if (!sdata || signupres.status === 404) {
      alert("Error");
      console.log("error")
    }
    else {
      setuserdata(sdata);
      console.log(sdata)
      console.log("Data has been retrive");
     }
  }

  const[getreminderview,setreminderview]= useState([]);
  console.log(getreminderview)


  const reminder = (e)=>{
    console.log(e.target.value);
    const {name,value}=e.target;
    setrem((preval)=>{
      return{
        ...preval,
        [name]:value
      }
    })
  }

  const form = useRef();
  const sendEmail = (e) => {
    e.preventDefault();

    emailjs.sendForm('service_ubqripb', 'template_nqnpsyn', form.current, '2YkMR0fu0YaS5efRJ')
      .then((result) => {
          console.log(result.text);
          alert("message saved");
      }, (error) => {
          console.log(error.text);
      });
  };

  const addreminder=async(e)=>{
    e.preventDefault();
    const{remname,remdesc,email,date,repeat,useremail}=getrem;
    if(remname === ""){
      alert("Ops!!Please enter your Reminder name")
    }
    else if(email === ""){
      alert("Ops!!Please enter your email");
    }
    else if(date=== ""){
      alert("Ops!!Please select your reminder date")
    }
    else{
      const rem=await fetch("/reminderapi",{
        method:"POST",
        headers:{
          "Content-Type":"application/JSON"
        },
        body: JSON.stringify({
          remname,remdesc,email,date,repeat,useremail
        })
      });
      const insertrem=await rem.json();
      console.log(insertrem);
      if(!insertrem || rem.status===404){
        alert("Error");
        console.log("error");
      }
      else{
        viewreminder();
        alert("YOUR REMINDER IS SAVED SUCESSFULLY");
        console.log("Data inserted ");
        
      }
    }
  };

  const viewreminder = async(e)=>
  {
    const fetchreminder=await fetch(`/getreminderapi/${email}`,{
      method:"GET",
      headers:{
        "Content-Type":"application/JSON"
      },
    });

    const getreminderdata=await fetchreminder.json();
      console.log(getreminderdata);
      if(!getreminderdata || fetchreminder.status===404){
        alert("Error");
        console.log("error");
      }
      else{
        setreminderview(getreminderdata)
        console.log("Data fetched ");
      }
  };

  const [getloginemail,setloginemail]=useState();

  useEffect(()=>{
    var logindata=localStorage.getItem("email");
    setloginemail(logindata);
    viewreminder();
    getsignup();
  },[]);


const deletereminder = async (id)=>
  {
    const delreminder  = await fetch(`/deletereminderapi/${id}`,
    {
      method:"DELETE",
      headers:{
        "Content-Type":"application/JSON"
      }
    });

   const  deletereminderdata = await delreminder.json();
   console.log(deletereminderdata)

   if(delreminder.status === 422 || !deletereminderdata)
   {
    console.log("error");
   }else{
    alert("Reminder deleted");
    console.log("User deleted");
    viewreminder();
   }}


  return (
<>
<div style={{"marginLeft":"15%"}}><Sidenav/></div>
<div style={{"marginLeft":"17%","marginTop":"-10px"}}>

<div class="container">
        <div class="row"></div>
        <div class="col-sm-1">
        <img src={useric} style={{"height":"82px","width":"86px","marginTop":"10px"}}/>
        </div>
      <div class="col-sm-11" style={{"paddingLeft":"30px"}}>
        <h1 style={{"fontWeight":"bold","color":"#5870c7"}}>Welcome back <span style={{"textTransform":"uppercase"}}>{getuserdata.uname}</span></h1>
        <h5 style={{"color":"#5870c7"}}>This is your reminder page. Do not miss anything.</h5>
        </div>
        </div>

  <div class="container">
    <div class="row">
      <div class="col-sm-6">
<div class="w3-hover-shadow w3-round-xxlarge w3-panel w3-card-2 expenseform" style={{"padding":"15px"}}>

      <hr class="hrbudget"></hr>
        <h2 style={{"textAlign":"center","letterSpacing":"2px","paddingBottom":"8px","fontSize":"25px"}}><b>REMINDER</b></h2>
      <hr class="hrbudget"></hr>

    <form ref={form} >
  <div class="form-group expenseinp">
    <label for="exampleInputEmail1" style={{"fontSize":"17px","marginLeft":"34px","paddingBottom":"5px"}}>Reminder name *</label>
    <br></br>
    <i style={{"font-size":"22px"}} class="fa">&#xf0f3;</i>
 &nbsp;&nbsp;
 <input  required style={{ "width": "70%","padding":"3px"}} name="remname"   onChange = {reminder}   value={getrem.remname} type="text"/>
  </div>
  <div class="form-group expenseinp">
    <label for="exampleInputPassword1" style={{"fontSize":"17px","marginLeft":"34px","paddingBottom":"5px"}}>Description</label>
    <br></br>
    <i style={{"font-size":"24px"}} class="fa">&#xf0f6;</i>&nbsp;&nbsp;&nbsp;
    <textarea name="remdesc"  onChange = {reminder}   value={getrem.remdesc} style={{ "width": "70%","padding":"3px"}} rows="2" type="text"/>
  </div>
  <div class="form-group expenseinp">
    <label for="exampleInputEmail1" style={{"fontSize":"17px","marginLeft":"34px","paddingBottom":"5px"}}>Email *</label>
    <br></br>
    <i style={{"font-size":"22px"}} class="fa">&#xf003;</i>
 &nbsp;&nbsp;
 <input style={{ "width": "70%","padding":"3px"}} name="email" required  value={getrem.email} onChange={reminder} type="email"/>
  </div>
  <div class="form-group expenseinp">
    <label for="exampleInputPassword1" style={{"fontSize":"17px","marginLeft":"34px","paddingBottom":"5px"}}>Date *</label>
    <br></br>
    <i style={{"font-size":"22px"}} class="fa">&#xf073;</i>&nbsp;&nbsp;&nbsp;
    <input name="date" onChange = {reminder} value={getrem.date} style={{ "width": "70%","padding":"3px"}} type="date"/>
  </div>
  {/* <div class="dropdown dropbtn">
  <button  class="btn btn-danger dropdown-toggle " name="repeat" onChange = {reminder} value={getrem.repeat} type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
    Repeat Reminder
  </button>
  <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
    <a class="dropdown-item" href="#">10 days</a>
    <a class="dropdown-item" href="#">15 days</a>
    <a class="dropdown-item" href="#">20 days</a>
    <a class="dropdown-item" href="#">25 days</a>
    <a class="dropdown-item" href="#">30 days</a>
  </div>
</div> */}

<input type="submit" value="Send" onClick={sendEmail} class="w3-button w3-green w3-border w3-round-large w3-hover-red budgetsavebtn"></input>
</form>
</div>
</div>

<div class="col-sm-6">
{/* <img src={rem}/> */}
<img class="remimg" src={reminderimg}></img>
</div>

    </div>
  </div>

  <div class="container">

<div classs="row">
  <div class="col-sm-12">
    <h2 style={{"textAlign":"center","color":"#5870c7"}}><b>REMINDERS</b></h2>
  </div>
</div>
<div class="row">
  <div class="col-sm-12">
<div class="w3-hover-shadow w3-panel w3-card-2 w3-round-large" style={{"backgroundColor":"#5870c7"}}>
  <h2 style={{"color":"whitesmoke"}}><b>Total Number of Reminder</b><span style={{"float":"right"}} class="allamt">&nbsp;{getreminderview.length}</span></h2>
</div>
</div>
</div>

{
  getreminderview.map((element)=>
  {
    return(
      <>
      <div class="row">
  <div class="col-sm-12">
<div class=" w3-panel w3-card-2 w3-round-xlarge scolor">
<h2><i onClick={()=>deletereminder(element._id)} style={{"font-size":"30px","color":"red"}} class="fa" data-toggle="tooltip"  title="Delete">&#xf014;
</i>&nbsp;&nbsp;&nbsp;
<Link to={`/reminderupdate/${element._id}`}><i style={{"font-size":"30px","color":"blue"}} class="fa" data-toggle="tooltip"  title="Update">&#xf044;</i>
</Link>
&nbsp;&nbsp;&nbsp;{element.remname}<span style={{"float":"right"}}>
  &nbsp;{element.date}</span></h2>
</div>
</div>
</div>

      </>
    )
  })
}

</div>

</div>

</>
  )

}

export default Reminder