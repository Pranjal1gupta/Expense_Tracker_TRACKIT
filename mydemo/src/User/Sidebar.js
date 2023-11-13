import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import './sidebar.css'
import imgicon from '../Home/media/expicon.png';
import Scrollbars from 'react-custom-scrollbars-2';


const Sidebar = () => {

  const history=useNavigate();
  const logout=()=>{
    alert("Logout Successfull...")
    history("/")
  }

  return (
    <>
    
      <div style={{ "width": "15.5%" }} class="w3-sidebar  w3-bar-block sidebar">
      <Scrollbars style={{"height":"100%","width":"100%"}} thumbSize={200}>
        <div class="container">
        <div class="row">
        <div class="logo">
          <div class="col-sm-2">
        <img class="side-icon" src={imgicon}></img>
        </div>
        <div class="col-sm-10" style={{"paddingTop":"10px"}}>
          <h6 class="w3-bar-item w3-center">EXPENSE TRACKER</h6>
          </div>
        </div>
        </div>
        </div>

        <p class="navtitle">MAIN</p>
        <Link class="sidelink" to ="mainpage" ><a href="" class="w3-bar-item w3-bar-item-links w3-button w3-hover-blue" style={{ "text-decoration": "none","color":"white" }}><i class='fa'>&#xf015;</i>&nbsp;&nbsp;&nbsp;Home</a></Link>



        <p class="navtitle">COMPONENTS</p>
       <Link class="sidelink" to="budget"> <a href="" class="w3-bar-item w3-bar-item-links w3-button w3-hover-blue " style={{ "text-decoration": "none","color":"white" }}><i class='fas'>&#xf555;</i>&nbsp;&nbsp;&nbsp;Budget</a></Link>
       <Link class="sidelink" to="expenses"> <a href="" class="w3-bar-item w3-bar-item-links w3-button w3-hover-blue" style={{ "text-decoration": "none","color":"white" }}><i class="fa">&#xf156;</i>&nbsp;&nbsp;&nbsp;&nbsp;Expenses</a></Link>



        <p class="navtitle">USEFUL</p>
        <Link class="sidelink" to="reminder"><a href="" class="w3-bar-item w3-bar-item-links w3-button w3-hover-blue" style={{ "text-decoration": "none","color":"white" }}><i class='fa'>&#xf0f3;</i>&nbsp;&nbsp;&nbsp;Reminder</a></Link>
      <Link class="sidelink" to="investmenttips">  <a href="" class="w3-bar-item w3-bar-item-links w3-button w3-hover-blue" style={{ "text-decoration": "none","color":"white" }}><i style={{ fontSize: "24px" }} class="fa fa-lightbulb-o"></i>&nbsp;&nbsp;&nbsp;Investment Tips</a></Link>



        <p class="navtitle">REPORTS</p>
      <Link class="sidelink" to="expensesheet">  <a href="" class="w3-bar-item w3-bar-item-links w3-button w3-hover-blue" style={{ "text-decoration": "none","color":"white" }}><i class='fas'>&#xf518;</i>&nbsp;&nbsp;&nbsp;Expense Sheet</a></Link>
       {/* <Link class="sidelink" to="balancesheet"> <a href="" class="w3-bar-item w3-bar-item-links w3-button w3-hover-blue" style={{ "text-decoration": "none","color":"white" }}><i class='fas'>&#xf518;</i>&nbsp;&nbsp;&nbsp;Balance Sheet</a></Link> */}
       <Link class="sidelink" to="monthlyreports"> <a href="" class="w3-bar-item w3-bar-item-links w3-button w3-hover-blue" style={{ "text-decoration": "none","color":"white" }}><i class='fas fa-newspaper'></i>&nbsp;&nbsp;&nbsp;Monthly Report</a></Link>
       <Link class="sidelink" to="annualreports"> <a href="" class="w3-bar-item w3-bar-item-links w3-button w3-hover-blue" style={{ "text-decoration": "none","color":"white" }}><i class='fas fa-newspaper'></i>&nbsp;&nbsp;&nbsp;Annual Report</a></Link>
          


        <p class="navtitle">USER</p>
       <Link class="sidelink" to="/account"> <a href="" class="w3-bar-item w3-bar-item-links w3-button w3-hover-blue" style={{"text-decoration": "none","color":"white"}} ><i class='fas fa-user-edit'></i>&nbsp;&nbsp;&nbsp; Account</a></Link>
       <Link class="sidelink" to="/feedback"> <a href="" class="w3-bar-item w3-bar-item-links w3-button w3-hover-blue" style={{"text-decoration": "none","color":"white"}} ><i class="fa">&#xf0e6;</i>&nbsp;&nbsp;&nbsp; Feedback</a></Link>
       <span class="sidelink" onClick={logout}> <a  style={{textDecoration: "none", fontSize: "18px" ,"color":"white"}} href="#" class=" logout w3-bar-item w3-bar-item-links w3-button w3-hover-blue"><i class="fa">&#xf08b;</i>&nbsp;&nbsp;&nbsp;&nbsp;Log Out</a></span>
       <br/>
        
        {/* <p class="navtitle">COLOR OPTIONS</p>
        <div class="bottom">
          <div class="theme1 option"></div>
          <div class="themecolor2 option"></div>
        </div> */}
</Scrollbars>
      </div>
      
    </>
  )
}

export default Sidebar