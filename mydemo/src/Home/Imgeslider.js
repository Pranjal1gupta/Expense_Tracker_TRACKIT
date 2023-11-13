import React from 'react'
import imgslider1 from '../Home/media/imgslider1.jpg'
import imgslider2 from '../Home/media/imgslider2.jpg'
import imgslider3 from '../Home/media/imgslider3.jpg'

import './imageslider.css';

const Imgslider = () => {
  return (
    <>

<div class=" imgslider-back">
  <div class="row">
    <div class="col-sm-12 imgslider-head">
      <h2 >OUR TOP FEATURES & SERVICES</h2>
    </div>
  </div>
    <div class="row ">
      <div class="col-sm-4 featureblock " >
        
      <i style={{"font-size":"28px","color":"black"}} class="fa">&#xf192;</i>
      <h3>provide reports</h3>
      <p>Record your expenses. The first step to start saving money is figuring out how much you spend.Make saving automatic. Categorize your expenses and build your budget</p>
      <br/>

      <i style={{"font-size":"28px","color":"black"}} class="fa">&#xf192;</i>
      <h3>digital calculator for savings</h3>
      <p>Savings can be as simple as keeping aside money on a monthly basis or even investing small amounts on a monthly basis. Savings can help in meeting financial commitments at a future date.The user will only have to add their expenses and budget but the savings will be calculated automatically.</p>
      <br/>

      <i style={{"font-size":"28px","color":"black"}} class="fa">&#xf192;</i>
      <h3>manage expense & savings</h3>
      <p>Expense Tracker is a beautiful and powerful system crafted specifically for income and expense. It is designed with ease of use and dedicated itself to provide full functionality for free of charge.</p>
      <br/>

      <i style={{"font-size":"28px","color":"black"}} class="fa">&#xf192;</i>
      <h3>Stop losing receipts</h3>
      <p>The users can add their expenses according to date and can have the records online.The users here, will not have any fear of loosing the recipts and can have the records digitally.</p>
      </div>

      <div class="col-sm-4 imgslider" >
      
    <div id="carouselExampleIndicators" class="carousel slide" data-ride="carousel">
  <ol class="carousel-indicators">
    <li data-target="#carouselExampleIndicators" data-slide-to="0" class="active"></li>
    <li data-target="#carouselExampleIndicators" data-slide-to="1"></li>
    <li data-target="#carouselExampleIndicators" data-slide-to="2"></li>
  </ol>
  <div class="carousel-inner">
    <div class="carousel-item active">
      <img class="d-block w-100 imgsliderimg" src={imgslider1} alt="First slide"/>
    </div>
    <div class="carousel-item">
      <img class="d-block w-100 imgsliderimg" src={imgslider2} alt="Second slide"/>
    </div>
    <div class="carousel-item">
      <img class="d-block w-100 imgsliderimg" src={imgslider3} alt="Third slide"/>
    </div>
  </div>
  <a class="carousel-control-prev" href="#carouselExampleIndicators" role="button" data-slide="prev">
    <span class="carousel-control-prev-icon" aria-hidden="true"></span>
    <span class="sr-only">Previous</span>
  </a>
  <a class="carousel-control-next" href="#carouselExampleIndicators" role="button" data-slide="next">
    <span class="carousel-control-next-icon" aria-hidden="true"></span>
    <span class="sr-only">Next</span>
  </a>
</div>

      </div>

      <div class="col-sm-4 featureblock " >
      <i style={{"font-size":"28px","color":"black"}} class="fa">&#xf192;</i>
      <h3>free of cost service</h3>
      <p>Expense Tracker is a beautiful and powerful system crafted specifically for income and expense. It is designed with ease of use and dedicated itself to provide full functionality for free of charge.</p>
      <br/>

      <i style={{"font-size":"28px","color":"black"}} class="fa">&#xf192;</i>
      <h3>provide investment tips</h3>
      <p>We will provide you the investment tips . The users can invest their saved money in the different fields. The investment tips will be according to the inflation rates and keeps on updating.</p>
      <br/>

      <i style={{"font-size":"28px","color":"black"}} class="fa">&#xf192;</i>
      <h3>expense sheet & balance sheet</h3>
      <p>The Expense sheet will displays the expenses monthly by selecting the particular month of the current year and the Balance sheet will display the expenses on the yearly basis by selecting the particular year.</p>
      <br/>

      <i style={{"font-size":"28px","color":"black"}} class="fa">&#xf192;</i>
      <h3>easy to use</h3>
      <p>Expense Tracker is a beautiful and powerful system crafted specifically for income and expense. The user will only have to add their expenses and budget, the saving will be calculateed automatically.</p>
      </div>
    </div>
  </div>

    
    </>
  )
}

export default Imgslider