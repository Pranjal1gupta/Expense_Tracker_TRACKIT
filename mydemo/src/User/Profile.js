import React, { useEffect, useState } from 'react'
import useric from '../Home/media/useric.gif';
import Sidenav from './Sidenav';

const Profile = () => {

    const email=localStorage.getItem("email");
    const [getuserdata, setuserdata] = useState([]);
    const [getuserdetails,setuserdetails]=useState([]);
    const [getdate,setdate]=useState(null);

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
      datefunction();
     }
  }

  const accdetails = async () => {
    const userdetails = await fetch(`/accdetails/${email}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json"
      }
    })
    const sdetails = await userdetails.json();
    console.log(sdetails);
    if (!sdetails || userdetails.status === 404) {
      console.log("error")
    }
    else {
      setuserdetails(sdetails);
      console.log("usestate data",getuserdetails)
      console.log(sdetails)
      console.log("Data has been retrive");
     }}
  // const joindate=getuserdata.date.substring(0,10);

  const datefunction=async()=>{
    const jdate=getuserdata.date.substring(0,10);
    console.log(jdate);
    localStorage.setItem("date",jdate);
  }

  const date=localStorage.getItem("date");

  // const getjdate=getuserdata.date;
  // const jdate = getjdate.substring(0,10);
  // console.log(jdate)
  
  useEffect(()=>{
    
    getsignup();
    accdetails();
  },[]);

  return (
    <>
        <div style={{"marginLeft":"15%"}}><Sidenav/></div>
    <div style={{"marginLeft":"17%","marginTop":"0px"}}>
      
        <div class="container">
            <div class="row">
                <div class="col-sm-12">
                    <div>
                        <h3 style={{"float":"right","color":"green"}}><i style={{"fontSize":"24px"}} class="fa">&#xf02e;</i><span>&nbsp;PROFILE</span></h3>
                    </div>
                </div>
            </div>
        <div class="row" style={{"marginTop":"10px"}}>
            <div class="col-sm-4">
                <img src={useric} style={{"height":"190px","width":"200px","marginTop":"10px","marginLeft":"60px"}}/>
                <center>
                <h2 style={{"textTransform":"uppercase","letterSpacing":"2px","color":"#a16fbf","fontWeight":"700","fontSize":"38px","marginTop":"20px"}}>{getuserdata.uname}</h2>
                </center>
                <div class="w3-round-xlarge w3-card-2 w3-hover-shadow" style={{"padding":"10px","marginTop":"40px"}}>
                    <h3 style={{"fontWeight":"600"}}>First Name : <span style={{"color":"#5870c7"}}>{getuserdetails.ufirst}</span></h3>

                </div>
                <div class="w3-round-xlarge w3-card-2 w3-hover-shadow" style={{"padding":"10px","marginTop":"20px"}}>
                    <h3 style={{"fontWeight":"600"}}>Last Name : <span style={{"color":"#5870c7"}}>{getuserdetails.ulast}</span></h3>
                </div>
                <div class="w3-round-xlarge w3-card-2 w3-hover-shadow" style={{"padding":"10px","marginTop":"20px"}}>
                 
                <h3 style={{"fontWeight":"600"}}>Joined On : <span style={{"color":"#5870c7","width":"10px"}}>{date}</span></h3>
                </div>
            </div>
            <div class="col-sm-8">
            <div class="w3-round-xlarge w3-card-2 w3-hover-shadow" style={{"padding":"10px","marginTop":"20px","marginLeft":"100px"}}>
                <h3 style={{"fontWeight":"600"}}>Email : <span style={{"color":"#5870c7"}}>{getuserdetails.uemail}</span></h3>
                </div>
                <div class="w3-round-xlarge w3-card-2 w3-hover-shadow" style={{"padding":"10px","marginTop":"20px","marginLeft":"100px"}}>
                <h3 style={{"fontWeight":"600"}}>Phone No : <span style={{"color":"#5870c7"}}>{getuserdetails.uphone}</span></h3>
                </div>
                <div class="w3-round-xlarge w3-card-2 w3-hover-shadow" style={{"padding":"10px","marginTop":"20px","marginLeft":"100px","height":"200px"}}>
                <h3 style={{"fontWeight":"600"}}>About : <span style={{"color":"#5870c7"}}>{getuserdetails.uabout}</span></h3>
                </div>
                <div class="w3-round-xlarge w3-card-2 w3-hover-shadow" style={{"padding":"10px","marginTop":"20px","marginLeft":"100px","height":"135px"}}>
                <h3 style={{"fontWeight":"600"}}>Address : <span style={{"color":"#5870c7"}}>{getuserdetails.uaddress}</span></h3>
                </div>
            </div>
        </div>
        </div>
        </div>
    </>
  )
}

export default Profile