import React, { useEffect, useState } from 'react'
import './feedback.css'
import Sidenav from "./Sidenav";
import useric from '../Home/media/useric.gif';
import UserActions from '../Admin/UserActions';

const Feedback = () => {

  const username=localStorage.getItem("feedusername")
  console.log(username);

  const [getfeedback,setfeedback] = useState({
    op1:"",
    op2:"",
    op3:"",
    op4:"",
    op5:"",
    op6:"",
    op7:"",
    op8:"",
    op9:"",
    op10:"",
    features:"",
    feedemail:"",
    uname:username,
    date:Date()
  });

  const email=localStorage.getItem("email");

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
      localStorage.setItem("feedusername",sdata.uname)
      setuserdata(sdata);
      console.log(sdata)
      console.log("Data has been retrive");
     }
  }

  const feedback=(e)=>{
    console.log(e.target.value);
    const {name,value}=e.target;
    setfeedback((preval)=>{
      return{
        ...preval,
        [name]:value
      }
    })
  }
  
  const addfeedback=async(e)=>{
    e.preventDefault();
    const{op1,op2,op3,op4,op5,op6,op7,op8,op9,op10,features,feedemail,uname,date}=getfeedback;
    if(feedemail === null){
      alert("Please enter your budget category")
    }
    else{
      const feedfetch=await fetch("/getfeedbackapi",{
        method:"POST",
        headers:{
          "Content-Type":"application/JSON"
        },
        body: JSON.stringify({
          op1,op2,op3,op4,op5,op6,op7,op8,op9,op10,features,feedemail,uname,date
        })
      });
      const insertfeedback=await feedfetch.json();
      console.log(insertfeedback);
      if(!insertfeedback || feedfetch.status===404){
        alert("Error");
        console.log("error");
      }
      else{
        //viewbudget();
         alert("FEEDBACK SENT");
        console.log("feedback inserted");
      }
    }
  };

  const [getloginemail,setloginemail]=useState();

  useEffect(()=>{
    var logindata=sessionStorage.getItem("logindata");
    setloginemail(logindata);
    getsignup();
  },[]);
  
  return (
    <>
    <div style={{"marginLeft":"15%"}}><Sidenav/></div>
    <div style={{"marginLeft":"17%","marginTop":"0px"}}>

    <div class="container">
        <div class="row"></div>
        <div class="col-sm-1">
        <img src={useric} style={{"height":"82px","width":"86px","marginTop":"10px"}}/>
        </div>
      <div class="col-sm-11" style={{"paddingLeft":"30px"}}>
        <h1 style={{"fontWeight":"bold","color":"#5870c7"}}>Welcome back <span style={{"textTransform":"uppercase"}}>{getuserdata.uname}</span></h1>
        <h5 style={{"color":"#5870c7"}}>This is your feedback. Please tell us about your experience.</h5>
        </div>
        </div>

    <div class="container">
      <div class=" feedback w3-round-xlarge w3-card-2 w3-hover-shadow" >
        <center>
      <h3>How likely are you to recommend our services to your friends or family ?</h3>
  <label>
  <input onChange={feedback} value={getfeedback.op1} type="radio" name="op1"/>
  <span>1</span>
</label>
<label>
  <input   type="radio" name="op2"/>
  <span>2</span>
</label>
<label>
  <input   type="radio" name="op3"/>
  <span>3</span>
</label>
<label>
  <input   type="radio" name="op4"/>
  <span>4</span>
</label>
<br></br>
<label>
  <input type="radio" name="op5"/>
  <span>5</span>
</label>
<label>
  <input  type="radio" name="op6"/>
  <span>6</span>
</label>
<label>
  <input  type="radio" name="op7"/>
  <span>7</span>
</label>
<label>
  <input   type="radio" name="op8"/>
  <span>8</span>
</label>
<br></br>
<label>
  <input   type="radio" name="op9"/>
  <span>9</span>
</label>
<label>
  <input  type="radio" name="op10"/>
  <span style={{"margin-left":"-6px"}}>10</span>
</label>
<br></br>
<div>
<span class="unlikely">1-Extremely unlikely</span> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; <span class="unlikely"> 10-Extremely likely</span>
</div>


<br></br>
<div class="quesfeedback form-group">
    <label for="exampleFormControlTextarea1">What features can we add to improve?</label>
    <textarea onChange={feedback}  value={getfeedback.features} name="features" class="form-control" id="exampleFormControlTextarea1" rows="3"></textarea>
  </div>
  <div class="quesfeedback form-group">
    <label for="exampleFormControlInput1">Email (optional)</label>
    <input onChange={feedback} value={getfeedback.feedemail}  name="feedemail" type="email" class="form-control" id="exampleFormControlInput1" placeholder="name@example.com"/>
  </div>
  <button onClick={addfeedback} class="w3-button w3-border w3-round-large w3-hover-shadow feedbtn" >Send</button>
  </center>
  </div>
  </div>
  
  </div>
    </>
  )
}

export default Feedback