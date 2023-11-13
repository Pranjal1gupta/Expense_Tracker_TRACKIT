import React from 'react'
import Footer from './Footer';
import Imgslider from './Imgeslider';
import './footer.css'
import imgexp from './media/gifexpense.gif';
import imgbudg from './media/gifbudget.gif';
import imgreport from './media/gifreport.gif';
import imgexpense from './media/gifdesc.gif';
import getstarted from './media/paymentsbilling.gif'

//import logo from './media/logo.ico'
import './navbarstyle.css'
import { Link } from 'react-router-dom';
import Navbar from './Navbar';

const Homepage = () => {
  return (
    <>
    <Navbar/>
    {/* ----------------Background----------------- */}
    <div class="back" id="top"></div>

{/* -----------headind-------------- */}
<div class="ptext">
  <span class="textBg"> EXPENSE TRACKER </span>
</div>

{/* --------------headind description------------- */}
<div class="ptextdesc">
  STOP WASTING TIME WITH PAPER FORMS AND WORRING ABOUT LOOSING RECEIPTS <br/>
  KEEP TRACK OF YOUR DAILY EXPENSES AND SAVINGS WITH US <br/><br></br>
 <span> CONNECT WITH US NOW !!!</span>
  <div>
    <Link to="/signup"><button type="button"><span class="descbutton"></span>Start Now - It's Free</button></Link>
  </div>
</div>

<div style={{"marginTop":"3%" ,"marginBottom":"-14px"}}>

   {/* --------------------Description-------------------- */}

   <div class="maindesc" >
    <h2 class="maindesc-heading" style={{"font-size":"40px"}}>Efficiently manage your <span class="maindesc-heading-exp">expenses</span> create <span class="maindesc-heading-bdg">budget</span> and save <span class="maindesc-heading-money">money</span></h2>
  
    <div class="row">
      <div class="col-sm-5" >

      <center>
        <img class="imgicondiv" src={imgexpense}></img>
        </center>
      </div>
      <div class="col-sm-7 maindesc-txt" >
      <p>Expense Tracker is a beautiful and powerful system crafted specifically for income and expense. It is designed with ease of use and dedicated itself to provide full functionality for free of charge. It takes seconds to record daily transactions and Put them into clear and visualized categories.
        <br/><br/> 
        When it comes to tracking your spending, there can be different reasons for doing it. Whatever your reasons, we've got the tools and resources to help you get started. Whatever your reasons, we've got the tools and resources to help you get started.</p>
      </div>
    </div>
   </div>


   {/* ------------------Features-------------------- */}
   <div class="featuredesc">
    <div></div>
   <h2 class="feat-heading" style={{"paddingBottom":"5px"}}>Tools for tracking your <span class="maindesc-heading-exp">expenses</span></h2>
  <h5 style={{"textAlign":"center","paddingBottom":"60px"}}>Regardless of your use case, Expense Tracker is here to help track your expenses right away.</h5>
  <div class="row">

  <div  class="col-sm-4 feature-div" >
    <center>
  <img class="images" src={imgbudg}></img>
  </center>
  <p class="feature-heading">Add Budget</p>
  <p class="feature-content">A budget can help you feel more in control of your finances and make it easier to save money for your goals. The trick is to figure out a way to track your finances that works for you</p>
  </div>

  <div class="col-sm-4 feature-div" >
    <center>
    <img class="images" src={imgexp}></img>
    </center>
    <p class="feature-heading">Manage Expenses</p>
    <p class="feature-content">Effective financial management requires the proper tracking of income and expenses.Keeping track of your expenses will help you work within your budget and make strategic investments.</p>
  </div>
  
  <div  class="col-sm-4 feature-div" >
    <center>
  <img class="images" src={imgreport}></img>
  </center>
  <p class="feature-heading"> View Reports</p>
  <p class="feature-content">An expense report contains a categorized and itemized list of expenses that were made on behalf of the organization.Expense reports help track daily spending that are usually generated on a monthly and yearly basis.</p>
  </div>

   </div>
   </div>

  <Imgslider/>
  <br/>
  
    <div class="row">
      <div class="col-sm-12">
      <div class="w3-hover-shadow w3-round-xlarge w3-display-container  w3-panel w3-card-2 get-started" style={{"paddingBottom":"20px","paddingTop":"20px","paddingLeft":"0px"}}>
        <div class="col-sm-1">
        <img src={getstarted} style={{"height":"80px","width":"100px"}}/>
        </div>
        <div class="col-sm-11" style={{"paddingLeft":"20px"}}>
      <h4>Ready to get started?</h4>
      <span style={{"float":"right","marginTop":"-30px"}}>
        <a href='#top'><button class="w3-button w3-blue w3-border w3-round-large ">Move to top </button></a></span>
      <h4>      Talk to us today..</h4>
      </div>
      </div>
      </div>
    </div>
  
  <br/>

   {/* ------------------Footer---------------- */}
  <Footer/>
  </div>

  


    </>
  )
}

export default Homepage;