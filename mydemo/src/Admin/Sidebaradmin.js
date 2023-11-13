import { Link } from "react-router-dom"
import React from 'react';
import imgicon from '../Home/media/expicon.png';
import './AdmSidebar.css'
import { useNavigate } from "react-router-dom";
// import "../User/sidebar.css"

const Sidebaradmin = () => {

  const history=useNavigate();
  const logout=()=>{
    alert("Logout Successfull...")
    history("/")
  }

  return (
    <>

<div style={{ "width": "15%" }} class="w3-sidebar w3-light-grey w3-bar-block admsidebar">
<div class="container">
        <div class="row">
        <div class="admlogo">
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
        <Link to="dashboard" class="w3-bar-item w3-bar-item-links w3-hover-blue" style={{ "text-decoration": "none","color":"white" }}><i style={{"font-size":"24px","paddingRight":"17px","color":"white"}} class='fas'>&#xf015;</i>Dashboard</Link>

        <p class="navtitle">USEFUL</p>
        <Link to="/manageuser" class="w3-bar-item w3-bar-item-links w3-hover-blue" style={{ "text-decoration": "none" ,"color":"white"}}><i style={{"font-size":"23px","paddingRight":"17px","color":"white"}} class="fas">&#xf4fc;</i>Manage User</Link>
        <Link to="/blockuser" class="w3-bar-item w3-bar-item-links w3-hover-blue" style={{ "text-decoration": "none" ,"color":"white"}}><i style={{"font-size":"23px","paddingRight":"17px","color":"white"}} class='fas'>&#xf502;</i>Blocked User</Link>

        <p class="navtitle">COMPONENTS</p>
        <Link to="report" class="w3-bar-item w3-bar-item-links w3-hover-blue" style={{ "text-decoration": "none" ,"color":"white"}}><i style={{"font-size":"23px","paddingRight":"17px","color":"white"}} class="fas">&#xf518;</i>Report</Link>
        <Link to="/userdata" class="w3-bar-item w3-bar-item-links w3-hover-blue" style={{ "text-decoration": "none" ,"color":"white"}}><i style={{"font-size":"23px","paddingRight":"17px","color":"white"}} class="fas">&#xf518;</i>User Data</Link>
        <Link to="/admfeedback" class="w3-bar-item w3-bar-item-links w3-hover-blue" style={{"text-decoration": "none","color":"white"}} ><i style={{ "font-size": "26px","paddingRight":"20px" ,"color":"white"}}  class="fa">&#xf0e6;</i>Feedback</Link>
          
        <p class="navtitle">ADMIN</p>
        <Link to="/accountadm" class="w3-bar-item w3-bar-item-links  w3-hover-blue" style={{"text-decoration": "none","color":"white"}} ><i style={{ "font-size": "25px","paddingRight":"17px" ,"color":"white"}}  class='fas fa-user-edit'></i>Profile</Link>
        
        <span style={{"textDecoration": "none", "font-size": "18px" ,"color":"white"}}  class="  w3-bar-item  w3-bar-item-links w3-hover-blue" onClick={logout}><i style={{"font-size":"26px","paddingRight":"20px","color":"white"}} class="fa">&#xf08b;</i>Log Out</span>
        
        {/* <p class="navtitle">COLOR OPTIONS</p>
        <div class="bottom">
          <div class="theme1 option"></div>
          <div class="themecolor2 option"></div>
        </div> */}
      </div>



    </>
  )
}

export default Sidebaradmin