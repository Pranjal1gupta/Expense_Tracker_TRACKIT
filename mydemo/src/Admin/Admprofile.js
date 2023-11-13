import React , { useEffect, useState } from 'react'
import AdmSidenav from './AdmSidenav';
import adminicon from '../Home/media/adminicon.gif'
import { Link } from 'react-router-dom';

const Admprofile = () => {

    const email=localStorage.getItem("adminemail");
    console.log(email);
    const [getadmdetails,setadmdetails]=useState([]);

    const accdetails = async () => {
        const admindetails = await fetch(`/adminaccdetails/${email}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json"
          }
        })
        const addetails = await admindetails.json();
        console.log(addetails);
        if (!addetails || admindetails.status === 404) {
          console.log("error")
        }
        else {
          setadmdetails(addetails);
          console.log("usestate data",getadmdetails)
          console.log(addetails)
          console.log("Data has been retrive");
         }}
         useEffect(()=>
         {
            accdetails();
         })

  return (
    <>
  <div style={{"marginLeft":"15%"}}><AdmSidenav/></div>
  <div style={{"margin-left":"16%","marginTop":"-10px"}} >
  <div class="container">
        <div class="row"></div>
        <Link to="/accountadm">
        <i style={{"font-size":"28px","float":"right","color":"red"}} class="fa" data-toggle="tooltip"  title="Close">&#xf00d;</i>
        </Link>
        <div class="col-sm-1">
        <img src={adminicon} style={{"height":"85px","width":"85px","marginTop":"30px"}}/>
        </div>
      <div class="col-sm-11" style={{"paddingLeft":"30px"}}>
        <h1 style={{"fontWeight":"bold","color":"#5870c7"}}>Welcome back Admin </h1>
        <h5 style={{"color":"#5870c7"}}>This is your profile.</h5>
        </div>
        </div>
   <div class="container">
    <div class="row">
        <div class="col-sm-12">
            <div  class="w3-hover-shadow w3-round-xxlarge w3-panel w3-card-2" style={{"paddingTop":"20px","paddingBottom":"20px","paddingLeft":"20px"}}>
              <div >
            <div class="admin-users-profile">
                      <h4 style={{"color":"#a16fbf","fontSize":"25px","fontWeight":"650","letterSpacing":"1px"}}>BASIC INFORMATION</h4>
                      <h4>Username : {getadmdetails.ufirst}&nbsp;&nbsp;{getadmdetails.ulast}</h4>
                      <h4>Email : {getadmdetails.uemail}</h4> 
                      <h4>About : {getadmdetails.uabout}</h4>
                      </div>
                      <br></br>
                      <div class="admin-users-profile">
                      <h4 style={{"color":"#a16fbf","fontSize":"25px","fontWeight":"650","letterSpacing":"1px"}}>CONTACT INFORMATION</h4>
                      <h4>Phone : {getadmdetails.uphone}</h4> 
                      <h4>Address : {getadmdetails.uaddress}</h4>               
                      </div>
            </div>
            </div>
        </div>
    </div>
   </div>
   </div>
   </>
  )
}

export default Admprofile