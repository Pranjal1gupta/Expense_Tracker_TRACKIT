import React, { useEffect, useState } from 'react'
import useric from '../Home/media/useric.gif';
import Sidenav from './Sidenav';


const Accoutnupdate = () => {

  const email=localStorage.getItem("email");

    const [inpacc,setacc] = useState({
        ufirst:"",
        ulast:"",
        uabout:"",
        uemail:email,
        uphone:"",
        uaddress:""
    })

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
        localStorage.setItem("username",sdata.uname)
        setuserdata(sdata);
        console.log(sdata)
        console.log("Data has been retrive");
       }
    }

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
            const accupdate = await fetch("/updateprofile",{
                method:"POST",
                headers:{
                    "Content-Type":"application/json"
                },
                body:JSON.stringify({
                    ufirst,ulast,uabout,uemail,uphone,uaddress
                })
            });
            console.log(inpacc)
            const profile = await accupdate.json();
            if(accupdate.status===201)
            {
                alert("Profile updated");
                console.log();
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
        <h5 style={{"color":"#5870c7"}}>This is your report of expenses. It will give you details of everything.</h5>
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
    <p style={{}}><label>Username</label> 
  <input style={{"width":"100%"}} class="w3-input w3-border" type="text" disabled value={getuserdata.uname}/></p>
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
  <p ><label>Email *</label>
  <input style={{"width":"100%"}} class="w3-input w3-border " value={getuserdata.email} type="email" disabled/></p>
  <p ><label>Phone number *</label>
  <input style={{"width":"100%"}} class="w3-input w3-border" value={inpacc.uphone} onChange={setprofile} name="uphone" type="text" placeholder='phone number'/></p>
  <p ><label>Address(optional)</label>
  <input style={{"width":"100%"}} class="w3-input w3-border " value={inpacc.uaddress} onChange={setprofile} name="uaddress" type="textarea" placeholder='address'/></p>  
  <span>This account was created on {getuserdata.date}</span><br/><br/>

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
