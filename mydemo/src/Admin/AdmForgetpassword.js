import React from 'react'
import "./admin.css"
import forgetpwdimg from '../Home/media/admforgetpass.png';
import forgetimg from '../Home/media/admforgetpasstop.png';
import { useNavigate } from 'react-router-dom';

const AdmForgetpassword = () => {

    const history=useNavigate();

    const forgetpass=()=>{
        alert("Password Reset..")
        history("/")
    }

  return (
    <>
    <div class="admloginback">
    <div>
      <p class="exptracker">EXPENSE TRACKER</p>
    </div>
<div class="container admsignupform">
                <div class="forgetpasscar w3-panel-forgetpass w3-panel w3-hover-shadow w3-round-xxlarge w3-card-2 ">
                    <br></br>
                    <div class="admheading">
                    <img src={forgetimg} style={{"height":"80px","width":"80px"}}/>
                        <h1 style={{"font-weight":"655"}} >Forget Password</h1>
                        <h5> Recover your password here</h5>
                    </div>
                    <br></br>
                    <form class="frogetform">
                        <div class="form-group">
                            <label class="adminplabel" for="exampleInputEmail1">Email address</label>
                            <br></br>
                            <span><i class="fa fa-envelope-o" style={{"fontSize":"20px","color":"white"}}></i></span> &nbsp;&nbsp;  <input class="adminp" placeholder="name@example.com" type="email" id="exampleInputEmail1" required/>
                        </div>
                        <div class="spacing">
                        <label class="adminplabel" for="pwd">Password </label><br/>
                                <div style={{"width":"88%"}} class="input-group inp" id="show_hide_password">   
                                <span><i class="fa fa-key" style={{"fontSize":"20px","paddingTop":"8px","color":"white"}}></i></span> &nbsp;&nbsp;&nbsp;
                                <input class="adminp" type="password" name="pwd" placeholder="Password" required />
                                <div style={{"width":"8%"}} class="input-group-addon">
                                <a href=""><i class="fa fa-eye-slash" aria-hidden="true" style={{"fontSize":"17px","paddingTop":"3px"}} ></i></a>
                                </div>
                                </div>
                            </div>
                            <br />
                    
                            <div class="admimgforgetpwd">
                                <img src={forgetpwdimg}/>
                            </div>
                            <br />
                        <div class="fgt">
                            <button class="w3-button  w3-round-xxlarge w3-hover-shadow admforgetbtn" onClick={forgetpass}>Change Password</button>
                        </div>
                        
                    </form>
                </div>
            </div>
            </div>
    </>
  )
}

export default AdmForgetpassword