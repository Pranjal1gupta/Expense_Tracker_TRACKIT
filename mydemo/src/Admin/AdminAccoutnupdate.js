import React, { useEffect, useState } from 'react'
import AdmSidenav from './AdmSidenav';
import adminicon from '../Home/media/adminicon.gif'


const Accoutnupdate = () => {

  const email=localStorage.getItem("adminemail");
  console.log(email)

    const [inpacc,setacc] = useState({
        admfirst:"",
        ulast:"",
        uabout:"",
        uemail:email,
        uphone:"",
        uaddress:""
    })


    const setprofile=(e)=>{
        console.log(e.target.value);
        const {name,value}=e.target;
        setacc((preval)=>
        {
            return{
                ...preval,
                [name]:value
            }
        })
    }
    const addacc = async(e)=>{
        e.preventDefault();
        const{ufirst,ulast,uabout,uemail,uphone,uaddress} = inpacc;
        if(ufirst === null && ulast === null && uemail === null && uphone===null)
        {
            alert("Please enter all values");
        }
        else
        {
            const accupdate = await fetch("/updateadmindetails",{
                method:"POST",
                headers:{
                    "Content-Type":"application/json"
                },
                body:JSON.stringify({
                    ufirst,ulast,uabout,uemail,uphone,uaddress
                })
            });
            const profile = await accupdate.json();
            if(accupdate.status===201)
            {
                alert("Profile updated");
                console.log(profile);
            }
            else if(accupdate.status===401)
            {
                alert("Email already exists");
            }
            else{
              alert("something went wrong")
            }
        }
    }


    useEffect(()=>{
      // var logindata=sessionStorage.getItem("logindata");
      // setloginemail(logindata);
    },[]);
    
  return (
    <>
    
    <div style={{"marginLeft":"15%"}}><AdmSidenav/></div>
    <div style={{"marginLeft":"17%","marginTop":"0px"}}>
        
    <div class="container">
        <div class="row"></div>
        <div class="col-sm-1">
        <img src={adminicon} style={{"height":"85px","width":"85px","marginTop":"10px"}}/>
        </div>
      <div class="col-sm-11" style={{"paddingLeft":"30px"}}>
        <h1 style={{"fontWeight":"bold","color":"#5870c7"}}>Welcome back Admin</h1>
        <h5 style={{"color":"#5870c7"}}>This is your Account page. You can update your Profile.</h5>
        </div>
        </div>

<div class="container">
        <form class="w3-container w3-round-xxlarge w3-card-2 w3-hover-shadow  accform">
            <div class="container">
 <div style={{  "padding-top":"10px"}}>
   <center>
    <h2 style={{"fontSize":"35px","letterSpacing":"1.5px","color":"#5870c7"}}> <i class='fas accupdicon'>&#xf4fe;</i>   <b>Account</b>
     </h2>
     </center>
    
  {/* <i style={{"font-size":"130px","margin-left":"80px"}} class='far'>&#xf2bd;</i> */}
  <h3 style={{"paddingTop":"5px","color":"#a16fbf"}}><b>Profile</b></h3>
  <h6 style={{}}>This information will be displayed publically so be careful what you share.</h6>
  </div>
  
  <div class="row">
    <div class="col-sm-6">
    <p style={{ }}><label>First Name *</label>
        <input style={{"width":"100%"}} class="w3-input w3-border " value={inpacc.ufirst} onChange={setprofile} name="ufirst" type="text" placeholder='first name'/></p>
    </div>
    <div class="col-sm-6">
    <p style={{}}><label>Last Name *</label> 
  <input style={{"width":"100%"}} class="w3-input w3-border" value={inpacc.ulast} onChange={setprofile} name="ulast" type="text" placeholder='last name'/></p>
    </div>
  </div>

  <div class="row">
    <div class="col-sm-12">
    <p ><label>Email *</label>
  <input style={{"width":"100%"}} class="w3-input w3-border " value={email} type="email" disabled/></p>
 </div>
    </div>

  <div class="row">
    <div class="col-sm-12">
    <p style={{}}><label>About(optional)</label> 
  <textarea style={{"width":"100%"}} class="w3-input w3-border" type="text" name="uabout" value={inpacc.uabout} onChange={setprofile}/></p>
  <span style={{"color":"grey"}} >Brief description about your profile..</span>
  </div>
    </div>
    </div>

<br/>
<div class="container">
<div>
    <h3 style={{"paddingTop":"5px","color":"#a16fbf"}}><b>Personal Information</b></h3>
    <h6 style={{}}>This information will be displayed publically so be careful what you share.</h6>
</div>

  <p ><label>Phone number *</label>
  <input style={{"width":"100%"}} class="w3-input w3-border" value={inpacc.uphone} onChange={setprofile} name="uphone" type="text" placeholder='phone number'/></p>
  <p ><label>Address(optional)</label>
  <input style={{"width":"100%"}} class="w3-input w3-border " value={inpacc.uaddress} onChange={setprofile} name="uaddress" type="textarea" placeholder='address'/></p>  

  <button style={{"float":"right"}} class="w3-btn accbtn w3-blue w3-large w3-green w3-round-large w3-hover-red" onClick={addacc}>Save</button>

 <button style={{"float":"right"}} class="w3-btn w3-green accbtn w3-large w3-round-large w3-hover-red">Edit</button>
  </div>
</form>
</div>
    </div>

    </>
  )
}

export default Accoutnupdate
