import React, { useEffect, useState } from 'react'
import Sidenav from './Sidenav'
import useric from '../Home/media/useric.gif';
import { DataGrid } from '@mui/x-data-grid';
import Chart from 'react-apexcharts';
import CsvDownloader from 'react-csv-downloader';

const MonthlyReports = () => {

  const [getexpsheet,setexpsheet] = useState([]);

  const [getbudget,setbudget] = useState([]);

  const[gettotalexp,settotalexp] = useState(0);

  const [gettotalbug,settotalbug] = useState(0)

  const email=localStorage.getItem("email");

  const [getcurrmonth,setcurrmonth]=useState({
    currmonth:""
  });

  const getmonth=(e)=>{
    const {name,value}=e.target;
    setcurrmonth((mon)=>{
      return{
        ...mon,
        [name]:value
      }
    })
  };

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

  const viewexpsheet = async(e)=>
  {
    const fetchexpsheet=await fetch(`expensesheetapi/${email}/${getcurrmonth.currmonth}`,{
      method:"GET",
      headers:{
        "Content-Type":"application/JSON"
      },
    });
    const getexpsheetdata=await fetchexpsheet.json();
    const sumexp = getexpsheetdata.reduce((prev,curr)=>{
      return prev + +curr.expamt;
    },0);
    settotalexp(sumexp);
    console.log(gettotalexp);
      console.log(getexpsheetdata);
      if(!getexpsheetdata || fetchexpsheet.status===404){
        alert("errror")
        console.log("error");
      }
      else{
        setexpsheet(getexpsheetdata)
        console.log("Data fetched ");
      }
  };

  const viewbudsheet =async(e)=>{

    const fetchbudsheet=await fetch(`/expsheetbudgetapi/${email}/${getcurrmonth.currmonth}`,{
      method:"GET",
      headers:{
        "Content-Type":"application/JSON"
      },
    });
    const getbudgetdata=await fetchbudsheet.json();
    const sumbug = getbudgetdata.reduce((prev,curr)=>{
      return prev + +curr.amt;
    },0);
    settotalbug(sumbug);
    console.log(gettotalbug);
    console.log(getbudgetdata);
    if(!getbudgetdata || fetchbudsheet.status===404){
      alert("error");
      console.log("error");
    }
    else{
      setbudget(getbudgetdata)
      console.log("Data fetched")
    }
  };

  const viewdata=async(e)=>{
    viewexpsheet();
    viewbudsheet();
  }

  const budgetcolumns = [
    { field: 'id', headerName: 'ID', width: 70 },
    { field: 'month', headerName: 'Month', width: 120 },
    { field: 'bugetcategory', headerName: 'Budget Category', width: 140 },
    { field: 'budgetamount', headerName: 'Budget Amount', width: 140 },
    { field: 'budgetdesc', headerName: 'Budget Description', width: 170 },
  ];

  const expcolumns = [
    { field: 'id', headerName: 'ID', width: 20 },
    { field: 'month', headerName: 'Month', width: 80 },
    {field:"date",headerName:'Date',width:90},
    { field: 'expcategory', headerName: 'Expense Category', width: 125 },
    { field: 'expamount', headerName: 'Expemse Amount', width: 125 },
    { field: 'expdesc', headerName: 'Expense Description', width: 160 },
  ];

  const exprows=getexpsheet.map((row,id)=>({
    id:id+1,
     month:row.month,
     date:row.date,
     expcategory:row.expcategory,
     expamount:row.expamt,
     expdesc:row.expdesc
  }));

  const budgetrows = getbudget.map((brow,id)=>({
    id:id+1,
     month:brow.month,
     bugetcategory:brow.bcategory,
     budgetamount:brow.amt,
     budgetdesc:brow.description
  }));


  const [getloginemail,setloginemail]=useState();

  useEffect(()=>{
    var logindata=sessionStorage.getItem("logindata");
    setloginemail(logindata);
    viewexpsheet();
    viewbudsheet();
    getsignup();
  },[]);
  
  
  return (
    <>
    
    <div style={{"marginLeft":"15%"}}><Sidenav/></div>
    <div style={{"marginLeft":"17%","marginTop":"0px"}}>
        
    <div class="container">
        <div class="row"></div>
        <div class="col-sm-1">
        <img src={useric} style={{"height":"82px","width":"86px","marginTop":"10px"}}/>
        </div>
      <div class="col-sm-11" style={{"paddingLeft":"30px"}}>
        <h1 style={{"fontWeight":"bold","color":"#5870c7"}}>Welcome back <span style={{"textTransform":"uppercase"}}>{getuserdata.uname}</span></h1>
        <h5 style={{"color":"#5870c7"}}>This is your monthly report. It will give you details of everything.</h5>
        </div>

        <div classs="row" >
              <div class="col-sm-12">
                
              <div class="" style={{"marginTop":"25px","marginBottom":"-5px"}}> 
              <label style={{"marginBottom":"0px"}}>Search for month</label><br/>
                  <input style={{ "width": "20%","padding":"5px","borderRadius":"5px","border":"1px solid black"}} type="month" name="currmonth" onChange={getmonth} value={getcurrmonth.currmonth} />&nbsp;&nbsp;
                  <button class="w3-btn w3-green w3-border w3-round-large w3-hover-red " style={{"margin-bottom":"10px","marginTop":"5px"}} onClick={viewdata}><i style={{"font-size":"20px"}} class="fa">&#xf002;</i></button>
                </div>
              </div>
            </div>
        </div>

        <div class="container">
          <div class="row">
            <div class="col-sm-12">
          <div class="w3-round-xlarge w3-display-container w3-panel w3-card-2 " style={{"height":"auto"}}>
          <div style={{"padding":"5px"}}>
              <h3 style={{"fontSize":"27px","letterSpacing":"2px","color":"#5870c7"}}><center><b>MONTHLY REPORT</b>
              </center></h3>
            </div>
            <div class="row">
              <div class="col-sm-4">
              <div class=" w3-round-large w3-display-container w3-panel w3-card-2 w3-hover-shadow monthlyrep1" style={{"height":"auto","paddingBottom":"10px"}}>
              <h3 style={{"fontWeight":"600"}}>BUDGET<span style={{"float":"right"}}> &nbsp;&nbsp;
              <i style={{"font-size":"21px","float":"right","padding":"7px","border":"1px solid #bf42fd","backgroundColor":"#bf42fd","color":"white","borderRadius":"20px","marginTop":"-2px"}} class='fas'>&#xf200;</i></span></h3>
            <hr class="hrstylecard" style={{}}></hr>
            <div class="row">
              <div class="col-sm-6">
            <h6 style={{"fontWeight":"600"}}><center>Your budget for this month is : </center></h6>
            </div>
            <div classs="col-sm-6">             
            <h3 style={{"textAlign":"center","font-weight":"400"}}><b>₹ {gettotalbug}</b></h3>
          </div>
          </div>
              </div>
              </div>

              <div class="col-sm-4">
              <div class=" w3-round-large w3-display-container w3-panel w3-card-2 w3-hover-shadow monthlyrep2" style={{"height":"auto","paddingBottom":"10px"}}>
              <h3 style={{"fontWeight":"600"}}>EXPENSES<span style={{"float":"right"}}> &nbsp;&nbsp;
              <i style={{"font-size":"21px","float":"right","padding":"7px","border":"1px solid #4c529b","backgroundColor":"#4c529b","color":"white","borderRadius":"20px","marginTop":"-2px"}} class='fas'>&#xf651;</i></span></h3>
            <hr class="hrstylecard"></hr>
            <div class="row">
              <div class="col-sm-6">
            <h6 style={{"fontWeight":"600"}}><center>Your expense for this month is : </center></h6>
            </div>
            <div classs="col-sm-6">             
            <h3 style={{"textAlign":"center","font-weight":"400"}}><b>₹ {gettotalexp}</b></h3>
          </div>
          </div>
                </div>
              </div>

              <div class="col-sm-4">
                <div class=" w3-round-large w3-display-container w3-panel w3-card-2 w3-hover-shadow monthlyrep1" style={{"height":"auto","paddingBottom":"10px"}}>
                <h3 style={{"fontWeight":"600"}}>SAVINGS<span style={{"float":"right"}}> &nbsp;&nbsp;
                <i style={{"font-size":"21px","float":"right","padding":"7px","border":"1px solid #bf42fd","backgroundColor":"#bf42fd","color":"white","borderRadius":"20px","marginTop":"-2px"}} class='fas'>&#xf4c0;</i></span></h3>
            <hr class="hrstylecard"></hr>
            <div class="row">
              <div class="col-sm-6">
            <h6 style={{"fontWeight":"600"}}><center>Your savings for this month is : </center></h6>
            </div>
            <div classs="col-sm-6">             
            <h3 style={{"textAlign":"center","font-weight":"400"}}><b>₹ {gettotalbug-gettotalexp}</b></h3>
          </div>
          </div>
              </div>
              </div>
            </div>
            <br/>
            <div class="row">
              <div class="col-sm-8">
                <div class="w3-round-large w3-display-container w3-panel ">
                <hr class="hrstylecard" style={{"marginLeft":"100px","marginRight":"100px","marginBottom":"0px"}}></hr>
                <h3 style={{"fontSize":"22px","letterSpacing":"2px","color":"#a16fbf","fontWeight":"650"}}>
                  <center>MONTHLY BUDGET</center>
              </h3>
              <hr class="hrstylecard" style={{"marginLeft":"100px","marginRight":"100px"}}></hr>
                <div style={{ height: 400, width: '100%',"padding":"15px" }}>
                  <DataGrid
                    rows={budgetrows}
                    columns={budgetcolumns}
                    pageSize={5}
                    rowsPerPageOptions={[5]}
                    sx={{
                      boxShadow: 3,
                      fontSize:14
                    }}
                  />
                </div>
                <div style={{"marginLeft":"20px"}}>
                  <CsvDownloader
                    datas={getbudget}
                    text="Export to CSV"
                    filename={`expensedata_`+new Date().toLocaleString()}
                    extension=".csv"
                    className="w3-btn w3-green w3-hover-shadow w3-round-large"
                  />
                </div>
                </div>
              </div>
              <div class="col-sm-4">
              <hr class="hrstylecard" style={{"marginLeft":"30px","marginRight":"30px","marginTop":"15px","marginBottom":"0px"}}></hr>
              <h3 style={{"fontSize":"22px","letterSpacing":"2px","color":"#a16fbf","fontWeight":"650"}}>
                  <center>BUDGET ANALYSIS</center>
              </h3>
              <hr class="hrstylecard" style={{"marginLeft":"30px","marginRight":"30px","marginTop":""}}></hr>
              <Chart style={{"marginLeft":"-60px","marginTop":"70px"}}
         type="pie"
         strokeWidth={50}
         width={410}
        height={220}
        series={[7897,9864,7389,6345]}
          options= {
            
        {labels:['food','medicine','bills','education'],
        
        plotOptions:{pie:{pie:{labels:{show:true,total:{show:true,fontSize:25,color:'red'}},}}},
        dataLabels:{enabled:true,fontSize:5},
        }
      }
        >
     </Chart>
              </div>
            </div>
            <br/>
            <div class="row">
            <div class="col-sm-4">
            <hr class="hrstylecard" style={{"marginLeft":"30px","marginRight":"30px","marginTop":"15px","marginBottom":"0px"}}></hr>
              <h3 style={{"fontSize":"22px","letterSpacing":"2px","color":"#a16fbf","fontWeight":"650"}}>
                  <center>EXPENSE ANALYSIS</center>
              </h3>
              <hr class="hrstylecard" style={{"marginLeft":"30px","marginRight":"30px","marginTop":""}}></hr>
              <Chart style={{"marginLeft":"-40px","marginTop":"70px"}}
         type="pie"
         strokeWidth={50}
         width={410}
        height={220}
        series={[7897,9864,7389,6345]}
          options= {
        {labels:['food','medicine','bills','education'],
        
        plotOptions:{pie:{pie:{labels:{show:true,total:{show:true,fontSize:25,color:'red'}},}}},
        dataLabels:{enabled:true,fontSize:5},
        }
      }
        >
     </Chart>
              </div>
              <div class="col-sm-8">
              <div class="w3-round-large w3-display-container w3-panel ">
              <hr class="hrstylecard" style={{"marginLeft":"100px","marginRight":"100px","marginBottom":"0px"}}></hr>
                <h3 style={{"fontSize":"22px","letterSpacing":"2px","color":"#a16fbf","fontWeight":"650"}}>
                  <center>MONTHLY EXPENSE</center>
              </h3>
              <hr class="hrstylecard" style={{"marginLeft":"100px","marginRight":"100px"}}></hr>
                <div style={{ height: 400, width: '100%',"padding":"15px" }}>
                  <DataGrid
                    rows={exprows}
                    columns={expcolumns}
                    pageSize={5}
                    rowsPerPageOptions={[5]}
                    sx={{
                      boxShadow: 3,
                      fontSize:14
                    }}
                  />
                </div>
                <div style={{"marginLeft":"20px"}}>
                  <CsvDownloader
                    datas={getexpsheet}
                    text="Export to CSV"
                    filename={`expensedata_`+new Date().toLocaleString()}
                    extension=".csv"
                    className="w3-btn w3-green w3-hover-shadow w3-round-large"
                  />
                </div>
                </div>
              </div>
              
            </div>
            <div class="row">
              <div class="col-sm-12">
              <div  style={{"padding":"20px"}} >
            <Chart type='area'
            width={1000}
            height={400}
            series={[{name:"budget",data:[243,422,654,434,345,987,456]},
            {name:"expense",data:[211,390,680,400,295,797,466]}]}
            options={{title:{text:"Budget VS Expense"},
            xaxis:{title:{text:"budget and expenses"},
            categories:[0,5,10,15,20,25,30,35]}}}></Chart>
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

export default MonthlyReports