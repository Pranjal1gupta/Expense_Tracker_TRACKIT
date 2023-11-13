import React from 'react'
import './userstyle.css'
import Chart from 'react-apexcharts';
import Sidenav from "./Sidenav";
import { buildStyles, CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import { Link, useLocation } from 'react-router-dom';
import useric from '../Home/media/useric.gif'
import { useState ,useEffect} from 'react';
import moment from 'moment/moment';


const Mainpage = () => {

  // console.log(moment().format('MM YYYY'));

  const currdate = moment().format('YYYY-MM');
  console.log(currdate)

  const [totalbug,settotalbug] = useState(null)

  const[totalexp,settotalexp] = useState(null);

  const[getexpenseview,setexpenseview]= useState([]);
  console.log(getexpenseview);

  const [getbudgetview,setbudgetview] = useState([]);
  console.log(getbudgetview);

  const [getloginemail,setloginemail]=useState();
  const email=localStorage.getItem("email");

  useEffect(()=>{
    var logindata=localStorage.getItem("email");
    setloginemail(logindata);
    viewexpense();
    viewbudget();
    getsignup();
  },[]);

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
    const fetchexpense=await fetch(`/getexpenseapimainpage/${email}/${currdate}`,{
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
    const fetchbudget=await fetch(`/getbudgetapimainpage/${email}/${currdate}`,{
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



  // const location=useLocation()
  // {location.state.id}
  return (
    <>
    
    <div style={{"marginLeft":"15%"}}><Sidenav/></div>
    <div style={{"marginLeft":"15.5%","marginTop":"0px"}}>
      <div class="container">
        <div class="row"></div>
        <div class="col-sm-1">
        <img src={useric} style={{"height":"82px","width":"86px","marginTop":"10px"}}/>
        </div>
      <div class="col-sm-11" style={{"paddingLeft":"30px"}}>
        <h1 style={{"fontWeight":"bold","color":"#5870c7"}}>Welcome back <span style={{"textTransform":"uppercase"}}>{getuserdata.uname}</span> </h1>
        <h5 style={{"color":"#5870c7"}}>This is your dashboard. It gives you an overview of everything.</h5>
        </div>
        </div>
        <div class="container">
          <div class="row">

            <div class="col-sm-4">
            <div class=" w3-hover-shadow w3-round-xlarge w3-display-container w3-panel-bugstatus w3-panel w3-card-2">
            <h3>Budget Status <span style={{"float":"right"}}> &nbsp;&nbsp;
            <i style={{"font-size":"21px","float":"right","padding":"7px","border":"1px solid #f932ba","backgroundColor":"#f932ba","color":"white","borderRadius":"20px","marginTop":"-2px"}} class='fas'>&#xf201;</i></span></h3>
            <hr class="hrstylecard"></hr>
            <h4 style={{"fontWeight":"600","marginTop":"-8px"}}>Almost there, <span style={{"textTransform":"uppercase"}}>{getuserdata.uname}</span></h4>
            <h6 style={{"fontWeight":"600","fontSize":"16.5px"}}>You have spent <span style={{"color":"#E0082C","fontWeight":"700"}}>{Math.floor((totalexp/totalbug)*100)}% </span>of your expected monthly budget. You still have <span style={{"color":"#E0082C","fontWeight":"700"}}>{Math.floor((100-(totalexp/totalbug)*100))}%</span> to go.</h6>
            <Link to="budget"><button style={{"padding":"3px","marginTop":"-1px"}} class="w3-bar w3-green w3-border w3-round-large w3-hover-red">Adjust Budget &nbsp;&nbsp;<i style={{"font-size":"20px"}} class="fa">&#xf0a4;</i>
            </button></Link>
            </div>
            </div>

            <div class="col-sm-4">
        <div class="w3-hover-shadow w3-round-xlarge w3-display-container w3-panel-bug w3-panel w3-card-2">
            <h3>Budget<span style={{"float":"right"}}> &nbsp;&nbsp;<i style={{"font-size":"21px","float":"right","padding":"7px","border":"1px solid #4c529b","backgroundColor":"#4c529b","color":"white","borderRadius":"20px","marginTop":"-2px"}} class='fas'>&#xf200;</i></span></h3>
            <hr class="hrstylecard"></hr>
            <div class="row">
              <div class="col-sm-6">
            <h6 style={{"fontWeight":"600","fontSize":"17px"}}>Your budegt for this month is : </h6>
            <h3 style={{"textAlign":"center","font-weight":"400","color":"#064572"}}><b>₹ {totalbug}</b></h3>
            </div>
            <div classs="col-sm-6">             
            <div style={{ width: 100, height: 70, "marginLeft":"30px"}}>
              <CircularProgressbar value={95} text={"100%"} strokeWidth={12} />
            </div>
          </div>
          </div>
            </div>
            </div>
            
            <div class="col-sm-4">
        <div class=" w3-hover-shadow w3-round-xlarge w3-display-container w3-panel-saving w3-panel w3-card-2">
            <h3>savings <span style={{"float":"right"}}>&nbsp;&nbsp;<i style={{"font-size":"21px","float":"right","padding":"7px","border":"1px solid #f932ba","backgroundColor":"#f932ba","color":"white","borderRadius":"20px","marginTop":"-2px"}} class='fas'>&#xf4c0;</i></span></h3>
            <hr class="hrstylecard"></hr>
            <div class="row">
              <div class="col-sm-6">
            <h6 style={{"fontWeight":"600","fontSize":"17px"}}>Your savings for this month is : </h6>
            <h3 style={{"textAlign":"center","font-weight":"400","color":"#064572"}}><b>₹ {totalbug-totalexp}</b></h3>
            </div>
            <div classs="col-sm-6">             
            <div style={{ width: 100, height: 70 ,"marginLeft":"30px"}}>
              <CircularProgressbar value={((totalbug-totalexp)/totalbug)*100} text={`${Math.floor(((totalbug-totalexp)/totalbug)*100)}%`}  strokeWidth={12}/>
            </div>
          </div>
          </div>
            
        </div>
        </div>
        
        </div>
     
        <div class="row" >
          <div class="col-sm-6">
        <div class ="w3-card-2 w3-round-xlarge w3-panel bugchart w3-hover-shadow" >
          <h3>Total Expenses<span style={{"float":"right"}}> &nbsp;&nbsp;
          <i style={{"font-size":"21px","float":"right","padding":"7px","border":"1px solid black","backgroundColor":"black","color":"white","borderRadius":"20px","marginTop":"-2px"}} class='fas'>&#xf651;</i>
          </span></h3>
          <hr class="hrstylecard"></hr>
        <Chart style={{"margin-left":"-67px"}}
         type="donut"
         strokeWidth={50}
         width={570}
        height={315}
        series={[2000,2800,2300,2800]}
          options= {
            
        {labels:['food','medicine','bills','education'],
        
        plotOptions:{pie:{donut:{labels:{show:true,total:{show:true,fontSize:25,color:'red'}},}}},
        dataLabels:{enabled:true,fontSize:5},
        }
      }
        >
     </Chart>
        </div>
        </div>
        
        <div class="col-sm-6">
        <div  class="w3-hover-shadow w3-round-xlarge w3-display-container w3-panel-exp w3-panel w3-card-2">
            <h3>No Of Expenses<span style={{"float":"right"}}> &nbsp;&nbsp;
            <i style={{"font-size":"21px","float":"right","padding":"7px","border":"1px solid black","backgroundColor":"black","color":"white","borderRadius":"20px","marginTop":"-2px"}} class='fas'>&#xf651;</i>
            </span></h3>
            <hr class="hrstylecard"></hr>            
             <div class="row">
                <div class="col-sm-7" style={{"paddingTop":"70px","paddingLeft":"30px"}}>
                  <h5>Your total number of expenses for this month are:</h5><br/>
                  <h1 style={{"textAlign":"center","font-weight":"400"}}>
                    <b style={{"padding":"7px 20px","border":"1px solid #E0082C","backgroundColor":"#E0082C","color":"white","borderRadius":"50px"}} >{getexpenseview.length}</b>
                    </h1>
                </div>
                <div classs="col-sm-5">             
                <div style={{ width: 210, height: 150,"marginTop":"20px"}}>
                  <CircularProgressbar value={Math.floor((totalexp/totalbug)*100)} text={`${Math.floor((totalexp/totalbug)*100)}%`} strokeWidth={12}/>
              </div>
            </div>
            </div>
            
            <Link to="expenses"><button type="submit" style={{"marginTop":"67px","padding":"5px"}} class="w3-bar w3-green w3-border w3-round-large w3-hover-red">Add more Transaction &nbsp;&nbsp;<i style={{"font-size":"20px"}} class="fa">&#xf0a4;</i>
            </button></Link>
            
            </div>
        </div>

        </div>
       
       
        
        <div class="row ">

          <div class="col-sm-4">
          <div class="w3-hover-shadow w3-round-xlarge w3-display-container w3-panel last-30days-act w3-card-2">
          <h3>Last 30 Days Activity <span style={{"float":"right"}}> &nbsp;&nbsp;<i style={{"font-size":"21px","float":"right","padding":"7px","border":"1px solid black","backgroundColor":"black","color":"white","borderRadius":"20px","marginTop":"-2px"}} class='fas'>&#xf201;</i></span></h3>
            <hr class="hrstylecard"></hr>
            <h4 style={{"textTransform":"capitalize","fontSize":"23px","fontWeight":"600","color":"#5870c7"}}>Hello, <span style={{"textTransform":"uppercase"}}>{getuserdata.uname}</span></h4>

            <h5 style={{"textTransform":"lowercase","paddingTop":"7px","fontWeight":"500","fontSize":"18px"}}> <span style={{"textTransform":"uppercase"}}>H</span>ere is the comparison of your monthly expenses and budget. You can view your full monthly and annual report here. </h5>

            <Link to="monthlyreports"><button type="submit" style={{"padding":"5px","marginTop":"40px"}} class="w3-bar w3-green w3-border w3-round-large w3-hover-red">View full report &nbsp;&nbsp;<i style={{"font-size":"20px"}} class="fa">&#xf0a4;</i></button></Link>
            </div>
          </div>

          <div class="col-sm-8">
          <div style={{"padding":"25px"}} class="w3-hover-shadow w3-round-xlarge w3-display-container w3-panel linechart w3-card-2">
            <Chart type='area'
            width={665}
            height={400}
            series={[{name:"budget",data:[243,422,654,434,345,987,456]},
            {name:"expense",data:[211,390,680,400,295,797,466]}]}
            options={{title:{text:"Last 30 days expenses"},
            xaxis:{title:{text:"budget and expenses"},
            categories:[0,5,10,15,20,25,30,35]}}}></Chart>
          </div>
          </div>

          </div>
          </div>
    </div>
    </>
  )
}

export default Mainpage