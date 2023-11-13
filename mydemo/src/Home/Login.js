import React, { useEffect } from 'react'
import './styleLSF.css'
import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';

import loginimg from './media/log.jpg';
import axios from 'axios';
import Navbar from './Navbar';

    
const Login = () => {

    const history=useNavigate();
    const [getlogin, setlogin] = useState({
        email: "",
        pwd: ""
    });

    const loginuser=(e)=>{
        console.log(e.target.value);
        const {name,value}=e.target;
        setlogin((preval)=>{
            return{
                ...preval,
                [name]:value
            }
        })
    }

    const loginsubmit=async(e)=>
    {
        e.preventDefault();
        const {email,pwd}=getlogin;
        if(email === "" || email=== null)
        {
            alert("Please enter your registered email");
        }
        else if (pwd==="" || pwd===null)
        {
            alert("Please enter your password");
        }
        else{
            const logindata=await fetch("/login",{
                method:"POST",
                headers:
                {
                    "Content-Type":"application/JSON"
                },
                body:JSON.stringify({
                    email,pwd
                })
            });
            const loginresp=await logindata.json();
        
            if(logindata.status===200)
            {
                localStorage.setItem("email",loginresp.email);
                alert("Login Successfull :)")
                history("/mainpage")
            
            }
            else if(logindata.status===201)
            {
                alert("Incorrect Password !!");
            }
            else if(logindata.status===400)
            {
                alert("You have been Blocked.. Please contact ADMIN"); 
            }
            else if(logindata.status===401)
            {
                alert("Email is not registered!!"); 
            }
            else{
                alert("Something went wrong !!!")
            }
        }
    }
    useEffect(() => {

      }, []);
      
      
    return (
        <>
        <Navbar/>
        <div class="bgsignup">
        <div class="topheading w3-center">
            
            <h1 style={{"font-size":"40px"}}><b>Welcome Back</b></h1>
            <h3>A beatiful and powerful system crafted specifically for savings and expenses.</h3>
            
        </div>
            <div class="container logform">
                <div class="logincard w3-panel-login w3-panel w3-round-xlarge w3-hover-shadow  w3-card-2">
                    <br></br>
                    <div class="heading">
                    <i style={{"font-size":"50px", color:"#2a6dd9"}} class='fas'>&#xf406;</i>
                        <h1 style={{"font-weight":"655"}}>Login</h1>
                        <h5>Login to your account</h5>
                    </div>
                    <div class="">
                        <form>

                            <div style={{"padding-top":"30px"}}>
                                <label class="inplabel" for="fname">Email</label><br />
                                <span><i class="fa fa-envelope-o"></i></span> &nbsp;&nbsp;
                                <input class="inp" type="text" name="email" onChange={loginuser} placeholder="Email or Username" required />
                            </div>
                            <br />

                            <div class="spacing">
                                <label class="inplabel" for="pwd">Password </label><br/>
                                <div style={{"width":"88%"}} class="input-group inp" id="show_hide_password">   
                                <span><i class="fa fa-key"></i></span>
                                 &nbsp;&nbsp;&nbsp;
                                <input class="inp" type="password" onChange={loginuser} name="pwd" placeholder="Password" required />
                                <div style={{"width":"7%"}} class="input-group-addon">
                                <a href="">
                                    <i class="fa fa-eye-slash" aria-hidden="true"></i></a>
                                </div>
                                </div>
                            </div>
                            <br />
                            <br/>
                            
                            <br />
                            <div class="imglogin">
                                <img src={loginimg}/>
                            </div>
                            <div class="login">
                                <button type="submit" onClick={loginsubmit} class="w3-bar w3-border w3-round-xxlarge w3-hover-shadow loginbutton">Login</button>
                            </div>

                            <div class="forgetpass">
                                <h4><Link to="/forgetpassword">Forget password?</Link></h4>
                            </div>

                            <div class="heading">
                                <h5 >or login with</h5>
                            </div>

                            <div class="heading">
                                <a href="" class=" btn-social btn-google">
                                    <i class="fa fa-google"></i>
                                </a>
                                &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;&nbsp; &nbsp;
                                <a href="" class=" btn-social btn-facebook">
                                    <i class="fa fa-facebook"></i>
                                </a>
                            </div>

                            <div class="bottomtxt">
                               
                            </div>
                        </form>
                    </div>
                </div>
            </div>
            </div>

            
        </>
    )
}

export default Login