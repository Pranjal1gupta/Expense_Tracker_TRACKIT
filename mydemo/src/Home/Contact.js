import React, { useState } from 'react'
import './styleLSF.css'
import Footer from './Footer'
import './contact.css';
import Navbar from './Navbar'
import contact from './media/contct.gif';
import faq from './media/FAQ.gif'


const Contact = () => {
  const [getmsg,setmsg] = useState({
    uname:"",
    email:"",
    phn:"",
    msg:""
  });

  const contactuser =(e)=>{
    console.log(e.target.value);
    const{name,value} = e.target;
    setmsg((preval)=>{
      return{
        ...preval,
        [name]:value
      }
    })
  }

  const addcontactmsg = async (e)=>
  {
    e.preventDefault();
    const {uname,email,phn,msg} = getmsg;
    if(uname === null || email === null || msg === null)
    {
      alert("Please give your details");
    }
    else {
      const contact = await fetch("/addcontactapi",
          {
              method: "POST",
              headers: {
                  "Content-Type": "application/JSON"
              },
              body: JSON.stringify({
                  uname,email,phn,msg
              })
          });

      const cinserted = await contact.json();
      console.log(cinserted);
      if (!cinserted || contact.status === 404) {
          alert("Something Went Wrong !!");
          console.log("error");
      }
      else {
       
          alert("Your data have been saved..! We will get to you soon..");
          console.log("Data inserted");
      }
  }
  } 
  return (
    <>
    <Navbar/>
    <div class="contactback"></div>
<div class="contacthead">
  <span class="contactBg">CONTACT US </span>
</div>

{/* ///////////CONTACT FORM///////////////// */}

<div class="">
<div class="row">
<div class="col-sm-8 getintouch">
 <h1 class="gethead contactheading">GET IN TOUCH!!</h1>
  <br></br>
  <br></br>
  <h4 style={{"font-weight":"600"}}>If you have an questions or require further
    <br></br> information , please do not hesitate to contact us at
    <br></br> anytime</h4>
    </div>
    <div class="col-sm-4">
    <img class="phoneimg" src={contact}></img>
    </div>
 
 </div>

   <center> <h1 class="contactheading">How can we help you?</h1></center>
    <div class="container">
    <div class="row">
      <div class="col-sm-12">
    <div class="contactform  w3-panel">

    <form >
    <div class="form-group row">
      <div class="col-sm-1">
    <i style={{"font-size":"32px"}} class="w3-xxlarge fa fa-user"></i>  
    </div>
    <div class="col-sm-10">
    <input placeholder='Name' type="text" name="uname" value={getmsg.uname} onChange={contactuser} class="form-control" id="inputPassword3"/>
      
    </div>
   
  </div>
  <div class="form-group row"> 
  <div class="col-sm-1">
  <i  style={{"font-size":"32px"}} class="fa fa-envelope-o"></i> 
    </div>
    <div class="col-sm-10">
      <input required placeholder='Email' type="email" name="email" value={getmsg.email}  onChange={contactuser}  class="form-control" id="inputEmail3"/>
    </div>
  </div>
  <div class="form-group row">
  <div class="col-sm-1">
  <i style={{"font-size":"32px"}} class="w3-xxlarge fa fa-phone"></i>
    </div>

    <div class="col-sm-10">
      <input placeholder='Phone' type="text" name="phn" value={getmsg.phn} onChange={contactuser} class="form-control" id="inputPassword3"/>
    </div>
  </div>
  <div class="form-group row">
  <div class="col-sm-1">
  <i style={{"font-size":"32px"}} class="w3-xxlarge fa fa-pencil"></i>
    </div>
  
    <div class="col-sm-10">
      <input required placeholder='Message' type="text" name="msg" value={getmsg.msg} onChange={contactuser} class="form-control" id="inputPassword3" />
    </div>
  </div>
  <br>
  </br>
    <div>
    <p><button style={{"margin-left":"38%","marginBottom":"2%","paddingLeft":"35px","paddingRight":"35px","paddingTop":"8px","paddingBottom":"8px","fontSize":"18px"}} class="w3-button w3-brown w3-round-xlarge" onClick={addcontactmsg}>Submit</button></p>
    </div>
</form>
</div>
</div>
 </div>
 </div>

{/* /////////////FAQ///////////// */}


<div class="">
{/* <h1  class="faq">F&nbsp;A&nbsp;Q</h1> */}
<div class="container">
  <div class="row">
    <div class="col-sm-12">
<center><img class="faq" src={faq}></img></center>
</div>
</div>
</div>
<div class="container">
<div class="row">
  <div class="col-sm-12">
 <div class=" faqacc">
<div class="accordion" id="accordionExample">
  <div class="card">
    <div class="card-header" id="headingOne">
      <h2 class="mb-0">
        <button class="btn  btn-block text-left" type="button" data-toggle="collapse" data-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
        <h5><span class="ques">Q :- </span>How to add mileage as expense?</h5>
        </button>
      </h2>
    </div>

    <div id="collapseOne" class="collapse show" aria-labelledby="headingOne" data-parent="#accordionExample">
      <div class="card-body">
      <h6    style={{"color":"grey"}}><span class="ans">A :- </span>Go to to add exoense page and then add a new expense.</h6>   
      </div>
    </div>
  </div>
  <div class="card">
    <div class="card-header" id="headingTwo">
      <h2 class="mb-0">
        <button class="btn  btn-block text-left collapsed" type="button" data-toggle="collapse" data-target="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo">
        <h5><span class="ques">Q :- </span> How to get a reminder regularly on monthly basis?</h5>  
        </button>
      </h2>
    </div>
    <div id="collapseTwo" class="collapse" aria-labelledby="headingTwo" data-parent="#accordionExample">
      <div class="card-body">
      <h6   style={{"color":"grey"}}><span class="ans">A :- </span>You can add a reminder by going to the reminder page and forsetting the reminder regularly then select the repeat duration accourding to yourself.</h6> 
      </div>
    </div>
  </div>
  <div class="card">
    <div class="card-header" id="headingThree">
      <h2 class="mb-0">
        <button class="btn  btn-block text-left collapsed collapsebtn" type="button" data-toggle="collapse" data-target="#collapseThree" aria-expanded="false" aria-controls="collapseThree">
        <h5><span class="ques">Q :- </span>How to see my monthly and yearly report?</h5>  
        </button>
      </h2>
    </div>
    <div id="collapseThree" class="collapse" aria-labelledby="headingThree" data-parent="#accordionExample">
      <div class="card-body">
      <h6  style={{"color":"grey"}}><span class="ans">A :- </span>You can see your weekly monthly and yearly report on the report page,with the help of the graphical
      representation.</h6> 
      </div>
    </div>
  </div>
  <div class="card">
    <div class="card-header" id="headingFour">
      <h2 class="mb-0">
        <button class="btn  btn-block text-left collapsed collapsebtn" type="button" data-toggle="collapse" data-target="#collapseFour" aria-expanded="false" aria-controls="collapseFour">
        <h5><span class="ques">Q :- </span>How can I compare my expenses monthwise and yearwise?</h5>  
        </button>
      </h2>
    </div>
    <div id="collapseFour" class="collapse" aria-labelledby="headingFour" data-parent="#accordionExample">
      <div class="card-body">
      <h6 style={{"color":"grey"}}><span class="ans">A :- </span>You cam see your balance sheet for your yearly expenses and the expense sheet for your monthly expenses and comparison.</h6> 
      </div>
    </div>
  </div>
</div>
</div>
</div>
<div class="col-sm-4">
  
</div>
</div>
</div>
</div>
</div>

<div style={{ "margin-top":"170px","marginBottom":"-95px"}}>
  <Footer/>
</div>
</>

  )
}

export default Contact