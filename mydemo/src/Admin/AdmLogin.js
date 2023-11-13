import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import "./admin.css"
import loginimg from '../Home/media/adminlogin.png';
import loginimgside from '../Home/media/admloginside.png';


const AdmLogin = () => {

    const history = useNavigate();
    const[getloginad,setloginad] = useState({
        adminemail:"",
        adminpwd:""
    });

    const loginadmin=(e)=>{
        console.log(e.target.value);
        const {name,value}=e.target;
        setloginad((preval)=>{
            return{
                ...preval,
                [name]:value
            }
        })
    }



    const loginsubmitadmin=async(e)=>
    {
        e.preventDefault();
        const {adminemail,adminpwd}=getloginad;
        if(adminemail === "" || adminpwd=== null)
        {
            alert("Please enter your registered email");
        }
        else if (adminemail==="" || adminpwd===null)
        {
            alert("Please enter your password");
        }
        else{
            const loginadmindata=await fetch("/loginadminapi",{
                method:"POST",
                headers:
                {
                    "Content-Type":"application/JSON"
                },
                body:JSON.stringify({
                    adminemail,adminpwd
                })
            });
            const loginadminresp=await loginadmindata.json();
            console.log(loginadminresp);

            if(loginadmindata.status===200)
            {
                localStorage.setItem("adminemail",loginadminresp.adminemail);
                alert("Login Successfull !!")
                history("/dashboard")
                // history("/budget",{state:{id:getlogin.email}})
                // history("/expenses",{state:{id:getlogin.email}})
            }
            else if(loginadmindata.status===201)
            {
                alert("Incorrect Password !!");
            }
            else if(loginadmindata.status===401)
            {
                alert("Email is not registered !!");
            }
            else{
                alert("Something went wrong !!!")
            }
        }
    }
    

  return (
    <>

<div class="admloginback">
    <div>
        <p class="exptracker">EXPENSE TRACKER</p>
    </div>
    <div class="container admlogform">
                <div class=" w3-panel-login w3-panel w3-round-xxlarge w3-hover-shadow  w3-card-2">
                    <br></br>
                    <div class="admheading">
                    <img src={loginimg} style={{"height":"80px","width":"80px"}}/>
                        <h1 style={{"font-weight":"655","fontSize":"45px","letterSpacing":"2px","marginTop":"-5px"}}>Login</h1>
                        <h4>Login to your account</h4>
                    </div>
                    <div class="">
                        <form>

                            <div style={{"padding-top":"30px"}}>
                                <label class="adminplabel" for="fname">Email</label><br />
                                <span><i class="fa fa-envelope-o" style={{"fontSize":"20px","color":"white"}}></i></span> &nbsp;&nbsp;
                                <input class="adminp" type="text" onChange={loginadmin}  name="adminemail" placeholder="Email or Username" required />
                            </div>
                            <br />

                            <div class="spacing">
                                <label class="adminplabel" for="pwd">Password </label><br/>
                                <div style={{"width":"88%"}} class="input-group inp" id="show_hide_password">   
                                <span><i class="fa fa-key" style={{"fontSize":"20px","paddingTop":"8px","color":"white"}}></i></span> &nbsp;&nbsp;&nbsp;
                                <input class="adminp" type="password" onChange={loginadmin} name="adminpwd" placeholder="Password" required />
                                <div style={{"width":"8%"}} class="input-group-addon">
                                <a href=""><i class="fa fa-eye-slash" style={{"fontSize":"17px","paddingTop":"3px"}} aria-hidden="true"></i></a>
                                </div>
                                </div>
                            </div>
                            <br />
                            <br/>
                            
                            <br />
                            <div class="admimglogin">
                                <img src={loginimgside}/>
                            </div>
                            <div class="login">
                                <button type="submit" onClick={loginsubmitadmin} class="w3-button w3-round-xxlarge w3-hover-shadow admloginbtn">Login</button>
                            </div>

                            <div class="forgetpassadm">
                                <h4><Link to="admforgetpassword">Forget password?</Link></h4>
                            </div>

                        </form>
                    </div>
                </div>
            </div>
            </div>
    </>
  )
}

export default AdmLogin