import React ,{useState,useEffect} from 'react'
import Chart from "react-apexcharts";
import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import AdmSidenav from '../Admin/AdmSidenav';
import './admreport.css';
import moment from "moment";
import adminicon from '../Home/media/adminicon.gif'

const AdmReport = () => {

  const [getusermanage,setusermanage] = useState([]);

  //  const currdate = moment().format('YYYY-MM');

 const thirtydays = moment().subtract(30,'days').format('YYYY-MM-DD');
 const sevendays = moment().subtract(7,'days').format('YYYY-MM-DD');
 const currdate = moment().format('YYYY-MM-DD');
 console.log(thirtydays)
 console.log(currdate);
 console.log(sevendays)

//  Total usetate
  const [totalbug,settotalbug] = useState(null)
  const[totalexp,settotalexp] = useState(null);

  const [getlastmonthdata,setlastmonthdata]=useState();
  const[getlstmontotalexp,setlstmontotalexp] =useState(null);

  const [getsevendaysdata,setsevendaysdata]=useState();
  const[getsevendaytotal,setsevendaytotal] =useState(null);

  const [getexpensecurrdata,setexpensecurrdata]=useState();
  const[getcurrentdaytotal,setcurrentdaytotal] =useState(null);


  const[getexpenseview,setexpenseview]= useState([]);

  const [getbudgetview,setbudgetview] = useState([]);

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
        alert("Server Busy Can't Get Your Data..");
        console.log("error");
      }
      else{
        setbudgetview(getbudgetdata)
        console.log("Data fetched ");
      }
  };


  const viewexpensemonthly = async()=>
  {
    const fetchexpense=await fetch(`/lastmonthdataadmin/${thirtydays}/${currdate}`,{
      method:"GET",
      headers:{
        "Content-Type":"application/JSON"
      },
    });

    const getexpensedata=await fetchexpense.json();
    const sumexplstmon = getexpensedata.reduce((prev,curr)=>{
      return prev + +curr.expamt;
    },0);
    console.log(sumexplstmon)
    setlstmontotalexp(sumexplstmon);
    console.log("last month total exp");

      console.log("data",getexpensedata);
      if(!getexpensedata || fetchexpense.status===404){
        alert("Error");
        console.log("error");
      }
      else{
       setlastmonthdata(getexpensedata)
       console.log(getexpensedata)
        console.log("Data fetched ");

      }
  };

  const viewexpsevendays = async()=>
  {
    const fetchexpense=await fetch(`/sevendaysadminapi/${sevendays}/${currdate}`,{
      method:"GET",
      headers:{
        "Content-Type":"application/JSON"
      },
    });

    const getexpensesevendata=await fetchexpense.json();
    const sumexpseven = getexpensesevendata.reduce((prev,curr)=>{
      return prev + +curr.expamt;
    },0);
    console.log("last seven days total",sumexpseven)
    setsevendaytotal(sumexpseven);
    console.log("last seven days");

      console.log("last seven days data",getexpensesevendata);
      if(!getexpensesevendata || fetchexpense.status===404){
        alert("Error");
        console.log("error");
      }
      else{
       setsevendaysdata(getexpensesevendata)
       console.log(getexpensesevendata)
        console.log("Data fetched ");

      }
  };

  const viewexpcurrentdate = async()=>
  {
    const fetchexpense=await fetch(`/currentdateadminapi/${currdate}`,{
      method:"GET",
      headers:{
        "Content-Type":"application/JSON"
      },
    });

    const getexpensecurrdata=await fetchexpense.json();
    const sumexpcurrent = getexpensecurrdata.reduce((prev,curr)=>{
      return prev + +curr.expamt;
    },0);
    console.log("current days total",sumexpcurrent)
    setcurrentdaytotal(sumexpcurrent);
    console.log("current days");

      console.log("current date data",getexpensecurrdata);
      if(!getexpensecurrdata || fetchexpense.status===404){
        alert("Error");
        console.log("error");
      }
      else{
        setexpensecurrdata(getexpensecurrdata)
       console.log(getexpensecurrdata)
        console.log("Data fetched ");

      }
  };




  useEffect(()=>{
    viewexpensemonthly();
    viewexpsevendays();
    viewusermanage();
    viewexpense();
    viewbudget();
    viewexpcurrentdate();
    // console.log(totalexp)
    // console.log(totalbug)
  },[]);

  return (
    <>
    <div style={{"marginLeft":"15%"}}><AdmSidenav/></div>
    <div style={{"margin-left":"16%","marginTop":"-10px"}} class="report">
    
    <div class="container">
        <div class="row"></div>
        <div class="col-sm-1">
        <img src={adminicon} style={{"height":"85px","width":"85px","marginTop":"10px"}}/>
        </div>
      <div class="col-sm-11" style={{"paddingLeft":"30px"}}>
        <h1 style={{"fontWeight":"bold","color":"#5870c7"}}>Welcome back Admin </h1>
        <h5 style={{"color":"#5870c7"}}>This is your report. It will give you details of everything.</h5>
        </div>
        </div>
    <div class="container">
      <div class="row" style={{"marginTop":"10px"}}>
        <div class="col-sm-4">
        <div class="w3-round-xlarge today w3-panel w3-card-2  w3-hover-shadow">
        <p style={{"font-weight":"bolder","fontSize":"25px"}}>Today's Expense<span><i style={{"font-size":"22px","float":"right","padding":"10px","border":"1px solid #E43a60","backgroundColor":"#E43a60","color":"white","borderRadius":"20px"}} class='fas'>&#xf274;</i></span></p>
    <hr class="hrstylecard"></hr>
    <div class="row">
              <div class="col-sm-6">
              <center> <p style={{"fontSize":"20px"}}>Today's total expense<h3 style={{"color":"#0094fe"}}><b>₹ {getcurrentdaytotal}</b></h3></p></center>
            </div>
            <div classs="col-sm-6">             
            <div style={{ width: 100, height: 70, "marginLeft":"30px"}}>
              <CircularProgressbar value={60} text={"60%"} strokeWidth={12}/>
            </div>
          </div>
          </div>
  </div>
        </div>
        <div class="col-sm-4">
        <div class="w3-round-xlarge seven w3-panel w3-card-2  w3-hover-shadow">
        <p style={{"font-weight":"bolder","fontSize":"25px"}}>Last 7 Days<span><i style={{"font-size":"22px","float":"right","padding":"10px","border":"1px solid #F48569","backgroundColor":"#F48569","color":"white","borderRadius":"20px"}}  class='fas'>&#xf073;</i></span></p>
        <hr class="hrstylecard"></hr>
        <div class="row">
              <div class="col-sm-6">
              <center> <p style={{"fontSize":"20px"}}>Last 7 days total expense<h3 style={{"color":"#0094fe"}}><b>₹ {getsevendaytotal}</b></h3></p></center>
   </         div>
            <div classs="col-sm-6">             
            <div style={{ width: 100, height: 70, "marginLeft":"30px"}}>
              <CircularProgressbar value={54} text={"54%"} strokeWidth={12}/>
            </div>
          </div>
          </div>
  </div>
        </div>
        <div class="col-sm-4">
        <div class="w3-round-xlarge thirty w3-panel w3-card-2  w3-hover-shadow">
        <p style={{"font-weight":"bolder","fontSize":"25px"}}>Last 30 Days<span><i style={{"font-size":"22px","float":"right","padding":"10px","border":"1px solid #41B655","backgroundColor":"#41B655","color":"white","borderRadius":"20px"}}  class='fas'>&#xf073;</i></span></p>
        <hr class="hrstylecard"></hr>
        <div class="row">
              <div class="col-sm-6">
              <center><p style={{"fontSize":"20px"}}>Last 30 days total expense<h3 style={{"color":"#0094fe"}}><b> ₹ {getlstmontotalexp}</b></h3></p></center>
   </         div>
            <div classs="col-sm-6">             
            <div style={{ width: 100, height: 70, "marginLeft":"30px"}}>
              <CircularProgressbar value={71} text={"71%"} strokeWidth={12}/>
            </div>
          </div>
          </div>
  </div>
        </div>
      </div>
      <div class="row">
        <div class="col-sm-4">
        <div class="w3-round-xlarge w3-round-xlarge year w3-panel w3-card-2  w3-hover-shadow">
        <p style={{"font-weight":"bolder","fontSize":"25px"}}>Current Year<span><i style={{"font-size":"22px","float":"right","padding":"10px","border":"1px solid #41B655","backgroundColor":"#41B655","color":"white","borderRadius":"20px"}}  class='fas'>&#xf274;</i></span></p>
        <hr class="hrstylecard"></hr>
        <div class="row">
              <div class="col-sm-6">
              <center> <p style={{"fontSize":"20px"}}>Current year total expense<h3 style={{"color":"#0094fe"}}><b>₹ {totalexp}</b></h3></p></center>
   </div>
            <div classs="col-sm-6">             
            <div style={{ width: 100, height: 70, "marginLeft":"30px"}}>
              <CircularProgressbar value={Math.floor((totalexp/totalbug)*100)} text={`${Math.floor((totalexp/totalbug)*100)}%`} strokeWidth={12}/>
            </div>
          </div>
          </div>
  </div>
        </div>
        <div class="col-sm-4">
        <div class="w3-round-xlarge total w3-panel w3-card-2  w3-hover-shadow">
        <p style={{"font-weight":"bolder","fontSize":"25px"}}>Total Expenses<span><i style={{"font-size":"22px","float":"right","padding":"10px","border":"1px solid #E43a60","backgroundColor":"#E43a60","color":"white","borderRadius":"25px"}}  class='fas fa-comments-dollar'></i></span></p>
        <hr class="hrstylecard"></hr>
        <div class="row">
              <div class="col-sm-6">
              <center><p style={{"fontSize":"20px"}}>Overall total expenses<h3 style={{"color":"#0094fe"}}><b>₹ {totalexp}</b></h3></p></center>
        </div>
            <div classs="col-sm-6">             
            <div style={{ width: 100, height: 70, "marginLeft":"30px"}}>
              <CircularProgressbar value={Math.floor((totalexp/totalbug)*100)} text={`${Math.floor((totalexp/totalbug)*100)}%`} strokeWidth={12}/>
            </div>
          </div>
          </div>
  </div>
        </div>
        <div class="col-sm-4">
        <div class="w3-round-xlarge users w3-panel w3-card-2  w3-hover-shadow">
        <p style={{"font-weight":"bolder","fontSize":"25px"}}>Total Users<span><i style={{"font-size":"22px","float":"right","padding":"10px","border":"1px solid #F48569","backgroundColor":"#F48569","color":"white","borderRadius":"25px"}}  class='fas'>&#xf500;</i></span></p>
        <hr class="hrstylecard"></hr>
        <div class="row">
              <div class="col-sm-6">
            <center><p style={{"fontSize":"20px"}}>Total number of users<h3 style={{"color":"#0094fe"}}><b>{getusermanage.length}</b></h3></p></center>
            </div>
            <div classs="col-sm-6">             
            <div style={{ width: 100, height: 70, "marginLeft":"30px"}}>
              <CircularProgressbar value={getusermanage.length} text={getusermanage.length} strokeWidth={12}/>
            </div>
          </div>
          </div>
        </div>
        </div>
      </div>
    </div>
    <div class="container">
    <div style={{"margin-top":"20px"}} class="w3-round-xxlarge bargraph w3-panel w3-card-2  w3-hover-shadow">
      <div style={{"padding":"25px","marginLeft":"20px"}}>
      <Chart type='area'
            width={1000}
            height={400}
            series={[{name:"expense",data:[23211,26590,23480,28400,28795,20797,30466,24634,30312,27843,25472,19823]}]}
            options={{title:{text:"Expense"},
            xaxis:{title:{text:"Month"},
            categories:["January","February","March","April","May","June","July","August","September","October","November","December"]}}}></Chart>
     </div>
    </div>
    </div>
    </div>
    </>
  )
}

export default AdmReport