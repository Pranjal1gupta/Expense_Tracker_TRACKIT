import React from 'react'
import './styleLSF.css'

import forgetpwdimg from './media/frogetpass.jpg';
import Navbar from './Navbar';
import { useNavigate } from 'react-router-dom';

const Forgetpassword = () => {

    const history=useNavigate();

    const forgetpass=()=>{
        alert("Password Reset..")
        history("/login")
    }

  return (
    <>
    <Navbar/>
    <div class="bgforgetpass">
<div class="topheading w3-center">
    <h1 style={{"font-size":"40px"}}><b>Forgot Password</b></h1>
    <h3>Don't worry if you forgot your password, enter your email and you can reset it.</h3>
</div>
<div class="container signupform">
                <div class="forgetpasscard w3-panel-forgetpass w3-panel w3-hover-shadow w3-round-xlarge w3-card-2 ">
                    <br></br>
                    <div class="heading">
                    <i style={{"font-size":"50px", color:"#2a6dd9"}} class='fas'>&#xf502;</i>
                        <h1 style={{"font-weight":"655"}} >Forget Password</h1>
                        <h5> Recover your password here</h5>
                    </div>
                    <br></br>
                    <form>
                        <div class="form-group">
                            <label class="inplabel" for="exampleInputEmail1">Email address</label>
                            <br></br>
                            <span><i class="fa fa-envelope-o"></i></span> &nbsp;&nbsp;  <input class="inp" placeholder="name@example.com" type="email" id="exampleInputEmail1" required/>
                        </div>
                        <div class="spacing">
                        <label class="inplabel" for="pwd">Password </label><br/>
                                <div style={{"width":"88%"}} class="input-group inp" id="show_hide_password">   
                                <span><i class="fa fa-key"></i></span> &nbsp;&nbsp;&nbsp;
                                <input class="inp" type="password" name="pwd" placeholder="Password" required />
                                <div style={{"width":"7%"}} class="input-group-addon">
                                <a href=""><i class="fa fa-eye-slash" aria-hidden="true"></i></a>
                                </div>
                                </div>
                            </div>
                            <br />
                    
                            <div class="imgforgetpwd">
                                <img src={forgetpwdimg}/>
                            </div>
                            <br />
                        <div class="signup">
                            <button class="w3-bar  w3-border w3-round-xxlarge w3-hover-shadow signupbutton" onClick={forgetpass}>Change Password</button>
                        </div>
                        
                    </form>
                </div>
            </div>
            </div>
    </>
  )
}

export default Forgetpassword