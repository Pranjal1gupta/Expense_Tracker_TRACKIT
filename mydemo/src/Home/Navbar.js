import React from 'react'
import './navbarstyle.css'
import imgicon from './media/expicon.png';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <>
<nav class=" homenav navbar fixed-top navbar-expand-lg navbar-dark">
  <img class="imgicon" src={imgicon}></img><a  class="title navbar-brand" href="#">EXPENSE TRACKER</a>
  <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
    <span class="navbar-toggler-icon"></span>
  </button>

  <div class="collapse navbar-collapse" id="navbarSupportedContent">
    <ul class="navbar-nav mr-auto">
      <li class="navbarhover mr-6 nav-item active">
        <Link class="navitem nav-link" to="/">Home <span class="sr-only">(current)</span></Link>
      </li> &nbsp;&nbsp;&nbsp;&nbsp;
      <li class="navbarhover mr-6 nav-item active">
        <Link class=" navitem  nav-link" to="/about">About</Link>
      </li> &nbsp;&nbsp;&nbsp;&nbsp;
      <li class="navbarhover mr-6 nav-item active">
        <Link class=" navitem  nav-link " to="/contact">Contact</Link>
      </li> &nbsp;&nbsp;&nbsp;&nbsp;
    </ul>
    <form class="form-inline my-2 my-lg-0">
    <Link to="/signup"><button class="w3-button w3-light-grey w3-round-xxlarge w3-large w3-hover-dark-grey"><i class="fa fa-user" style={{"font-size":"22px"}}></i>
&nbsp;&nbsp;Signup</button></Link>&nbsp;&nbsp;&nbsp;&nbsp;
    <Link to="/login"><button style={{"font-size":"240px"}} class="w3-button w3-light-grey w3-round-xxlarge w3-large w3-hover-dark-grey"><i class="fa fa-sign-in" style={{"font-size":"22px"}}></i>&nbsp;&nbsp;Login</button></Link>
    </form>
  </div>
</nav>
    </>
  )
}

export default Navbar