import React from 'react'
import './about.css'
import Footer from './Footer'
// import aboutusgif from '../Home/media/about_us.gif';
import missiongif from '../Home/media/mission.gif'
import aboutdev1 from '../Home/media/about.gif'
import aboutdev2 from '../Home/media/about2.gif'
import Navbar from './Navbar'

const About = () => {
  return (
    <>
    <Navbar/>
    <div class="aboutback"></div>
    
    <div class="abouthead">
  <span class="aboutBg"> ABOUT US </span>
</div>

<div style={{"marginTop":"100px"}} >
  <div class="row">
    <div class="col-sm-12">
    <center><h2 class="missionhead maindesc-heading-bdg">Our Mission</h2></center> 
    </div>
  </div>
  <div class="row">
    <div class="col-sm-8">
     
   <div  class="mission container">

 <p> <i style={{"font-size":"24px",color:"#38b4e5"}} class="fa">&#xf1d9;</i>&nbsp;&nbsp;The idea of tracking your expenses can feel overwhelming, 
        especially if you’ve been avoiding it for a while or have never done it before. </p>
        <p><i style={{"font-size":"24px",color:"#38b4e5"}} class="fa">&#xf1d9;</i>&nbsp;&nbsp; Once you get started really looking at your budget and finances,
         you’ll feel a sense of relief and control.</p>
         <p><i style={{"font-size":"24px",color:"#38b4e5"}} class="fa">&#xf1d9;</i>&nbsp;&nbsp; Effective financial management requires the proper tracking of income and expenses.</p>
         <p><i style={{"font-size":"24px",color:"#38b4e5"}} class="fa">&#xf1d9;</i>&nbsp;&nbsp; Expense tracker apps help you collect and classify your purchases so that you can identify areas that might be trimmed. </p>
         <p class="missionpara">No one is born with good money management skills, but we believe that financial well-being is achievable for everyone.
           We help by providing free resources and guidance. 
          If you have a financial issue that you can’t overcome by yourself, 
          then we’re here to help you through it.</p>
         </div>
         </div>
         <div class="col-sm-4">
          <img src={missiongif} class="missiongif"></img>
         </div>
    </div>
 
 
  <div style={{"margin-top":"70px"}}>
    <div class="row">
      <div class="col-sm-12">
        <center><h2 class="missionhead">Our Team</h2></center>
      </div>
    </div>
    <div class="row">

      <div class="col-sm-6 aboutdevtrans">
      <center> <img class="aboutdev1" src={aboutdev1}></img></center> 
      <h2 class="dn">Pranjal Gupta</h2>
      <h4 class="dnc">Has the Occasional good ideas.</h4>
      </div>


      <div class="col-sm-6 aboutdevtrans">
 <center><img class="aboutdev2" src={aboutdev2}></img></center> 
 <h2 class="dn">Jahanvi Singh</h2>
 <h4 class="dnc">Content Obsessed.</h4>
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

export default About