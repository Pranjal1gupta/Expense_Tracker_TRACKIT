import React from "react";
import '../Home/footer.css'
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <>

<div class="footer"> 
 <div class="footerhead"><span><h3> EXPENSE TRACKER</h3></span> </div>
  <div class="footerrow">
  <div style={{"padding":"6px"}} class="row">
    <div class="col-3">
      <ul  type="none">
        <lh class="listheading ">Find Us</lh>
        <br></br>
        <br></br>
        <li class="listing">Expense Tracker website</li>
        <li class="listing">Contact no - +91 9876543219</li>
        <li class="listing">Email - expensetrackeronline@gmail.com </li>
      </ul>
    </div>
    <div class="col-3">
      <ul  type="none">
        <lh class="listheading">Quick Links</lh>
        <br></br>
        <br></br>
        <Link to="/" style={{"textDecoration":"none"}}><li class="listing">Home</li></Link>
        <Link to="about" style={{"textDecoration":"none"}}><li class="listing">About</li></Link>
        <Link to="contact" style={{"textDecoration":"none"}}><li class="listing">Contact</li></Link>
        {/* <Link to="faq" style={{"textDecoration":"none"}}><li class="listing">FAQ</li></Link> */}
      </ul>
    </div>
    <div class="col-3">
      <ul  type="none">
        <lh class="listheading">Features</lh>
        <li class="listing">Budget</li>
        <li class="listing">Expense</li>
        <li class="listing">Reminder</li>
        <li class="listing">Investment Tips</li>
      </ul>
    </div>
    <div class="col-3">
      <ul  type="none">
        <lh class="listheading">Follow Us</lh>
      <br/>
        <li class="listing"><i class="fab fa-facebook-f fontawesome-style"></i> <span class="i-text">facebook</span> </li>
        <li class="listing"><i class="fab fa-instagram fontawesome-style"></i>  <span class="i-text">instagram</span></li>
        <li class="listing"><i class="fab fa-twitter fontawesome-style"></i>  <span class="i-text">twitter</span></li>
      </ul>
    </div>
  </div>
  

<div>
  <hr/>
<p class="copyright">
Copyright @ 2023 | Expense Tracker. All rights reserved.
</p>
</div>
</div>
</div>
    </>
  );
};

export default Footer;
