import React , { useEffect, useState } from 'react'
import { CircularProgressbar } from 'react-circular-progressbar';
import { Link } from 'react-router-dom';
import Chart from 'react-apexcharts';
import './dashboard.css'
import expicon from '../Home/media/expicon.png';
import AdmSidenav from '../Admin/AdmSidenav';
import adminicon from '../Home/media/adminicon.gif'

const Dashboard = () => {

 

  const[totalexp,settotalexp] = useState(null);

  const [totalbug,settotalbug] = useState(null)

  const [getusermanage,setusermanage] = useState([]);

  const [getbudgetview,setbudgetview] = useState([]);
  console.log(getbudgetview);

  const[getexpenseview,setexpenseview]= useState([]);
  console.log(getexpenseview)

  const viewexpense = async(e)=>
  {
    const fetchexpense=await fetch("/getexpenseapi",{
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

      console.log(getexpensedata);
      if(!getexpensedata || fetchexpense.status===404){
        alert("Error");
        console.log("error");
      }
      else{
       setexpenseview(getexpensedata)
        console.log("Data fetched ");

      }
  };

  const viewbudget = async(e)=>
  {
    const fetchbudget=await fetch("/getbudgetapi",{
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
        alert("Error");
        console.log("error");
      }
      else{
        setbudgetview(getbudgetdata)
        console.log("Data fetched ");
      }
  };

  const viewusermanage = async(e)=>
  {
    const fetchusermang=await fetch("/getusermangapi",{
      method:"GET",
      headers:{
        "Content-Type":"application/JSON"
      },
    });
    const usermangedata=await fetchusermang.json();
      console.log(usermangedata);
      if(!usermangedata || fetchusermang.status===404){
        alert("errror")
        console.log("error");
      }
      else{
        setusermanage(usermangedata)
        console.log("Data fetched ");
      }
  };



  useEffect(()=>{
    viewusermanage();
    viewexpense();
    viewbudget();
  },[]);


  return (
    <>
    <div style={{"marginLeft":"15%"}}><AdmSidenav/></div>
    <div style={{"marginLeft":"17%"}}>

    <div class="container">
    <div class="container">
        <div class="row"></div>
        <div class="col-sm-1">
        <img src={adminicon} style={{"height":"85px","width":"85px","marginTop":"10px"}}/>
        </div>
      <div class="col-sm-11" style={{"paddingLeft":"30px"}}>
        <h1 style={{"fontWeight":"bold","color":"#5870c7"}}>Welcome back Admin </h1>
        <h5 style={{"color":"#5870c7"}}>This is your dashboard. It gives you an overview of everything.</h5>
        </div>
        </div>

        <div class="row">
        <div class="col-sm-6">
        <div class="w3-round-xlarge exptrack w3-panel w3-card-2  w3-hover-shadow">
   <span><p class="admheadtrack" style={{"color":"white"}}>Expense Tracker </p><img class="dashboardicon" src={expicon}></img></span> 
  <p class="admpara" style={{"color":"white"}}>
 Check your websites growth and track all your users data.
   Keep a track of your expenses and the registered of users.
   </p>
  </div>
        </div>
        <div class="col-sm-3">
        <div class="w3-round-xlarge admexpense w3-panel w3-card-2  w3-hover-shadow">
        <p class="admheadexp" style={{"fontWeight":"600","color":"white"}}> Expenses <span> &nbsp;&nbsp;<i style={{"font-size":"35px","float":"right"}} class='fas'>&#xf651;</i></span></p>
        <hr class="admhrstylecard"></hr>
        <div class="row">
              <div class="col-sm-6">
             <center> <p style={{"fontSize":"19px","color":"white","fontWeight":"600"}}>Total expenses<h4><b>₹ {totalexp}</b></h4></p></center>
            </div>
            <div classs="col-sm-6">             
            <div style={{ width: 90, height: 60}}>
            <CircularProgressbar value={Math.floor((totalexp/totalbug)*100)} text={`${Math.floor((totalexp/totalbug)*100)}%`} strokeWidth={12} color={"white"}/>
            </div>
          </div>
          </div>
  </div>
        </div>
        <div class="col-sm-3">
        <div class="w3-round-xlarge admexpense w3-panel w3-card-2  w3-hover-shadow">
        <p class="admheadexp" style={{"fontWeight":"600","color":"white"}}> Total Users <span> &nbsp;&nbsp;<i style={{"font-size":"35px","float":"right"}} class='fas'>&#xf500;</i></span></p>
        <hr class="admhrstylecard" ></hr>
        <div class="row">
              <div class="col-sm-6">
          <center><p style={{"fontSize":"19px","color":"white","fontWeight":"600"}}>Total Users <h4 style={{"margin-top":"20px","margin-left":"20px"}}><b>{getusermanage.length}</b></h4></p></center>
            </div>
            <div classs="col-sm-6">             
            <div style={{ width: 90, height: 60}}>
              <CircularProgressbar value={getusermanage.length} text={getusermanage.length} strokeWidth={12}/>
            </div>
          </div>
          </div>
  </div>
        </div>
      </div>
      <div class="row ">


<div class="col-sm-8">
<div style={{"padding":"25px"}} class="w3-round-xlarge w3-hover-shadow w3-display-container w3-panel linechart w3-card-2">
  <Chart type='bar'
  width={665}
  height={400}
  series={[{name:"budget",data:[243,422,654,434,345,987,456]},
  {name:"expense",data:[211,390,680,400,295,797,466]}]}
  options={{title:{text:"Last 30 days expenses"},
  xaxis:{title:{text:"budget and expenses"},
  categories:[0,5,10,15,20,25,30,35]}}}></Chart>

<Link to="/report"><button style={{"padding":"5px","fontWeight":"500","fontSize":"17px"}} class="w3-bar w3-blue w3-border w3-round-large w3-hover-green">Reports &nbsp;&nbsp;<i style={{"font-size":"20px"}} class="fa">&#xf0a4;</i>
</button>
</Link>
</div>



</div>
<div class="col-sm-4" style={{"marginTop":"5px"}}>
<div class="w3-round-xlarge w3-hover-shadow w3-display-container admusers w3-panel w3-card-2">

<p class="admheadexp" style={{"fontWeight":"600","color":"white"}}>Average Expenses <span> &nbsp;&nbsp;<i style={{"font-size":"35px","float":"right"}} class='fas'>&#xf651;</i></span></p>
        <hr class="admhrstylecard"></hr>
        <div class="row">
              <div class="col-sm-8">
             <center> <p style={{"fontSize":"20px","color":"white","fontWeight":"600"}}>Average monthly expenses<h4><b>₹ {Math.floor(totalexp/12)}</b></h4></p></center>
            </div>
            <div classs="col-sm-4">             
            <div style={{ width: 100, height: 65}}>
            <CircularProgressbar value={Math.floor(((totalexp/12)/(totalexp))*100)} text={`${Math.floor(((totalexp/12)/(totalexp))*100)}%`} strokeWidth={12} color={"white"}/>
            </div>
          </div>
          </div>
  </div>
</div>
</div>
<div class="row">
  <div class="col-sm-8">

  </div>
  <div class="col-sm-4" style={{"marginTop":"-260px"}}>
  <div class="w3-round-xlarge w3-hover-shadow w3-display-container admusers w3-panel w3-card-2">

  <p class="admheadexp" style={{"fontWeight":"600","color":"white"}}>Average Budget <span> &nbsp;&nbsp;<i style={{"font-size":"35px","float":"right"}} class='fas'>&#xf651;</i></span></p>
        <hr class="admhrstylecard"></hr>
        <div class="row">
              <div class="col-sm-8">
             <center> <p style={{"fontSize":"20px","color":"white","fontWeight":"600"}}>Average monthly budget<h4><b>₹ {Math.floor(totalbug/12)}</b></h4></p></center>
            </div>
            <div classs="col-sm-4">             
            <div style={{ width: 100, height: 65}}>
            <CircularProgressbar value={Math.floor(((totalbug/12)/(totalbug))*100)} text={`${Math.floor(((totalbug/12)/(totalbug))*100)}%`} strokeWidth={12} color={"white"}/>
            </div>
          </div>
          </div>

  </div>
  </div>
</div>
</div>

    </div>

    </>
  )
}

export default Dashboard