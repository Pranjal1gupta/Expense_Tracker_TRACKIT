import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom';
import AdmSidenav from './AdmSidenav';
import adminicon from '../Home/media/adminicon.gif'

const Viewprofile = () => {

const [getusermanage,setusermanage] = useState([]);
console.log(getusermanage);

const [getstatus,setstatus]=useState(null);

const [getbudgetview,setbudgetview] = useState([]);
// console.log(getbudgetview);

const [totalbug,settotalbug] = useState(null)

const useremail = localStorage.getItem("useremail2");
console.log(useremail);

const{id} = useParams("");
console.log(id);


const datefunction=async()=>{
  const jdate=getusermanage.date.substring(0,10);
  console.log(jdate);
  localStorage.setItem("joindate",jdate);
}

const date=localStorage.getItem("joindate");

const viewindivusermanage = async()=>
  {
    const fetchusermang=await fetch( `/getindivusermangapi/${id}`,{
      method:"GET",
      headers:{
        "Content-Type":"application/JSON"
      },
    });
    const userindivmangedata=await fetchusermang.json();
      console.log("data",userindivmangedata);
      if (userindivmangedata.status==0)
      {
        setstatus("Active");
      }
      else if(userindivmangedata.status==1){
        setstatus("Blocked");
      }
      if(!userindivmangedata || fetchusermang.status===404){
        alert("errror")
        console.log("error");
      }
      else{
        localStorage.setItem("useremail2",userindivmangedata.email)
        setusermanage(userindivmangedata)
        console.log("Data fetched ");
      }
  };

  const viewbudget = async()=>
  {
    const fetchbudget=await fetch(`/getuserbudgetapi/${useremail}`,{
      method:"GET",
      headers:{
        "Content-Type":"application/JSON"
      },
    });
    const getbudgetdata=await fetchbudget.json();
    const sumbug = getbudgetdata.reduce((prev,curr)=>{
      return prev + +curr.amt;
    },0);
    settotalbug(sumbug);
    console.log(totalbug);
      console.log(getbudgetdata);
      if(!getbudgetdata || fetchbudget.status===404){
        alert("Server Busy Can't Get Your Data..");
        console.log("error");
      }
      else{
        setbudgetview(getbudgetdata)
        console.log("Data fetched ");
        
      }
  };

  const[getexpenseview,setexpenseview]= useState([]);
  console.log(getexpenseview)

  const[totalexp,settotalexp] = useState(null);

  const viewexpense = async(e)=>
  {
    const fetchexpense=await fetch(`/getuserexpenseapi/${useremail}`,{
      method:"GET",
      headers:{
        "Content-Type":"application/JSON"
      },
    });

    const getexpensedata=await fetchexpense.json();
    const sumexp = getexpensedata.reduce((prev,curr)=>{
      return prev + +curr.expamt;
    },0);
    settotalexp(sumexp);
    console.log(totalexp);

      // console.log(getexpensedata);
      if(!getexpensedata || fetchexpense.status===404){
        alert("Error");
        console.log("error");
      }
      else{
       setexpenseview(getexpensedata)
        console.log("Data fetched ");

      }
  };

  const [getuserdetails,setuserdetails]=useState([]);

  const accdetails = async () => {
    const userdetails = await fetch(`/accdetails/${useremail}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json"
      }
    })
    const sdetails = await userdetails.json();
    console.log(sdetails);
    if (!sdetails || userdetails.status === 404) {
      console.log("error")
    }
    else {
      setuserdetails(sdetails);
      console.log("usestate data",getuserdetails)
      console.log(sdetails)
      console.log("Data has been retrive");
     }}

useEffect(()=>
{
    viewindivusermanage();
    viewbudget();
    viewexpense();
    datefunction();
    accdetails();
})

  return (
    <>
    <div style={{"marginLeft":"15%"}}><AdmSidenav/></div>
    <div style={{"marginLeft":"17%","marginTop":"0px"}}>
    <div class="container">
        <div class="row"></div>
        <Link to="/manageuser">
        <i style={{"font-size":"28px","float":"right","color":"red","marginBottom":"-20px"}} class="fa" data-toggle="tooltip"  title="Close">&#xf00d;</i>
        </Link>
        <div class="col-sm-1">
        <img src={adminicon} style={{"height":"85px","width":"85px","marginTop":"15px"}}/>
        </div>
      <div class="col-sm-11" style={{"paddingLeft":"30px"}}>
        <h1 style={{"fontWeight":"bold","color":"#5870c7"}}>Welcome back Admin </h1>
        <h5 style={{"color":"#5870c7"}}>This is users information.</h5>
        </div>
        </div>
        <div class="container">
            <div class="row">
                <div class="col-sm-12">
                    <div class="w3-hover-shadow w3-round-xxlarge w3-panel w3-card-2" style={{"paddingTop":"20px","paddingBottom":"20px","paddingLeft":"30px"}}>

                      <div class="admin-users-profile">
                      <h4 style={{"color":"#a16fbf","fontSize":"25px","fontWeight":"650","letterSpacing":"1px"}}>BASIC INFORMATION</h4>
                      <h4>Username : {getuserdetails.ufirst}&nbsp;{getuserdetails.ulast}</h4>
                      <h4>User ID : {getusermanage.uname}</h4> 
                      <h4>About : {getuserdetails.uabout}</h4>
                      <h4>Date of joining : {date}</h4> 
                      </div>
                      <br/>

                      <div class="admin-users-profile">
                      <h4 style={{"color":"#a16fbf","fontSize":"25px","fontWeight":"650","letterSpacing":"1px"}}>SUMMARY</h4>
                      <h4>Status : <span style={{"color":"green","fontWeight":"550"}}>{getstatus}</span></h4> 
                      <h4>Total Budget : {totalbug} </h4> 
                      <h4>Total Expense : {totalexp} </h4> 
                      <h4>Total Savings : {totalbug-totalexp} </h4> 
                      </div>
                      <br/>

                      <div class="admin-users-profile">
                        <h4 style={{"color":"#a16fbf","fontSize":"25px","fontWeight":"650","letterSpacing":"1px"}}>CONTACT INFORMATION</h4>
                        <h4>Email : {getusermanage.email}</h4> 
                      <h4>Phone : {getuserdetails.uphone}</h4>
                      <h4>Address : {getuserdetails.uaddress}</h4>
                      </div>
                      

                        {/* <span><h3>User Name : </h3>{totalbug}</span>   */}
                    </div>
                </div>
            </div>
        </div>
    </div>
    </>
  )
}

export default Viewprofile