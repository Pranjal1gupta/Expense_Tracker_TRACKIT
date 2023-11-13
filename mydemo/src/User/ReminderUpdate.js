import React, { useState } from 'react'
import useric from '../Home/media/useric.gif';
import Sidenav from "./Sidenav";
import {Link, useParams } from 'react-router-dom';
import { useEffect } from 'react';
import updateimg from '../Home/media/updateimg.gif';

const ReminderUpdate = () => {

  const email=localStorage.getItem("email");

  const [getloginemail,setloginemail]=useState();

const [getrem,setrem] = useState({
    remname:"",
    remdesc:"",
    email:"",
    date:"",
    repeat:""
  });

   const { id } = useParams("");

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

  const viewreminder = async(e)=>
  {

    const fetchreminder=await fetch(`/viewreminderbyidapi/${id}`,{
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
        setrem(getreminderdata)
        console.log("Data fetched ");
      }
  };

  useEffect(()=>
  {
    var logindata=localStorage.getItem("email");
    setloginemail(logindata);
    viewreminder();
    getsignup();
  },[]);

  const updatereminder = async(e)=>
  {
    e.preventDefault();
   const{remname,remdesc,email,date,repeat} = getrem;
   console.log(id)
    const fetchupdaterem=await fetch( `/updatereminderapi/${id}`,
    {
      method:"PATCH",
      headers:{
        "Content-Type":"application/JSON"
      },
      body:JSON.stringify({
        remname,remdesc,email,date,repeat
      })
    });
    const updateremdata=await fetchupdaterem.json();
    console.log(updateremdata)

      if(fetchupdaterem.status=== 422 || !updateremdata){
        alert("Fill the data")
      }
      else{
       alert("Reminder Updated")
        console.log("Reminder updated");
      }
  };


  return (

    <>

    <div style={{"marginLeft":"15%"}}><Sidenav/></div>
    <div style={{"marginLeft":"17%","marginTop":"0px"}}>
      
        <div class="container">
        <div class="row"></div>
        <Link to="/reminder">
        <i style={{"font-size":"28px","float":"right","color":"red"}} class="fa" data-toggle="tooltip"  title="Close">&#xf00d;</i>
        </Link>
        <div class="col-sm-1">
        <img src={useric} style={{"height":"82px","width":"86px","marginTop":"10px"}}/>
        </div>
      <div class="col-sm-11" style={{"paddingLeft":"30px","marginTop":"-26px"}}>
        <h1 style={{"fontWeight":"bold","color":"#5870c7"}}>Welcome back <span style={{"textTransform":"uppercase"}}>{getuserdata.uname}</span></h1>
        <h5 style={{"color":"#5870c7"}}>Easily update your Reminder..</h5>
        </div>
        </div>

        <div class="container">
            <div class="row">
              <div class="col-sm-7">
              <div class="w3-hover-shadow w3-round-xxlarge w3-panel w3-card-2" style={{"padding":"15px","width":"500px"}}>
             <hr class="hrbudget"></hr>
              <h2 style={{"textAlign":"center","letterSpacing":"2px","paddingBottom":"8px","fontSize":"27px"}}><b>UPDATE REMINDER</b></h2>
              <hr class="hrbudget"></hr>
              <form  >
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

<button class="w3-button w3-green w3-border w3-round-large w3-hover-red budgetsavebtn" onClick={updatereminder}>Update</button>
{/* <button  class="w3-button w3-green w3-border w3-round-large w3-hover-red expbtn" > <i class="fa">&#xf067;</i> Add More</button> */}
</form>           
 </div>
              </div>
              <div class="col-sm-5">
              <img style={{"height":"450px","width":"380px","marginTop":"50px"}} src={updateimg}></img>
              </div>
            </div>
                
        </div>
        </div>


    </>

  )
}

export default ReminderUpdate