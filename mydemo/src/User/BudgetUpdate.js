import React, { useState } from 'react'
import useric from '../Home/media/useric.gif';
import Sidenav from "./Sidenav";
import {Link, useParams } from 'react-router-dom';
import { useEffect } from 'react';
import updateimg from '../Home/media/updateimg.gif';


const BudgetUpdate = () => {

  const [getbudget,setbudget]=useState({
    bcategory:"",
    amt:"",
    description:"",
    month:"",
  });

  const { id } = useParams("");

      const budget=(e)=>{
        console.log(e.target.value);
        const {name,value}=e.target;
        setbudget((preval)=>{
          return{
            ...preval,
            [name]:value
          }
        })
      };
      
const email=localStorage.getItem("email");

const [getuserdata, setuserdata] = useState([]);

const getsignup = async () => {
  const signupres = await fetch(`/signupdatamainpage/${email}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json"
    }
  })
  const sdata = await signupres.json();
  if (!sdata || signupres.status === 404) {
    alert("Error");
    console.log("error")
  }
  else {
    setuserdata(sdata);
    console.log(sdata)
    console.log("Data has been retrive");
   }
}

  const viewbudget = async()=>
  {
    const fetchbudget=await fetch(`/viewbudgetbyid/${id}`,{
      method:"GET",
      headers:{
        "Content-Type":"application/JSON"
      },
    });
    const getbudgetdata=await fetchbudget.json();
      console.log(getbudgetdata);
      if(!getbudgetdata || fetchbudget.status===404){
        alert("Server Busy Can't Get Your Data..");
        console.log("error");
      }
      else{
        setbudget(getbudgetdata)
        console.log("Data fetched ");
      }
  };

  useEffect(() => {
    viewbudget();
    getsignup();
  }, []);

    
      const updbudget = async(e)=>
      {
        e.preventDefault();
       const{bcategory,amt,description,month} = getbudget;
       console.log(id)
        const fetchupdatebudg=await fetch( `/updatebudgetapi/${id}`,
        {
          method:"PATCH",
          headers:{
            "Content-Type":"application/JSON"
          },
          body:JSON.stringify({
            bcategory,amt,description,month
          })
        });
        const updatebudgdata=await fetchupdatebudg.json();
        console.log(updatebudgdata)
  
          if(fetchupdatebudg.status=== 422 || !updatebudgdata){
            alert("Fill the data")
          }
          else{
           alert("Budget Updated")
            console.log("Budget updated");
          }
      };

  return (
    <>
    <div style={{"marginLeft":"15%"}}><Sidenav/></div>
    <div style={{"marginLeft":"17%","marginTop":"0px"}}>
      
        <div class="container">
        <div class="row"></div>
        <Link to="/budget">
        <span><i style={{"font-size":"28px","float":"right","color":"red"}} class="fa" data-toggle="tooltip"  title="Close">&#xf00d;</i></span>
        </Link>
        <div class="col-sm-1">
        <img src={useric} style={{"height":"82px","width":"86px","marginTop":"10px"}}/>
        </div>
      <div class="col-sm-11" style={{"paddingLeft":"30px","marginTop":"-26px"}}>
        <h1 style={{"fontWeight":"bold","color":"#5870c7"}}>Welcome back <span style={{"textTransform":"uppercase"}}>{getuserdata.uname}</span></h1>
        <h5 style={{"color":"#5870c7"}}>Easily update your Budget..</h5>
        </div>
        </div>

        <div class="container">
          <div class="row">
            <div class="col-sm-7">

            <div class="w3-hover-shadow w3-round-xxlarge w3-panel w3-card-2" style={{"padding":"15px","width":"500px"}}>
            <hr class="hrbudget"></hr>
              <h2 style={{"textAlign":"center","letterSpacing":"2px","paddingBottom":"8px","fontSize":"27px"}}><b>UPDATE BUDGET</b></h2>
              <hr class="hrbudget"></hr>
              <form method="GET">
                <div class="form-group  expenseinp">
                  <label for="exampleInputEmail1" style={{"fontSize":"17px","marginLeft":"34px","paddingBottom":"5px"}}>Budget Category *</label>
                  <br></br>
                  <i style={{ "fontSize": "25px"}} class="fa">
                    &#xf07a;
                  </i>
                  &nbsp;&nbsp;&nbsp;
                  <input style={{ "width": "70%","padding":"3px"}} type="text" name="bcategory"  onChange={budget} value={getbudget.bcategory} />
                </div>
                <div class="form-group expenseinp">
                  <label for="exampleInputPassword1" style={{"fontSize":"17px","marginLeft":"34px","paddingBottom":"5px"}}>Amount *</label>
                  <br></br>&nbsp;
                  <i style={{ "fontSize": "25px" }} class="fa">
                    &#xf156;
                  </i>
                  &nbsp;&nbsp;&nbsp;&nbsp;
                  <input style={{ "width": "70%","padding":"3px"}} type="number" name="amt" onChange={budget} value={getbudget.amt}/>
                </div>
                <div class="form-group expenseinp">
                  <label for="exampleInputPassword1" style={{"fontSize":"17px","marginLeft":"34px","paddingBottom":"5px"}}>Description*</label>
                  <br></br>
                  <i style={{ "font-size": "25px" }} class="fa">
                    &#xf0f6;
                  </i>
                  &nbsp;&nbsp;&nbsp;
                  <textarea style={{ "width": "70%","padding":"3px"}} rows="2" type="text" name="description" onChange={budget} value={getbudget.description}/>
                </div>
                <div class="form-group expenseinp">
                  <label for="exampleInputPassword1" style={{"fontSize":"17px","marginLeft":"34px","paddingBottom":"5px"}}>Month</label>
                  <br></br>
                  <i style={{ "font-size": "25px" }} class="fa">
                    &#xf073;
                  </i>
                  &nbsp;&nbsp;&nbsp;
                  <input style={{ "width": "70%","padding":"3px"}} type="month" name="month" onChange={budget} value={getbudget.month}/>
                </div>
                <button class="w3-button w3-green w3-border w3-round-large w3-hover-red budgetsavebtn" style={{"margin-bottom":"10px"}} onClick={updbudget} >Update</button>

              </form>
            </div>

            </div>
            <div class="col-sm-5">
            <img style={{"height":"450px","width":"380px","marginTop":"50px"}} src={updateimg}></img>
            </div>
          </div>
          
        </div>
        </div>
    </>
  )
}

export default BudgetUpdate