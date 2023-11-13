import React, { useState } from 'react'
import useric from '../Home/media/useric.gif';
import Sidenav from "./Sidenav";
import {Link, useParams } from 'react-router-dom';
import { useEffect } from 'react';
import updateimg from '../Home/media/updateimg.gif';


const ExpenseUpdate = () => {

    const [inpexp,setexp]=useState({
        expcategory:"",
        expamt:"",
        expdesc:"",
        month:"",
        date:"",
      });

      const { id } = useParams("");


      const inputexpense=(e)=>{
        console.log(e.target.value);
        const {name,value}=e.target;
        setexp((preval)=>{
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

      const viewexpense = async()=>
      {
        const fetchexpense=await fetch(`/viewexpenseapibyid/${id}`,{
          method:"GET",
          headers:{
            "Content-Type":"application/JSON"
          },
        });
    
        const getexpensedata=await fetchexpense.json();
    
          // console.log(getexpensedata);
          if(!getexpensedata || fetchexpense.status===422){
            alert("Error");
            console.log("error");
          }
          else{
            setexp(getexpensedata)
            console.log("Data fetched ");
    
          }
      }

      const updexpense = async(e)=>
      {
        e.preventDefault();
       const{expcategory,expamt,expdesc,month,date} = inpexp;
       console.log(id)
        const fetchupdateexp=await fetch( `/updateexpenseapi/${id}`,
        {
          method:"PATCH",
          headers:{
            "Content-Type":"application/JSON"
          },
          body:JSON.stringify({
            expcategory,expamt,expdesc,month,date
          })
        });
        const updateexpdata=await fetchupdateexp.json();
        console.log(updateexpdata)
  
          if(fetchupdateexp.status=== 422 || !updateexpdata){
            alert("Fill the data")
          }
          else{
           alert("Expense Updated")
            console.log("Expense updated");
          }
      };

      useEffect(()=>
      {
        viewexpense();
        getsignup();
      },[]);


  return (
    <>
    
    <div style={{"marginLeft":"15%"}}><Sidenav/></div>
    <div style={{"marginLeft":"17%","marginTop":"0px"}}>
      
        <div class="container">
        <div class="row"></div>
        <Link to="/expenses">
        <i style={{"font-size":"28px","float":"right","color":"red"}} class="fa" data-toggle="tooltip"  title="Close">&#xf00d;</i>
        </Link>
        <div class="col-sm-1">
        <img src={useric} style={{"height":"82px","width":"86px","marginTop":"10px"}}/>
        </div>
      <div class="col-sm-11" style={{"paddingLeft":"30px","marginTop":"-26px"}}>
        <h1 style={{"fontWeight":"bold","color":"#5870c7"}}>Welcome back <span style={{"textTransform":"uppercase"}}>{getuserdata.uname}</span></h1>
        <h5 style={{"color":"#5870c7"}}>Easily update your Expense..</h5>
        </div>
        </div>
        
        <div class="container">
          <div class="row">
            <div class="col-sm-7">
            
            <div class="w3-hover-shadow w3-round-xxlarge w3-panel w3-card-2" style={{"padding":"15px","width":"500px"}}>
        <hr class="hrbudget"></hr>
          <h2 style={{"textAlign":"center","letterSpacing":"2px","paddingBottom":"8px","fontSize":"27px"}}><b>UPDATE EXPENSE</b></h2>
          <hr class="hrbudget"></hr>
          <form>
<div class="form-group expenseinp">
<label for="exampleInputEmail1" style={{"fontSize":"17px","marginLeft":"35px","paddingBottom":"5px"}}>Expense Category *</label>
<br></br>
<i style={{"fontSize":"25px"}} class="fa">&#xf07a;</i> &nbsp;&nbsp;
<input  required  style={{ "width": "70%","padding":"3px"}} type="text"  name="expcategory" value={inpexp.expcategory} onChange={inputexpense} />
</div>
<div class="form-group expenseinp">
<label for="exampleInputPassword1" style={{"fontSize":"17px","marginLeft":"35px","paddingBottom":"5px"}}>Amount *</label>
<br></br>
<i style={{"fontSize":"25px"}} class="fa">&#xf156;</i>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
<input required  style={{ "width": "70%","padding":"3px"}} type="number" name="expamt" onChange={inputexpense} value={inpexp.expamt}/>
</div>
<div class="form-group expenseinp">
<label for="exampleInputPassword1" style={{"fontSize":"17px","marginLeft":"35px","paddingBottom":"5px"}}>Description &nbsp;(Optional)</label>
<br></br>
<i style={{"font-size":"25px"}} class="fa">&#xf0f6;</i>&nbsp;&nbsp;&nbsp;
<textarea style={{ "width": "70%","padding":"3px"}} rows="2" type="text" name="expdesc" onChange={inputexpense} value={inpexp.expdesc}/>
</div>
<div class="form-group expenseinp">
<label for="exampleInputPassword1" style={{"fontSize":"17px","marginLeft":"35px","paddingBottom":"5px"}}>Month</label>
<br></br>
<i style={{ "font-size": "25px" }} class="fa">
  &#xf073;
</i>
&nbsp;&nbsp;&nbsp;
<input style={{ "width": "70%","padding":"3px"}} type="month" name="month" onChange={inputexpense} value={inpexp.month}/>
</div>

<div class="form-group expenseinp">
<label for="exampleInputPassword1" style={{"fontSize":"17px","marginLeft":"35px","paddingBottom":"5px"}}>Date *</label>
<br></br>
<i style={{"font-size":"25px"}} class="fa">&#xf073;</i>&nbsp;&nbsp;&nbsp;
<input  required style={{ "width": "70%","padding":"3px"}} type="date" name="date" onChange={inputexpense} value={inpexp.date}/>
</div>

<button class="w3-button w3-green w3-border w3-round-large w3-hover-red budgetsavebtn" onClick={updexpense}>Update</button>
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

export default ExpenseUpdate