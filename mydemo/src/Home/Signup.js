
import React, { useEffect, useState } from 'react'
import signupimg from "./media/signup.jpg"
import './styleLSF.css';
import Navbar from './Navbar';
import { useNavigate } from 'react-router-dom';

const Signup = () => {
    const [getuserdata, setuserdata] = useState({
        uname: "",
        email: "",
        pwd: "",
        date:Date(),
        status:0,
    });

    const history=useNavigate();
 
    const[formerrors,seterrors] = useState({});

    const [getsubmit,setsubmit] = useState({});

    const signupuser = (e) => {
        console.log(e.target.value);
        const { name, value } = e.target;
        setuserdata((preval) => { 
            return {
                ...preval,
                [name]: value
            }
        })
    }

    const addusersignup = async (e) => {
        e.preventDefault();
        const { uname, email, pwd, date,status } = getuserdata;
        if (uname === "") {
           alert ("Please enter your data");
        }
        else if (email === "") {
            alert("Please enter your email")
        }
        else if (pwd === "") {
            alert("please enter your password");
        }
        else {
            const signup = await fetch("/getusersignup",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/JSON"
                    },
                    body: JSON.stringify({
                        uname, email, pwd, date,status
                    })
                });

            const inserted = await signup.json();
            console.log(inserted);
            if (!inserted || signup.status === 404) {
                alert("User already exists");
                console.log("User already exists");
            }
            else {
             
                alert("Account Successfully Created..");
                history("/login")
                console.log("Data inserted ");
            }
        }
    };

    function handlevalidation (e){
        e.preventDefault();
        seterrors(Validation(getuserdata));
        setsubmit(true);
    };

    const Validation = (values)=>{
        const errors = {}
        const email_pattern = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/
    // const pwd_pattern = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(a-zA-Z0-9){8,}$/
        if(!email_pattern.test(values.email))
        {
            errors.email = "Enter a valid email";
        }

        if(values.pwd>=8)
        {
            errors.pwd = "Your password must be of atlesat 8 characters";
        }

        return errors;
    }


    useEffect(()=>{
        console.log(formerrors);
        if(Object.keys(formerrors).length === 0 && getsubmit)
        {
            console.log(getuserdata);
        }
    },[formerrors])


    // useEffect(()=>{
    //     sessionStorage.clear();
    // },[]);

    return (
        <>
       <Navbar/>
        <div class="bgsignup">
        <div class="topheading w3-center">
            <h1 style={{"font-size":"40px"}}><b>Create an Account</b></h1>
            <h3>A beatiful and powerful system crafted specifically for expense and income tracking.</h3>
        </div>



            <div class="container signupform ">
                <div class="signupcard  w3-panel-signup w3-panel w3-round-xlarge w3-hover-shadow  w3-card-2 ">
                    <br></br>
                    <div class="heading">
                    <i style={{"font-size":"50px", color:"#2a6dd9"}} class='fas'>&#xf406;</i>
                        <h1 style={{"font-weight":"655"}}>Sign Up</h1>
                        <h5> Create your account</h5>
                    </div>
                    <br></br>
                    <form onClick={handlevalidation} >
                        
                        
                        <div class="form-group">
                            <label class="inplabelname" for="exampleInputEmail1">Enter username</label>
                            <br></br>
                            <i class="fa">&#xf2be;</i> &nbsp;&nbsp; <input class="inp" placeholder="Username" name="uname"  onChange={signupuser} value={getuserdata.uname}  type="text" required/>
                        </div>
                        <div class="form-group">
                            <label class="inplabelname" for="exampleInputEmail1">Email address</label>
                            <br></br>
                            <i class="fa">&#xf0e0;</i> &nbsp;&nbsp;  <input class="inp" placeholder="name@example.com"  name="email" onChange={signupuser}  value={getuserdata.email}  type="email" id="exampleInputEmail1" required/>
                            <small  id="emailHelp" class=" emailtxt form-text text-muted emailtext">We'll never share your email with anyone else.</small>
                        </div>
                        <p style={{color:"red"}}>{formerrors.email}</p>
                        <div class="spacing">
                        <label class="inplabel" for="pwd">Password </label><br/>
                                <div style={{"width":"88%"}} class="input-group inp" id="show_hide_password">   
                                <span><i class="fa fa-key"></i></span> &nbsp;&nbsp;&nbsp;
                                <input class="inp" type="password" name="pwd" onChange={signupuser} value={getuserdata.pwd}  placeholder="Password" required />
                                <div style={{"width":"7%"}} class="input-group-addon">
                                <a href=""><i class="fa fa-eye-slash" aria-hidden="true"></i></a>
                                </div>
                                </div>
                            </div>
                            <p style={{color:"red"}}>{formerrors.pwd}</p>
                            <br/>
                            <br />
                            <div class="imgsignup"> 
                                <img  src={signupimg}/>
                            </div>
                        <div class="signup">
                            <button  class="w3-bar  w3-border w3-round-xxlarge signupbutton w3-hover-shadow" onClick={addusersignup}>Sign Up</button>
                        </div>
                        <h5 class="heading">or sign in with </h5>
                        <div class="heading">
                        <a href="#" class=" btn-social btn-google">
                            <i class="fa fa-google"></i>
                        </a>
                        &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;&nbsp; &nbsp;&nbsp;
                        <a href="#" class=" btn-social btn-facebook">
                            <i class="fa fa-facebook"></i>
                        </a>                     
                        </div>
                        
                    </form>
                </div>
            </div>
            </div>

        </>
    )
}

export default Signup