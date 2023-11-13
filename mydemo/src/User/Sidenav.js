import React from 'react'
import './sidenav.css';
import { Link } from 'react-router-dom'

const Sidenav = () => {
  return (
    <>
    <nav class="navbar navbar-expand-lg navbar-light pt-0 pb-0 sidenav" >
  <a class="navbar-brand snhead" href="#" style={{"color":"white"}}>Expense Tracker</a>
  <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
    <span class="navbar-toggler-icon"></span>
  </button>
  <div class="collapse navbar-collapse" id="navbarSupportedContent">
  <form class="form-inline my-2 my-lg-0">
      <input style={{"height":"35px"}} class="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search"/>
      <button class="btn btn-outline-dark my-2 my-sm-0 " type="submit">Search</button>
    </form>


    <ul class="navbar-nav mr-auto">
    </ul>
   <span> <a class="nav-link navitems" href="#" style={{"color":"white"}}><i  style={{"font-size":"24px","color":"white"}} class='fa fa-globe icglobe'></i>&nbsp;English</a></span>
    
  <span> <i style={{"font-size":"20px","color":"white"}} class="fa" data-toggle="tooltip" data-placement="bottom" title="Light mode">&#xf185;</i></span> 
   &nbsp;&nbsp;&nbsp;&nbsp;
    <span><i style={{"font-size":"20px","color":"white"}} class="fa " data-toggle="tooltip" data-placement="bottom" title="Dark mode">&#xf186;</i></span>
    &nbsp;&nbsp;&nbsp;&nbsp;
  <Link to="/reminder"><span> <i style={{"font-size":"20px","color":"white"}} class="fa" data-toggle="tooltip" data-placement="bottom" title="Notification">&#xf0f3;</i></span></Link>
  &nbsp;&nbsp;&nbsp;&nbsp;
    {/* <span><i style={{"font-size":"23px","color":"white"}} class="fa" data-toggle="tooltip" data-placement="bottom" title="Setting">&#xf013;</i></span> */}
    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
    <Link to="/profile"><span><i style={{"font-size":"33px","color":"white"}} class="fa" data-toggle="tooltip" data-placement="right" title="User Profile">&#xf2be;</i></span></Link>
  </div>
</nav>
    </>
  )
}

export default Sidenav