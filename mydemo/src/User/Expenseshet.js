import React, { useEffect, useState } from 'react'
import { DataGrid } from '@mui/x-data-grid';
import CsvDownloader from 'react-csv-downloader';
import Sidenav from "./Sidenav";
import { Link } from 'react-router-dom';
import useric from '../Home/media/useric.gif';
import Chart from 'react-apexcharts';



const Expenseshet = () => {

  const [getexpsheet,setexpsheet] = useState([]);
  const [getbudget,setbudget] = useState([]);

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
    const fetchexpsheet=await fetch(`/expensesheetapi/${email}/${getcurrmonth.currmonth}`,{
      method:"GET",
      headers:{
        "Content-Type":"application/JSON"
      },
    });
    const getexpsheetdata=await fetchexpsheet.json();
      // console.log(getexpsheetdata);
      if(!getexpsheetdata || fetchexpsheet.status===404){
        alert("errror")
        console.log("error");
      }
      else{
        setexpsheet(getexpsheetdata);
        console.log(getexpsheetdata);
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
    console.log(getbudgetdata);
    if(!getbudgetdata || fetchbudsheet.status===404){
      alert("error");
      console.log("error");
    }
    else{
      setbudget(getbudgetdata);
      console.log("Data fetched");
    }
  };

  const viewdata=async(e)=>{
    viewexpsheet();
    viewbudsheet();
  }

  const [getloginemail,setloginemail]=useState();

  useEffect(()=>{
    var logindata=sessionStorage.getItem("logindata");
    setloginemail(logindata);
    viewexpsheet();
    viewbudsheet();
    getsignup();
  },[]);

  
  const budgetcolumns = [
    { field: 'id', headerName: 'ID', width: 90 },
    { field: 'month', headerName: 'Month', width: 140 },
    { field: 'bugetcategory', headerName: 'Budget Category', width: 240 },
    { field: 'budgetamount', headerName: 'Budget Amount', width: 240 },
    { field: 'budgetdesc', headerName: 'Budget Description', width: 270 },
  ];

  const expcolumns = [
    { field: 'id', headerName: 'ID', width: 80 },
    { field: 'month', headerName: 'Month', width: 130 },
    {field:"date",headerName:'Date',width:130},
    { field: 'expcategory', headerName: 'Expense Category', width: 230 },
    { field: 'expamount', headerName: 'Expemse Amount', width: 230 },
    { field: 'expdesc', headerName: 'Expense Description', width: 260 },
  ];

  const exprows=getexpsheet.map((row,id)=>({
     id:id+1,
     month:row.month,
     date:row.date,
     expcategory:row.expcategory,
     expamount:row.expamt,
     expdesc:row.expdesc
  }))
  
  
  const budgetrows = getbudget.map((brow,id)=>({
     id:id+1,
     month:brow.month,
     bugetcategory:brow.bcategory,
     budgetamount:brow.amt,
     budgetdesc:brow.description
  }));



  return (

    <>
    {/* ///////BUTTON///////// */}
    
    <div style={{"marginLeft":"15%"}}><Sidenav/></div>
    <div style={{"marginLeft":"17%"}}>
      
    <div class="container">
        <div class="col-sm-1">
        <img src={useric} style={{"height":"82px","width":"86px","marginTop":"10px"}}/>
        </div>
      <div class="col-sm-10" style={{"paddingLeft":"30px"}}>
        <h1 style={{"fontWeight":"bold","color":"#5870c7"}}>Welcome back <span style={{"textTransform":"uppercase"}}>{getuserdata.uname}</span></h1>
        <h5 style={{"color":"#5870c7"}}>This is your Expense sheet.Kindly go through it.</h5>
      </div>
        <div class="col-sm-1" style={{"paddingTop":"25px"}}>
            <span style={{"float":"right"}}>
              <Link to="expenses">
                <button class="w3-button w3-green w3-border w3-round-large w3-hover-red">
                  <i class="fa">&#xf067;&nbsp;</i> Add Expense
                </button>
              </Link>
            </span>
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

{/* -------------------expense summary------------------- */}
<div class="container">
<div class="w3-hover-shadow w3-round-xlarge w3-panel w3-card-2 ">
  <div style={{"textAlign":"center","padding":"5px"}}>
    
  <hr class="hrstylecard" style={{"marginLeft":"100px","marginRight":"100px","marginTop":"20px","marginBottom":"0px"}}></hr>

<h3 style={{"fontSize":"27px","letterSpacing":"2px","color":"#a16fbf"}}><b>EXPENSE OVERVIEW</b></h3>

<hr class="hrstylecard" style={{"marginLeft":"100px","marginRight":"100px"}}></hr>
  </div>
  <div class="row">
  <div style={{ height: 400, width: '100%',"padding":"15px" }}>
    
      <DataGrid
        rows={exprows}
        columns={expcolumns}
        pageSize={5}
        rowsPerPageOptions={[5,10,15]}
        sx={{
          boxShadow: 3,
          fontSize:14
        }}
      />
    </div>
    <div style={{"margin":"10px"}}>
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

{/* <div class="container">
<div class="row ">
<div class="col-sm-5">
<div class="w3-hover-shadow w3-round-xlarge w3-display-container w3-panel w3-card-2" style={{"height":"415px"}}>
<h3 style={{"padding":"7px"}}><b>EXPENSE ANALYSIS</b></h3>
<hr class="hrstylecard"></hr>
<Chart style={{"padding":"20px","marginLeft":"-25px"}}
         type="pie"
         strokeWidth={50}
         width={420}
        height={270}
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

<div class="col-sm-7">
<div style={{"padding":"25px"}} class="w3-hover-shadow w3-round-xlarge w3-display-container w3-panel w3-card-2">
  <Chart type='bar'
  width={600}
  height={350}
  series={[{name:"expense",data:[211,390,680,400,295,797,466]}]}
  options={{title:{text:"Expenses"},
  xaxis:{title:{text:"Expenses"},
  categories:["25-06-2023","25-06-2023","25-06-2023","25-06-2023","25-06-2023","25-06-2023","25-06-2023"]}}}></Chart>
</div>
</div>
</div>
</div> */}


{/* ---------------------------budget summary------------------------ */}
<div class="container">
<div class="w3-hover-shadow w3-round-xlarge w3-panel w3-card-2 ">
  <div style={{"textAlign":"center","padding":"5px"}}>
    
    <hr class="hrstylecard" style={{"marginLeft":"100px","marginRight":"100px","marginTop":"20px","marginBottom":"0px"}}></hr>

    <h3 style={{"fontSize":"27px","letterSpacing":"2px","color":"#a16fbf"}}><b>BUDGET OVERVIEW</b></h3>

    <hr class="hrstylecard" style={{"marginLeft":"100px","marginRight":"100px"}}></hr>

  </div>
  <div class="row">
  <div style={{ height: 400, width: '100%',"padding":"15px" }}>
      <DataGrid
        rows={budgetrows}
        columns={budgetcolumns}
        pageSize={5}
        rowsPerPageOptions={[5,10,15]}
        sx={{
          boxShadow: 3,
          fontSize:14
        }}
      />
    </div>
    <div style={{"margin":"10px"}}>
          <CsvDownloader
            datas={getbudget}
            text="Export to CSV"
            filename={`Budget_`+new Date().toLocaleString()}
            extension=".csv"
            className="w3-btn w3-green w3-hover-shadow w3-round-large"
            />
    </div> 
  </div>
</div>
</div>

{/* <div class="container">
<div class="row ">
<div class="col-sm-5">
<div class="w3-hover-shadow w3-round-xlarge w3-display-container w3-panel w3-card-2" style={{"height":"415px"}}>
<h3 style={{"padding":"7px"}}><b>BUDGET ANALYSIS</b></h3>
<hr class="hrstylecard"></hr>
<Chart style={{"padding":"20px","marginLeft":"-25px"}}
         type="pie"
         strokeWidth={50}
         width={420}
        height={270}
        series={[7897,9864,7389,6345]}
          options= {
            
        {labels:['food','medicine','bills','education'],
        
        plotOptions:{pie:{pie:{labels:{show:true,total:{show:false,fontSize:25,color:'red'}},}}},
        dataLabels:{enabled:true,fontSize:5},
        }
      }
        >
     </Chart>
  </div>
</div>

<div class="col-sm-7">
<div style={{"padding":"25px"}} class="w3-hover-shadow w3-round-xlarge w3-display-container w3-panel w3-card-2">
  <Chart type='bar'
  width={600}
  height={350}
  series={[{name:"expense",data:[211,390,680,400,295,797,466]}]}
  options={{title:{text:"Expenses"},
  xaxis:{title:{text:"Expenses"},
  categories:["25-06-2023","25-06-2023","25-06-2023","25-06-2023","25-06-2023","25-06-2023","25-06-2023"]}}}></Chart>
</div>
</div>
</div>
</div> */}

    </div>

</>
  )
}

export default Expenseshet